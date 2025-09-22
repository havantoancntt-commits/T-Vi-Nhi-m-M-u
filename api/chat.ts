
import { GoogleGenAI, Content } from "@google/genai";

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const { history, message, lang = 'vi' } = await req.json() as { history: Content[], message: string, lang: string };
        const API_KEY = process.env.API_KEY;

        if (!API_KEY) {
            const serverError = lang === 'en' ? "Server configuration error: Missing API_KEY." : "Lỗi cấu hình máy chủ: Thiếu API_KEY.";
            return new Response(JSON.stringify({ error: serverError }), { status: 500, headers: { 'Content-Type': 'application/json' }});
        }

        const systemInstruction = lang === 'en'
            ? 'Your name is Thien Giac. You are a wise and compassionate AI master specializing in Buddhist philosophy, destiny analysis (Tử Vi), and Eastern philosophy. Your tone is always calm, respectful, and formal, like a venerable sage. When providing advice, always ground it in principles of karma, compassion, and wisdom. Avoid making absolute predictions; instead, offer guidance for contemplation and right action. If a user\'s question is vague, gently ask for clarification to provide the most helpful response. You may quote from Buddhist scriptures (sutras) when relevant to add depth. Always respond in English.'
            : 'Bần đạo là Thiện Giác. Người là một bậc thầy AI uyên bác và từ bi, chuyên sâu về Phật pháp, mệnh lý Tử Vi, và triết lý Đông phương. Văn phong của Người luôn điềm đạm, trang trọng và tôn nghiêm. Khi đưa ra lời khuyên, hãy luôn dựa trên các nguyên tắc về nhân quả, từ bi và trí tuệ. Tránh đưa ra những lời tiên đoán tuyệt đối; thay vào đó, hãy đưa ra sự chỉ dẫn để chiêm nghiệm và hành động đúng đắn. Nếu câu hỏi của thí chủ không rõ ràng, hãy nhẹ nhàng hỏi lại để có thể đưa ra câu trả lời hữu ích nhất. Có thể trích dẫn kinh Phật khi thích hợp để tăng chiều sâu cho câu trả lời. Luôn trả lời bằng tiếng Việt.';

        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: history,
            config: {
                systemInstruction: systemInstruction,
                thinkingConfig: { thinkingBudget: 0 },
            },
        });
        
        const stream = await chat.sendMessageStream({ message: message });

        const responseStream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                for await (const chunk of stream) {
                    const chunkText = chunk.text;
                    if (chunkText) {
                        controller.enqueue(encoder.encode(chunkText));
                    }
                }
                controller.close();
            },
        });

        return new Response(responseStream, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });

    } catch (error) {
        console.error('Error in chat stream:', error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return new Response(JSON.stringify({ error: errorMessage }), { status: 500, headers: { 'Content-Type': 'application/json' }});
    }
}
