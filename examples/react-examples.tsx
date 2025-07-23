import React from 'react';
import { ChatWidget } from '@merteraslan/chat-widget';

// Secure session ID generation utility
// This function addresses CodeQL security warning js/insecure-randomness
// by using cryptographically secure random number generation instead of Math.random()
const generateSecureSessionId = (): string => {
  // Primary method: Use crypto.randomUUID (recommended, provides 122 bits of entropy)
  // Available in modern browsers (Chrome 92+, Firefox 95+, Safari 15.4+)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `session_${crypto.randomUUID()}`;
  }
  
  // Fallback method: Use crypto.getRandomValues for older browsers
  // Generates 128 bits of entropy (exceeds OWASP minimum requirement of 64 bits)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    // Generate 128 bits of entropy (16 bytes) for strong security
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    
    // Convert to base64url encoding for URL-safe session ID
    const base64 = btoa(String.fromCharCode(...array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    
    return `session_${Date.now()}_${base64}`;
  }
  
  // Last resort fallback for very old environments (still better than Math.random)
  // This should not happen in modern web environments that support Web Crypto API
  console.warn('Crypto API not available, using timestamp-based fallback');
  return `session_${Date.now()}_${performance.now()}`;
};

// Basic usage example
export const BasicExample: React.FC = () => {
  return (
    <div>
      <h1>My Application</h1>
      <p>This is my main application content.</p>
      
      <ChatWidget
        webhookUrl="https://api.example.com/chat"
        title="Customer Support"
        initialMessage="Hi! How can I help you today?"
        color="#2563eb"
        agentName="Support Assistant"
      />
    </div>
  );
};

// Advanced usage with session management
export const AdvancedExample: React.FC = () => {
  const [sessionId, setSessionId] = React.useState<string>(() => {
    // Generate cryptographically secure session ID
    return generateSecureSessionId();
  });

  const handleCustomWebhook = async (data: { prompt: string; session_id: string }) => {
    // Custom webhook handling logic
    console.log('Sending to webhook:', data);
    
    // Example API call
    const response = await fetch('https://api.example.com/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-token',
      },
      body: JSON.stringify(data),
    });
    
    return response.json();
  };

  return (
    <div>
      <h1>Advanced Chat Widget</h1>
      <p>Session ID: {sessionId}</p>
      
      <ChatWidget
        webhookUrl="https://api.example.com/chat"
        title="AI Assistant"
        initialMessage="Welcome! I'm here to help with your questions."
        sessionId={sessionId}
        color="#059669"
        agentName="AI Helper"
        csrfToken="your-csrf-token"
      />
    </div>
  );
};

// Integration with Make.com
export const MakeIntegrationExample: React.FC = () => {
  return (
    <div>
      <h1>Make.com Integration</h1>
      <p>This example shows how to integrate with Make.com webhooks.</p>
      
      <ChatWidget
        webhookUrl="https://hook.make.com/your-webhook-id"
        title="Make.com Assistant"
        initialMessage="Connected to Make.com automation!"
        color="#6366f1"
        agentName="Automation Bot"
      />
    </div>
  );
};

// Integration with Zapier
export const ZapierIntegrationExample: React.FC = () => {
  return (
    <div>
      <h1>Zapier Integration</h1>
      <p>This example shows how to integrate with Zapier webhooks.</p>
      
      <ChatWidget
        webhookUrl="https://hooks.zapier.com/hooks/catch/your-webhook-id"
        title="Zapier Assistant"
        initialMessage="Connected to Zapier workflows!"
        color="#ff6900"
        agentName="Workflow Bot"
      />
    </div>
  );
};

// Integration with n8n
export const N8nIntegrationExample: React.FC = () => {
  return (
    <div>
      <h1>n8n Integration</h1>
      <p>This example shows how to integrate with n8n workflows.</p>
      
      <ChatWidget
        webhookUrl="https://your-n8n-instance.com/webhook/your-webhook-id"
        title="n8n Assistant"
        initialMessage="Connected to n8n workflow automation!"
        color="#ea4b4b"
        agentName="Workflow Assistant"
      />
    </div>
  );
};

export default {
  BasicExample,
  AdvancedExample,
  MakeIntegrationExample,
  ZapierIntegrationExample,
  N8nIntegrationExample,
};
