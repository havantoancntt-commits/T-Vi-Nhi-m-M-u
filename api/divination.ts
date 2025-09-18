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
            overview: { type: Type.STRING, description: "A general interpretation of the oracle stick's meaning." },
            career: { type: Type.STRING, description: "A detailed interpretation regarding career and reputation." },
            love: { type: Type.STRING, description: "A detailed interpretation regarding love and family life." },
            health: { type: Type.STRING, description: "A detailed interpretation regarding health." },
        },
        required: ["overview", "career", "love", "health"]
    },
    advice: { type: Type.STRING, description: "Final advice based on the oracle stick." },
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
            ? `Please cast a Guan Yin oracle lot (from 1 to 100) and provide a detailed, insightful interpretation. Assume the person is praying sincerely. Give them a random lot and explain its meaning.`
            : `Hãy gieo một quẻ xăm Quan Âm (từ 1 đến 100) và cung cấp một luận giải chi tiết, sâu sắc. Giả sử người xin xăm đang thành tâm cầu nguyện, hãy cho họ một lá xăm ngẫu nhiên và giải nghĩa nó.`;
        
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
