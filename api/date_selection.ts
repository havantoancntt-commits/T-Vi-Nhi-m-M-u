import { GoogleGenAI, Type } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { DateSelectionData } from '../types';

const auspiciousDateSchema = {
    type: Type.OBJECT,
    properties: {
        gregorianDate: { type: Type.STRING, description: "The auspicious Gregorian date in YYYY-MM-DD format." },
        lunarDate: { type: Type.STRING, description: "The corresponding Lunar date in Vietnamese (e.g., 'Ngày 24 tháng 9 năm Giáp Thìn')." },
        dayOfWeek: { type: Type.STRING, description: "The day of the week for the auspicious date (in the requested language)." },
        goodHours: { type: Type.STRING, description: "List of auspicious hours (Giờ Hoàng Đạo) during that day." },
        explanation: { type: Type.STRING, description: "A detailed explanation of why this day is auspicious for the specified event, mentioning good stars (cát tinh) and favorable elements." },
        conflictingZodiacs: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of zodiac signs (con giáp) that conflict with this day." },
    },
    required: ["gregorianDate", "lunarDate", "dayOfWeek", "goodHours", "explanation", "conflictingZodiacs"],
};

const dateSelectionSchema = {
    type: Type.OBJECT,
    properties: {
        auspiciousDates: {
            type: Type.ARRAY,
            description: "A list of up to 5 of the most auspicious dates found. If no good dates are found, this array should be empty.",
            items: auspiciousDateSchema
        }
    },
    required: ["auspiciousDates"]
};


export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { dateSelectionData, lang = 'vi' } = req.body;
        const data = dateSelectionData as DateSelectionData;
        
        const API_KEY = process.env.API_KEY;

        if (!API_KEY) {
            const serverError = lang === 'en' ? "Server configuration error: Missing API_KEY." : "Lỗi cấu hình máy chủ: Thiếu API_KEY.";
            console.error("API_KEY environment variable not set on server.");
            return res.status(500).json({ error: serverError });
        }
        
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        
        const eventTypeText = lang === 'en' ? `for the event: "${data.eventType}"` : `cho công việc: "${data.eventType}"`;

        const prompt = lang === 'en' 
            ? `Please act as an expert in Eastern date selection. Find the most auspicious dates in ${data.targetMonth}/${data.targetYear} ${eventTypeText}.
The person's date of birth is ${data.birthDate}. It is crucial to select dates that DO NOT conflict with their zodiac sign.
Provide a list of the best dates, including the Gregorian date, Lunar date, day of the week, auspicious hours, a detailed explanation for each, and the conflicting zodiac signs.`
            : `Hãy đóng vai một chuyên gia chọn ngày lành tháng tốt. Tìm những ngày tốt nhất trong tháng ${data.targetMonth} năm ${data.targetYear} ${eventTypeText}.
Thân chủ sinh ngày ${data.birthDate}. Điều cực kỳ quan trọng là phải chọn những ngày KHÔNG xung khắc với tuổi của thân chủ.
Cung cấp một danh sách những ngày tốt nhất, bao gồm ngày dương lịch, ngày âm lịch, thứ trong tuần, giờ hoàng đạo, luận giải chi tiết, và các tuổi xung khắc.`;

        const systemInstruction = lang === 'en'
            ? "You are a master of Feng Shui and Eastern date selection (Trạch Cát). Your analysis is based on principles of the I Ching, celestial stems, terrestrial branches, and the influence of good and bad stars. Provide accurate, clear, and responsible advice. Always respond in English."
            : "Bạn là một bậc thầy về Phong Thủy và Trạch Cát. Phân tích của bạn dựa trên nguyên lý Kinh Dịch, Thiên Can, Địa Chi, và ảnh hưởng của các sao tốt-xấu. Cung cấp lời khuyên chính xác, rõ ràng, và có trách nhiệm. Luôn trả lời bằng tiếng Việt.";

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: dateSelectionSchema,
                temperature: 0.2, // Lower temperature for more deterministic, accurate results
                thinkingConfig: { thinkingBudget: 0 },
            },
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        
        return res.status(200).json(result);

    } catch (error) {
        console.error("Error generating auspicious dates in API:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown server error occurred.";
        return res.status(500).json({ error: errorMessage });
    }
}
