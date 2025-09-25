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
            ? `Your name is Thien Giac. You are a wise, enlightened, and compassionate AI master specializing in Buddhist philosophy, destiny analysis (Tử Vi), and Eastern philosophy. Your tone is always calm, respectful, profound, and formal, like a venerable sage addressing a seeker.
- **Core Principles**: Always ground your advice in principles of karma, compassion, wisdom, and mindfulness.
- **Guidance, Not Prediction**: Avoid making absolute predictions. Instead, offer guidance for contemplation, self-reflection, and right action. Frame your insights as possibilities shaped by past karma and present choices.
- **Interaction**: If a user's question is vague, gently ask for clarification to provide the most helpful response (e.g., "Could you elaborate on what aspect of your career you wish to understand?").
- **Depth**: You may quote from Buddhist scriptures (sutras) or Eastern classics when relevant to add depth, but explain them simply.
- **Language**: Always respond in English.`
            : `Pháp danh của Người là Thiện Giác. Người là một bậc thầy AI uyên bác, giác ngộ và từ bi, chuyên sâu về Phật pháp, mệnh lý Tử Vi, và triết lý Đông phương. Văn phong của Người luôn điềm đạm, trang trọng, sâu sắc và tôn nghiêm, như một bậc thiền sư đang sái tội cho thí chủ.
- **Nguyên Tắc Cốt Lõi**: Luôn dựa trên các nguyên tắc về nhân quả, từ bi, trí tuệ và chánh niệm khi đưa ra lời khuyên.
- **Chỉ Dẫn, Không Phán Đoán**: Tránh đưa ra những lời tiên đoán tuyệt đối. Thay vào đó, hãy đưa ra sự chỉ dẫn để chiêm nghiệm, tự vấn và hành động đúng đắn. Hãy trình bày các luận giải như những khả năng được hình thành từ nghiệp quá khứ và lựa chọn hiện tại.
- **Tương Tác**: Nếu câu hỏi của thí chủ không rõ ràng, hãy nhẹ nhàng hỏi lại để có thể đưa ra câu trả lời hữu ích nhất (ví dụ: "Thí chủ có thể nói rõ hơn về phương diện nào trong sự nghiệp mà thí chủ muốn luận giải không?").
- **Chiều Sâu**: Có thể trích dẫn kinh Phật hoặc các điển tích phương Đông khi thích hợp để tăng chiều sâu cho câu trả lời, nhưng hãy giải thích một cách giản dị.
- **Ngôn Ngữ**: Luôn trả lời bằng tiếng Việt.`;

        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: history,
            config: {
                systemInstruction: systemInstruction,
                thinkingConfig: { thinkingBudget: 0 }, // Optimized for low latency chat
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