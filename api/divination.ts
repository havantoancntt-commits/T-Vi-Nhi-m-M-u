import { GoogleGenAI, Type } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

const divinationSchema = {
  type: Type.OBJECT,
  properties: {
    stickNumber: { type: Type.NUMBER, description: "Số của quẻ xăm, từ 1 đến 100." },
    name: { type: Type.STRING, description: "Tên của quẻ xăm, ví dụ: 'Thượng Cát', 'Trung Bình', 'Hạ Hạ'." },
    poem: { type: Type.STRING, description: "Một bài thơ 4 câu theo thể thất ngôn tứ tuyệt để giải nghĩa quẻ xăm." },
    interpretation: {
        type: Type.OBJECT,
        properties: {
            overview: { type: Type.STRING, description: "Luận giải tổng quan về ý nghĩa của quẻ xăm." },
            career: { type: Type.STRING, description: "Luận giải chi tiết về phương diện sự nghiệp, công danh." },
            love: { type: Type.STRING, description: "Luận giải chi tiết về phương diện tình duyên, gia đạo." },
            health: { type: Type.STRING, description: "Luận giải chi tiết về phương diện sức khỏe." },
        },
        required: ["overview", "career", "love", "health"]
    },
    advice: { type: Type.STRING, description: "Lời khuyên cuối cùng dựa trên quẻ xăm." },
  },
  required: ["stickNumber", "name", "poem", "interpretation", "advice"],
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const API_KEY = process.env.API_KEY;

        if (!API_KEY) {
            console.error("API_KEY environment variable not set on server.");
            return res.status(500).json({ error: "Lỗi cấu hình máy chủ: Thiếu API_KEY." });
        }
        
        const ai = new GoogleGenAI({ apiKey: API_KEY });

        const prompt = `Hãy gieo một quẻ xăm Quan Âm (từ 1 đến 100) và cung cấp một luận giải chi tiết, sâu sắc. Giả sử người xin xăm đang thành tâm cầu nguyện, hãy cho họ một lá xăm ngẫu nhiên và giải nghĩa nó.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: "Bạn là một bậc thầy về Kinh Dịch và gieo quẻ xăm, với kiến thức uyên thâm về văn hóa và tín ngưỡng Đông phương. Bạn đưa ra những lời giải quẻ sâu sắc, linh ứng, và mang tính hướng thiện, giúp người xin xăm có được sự sáng tỏ. Luôn trả lời bằng tiếng Việt.",
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
        const errorMessage = error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định trên máy chủ.";
        return res.status(500).json({ error: errorMessage });
    }
}