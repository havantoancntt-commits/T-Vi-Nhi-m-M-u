
import { GoogleGenAI, Modality } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { TalismanRequestData } from '../types';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { talismanData, lang = 'vi' } = req.body;
        const data = talismanData as TalismanRequestData;
        
        const API_KEY = process.env.API_KEY;

        if (!API_KEY) {
            const serverError = lang === 'en' ? "Server configuration error: Missing API_KEY." : "Lỗi cấu hình máy chủ: Thiếu API_KEY.";
            console.error("API_KEY environment variable not set on server.");
            return res.status(500).json({ error: serverError });
        }
        
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        
        const imagePrompt = lang === 'en'
            ? `Create a sacred and powerful Vietnamese protective talisman (Lá Bùa Hộ Mệnh) in a vertical 9:16 aspect ratio. The design must be extremely beautiful, exquisite, and luxurious, blending traditional Buddhist/Taoist spiritual art with a modern, mystical aesthetic. Incorporate intricate patterns, sacred geometry, flowing calligraphy, and auspicious symbols like lotus flowers, dharma wheels, or celestial clouds. The color palette should be rich and harmonious, using tones of gold, deep red, royal blue, and ethereal light. This talisman is for a person named ${data.name}, born on ${data.birthDate}. Their sincere prayer is for "${data.wish}". The main calligraphy should reflect the spirit of this wish. The entire image should feel powerful, sacred, and filled with positive energy.`
            : `Tạo một lá bùa hộ mệnh Việt Nam linh thiêng và quyền năng, định dạng dọc tỷ lệ 9:16. Thiết kế phải cực kỳ đẹp, tinh xảo, sang trọng, pha trộn giữa nghệ thuật tâm linh Phật giáo/Đạo giáo truyền thống và thẩm mỹ huyền bí hiện đại. Kết hợp các hoa văn phức tạp, hình học thiêng liêng, thư pháp bay bổng, và các biểu tượng may mắn như hoa sen, bánh xe pháp, mây lành. Bảng màu phải phong phú, hài hòa, sử dụng các tông màu vàng kim, đỏ sậm, xanh hoàng gia và ánh sáng thanh tao. Lá bùa này dành cho thân chủ ${data.name}, sinh ngày ${data.birthDate}. Lời cầu nguyện thành tâm của họ là "${data.wish}". Phần thư pháp chính cần thể hiện tinh thần của điều ước này. Toàn bộ hình ảnh phải toát lên vẻ quyền năng, linh thiêng và tràn đầy năng lượng tích cực.`;
        
        const blessingPrompt = lang === 'en'
            ? `As the AI sage Thien Giac, write a short, powerful blessing to accompany the talisman you are creating. The blessing should be comforting and empowering, related to the user's wish for "${data.wish}". Keep the text concise and meaningful.`
            : `Với vai trò là AI Thiện Giác, hãy viết một lời chúc phúc ngắn gọn, súc tích nhưng đầy năng lượng để đi kèm với lá bùa này. Lời chúc phúc cần an yên và mạnh mẽ, liên quan đến ước nguyện về "${data.wish}" của họ. Giữ lời chúc thật cô đọng và ý nghĩa.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                   { text: `${imagePrompt}\n\n---\n\n${blessingPrompt}` }
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        let imageData = '';
        let blessingText = lang === 'en' 
            ? 'May this talisman protect and guide you on your path.' 
            : 'Nguyện cho lá bùa này che chở và dẫn lối cho bạn trên mọi nẻo đường.';

        if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData && part.inlineData.data) {
                    imageData = part.inlineData.data;
                } else if (part.text) {
                    blessingText = part.text;
                }
            }
        }

        if (!imageData) {
            throw new Error(lang === 'en' ? 'Image generation failed. No image data was returned from the service.' : 'Tạo ảnh thất bại. Không nhận được dữ liệu hình ảnh từ dịch vụ.');
        }

        return res.status(200).json({ imageData, blessingText });

    } catch (error) {
        console.error("Error generating talisman in API:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown server error occurred.";
        return res.status(500).json({ error: errorMessage });
    }
}
