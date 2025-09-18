
import { GoogleGenAI, Type } from "@google/genai";
import type { BirthData, AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const horoscopeSchema = {
  type: Type.OBJECT,
  properties: {
    chartSummary: {
      type: Type.OBJECT,
      properties: {
        mainElement: { type: Type.STRING, description: "Ngũ hành bản mệnh, ví dụ: 'Mệnh Mộc'" },
        zodiacAnimal: { type: Type.STRING, description: "Con giáp, ví dụ: 'Tuổi Tý'" },
        westernZodiac: { type: Type.STRING, description: "Cung hoàng đạo Tây phương, ví dụ: 'Cung Bạch Dương'" },
        destinyPalace: { type: Type.STRING, description: "Cung Mệnh trong lá số, ví dụ: 'Cung Mệnh tại Tý'" },
      },
      required: ["mainElement", "zodiacAnimal", "westernZodiac", "destinyPalace"],
    },
    lifetimeAnalysis: {
      type: Type.OBJECT,
      properties: {
        overview: { type: Type.STRING, description: "Tổng quan chi tiết về cuộc đời, tính cách, điểm mạnh và điểm yếu." },
        career: { type: Type.STRING, description: "Phân tích sâu về con đường sự nghiệp, ngành nghề phù hợp, tiềm năng thành công." },
        wealth: { type: Type.STRING, description: "Phân tích về tài lộc, khả năng tích lũy tài sản, các giai đoạn thịnh vượng." },
        loveAndMarriage: { type: Type.STRING, description: "Phân tích về tình duyên, đường lãng mạn, đặc điểm người bạn đời lý tưởng." },
        health: { type: Type.STRING, description: "Phân tích các vấn đề sức khỏe tiềm ẩn và lời khuyên để duy trì sức khỏe." },
        family: { type: Type.STRING, description: "Phân tích mối quan hệ với gia đình, cha mẹ, anh em." },
      },
      required: ["overview", "career", "wealth", "loveAndMarriage", "health", "family"],
    },
    luckyAdvice: {
      type: Type.OBJECT,
      properties: {
        luckyNumbers: { type: Type.ARRAY, items: { type: Type.NUMBER }, description: "Các con số may mắn." },
        luckyColors: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Các màu sắc hợp mệnh." },
        compatibleZodiacs: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Các con giáp hợp tuổi." },
        thingsToDo: { type: Type.STRING, description: "Những việc nên làm để tăng cường may mắn." },
        thingsToAvoid: { type: Type.STRING, description: "Những việc nên tránh để giảm thiểu rủi ro." },
      },
      required: ["luckyNumbers", "luckyColors", "compatibleZodiacs", "thingsToDo", "thingsToAvoid"],
    },
  },
  required: ["chartSummary", "lifetimeAnalysis", "luckyAdvice"],
};

export const generateHoroscope = async (data: BirthData): Promise<AnalysisResult> => {
  try {
    const genderText = data.gender === 'male' ? 'Nam' : 'Nữ';
    const prompt = `Hãy luận giải lá số tử vi trọn đời một cách chi tiết, chuyên sâu và chính xác cho người có thông tin sau:
    - Ngày sinh: ${data.date}
    - Giờ sinh: ${data.time}
    - Giới tính: ${genderText}
    
    Phân tích dựa trên các nguyên tắc của tử vi Đông phương. Cung cấp một cái nhìn tổng quan về cuộc đời, sự nghiệp, tài lộc, tình duyên, sức khỏe và gia đạo. Đồng thời đưa ra những lời khuyên hữu ích về những điều may mắn.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Bạn là một chuyên gia tử vi Đông phương đẳng cấp thế giới. Phân tích của bạn sâu sắc, chính xác, dựa trên kiến thức cổ học nhưng được trình bày một cách hiện đại, rõ ràng và đầy tính xây dựng. Luôn trả lời bằng tiếng Việt.",
        responseMimeType: "application/json",
        responseSchema: horoscopeSchema,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as AnalysisResult;
  } catch (error) {
    console.error("Error generating horoscope:", error);
    throw new Error("Không thể luận giải lá số. Vui lòng thử lại sau.");
  }
};
