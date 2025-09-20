
import { GoogleGenAI } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { TalismanRequestData } from '../types';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    let lang = 'vi';
    // Declare ai outside the try block to make it available in the catch block for fallback.
    let ai: GoogleGenAI;

    try {
        const { talismanData, lang: reqLang = 'vi' } = req.body;
        lang = reqLang;
        const data = talismanData as TalismanRequestData;
        
        const API_KEY = process.env.API_KEY;

        if (!API_KEY) {
            const serverError = lang === 'en' ? "Server configuration error: Missing API_KEY." : "Lỗi cấu hình máy chủ: Thiếu API_KEY.";
            console.error("API_KEY environment variable not set on server.");
            return res.status(500).json({ error: serverError });
        }
        
        ai = new GoogleGenAI({ apiKey: API_KEY });
        
        // --- Step 1: Generate Image ---
        const imagePrompt = lang === 'en'
            ? `Create a sacred and powerful Vietnamese protective talisman (Lá Bùa Hộ Mệnh) in a vertical 9:16 aspect ratio. The design must be extremely beautiful, exquisite, and luxurious, blending traditional Buddhist/Taoist spiritual art with a modern, mystical aesthetic. Incorporate intricate patterns, sacred geometry, flowing calligraphy, and auspicious symbols like lotus flowers, dharma wheels, or celestial clouds. The color palette should be rich and harmonious, using tones of gold, deep red, royal blue, and ethereal light. This talisman is for a person named ${data.name}, born on ${data.birthDate}. Their sincere prayer is for "${data.wish}". The main calligraphy should reflect the spirit of this wish. The entire image should feel powerful, sacred, and filled with positive energy.`
            : `Tạo một lá bùa hộ mệnh Việt Nam linh thiêng và quyền năng, định dạng dọc tỷ lệ 9:16. Thiết kế phải cực kỳ đẹp, tinh xảo, sang trọng, pha trộn giữa nghệ thuật tâm linh Phật giáo/Đạo giáo truyền thống và thẩm mỹ huyền bí hiện đại. Kết hợp các hoa văn phức tạp, hình học thiêng liêng, thư pháp bay bổng, và các biểu tượng may mắn như hoa sen, bánh xe pháp, mây lành. Bảng màu phải phong phú, hài hòa, sử dụng các tông màu vàng kim, đỏ sậm, xanh hoàng gia và ánh sáng thanh tao. Lá bùa này dành cho thân chủ ${data.name}, sinh ngày ${data.birthDate}. Lời cầu nguyện thành tâm của họ là "${data.wish}". Phần thư pháp chính cần thể hiện tinh thần của điều ước này. Toàn bộ hình ảnh phải toát lên vẻ quyền năng, linh thiêng và tràn đầy năng lượng tích cực.`;
        
        const imageResponse = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: imagePrompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: '9:16',
            },
        });

        const imageData = imageResponse.generatedImages?.[0]?.image?.imageBytes;

        if (!imageData) {
            throw new Error(lang === 'en' ? 'Image generation failed. No image data was returned from the service.' : 'Tạo ảnh thất bại. Không nhận được dữ liệu hình ảnh từ dịch vụ.');
        }

        // --- Step 2: Generate Blessing Text ---
        const blessingPrompt = lang === 'en'
            ? `As the AI sage Thien Giac, write a short, powerful blessing to accompany a sacred talisman created for someone wishing for "${data.wish}". The blessing should be comforting and empowering. Keep the text concise (around 20-30 words) and meaningful.`
            : `Với vai trò là AI Thiện Giác, hãy viết một lời chúc phúc ngắn gọn, súc tích nhưng đầy năng lượng để đi kèm với một lá bùa hộ mệnh linh thiêng được tạo ra cho người có ước nguyện về "${data.wish}". Lời chúc phúc cần an yên và mạnh mẽ. Giữ lời chúc thật cô đọng (khoảng 20-30 từ) và ý nghĩa.`;

        const textResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: blessingPrompt,
            config: {
                thinkingConfig: { thinkingBudget: 0 },
            }
        });
        
        const blessingText = textResponse.text.trim();

        return res.status(200).json({ imageData, blessingText });

    } catch (error) {
        console.error("Error generating talisman in API:", error);
        
        // Fallback for specific billing error
        if (ai && error instanceof Error && error.message && error.message.includes("Imagen API is only accessible to billed users")) {
            console.warn("Imagen API billing issue detected. Using fallback talisman.");
            try {
                // Generate a generic blessing text as fallback
                const blessingPrompt = lang === 'en'
                    ? `As the AI sage Thien Giac, write a short, powerful, and generic blessing of peace and good fortune.`
                    : `Với vai trò là AI Thiện Giác, hãy viết một lời chúc phúc ngắn gọn, mạnh mẽ, và chung chung về bình an và may mắn.`;

                const textResponse = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: blessingPrompt,
                    config: {
                        thinkingConfig: { thinkingBudget: 0 },
                    }
                });
                const blessingText = textResponse.text.trim();

                // Create a beautiful fallback SVG image
                const fallbackSvg = `
                    <svg width="900" height="1600" viewBox="0 0 900 1600" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                <stop offset="0%" style="stop-color:rgb(76, 29, 149);stop-opacity:1" />
                                <stop offset="100%" style="stop-color:rgb(12, 10, 29);stop-opacity:1" />
                            </radialGradient>
                            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#FCD34D;" />
                                <stop offset="100%" style="stop-color:#FBBF24;" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="20" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        <rect width="900" height="1600" fill="url(#grad1)" />
                        <g transform="translate(450, 800) scale(1.2)" filter="url(#glow)">
                            <path d="M 0 -250 C 80 -250, 120 -80, 0 0 C -120 -80, -80 -250, 0 -250 Z" fill="url(#goldGrad)" opacity="0.8" transform="rotate(0)"/>
                            <path d="M 0 -250 C 80 -250, 120 -80, 0 0 C -120 -80, -80 -250, 0 -250 Z" fill="url(#goldGrad)" opacity="0.8" transform="rotate(45)"/>
                            <path d="M 0 -250 C 80 -250, 120 -80, 0 0 C -120 -80, -80 -250, 0 -250 Z" fill="url(#goldGrad)" opacity="0.8" transform="rotate(90)"/>
                            <path d="M 0 -250 C 80 -250, 120 -80, 0 0 C -120 -80, -80 -250, 0 -250 Z" fill="url(#goldGrad)" opacity="0.8" transform="rotate(135)"/>
                            <path d="M 0 -250 C 80 -250, 120 -80, 0 0 C -120 -80, -80 -250, 0 -250 Z" fill="url(#goldGrad)" opacity="0.8" transform="rotate(180)"/>
                            <path d="M 0 -250 C 80 -250, 120 -80, 0 0 C -120 -80, -80 -250, 0 -250 Z" fill="url(#goldGrad)" opacity="0.8" transform="rotate(225)"/>
                            <path d="M 0 -250 C 80 -250, 120 -80, 0 0 C -120 -80, -80 -250, 0 -250 Z" fill="url(#goldGrad)" opacity="0.8" transform="rotate(270)"/>
                            <path d="M 0 -250 C 80 -250, 120 -80, 0 0 C -120 -80, -80 -250, 0 -250 Z" fill="url(#goldGrad)" opacity="0.8" transform="rotate(315)"/>
                            <circle cx="0" cy="0" r="70" fill="url(#goldGrad)" />
                        </g>
                        <text x="50%" y="90%" font-family="Cormorant Garamond, serif" font-size="60" fill="rgba(255,255,255,0.7)" text-anchor="middle">Huyền Phong Phật Đạo</text>
                    </svg>
                `.replace(/\s{2,}/g, ' ').replace(/> </g, '><');

                // Convert SVG to base64
                const imageData = Buffer.from(fallbackSvg).toString('base64');
                
                return res.status(200).json({ imageData, blessingText });
            } catch (fallbackError) {
                console.error("Error generating fallback talisman content:", fallbackError);
                // If the text generation fallback also fails, return a generic error.
            }
        }

        // Generic error handling for all other cases
        const userFriendlyError = lang === 'en' 
            ? "An unexpected error occurred while crafting the talisman. The spirits may be resting. Please try again later."
            : "Đã xảy ra lỗi không mong muốn khi trì chú bùa. Có thể các vị thần linh đang nghỉ ngơi. Vui lòng thử lại sau.";
        
        return res.status(500).json({ error: userFriendlyError });
    }
}
