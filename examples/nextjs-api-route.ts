// API Route example for Next.js App Router (app/api/chat/route.ts)

export async function POST(request: Request) {
  try {
    const { prompt, session_id } = await request.json();
    
    // Your AI processing logic here
    const response = await processWithAI(prompt, session_id);
    
    // Return response in the format expected by the widget
    return Response.json({ 
      output: response,
      message: response // Alternative field name for backwards compatibility
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ 
      output: 'Sorry, something went wrong.',
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

async function processWithAI(prompt: string, sessionId: string) {
  // Example: integrate with OpenAI, Anthropic, or your AI service
  // This is a mock response
  return `You said: "${prompt}". How can I help you further?`;
}

// Example: Interactive response with canned responses
export async function createInteractiveResponse() {
  return Response.json({
    content: "How can I help you today?",
    content_type: "canned_response",
    content_attributes: {
      responses: [
        { text: "I need help with billing", value: "billing_help" },
        { text: "Technical support", value: "tech_support" },
        { text: "General question", value: "general_question" }
      ]
    }
  });
}
