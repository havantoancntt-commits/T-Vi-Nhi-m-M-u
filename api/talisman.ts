

import { GoogleGenAI, Type } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { TalismanRequestData } from '../types';

// Schema for pre-analysis of birth date
const elementAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        mainElement: { type: Type.STRING, description: "The person's main Five Element (e.g., 'Wood', 'Mệnh Mộc')." },
        compatibleColors: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 2-3 colors compatible with the element." },
        compatibleSymbols: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 2-3 symbols/motifs compatible with the element (e.g., 'dragon', 'water patterns')." },
        zodiacProtector: { type: Type.STRING, description: "The Buddhist protector deity for the person's zodiac sign (e.g., 'Thousand-armed Avalokiteshvara for the Year of the Rat'). Vị Phật bản mệnh theo con giáp." },
        talismanStyle: { type: Type.STRING, description: "Suggest a single, creative artistic style for the talisman, e.g., 'Ancient Seal Script Style', 'Mystical Cloud Patterns', 'Sacred Geometry Mandala'." },
        keySymbol: { type: Type.STRING, description: "Suggest a single, primary, powerful symbol directly related to the wish (e.g., 'Pixiu for wealth', 'Double Happiness for love')." },
    },
    required: ["mainElement", "compatibleColors", "compatibleSymbols", "zodiacProtector", "talismanStyle", "keySymbol"],
};

interface ElementAnalysisResult {
    mainElement: string;
    compatibleColors: string[];
    compatibleSymbols: string[];
    zodiacProtector: string;
    talismanStyle: string;
    keySymbol: string;
}

// Schema for the textual content of the talisman result
const talismanTextSchema = {
    type: Type.OBJECT,
    properties: {
        blessingText: { type: Type.STRING, description: "A short, powerful blessing (around 20-30 words)." },
        explanation: { type: Type.STRING, description: "A detailed explanation of the talisman's symbolism, mentioning the main element, key symbols, colors, and the zodiac protector." },
        instructions: { type: Type.STRING, description: "A short guide on how to use the talisman (e.g., 'Save this, set as lock screen, meditate on your wish...')." },
    },
    required: ["blessingText", "explanation", "instructions"],
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    let lang = 'vi';

    try {
        const { talismanData, lang: reqLang = 'vi' } = req.body;
        lang = reqLang;
        const data = talismanData as TalismanRequestData;
        
        const API_KEY = process.env.API_KEY;
        if (!API_KEY) {
            const serverError = lang === 'en' ? "Server configuration error: Missing API_KEY." : "Lỗi cấu hình máy chủ: Thiếu API_KEY.";
            return res.status(500).json({ error: serverError });
        }
        
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        
        let analysisData: ElementAnalysisResult | null = null;
        try {
            const analysisPrompt = lang === 'en'
                ? `Based on the birth date ${data.birthDate} and the wish for "${data.wish}", provide a detailed analysis for creating a talisman. Determine the person's main Five Element, compatible colors, compatible symbols, their Zodiac Protector deity, a suitable artistic style for the talisman, and a key symbol for their wish.`
                : `Dựa vào ngày sinh ${data.birthDate} và mong muốn về "${data.wish}", hãy cung cấp một phân tích chi tiết để tạo bùa hộ mệnh. Xác định Ngũ hành bản mệnh, màu sắc và biểu tượng tương hợp, vị Phật bản mệnh theo con giáp, một phong cách nghệ thuật phù hợp cho lá bùa, và một biểu tượng chủ đạo cho mong ước.`;
            
            const analysisResponse = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: analysisPrompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: elementAnalysisSchema,
                }
            });
            analysisData = JSON.parse(analysisResponse.text.trim());
        } catch (e) {
            console.warn("Talisman pre-analysis failed. Proceeding with generic generation.", e);
            analysisData = null; // Fallback
        }

        const personalityDetails = analysisData 
            ? lang === 'en' 
                ? `The talisman should be in the '${analysisData.talismanStyle}' style. The person's destiny is linked to the ${analysisData.mainElement} element. Incorporate their auspicious colors: ${analysisData.compatibleColors.join(', ')}. The central theme should be the '${analysisData.keySymbol}' to represent their wish, protected by the divine presence of '${analysisData.zodiacProtector}'. Also include other auspicious symbols like ${analysisData.compatibleSymbols.join(', ')}.`
                : `Lá bùa nên theo phong cách '${analysisData.talismanStyle}'. Bản mệnh của họ là ${analysisData.mainElement}. Tích hợp các màu sắc tương hợp: ${analysisData.compatibleColors.join(', ')}. Chủ đề trung tâm là biểu tượng '${analysisData.keySymbol}' để đại diện cho mong ước, được bảo hộ bởi sự hiện diện thiêng liêng của '${analysisData.zodiacProtector}'. Đồng thời bao gồm các biểu tượng may mắn khác như ${analysisData.compatibleSymbols.join(', ')}.`
            : '';

        const imagePrompt = lang === 'en'
            ? `Create an extremely beautiful, exquisite, and sacred Vietnamese protective talisman (Lá Bùa Hộ Mệnh) with an ethereal glow, in a vertical 9:16 aspect ratio. The design must blend traditional spiritual art with a mystical, modern aesthetic. It is for ${data.name}, born on ${data.birthDate}, who prays for "${data.wish}". ${personalityDetails} Use rich, harmonious colors and intricate details. The final image must feel powerful, sacred, and filled with positive cosmic energy.`
            : `Tạo một lá bùa hộ mệnh Việt Nam cực kỳ đẹp, tinh xảo và linh thiêng, tỏa ra ánh sáng huyền ảo, theo tỷ lệ dọc 9:16. Thiết kế phải kết hợp nghệ thuật tâm linh truyền thống với thẩm mỹ huyền bí, hiện đại. Lá bùa này dành cho ${data.name}, sinh ngày ${data.birthDate}, cầu nguyện về "${data.wish}". ${personalityDetails} Sử dụng màu sắc phong phú, hài hòa và các chi tiết phức tạp. Hình ảnh cuối cùng phải toát lên vẻ quyền năng, thiêng liêng và tràn đầy năng lượng vũ trụ tích cực.`;
        
        const imageGenResponse = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: imagePrompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/png',
              aspectRatio: '9:16',
            },
        });
        
        const imageData = imageGenResponse.generatedImages[0]?.image?.imageBytes;
        
        if (!imageData) throw new Error(lang === 'en' ? 'Image generation failed.' : 'Tạo ảnh thất bại.');

        const textPrompt = lang === 'en'
            ? `As the AI sage Thien Giac, provide textual content for a sacred talisman created for someone praying for "${data.wish}". The talisman's design was inspired by these details: ${JSON.stringify(analysisData)}. Based on this, provide a short blessing, a detailed explanation of the symbolism, and instructions for use.`
            : `Với vai trò là AI Thiện Giác, hãy cung cấp nội dung chữ cho lá bùa hộ mệnh được tạo cho người cầu nguyện về "${data.wish}". Thiết kế của lá bùa được lấy cảm hứng từ các chi tiết sau: ${JSON.stringify(analysisData)}. Dựa trên thông tin này, hãy cung cấp một lời chúc phúc ngắn gọn, một lời giải thích chi tiết về ý nghĩa biểu tượng, và hướng dẫn sử dụng.`;

        const textResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: textPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: talismanTextSchema,
            }
        });
        
        const { blessingText, explanation, instructions } = JSON.parse(textResponse.text.trim());

        return res.status(200).json({ imageData, blessingText, explanation, instructions, mimeType: 'image/png' });

    } catch (error) {
        console.error("Error generating talisman in API:", error);
        
        const userFriendlyError = lang === 'en' 
            ? "An unexpected error occurred while crafting the talisman. The spirits may be resting. Please try again later."
            : "Đã xảy ra lỗi không mong muốn khi trì chú bùa. Có thể các vị thần linh đang nghỉ ngơi. Vui lòng thử lại sau.";
        
        if (error instanceof Error && error.message && error.message.toLowerCase().includes("billed user")) {
            console.warn("API billing issue detected. Using fallback talisman.");
            try {
                const fallbackText = lang === 'en' ? {
                    blessingText: "May peace and auspicious energy always be with you, illuminating your path.",
                    explanation: "This sacred lotus symbolizes purity, enlightenment, and rebirth. It radiates a gentle energy, bringing tranquility to the mind and attracting good fortune from the ten directions.",
                    instructions: "Save this talisman image to your device. Look at it when you need peace and focus your thoughts on your aspirations. Let its positive energy guide you.",
                } : {
                    blessingText: "Nguyện bình an và năng lượng cát tường luôn ở bên bạn, soi sáng con đường bạn đi.",
                    explanation: "Đóa sen thiêng này là biểu tượng của sự thuần khiết, giác ngộ và tái sinh. Nó tỏa ra năng lượng ôn hòa, mang lại sự tĩnh tại cho tâm hồn và thu hút phúc lành từ mười phương.",
                    instructions: "Lưu hình ảnh linh phù này vào thiết bị của bạn. Hãy nhìn vào nó mỗi khi cần sự tĩnh tâm và tập trung ý niệm vào những mong ước của mình. Hãy để năng lượng tích cực của nó dẫn lối cho bạn.",
                };
                
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
                `;
                // FIX: Replace Node.js Buffer with web-standard btoa for base64 encoding.
                const imageData = btoa(fallbackSvg.replace(/\s{2,}/g, ' ').replace(/> </g, '><'));
                
                return res.status(200).json({ imageData, ...fallbackText, mimeType: 'image/svg+xml' });
            } catch (fallbackError) {
                console.error("Error generating fallback talisman content:", fallbackError);
            }
        }
        
        return res.status(500).json({ error: userFriendlyError });
    }
}