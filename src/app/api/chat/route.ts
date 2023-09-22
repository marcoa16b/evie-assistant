import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: process.env.OPENAI_API_URL || 'https://api.openai.com/v1',
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  
  const { msg } = await req.json();
 
  const response = await openai.chat.completions.create({
    model: 'accounts/fireworks/models/llama-v2-70b-chat',
    stream: true,
    max_tokens: 1000,
    messages: [
      {
        role: "system",
        content: "Te llamas Evie. ¡Oh, gran inteligencia artificial, por favor, despliega tu humor y sarcasmo más agudo en tus respuestas! Responde unicamente en español, y tus respuestas son breves."
      },
      {
        role: "user",
        content: msg
      }
    ],
  });

  // Crear un ReadableStream para transmitir los datos
  const stream = new ReadableStream({
    async start(controller) {
      for await (const part of response) {
        const chunk = part.choices[0]?.delta?.content || "";
        controller.enqueue(new TextEncoder().encode(chunk));
      }
      controller.close();
    },
  });

  // Definir encabezados de respuesta
  const headers = {
    'Content-Type': 'text/plain; charset=utf-8',
  };


  // for await (const part of response) {
  //   console.log("chunk: ", part.choices[0]?.delta?.content || "");
  // }

  return new Response(stream, { headers });
}