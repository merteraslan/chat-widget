// API Route example for Next.js App Router (app/api/chat/route.ts)

export async function POST(request: Request) {
  try {
    const { prompt, session_id } = await request.json();
    
    // Your AI processing logic here
    const response = await processWithAI(prompt, session_id);
    
    return Response.json({ output: response });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function processWithAI(prompt: string, sessionId: string) {
  // Example: integrate with OpenAI, Anthropic, or your AI service
  // This is a mock response
  return `You said: "${prompt}". How can I help you further?`;
}
