import { GoogleGenAI, Type } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

const divinationSchema = {
  type: Type.OBJECT,
  properties: {
    stickNumber: { type: Type.NUMBER, description: "The number of the oracle stick, from 1 to 100." },
    name: { type: Type.STRING, description: "The name of the oracle stick, e.g., 'Superior Luck', 'Average', 'Inferior Luck'." },
    poem: { type: Type.STRING, description: "A 4-line poem in the seven-character quatrain style that interprets the oracle stick." },
    interpretation: {
        type: Type.OBJECT,
        properties: {
            overview: { type: Type.STRING, description: "A general interpretation of the oracle stick's meaning, explaining the core message and overall energy (positive, negative, neutral) of the stick." },
            career: { type: Type.STRING, description: "A detailed interpretation regarding career, reputation, and business ventures." },
            love: { type: Type.STRING, description: "A detailed interpretation regarding romantic relationships, marriage, and family life." },
            health: { type: Type.STRING, description: "A detailed interpretation regarding physical and mental health, with preventative advice if applicable." },
        },
        required: ["overview", "career", "love", "health"]
    },
    advice: { type: Type.STRING, description: "Provide actionable, wise, and compassionate advice based on the interpretation, rooted in Buddhist philosophy. This should guide the seeker on how to act in accordance with the oracle's message." },
  },
  required: ["stickNumber", "name", "poem", "interpretation", "advice"],
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { lang = 'vi' } = req.body;
        const API_KEY = process.env.API_KEY;

        if (!API_KEY) {
            const serverError = lang === 'en' ? "Server configuration error: Missing API_KEY." : "Lỗi cấu hình máy chủ: Thiếu API_KEY.";
            console.error("API_KEY environment variable not set on server.");
            return res.status(500).json({ error: serverError });
        }
        
        const ai = new GoogleGenAI({ apiKey: API_KEY });

        const prompt = lang === 'en'
            ? `Please cast a random Guan Yin oracle lot (from 1 to 100) for a sincere seeker. Provide a profound and complete interpretation.
1.  **State the Result:** Clearly provide the stick number and its name (e.g., Superior Luck).
2.  **Present the Poem:** Give the original interpretive poem.
3.  **Detailed Interpretation:** Thoroughly explain the poem's meaning and apply it to key life areas: general overview, career, love, and health. The interpretation must be specific and insightful, not generic.
4.  **Philosophical Advice:** Offer a final piece of advice rooted in Buddhist wisdom that helps the seeker understand the deeper karmic lesson of the oracle and guides their future actions.`
            : `Hãy gieo một quẻ xăm Quan Âm ngẫu nhiên (từ 1 đến 100) cho một người đang thành tâm cầu nguyện. Cung cấp một bài luận giải đầy đủ và sâu sắc.
1.  **Nêu Rõ Quẻ Xăm:** Cung cấp rõ ràng số xăm và tên quẻ (ví dụ: Thượng Cát).
2.  **Đưa Ra Thơ Giải:** Trình bày bài thơ giải nghĩa gốc của quẻ xăm.
3.  **Luận Giải Chi Tiết:** Giải thích cặn kẽ ý nghĩa của bài thơ và ứng dụng nó vào các phương diện chính của cuộc sống: tổng quan, sự nghiệp, tình duyên, và sức khỏe. Lời giải phải cụ thể và sâu sắc, không chung chung.
4.  **Lời Khuyên Triết Lý:** Đưa ra lời khuyên cuối cùng dựa trên trí tuệ Phật pháp, giúp người xin xăm hiểu được bài học nhân quả sâu sắc từ quẻ xăm và định hướng hành động trong tương lai.`;
        
        const systemInstruction = lang === 'en'
            ? `You are a master of the I Ching and oracle casting, with profound knowledge of Eastern culture and beliefs. You provide insightful, auspicious, and benevolent interpretations that bring clarity to the seeker. Always respond in English.`
            : `Bạn là một bậc thầy về Kinh Dịch và gieo quẻ xăm, với kiến thức uyên thâm về văn hóa và tín ngưỡng Đông phương. Bạn đưa ra những lời giải quẻ sâu sắc, linh ứng, và mang tính hướng thiện, giúp người xin xăm có được sự sáng tỏ. Luôn trả lời bằng tiếng Việt.`;


        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: divinationSchema,
                thinkingConfig: { thinkingBudget: 0 },
            },
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        
        return res.status(200).json(result);

    } catch (error) {
        console.error("Error generating divination in API:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown server error occurred.";
        return res.status(500).json({ error: errorMessage });
    }
}
