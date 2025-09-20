import { GoogleGenAI, Type } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { DateSelectionData } from '../types';

const auspiciousDateSchema = {
    type: Type.OBJECT,
    properties: {
        gregorianDate: { type: Type.STRING, description: "The auspicious Gregorian date in YYYY-MM-DD format." },
        lunarDate: { type: Type.STRING, description: "The corresponding Lunar date in Vietnamese (e.g., 'Ngày 24 tháng 9 năm Giáp Thìn')." },
        dayOfWeek: { type: Type.STRING, description: "The day of the week for the auspicious date (in the requested language)." },
        suitabilityScore: { type: Type.NUMBER, description: "A score from 1 to 100 indicating how auspicious the day is for the event, with 100 being the best." },
        auspiciousStars: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of major auspicious stars (Cát Tinh) present on this day." },
        inauspiciousStars: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of major inauspicious stars (Hung Tinh) to be aware of on this day." },
        goodHours: { type: Type.STRING, description: "List of auspicious hours (Giờ Hoàng Đạo) during that day." },
        explanation: { type: Type.STRING, description: "A detailed explanation of why this day is auspicious for the specified event, mentioning good stars and favorable elements, and why it is a good choice." },
        conflictingZodiacs: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of zodiac signs (con giáp) that conflict with this day." },
    },
    required: ["gregorianDate", "lunarDate", "dayOfWeek", "suitabilityScore", "auspiciousStars", "inauspiciousStars", "goodHours", "explanation", "conflictingZodiacs"],
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
            ? `Act as a master of Dong Gong's Date Selection methodology. Find up to 5 of the absolute best and most auspicious dates in ${data.targetMonth}/${data.targetYear} ${eventTypeText}.
The person's date of birth is ${data.birthDate}.
Your analysis MUST be rigorous:
1.  **Compatibility:** Dates must be compatible with the person's zodiac sign and main element from their birth date. Strictly avoid conflicting dates.
2.  **Star Analysis:** Prioritize days with powerful auspicious stars (like Thiên Đức, Nguyệt Đức, Thiên Hỷ) and avoid days with major inauspicious stars (like Sát Chủ, Thọ Tử, Tam Nương).
3.  **Scoring:** For each recommended date, provide a 'suitabilityScore' from 1-100 to indicate its level of auspiciousness.
4.  **Complete Data:** Provide all required fields, including Gregorian/Lunar dates, day of week, auspicious/inauspicious stars, good hours, a detailed explanation, and conflicting zodiacs.`
            : `Hãy đóng vai một bậc thầy về Trạch Cát theo phương pháp Đổng Công Tuyển Trạch Yếu Lãm. Tìm ra tối đa 5 ngày tốt và cát tường nhất trong tháng ${data.targetMonth} năm ${data.targetYear} ${eventTypeText}.
Thân chủ sinh ngày ${data.birthDate}.
Phân tích của bạn PHẢI tuân thủ nghiêm ngặt các nguyên tắc sau:
1.  **Tính Tương Hợp:** Ngày phải hợp với tuổi (con giáp) và bản mệnh ngũ hành của thân chủ. Tuyệt đối tránh các ngày xung khắc.
2.  **Phân Tích Thần Sát:** Ưu tiên các ngày có nhiều Cát Tinh lớn (như Thiên Đức, Nguyệt Đức, Thiên Hỷ) và tránh các ngày có Hung Tinh lớn (như Sát Chủ, Thọ Tử, Tam Nương).
3.  **Chấm Điểm:** Đối với mỗi ngày được đề xuất, hãy cung cấp một 'suitabilityScore' từ 1-100 để cho biết mức độ cát tường.
4.  **Dữ Liệu Đầy Đủ:** Cung cấp tất cả các trường thông tin được yêu cầu, bao gồm ngày Dương/Âm lịch, thứ, các sao tốt/xấu, giờ hoàng đạo, luận giải chi tiết, và tuổi kỵ.`;

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
