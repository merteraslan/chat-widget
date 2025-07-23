// Next.js App Router example (app/page.tsx)
'use client';

import React from 'react';
import { ChatWidget } from '@merteraslan/chat-widget';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to My Next.js App</h1>
      <p>This page demonstrates chat widget integration with Next.js App Router.</p>
      
      <ChatWidget
        webhookUrl="/api/chat" // Using Next.js API route
        title="Next.js Assistant"
        initialMessage="Hello! I'm integrated with Next.js."
        color="#000000"
        agentName="Next.js Bot"
      />
    </div>
  );
}
