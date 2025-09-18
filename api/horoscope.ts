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
        overview: { type: Type.STRING, description: "Detailed overview of life, personality, strengths, and weaknesses." },
        career: { type: Type.STRING, description: "In-depth analysis of career path, suitable professions, and potential for success." },
        wealth: { type: Type.STRING, description: "Analysis of wealth, asset accumulation potential, and prosperous periods." },
        loveAndMarriage: { type: Type.STRING, description: "Analysis of love life, romance, and ideal partner characteristics." },
        health: { type: Type.STRING, description: "Analysis of potential health issues and advice for maintaining well-being." },
        family: { type: Type.STRING, description: "Analysis of relationships with family, parents, and siblings." },
      },
      required: ["overview", "career", "wealth", "loveAndMarriage", "health", "family"],
    },
    luckyAdvice: {
      type: Type.OBJECT,
      properties: {
        luckyNumbers: { type: Type.ARRAY, items: { type: Type.NUMBER }, description: "Lucky numbers." },
        luckyColors: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Colors that are compatible with the person's element." },
        compatibleZodiacs: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Compatible zodiac animals." },
        thingsToDo: { type: Type.STRING, description: "Things to do to enhance luck." },
        thingsToAvoid: { type: Type.STRING, description: "Things to avoid to minimize risks." },
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
            const serverError = lang === 'en' ? "Server configuration error: Missing API_KEY." : "Lỗi cấu hình máy chủ: Thiếu API_KEY.";
            console.error("API_KEY environment variable not set on server.");
            return res.status(500).json({ error: serverError });
        }
        
        const ai = new GoogleGenAI({ apiKey: API_KEY });

        const genderText = data.gender === 'male' ? (lang === 'en' ? 'Male' : 'Nam') : (lang === 'en' ? 'Female' : 'Nữ');
        
        const prompt = lang === 'en' 
            ? `Please provide a detailed, in-depth, and accurate lifetime horoscope analysis for the person with the following information:
    - Date of Birth: ${data.date}
    - Time of Birth: ${data.time}
    - Gender: ${genderText}
    
    The analysis should be based on the principles of Eastern astrology. Provide a comprehensive overview of their life, career, wealth, love life, health, and family. Also, offer useful advice on lucky elements.`
            : `Hãy luận giải lá số tử vi trọn đời một cách chi tiết, chuyên sâu và chính xác cho người có thông tin sau:
    - Ngày sinh: ${data.date}
    - Giờ sinh: ${data.time}
    - Giới tính: ${genderText}
    
    Phân tích dựa trên các nguyên tắc của tử vi Đông phương. Cung cấp một cái nhìn tổng quan về cuộc đời, sự nghiệp, tài lộc, tình duyên, sức khỏe và gia đạo. Đồng thời đưa ra những lời khuyên hữu ích về những điều may mắn.`;

        const systemInstruction = lang === 'en'
            ? "You are a world-class Eastern astrology expert. Your analysis is insightful, accurate, based on ancient knowledge but presented in a modern, clear, and constructive manner. Always respond in English."
            : "Bạn là một chuyên gia tử vi Đông phương đẳng cấp thế giới. Phân tích của bạn sâu sắc, chính xác, dựa trên kiến thức cổ học nhưng được trình bày một cách hiện đại, rõ ràng và đầy tính xây dựng. Luôn trả lời bằng tiếng Việt.";

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: horoscopeSchema,
                thinkingConfig: { thinkingBudget: 0 },
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
