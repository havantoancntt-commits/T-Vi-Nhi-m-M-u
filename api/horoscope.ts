import { GoogleGenAI, Type } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { BirthData } from '../types';

const horoscopeSchema = {
  type: Type.OBJECT,
  properties: {
    chartSummary: {
      type: Type.OBJECT,
      properties: {
        mainElement: { type: Type.STRING, description: "The person's main five element (e.g., 'Wood Element'). Ngũ hành bản mệnh (ví dụ: 'Mệnh Mộc')." },
        zodiacAnimal: { type: Type.STRING, description: "The person's zodiac animal (e.g., 'Year of the Rat'). Con giáp (ví dụ: 'Tuổi Tý')." },
        westernZodiac: { type: Type.STRING, description: "The person's Western zodiac sign (e.g., 'Aries'). Cung hoàng đạo (ví dụ: 'Cung Bạch Dương')." },
        destinyPalace: { type: Type.STRING, description: "The Destiny Palace in the chart (e.g., 'Destiny Palace in Rat'). Cung Mệnh (ví dụ: 'Cung Mệnh tại Tý')." },
      },
      required: ["mainElement", "zodiacAnimal", "westernZodiac", "destinyPalace"],
    },
    lifetimeAnalysis: {
      type: Type.OBJECT,
      properties: {
        overview: { type: Type.STRING, description: "Detailed overview of life, personality, strengths, and weaknesses, based on the Day Master and key elements. Should be written in a narrative, flowing style." },
        career: { type: Type.STRING, description: "In-depth analysis of career path, suitable professions, potential for success, and notable periods of change. Provide actionable advice." },
        wealth: { type: Type.STRING, description: "Analysis of wealth, asset accumulation potential, financial mindset, and prosperous periods. Provide strategic advice." },
        loveAndMarriage: { type: Type.STRING, description: "Analysis of love life, romance, ideal partner characteristics, and marital harmony. Offer compassionate guidance." },
        health: { type: Type.STRING, description: "Analysis of potential health issues related to the five elements in the chart and advice for maintaining well-being." },
        family: { type: Type.STRING, description: "Analysis of relationships with family, parents, and siblings, and their influence." },
        synthesis: { type: Type.STRING, description: "A holistic summary that synthesizes how career, wealth, and relationships influence each other, providing an integrated view of the person's destiny. This is the most crucial part, tying everything together." },
        keyPeriods: {
            type: Type.OBJECT,
            properties: {
                youth: { type: Type.STRING, description: "Analysis of the Youth Period (approx. 18-35), focusing on education, early career, and relationships." },
                middleAge: { type: Type.STRING, description: "Analysis of Middle Age (approx. 36-55), focusing on peak career, family building, and wealth accumulation." },
                oldAge: { type: Type.STRING, description: "Analysis of Old Age (approx. 56 onwards), focusing on health, legacy, and spiritual life." },
            },
            required: ["youth", "middleAge", "oldAge"],
        }
      },
      required: ["overview", "career", "wealth", "loveAndMarriage", "health", "family", "synthesis", "keyPeriods"],
    },
    luckyAdvice: {
      type: Type.OBJECT,
      properties: {
        luckyNumbers: { type: Type.ARRAY, items: { type: Type.NUMBER }, description: "Lucky numbers." },
        luckyColors: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Colors that are compatible with the person's element." },
        compatibleZodiacs: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Compatible zodiac animals." },
        thingsToDo: { type: Type.STRING, description: "Actionable advice on things to do to enhance luck, written as bullet points." },
        thingsToAvoid: { type: Type.STRING, description: "Actionable advice on things to avoid to minimize risks, written as bullet points." },
      },
      required: ["luckyNumbers", "luckyColors", "compatibleZodiacs", "thingsToDo", "thingsToAvoid"],
    },
  },
  required: ["chartSummary", "lifetimeAnalysis", "luckyAdvice"],
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { birthData, lang = 'vi' } = req.body;
        const data = birthData as BirthData;
        
        const API_KEY = process.env.API_KEY;

        if (!API_KEY) {
            const serverError = lang === 'en' ? "Server configuration error." : "Lỗi cấu hình máy chủ.";
            return res.status(500).json({ error: serverError });
        }
        
        const ai = new GoogleGenAI({ apiKey: API_KEY });

        const genderText = data.gender === 'male' ? (lang === 'en' ? 'Male' : 'Nam') : (lang === 'en' ? 'Female' : 'Nữ');
        
        const prompt = lang === 'en'
    ? `As a top-tier Eastern astrology master, provide an exceptionally detailed, professional, and holistic lifetime horoscope analysis for:
- Date of Birth: ${data.date}
- Time of Birth: ${data.time}
- Gender: ${genderText}

Your analysis must be comprehensive, deeply rooted in authentic astrological principles, and presented in an eloquent, narrative style. Avoid generic statements.
1.  **Core Analysis:** Analyze the Four Pillars (Bazi) to determine their core destiny.
2.  **Lifetime Breakdown:** Provide in-depth, flowing analysis for each life aspect.
3.  **Life Stages:** Detail the key themes and opportunities for their Youth (18-35), Middle Age (36-55), and Old Age (56+).
4.  **Synthesis:** Crucially, provide a synthesis that explains the intricate interplay between their career, wealth, and relationships. How do these areas support or challenge one another? This section is paramount.
5.  **Guidance:** Conclude with practical, auspicious advice formatted clearly.
The entire response must exude wisdom, coherence, and profound insight.`
    : `Với vai trò là một bậc thầy tử vi Đông phương hàng đầu, hãy luận giải lá số tử vi trọn đời một cách cực kỳ chi tiết, chuyên nghiệp và toàn diện cho thân chủ:
- Ngày sinh: ${data.date}
- Giờ sinh: ${data.time}
- Giới tính: ${genderText}

Bài phân tích phải có chiều sâu, dựa trên các nguyên tắc học thuật chính thống, và được trình bày bằng văn phong lưu loát, giàu tính tự sự. Tránh các nhận định chung chung.
1.  **Phân Tích Cốt Lõi:** Phân tích Tứ Trụ để xác định vận mệnh cốt lõi.
2.  **Luận Giải Trọn Đời:** Cung cấp phân tích sâu sắc, liền mạch cho từng phương diện cuộc sống.
3.  **Các Giai Đoạn Vận Hạn:** Luận giải chi tiết các chủ đề và cơ hội chính trong các giai đoạn Tiền Vận (18-35), Trung Vận (36-55), và Hậu Vận (từ 56 tuổi).
4.  **Tổng Luận Liên Kết:** Điểm cốt yếu là phải có một phần tổng luận, giải thích sự tương tác phức tạp giữa sự nghiệp, tài lộc và tình duyên. Các phương diện này hỗ trợ hay cản trở nhau ra sao? Đây là phần quan trọng nhất.
5.  **Lời Khuyên Hữu Ích:** Kết thúc bằng những lời khuyên thực tế, cát tường được định dạng rõ ràng.
Toàn bộ nội dung phải toát lên sự uyên bác, nhất quán và mang lại những góc nhìn sâu sắc.`;

        const systemInstruction = lang === 'en'
            ? "You are a world-class Eastern astrology expert named 'Thien Giac'. Your analysis is insightful, accurate, based on ancient knowledge but presented in a modern, eloquent, and constructive narrative. You offer profound wisdom, not just data. Always respond in English."
            : "Bạn là một chuyên gia tử vi Đông phương đẳng cấp thế giới với pháp danh 'Thiện Giác'. Phân tích của bạn sâu sắc, chính xác, dựa trên kiến thức cổ học nhưng được trình bày theo một lối kể chuyện hiện đại, lưu loát và đầy tính xây dựng. Bạn mang lại trí tuệ sâu sắc, không chỉ là dữ liệu. Luôn trả lời bằng tiếng Việt.";

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: horoscopeSchema,
                temperature: 0.5,
            },
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        
        return res.status(200).json(result);

    } catch (error) {
        console.error("Error generating horoscope in API:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown server error occurred.";
        return res.status(500).json({ error: errorMessage });
    }
}