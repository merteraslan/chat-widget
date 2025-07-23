// API Route example for Next.js App Router (app/api/chat/route.ts)

export async function POST(request: Request) {
  try {
    const { prompt, session_id } = await request.json();
    
    // Your AI processing logic here
    const response = await processWithAI(prompt, session_id);
    
    // Return simple text response
    return Response.json({ 
      output: response
    });
    
    // Or return interactive content:
    // return Response.json({
    //   content: "Choose an option:",
    //   content_type: "canned_response", 
    //   content_attributes: {
    //     responses: {
    //       responses: [
    //         { id: "help", text: "I need help", value: "help_request" },
    //         { id: "info", text: "More info", value: "more_info" }
    //       ]
    //     }
    //   }
    // });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ 
      output: 'Sorry, something went wrong.'
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
      responses: {
        responses: [
          { id: "billing", text: "I need help with billing", value: "billing_help" },
          { id: "tech", text: "Technical support", value: "tech_support" },
          { id: "general", text: "General question", value: "general_question" }
        ]
      }
    }
  });
}
