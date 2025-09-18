import { GoogleGenAI, Content } from "@google/genai";

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const { history, message } = await req.json() as { history: Content[], message: string };
        const API_KEY = process.env.API_KEY;

        if (!API_KEY) {
            return new Response(JSON.stringify({ error: "Lỗi cấu hình máy chủ: Thiếu API_KEY." }), { status: 500, headers: { 'Content-Type': 'application/json' }});
        }

        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: history,
            config: {
                systemInstruction: 'Bạn là một trợ lý AI uyên bác tên là Thiện Giác, chuyên về Phật pháp, mệnh lý và triết lý Đông phương. Hãy trả lời các câu hỏi một cách từ bi, sâu sắc, uyên bác và hữu ích. Luôn trả lời bằng tiếng Việt với văn phong trang trọng, tôn nghiêm.',
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
        const errorMessage = error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định";
        return new Response(JSON.stringify({ error: errorMessage }), { status: 500, headers: { 'Content-Type': 'application/json' }});
    }
}
