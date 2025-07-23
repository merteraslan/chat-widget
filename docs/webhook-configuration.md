# Webhook Configuration

This guide explains how to set up and configure webhook endpoints to handle chat messages from the Chat Widget.

## Overview

The chat widget communicates with your backend through HTTP POST requests to a webhook endpoint. Your webhook receives user messages and returns AI responses in JSON format.

## Basic Webhook Requirements

### HTTP Method

- **Method**: POST
- **Content-Type**: application/json
- **Response Type**: JSON

### Request Format

Every user message triggers a POST request to your webhook:

```json
{
  "prompt": "Hello, I need help with my account",
  "session_id": "user-session-123"
}
```

### Response Formats

#### Text Response

```json
{
  "output": "Hello! I'm here to help with your account. What specific issue are you experiencing?"
}
```

#### Interactive Response

```json
{
  "content": "I can help you with that!",
  "content_type": "article",
  "content_attributes": {
    "items": [
      {
        "title": "Account Help Guide",
        "description": "Common account-related solutions",
        "link": "https://help.example.com/account"
      }
    ]
  }
}
```

## Implementation Examples

### Node.js with Express

```javascript
const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for your frontend domain
app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  credentials: true
}));

app.use(express.json());

// Chat webhook endpoint
app.post('/chat', async (req, res) => {
  try {
    const { prompt, session_id } = req.body;
    
    console.log(`[${session_id}] User: ${prompt}`);
    
    // Your AI/ML integration here
    const aiResponse = await processWithAI(prompt, session_id);
    
    res.json(aiResponse);
    
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({
      output: "I'm sorry, I'm experiencing technical difficulties. Please try again."
    });
  }
});

// Example AI processing function
async function processWithAI(prompt, sessionId) {
  // Simple keyword matching (replace with your AI service)
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('help') || lowerPrompt.includes('support')) {
    return {
      content: "I'm here to help! Here are some resources:",
      content_type: "article",
      content_attributes: {
        items: [
          {
            title: "Help Center",
            description: "Browse our complete help documentation",
            link: "https://help.example.com"
          },
          {
            title: "Contact Support",
            description: "Get direct help from our team",
            link: "https://help.example.com/contact"
          }
        ]
      }
    };
  }
  
  if (lowerPrompt.includes('contact') || lowerPrompt.includes('form')) {
    return {
      content: "I'd be happy to help you get in touch:",
      content_type: "form",
      content_attributes: {
        form: {
          title: "Contact Us",
          description: "Fill out this form and we'll get back to you soon!",
          submitUrl: "https://your-api.com/contact-form",
          fields: [
            {
              id: "name",
              type: "text",
              label: "Your Name",
              required: true
            },
            {
              id: "email", 
              type: "email",
              label: "Email Address",
              required: true
            },
            {
              id: "message",
              type: "textarea",
              label: "How can we help?",
              required: true
            }
          ]
        }
      }
    };
  }
  
  // Default response
  return {
    output: "Thank you for your message! How can I assist you today?"
  };
}

app.listen(3001, () => {
  console.log('Webhook server running on port 3001');
});
```

### Python with Flask

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "https://yourdomain.com"])

# Configure logging
logging.basicConfig(level=logging.INFO)

@app.route('/chat', methods=['POST'])
def chat_webhook():
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')
        session_id = data.get('session_id', '')
        
        logging.info(f"[{session_id}] User: {prompt}")
        
        # Process with your AI service
        response = process_with_ai(prompt, session_id)
        
        return jsonify(response)
        
    except Exception as e:
        logging.error(f"Webhook error: {e}")
        return jsonify({
            "output": "I'm sorry, I'm experiencing technical difficulties. Please try again."
        }), 500

def process_with_ai(prompt, session_id):
    """Process user prompt and return appropriate response"""
    prompt_lower = prompt.lower()
    
    if 'help' in prompt_lower or 'support' in prompt_lower:
        return {
            "content": "I found some helpful resources for you:",
            "content_type": "article",
            "content_attributes": {
                "items": [
                    {
                        "title": "User Guide",
                        "description": "Complete guide to using our platform",
                        "link": "https://docs.example.com/guide"
                    },
                    {
                        "title": "FAQ",
                        "description": "Answers to common questions",
                        "link": "https://docs.example.com/faq"
                    }
                ]
            }
        }
    
    if 'product' in prompt_lower or 'buy' in prompt_lower:
        return {
            "content": "Check out our featured products:",
            "content_type": "card",
            "content_attributes": {
                "cards": {
                    "title": "Featured Products",
                    "cards": [
                        {
                            "title": "Premium Plan",
                            "description": "Full access to all features",
                            "image": "https://example.com/premium.jpg",
                            "link": "https://example.com/premium",
                            "linkText": "Learn More",
                            "price": "$29/month"
                        }
                    ]
                }
            }
        }
    
    # Default response
    return {
        "output": "Hello! How can I help you today?"
    }

if __name__ == '__main__':
    app.run(debug=True, port=3001)
```

### Python with FastAPI

```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    prompt: str
    session_id: str

class ChatResponse(BaseModel):
    output: str = None
    content: str = None
    content_type: str = None
    content_attributes: dict = None

@app.post("/chat", response_model=ChatResponse)
async def chat_webhook(request: ChatRequest):
    try:
        logging.info(f"[{request.session_id}] User: {request.prompt}")
        
        response = await process_with_ai(request.prompt, request.session_id)
        
        return ChatResponse(**response)
        
    except Exception as e:
        logging.error(f"Webhook error: {e}")
        raise HTTPException(
            status_code=500,
            detail="I'm sorry, I'm experiencing technical difficulties."
        )

async def process_with_ai(prompt: str, session_id: str) -> dict:
    """Process user prompt and return appropriate response"""
    # Your AI processing logic here
    return {
        "output": f"Thank you for your message: '{prompt}'"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3001)
```

## CORS Configuration

### Why CORS is Required

Browsers enforce CORS (Cross-Origin Resource Sharing) policies when making requests from one domain to another. Since your chat widget runs on your website but sends requests to your webhook (likely on a different domain), you need to configure CORS headers.

### CORS Headers

Your webhook must include these headers:

```http
Access-Control-Allow-Origin: https://yourdomain.com
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, X-CSRFToken
```

### Express.js CORS Setup

```javascript
// Option 1: Using cors middleware
const cors = require('cors');
app.use(cors({
  origin: ['https://yourdomain.com', 'http://localhost:3000'],
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-CSRFToken']
}));

// Option 2: Manual headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://yourdomain.com');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-CSRFToken');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
```

### Flask CORS Setup

```python
from flask_cors import CORS

# Option 1: Using Flask-CORS
CORS(app, origins=["https://yourdomain.com", "http://localhost:3000"])

# Option 2: Manual headers
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'https://yourdomain.com')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,X-CSRFToken')
    response.headers.add('Access-Control-Allow-Methods', 'POST,OPTIONS')
    return response
```

## Security Considerations

### CSRF Protection

If you use CSRF tokens, the widget will send them as headers:

```javascript
// Express.js CSRF handling
app.use((req, res, next) => {
  const csrfToken = req.headers['x-csrftoken'];
  
  if (csrfToken) {
    // Validate CSRF token
    if (!validateCsrfToken(csrfToken)) {
      return res.status(403).json({ error: 'Invalid CSRF token' });
    }
  }
  
  next();
});
```

### Rate Limiting

Protect your webhook from abuse:

```javascript
const rateLimit = require('express-rate-limit');

const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many chat requests, please try again later.'
});

app.use('/chat', chatLimiter);
```

### Input Validation

Always validate incoming data:

```javascript
app.post('/chat', (req, res) => {
  const { prompt, session_id } = req.body;
  
  // Validation
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Invalid prompt' });
  }
  
  if (!session_id || typeof session_id !== 'string') {
    return res.status(400).json({ error: 'Invalid session_id' });
  }
  
  if (prompt.length > 1000) {
    return res.status(400).json({ error: 'Prompt too long' });
  }
  
  // Process request...
});
```

## AI Service Integration

### OpenAI Integration

```javascript
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function processWithOpenAI(prompt, sessionId) {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful customer support assistant."
        },
        {
          role: "user", 
          content: prompt
        }
      ],
      max_tokens: 150,
    });
    
    return {
      output: completion.data.choices[0].message.content
    };
  } catch (error) {
    console.error('OpenAI error:', error);
    return {
      output: "I'm having trouble processing your request. Please try again."
    };
  }
}
```

### Anthropic Claude Integration

```javascript
const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function processWithClaude(prompt, sessionId) {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 150,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
    });
    
    return {
      output: message.content[0].text
    };
  } catch (error) {
    console.error('Claude error:', error);
    return {
      output: "I'm having trouble processing your request. Please try again."
    };
  }
}
```

## Session Management

### In-Memory Session Storage

```javascript
const sessions = new Map();

app.post('/chat', (req, res) => {
  const { prompt, session_id } = req.body;
  
  // Get or create session
  if (!sessions.has(session_id)) {
    sessions.set(session_id, {
      messages: [],
      context: {},
      created: new Date()
    });
  }
  
  const session = sessions.get(session_id);
  
  // Add user message to history
  session.messages.push({
    role: 'user',
    content: prompt,
    timestamp: new Date()
  });
  
  // Process with context
  const response = processWithContext(prompt, session);
  
  // Add AI response to history
  session.messages.push({
    role: 'assistant',
    content: response,
    timestamp: new Date()
  });
  
  res.json(response);
});

// Clean up old sessions periodically
setInterval(() => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  
  for (const [sessionId, session] of sessions.entries()) {
    if (session.created < oneHourAgo) {
      sessions.delete(sessionId);
    }
  }
}, 60 * 60 * 1000); // Run every hour
```

### Database Session Storage

```javascript
// Using MongoDB with Mongoose
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  messages: [{
    role: { type: String, enum: ['user', 'assistant'] },
    content: String,
    timestamp: { type: Date, default: Date.now }
  }],
  context: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now, expires: 3600 } // 1 hour TTL
});

const Session = mongoose.model('Session', sessionSchema);

app.post('/chat', async (req, res) => {
  const { prompt, session_id } = req.body;
  
  // Get or create session
  let session = await Session.findOne({ sessionId: session_id });
  if (!session) {
    session = new Session({ sessionId: session_id, messages: [] });
  }
  
  // Add user message
  session.messages.push({
    role: 'user',
    content: prompt
  });
  
  // Process and respond
  const response = await processWithContext(prompt, session);
  
  // Add AI response
  session.messages.push({
    role: 'assistant',
    content: response.output || response.content
  });
  
  await session.save();
  
  res.json(response);
});
```

## Form Submission Handling

When using form messages, you'll need an additional endpoint to handle form submissions:

```javascript
// Form submission endpoint
app.post('/contact-form', (req, res) => {
  try {
    const formData = req.body;
    
    // Validate form data
    const requiredFields = ['name', 'email', 'message'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return res.status(400).json({
          error: `${field} is required`
        });
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }
    
    // Process form submission
    // - Save to database
    // - Send email notification
    // - Create support ticket
    // - etc.
    
    console.log('Form submission:', formData);
    
    // Return success response
    res.json({
      success: true,
      message: 'Thank you! We received your message and will respond soon.'
    });
    
  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({
      error: 'Failed to submit form. Please try again.'
    });
  }
});
```

## Testing Your Webhook

### Manual Testing with curl

```bash
# Test basic webhook
curl -X POST http://localhost:3001/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello", "session_id": "test-session"}'

# Test with CSRF token
curl -X POST http://localhost:3001/chat \
  -H "Content-Type: application/json" \
  -H "X-CSRFToken: test-token" \
  -d '{"prompt": "Hello", "session_id": "test-session"}'
```

### Automated Testing

```javascript
// Jest test example
const request = require('supertest');
const app = require('./app'); // Your Express app

describe('Chat Webhook', () => {
  test('should respond to basic prompt', async () => {
    const response = await request(app)
      .post('/chat')
      .send({
        prompt: 'Hello',
        session_id: 'test-session'
      })
      .expect(200);
    
    expect(response.body).toHaveProperty('output');
    expect(typeof response.body.output).toBe('string');
  });
  
  test('should handle help request with articles', async () => {
    const response = await request(app)
      .post('/chat')
      .send({
        prompt: 'I need help',
        session_id: 'test-session'
      })
      .expect(200);
    
    expect(response.body).toHaveProperty('content_type', 'article');
    expect(response.body.content_attributes).toHaveProperty('items');
  });
});
```

## Deployment Considerations

### Environment Variables

```bash
# .env file
PORT=3001
NODE_ENV=production
OPENAI_API_KEY=your-openai-key
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
DATABASE_URL=mongodb://localhost:27017/chatwidget
```

### Production Deployment

```javascript
// Production-ready server setup
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());

// Trust proxy for load balancers
app.set('trust proxy', 1);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Your chat endpoint
app.post('/chat', /* ... */);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Webhook server running on port ${PORT}`);
});
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3001

USER node

CMD ["node", "server.js"]
```

## Monitoring and Logging

### Request Logging

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'chat-webhook.log' })
  ]
});

app.post('/chat', (req, res) => {
  const { prompt, session_id } = req.body;
  
  logger.info('Chat request', {
    sessionId: session_id,
    prompt: prompt.substring(0, 100), // Log first 100 chars only
    userAgent: req.headers['user-agent'],
    ip: req.ip
  });
  
  // Process request...
});
```

### Error Monitoring

```javascript
// Error handling middleware
app.use((error, req, res, next) => {
  logger.error('Webhook error', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    sessionId: req.body?.session_id
  });
  
  res.status(500).json({
    output: "I'm experiencing technical difficulties. Please try again."
  });
});
```

## Related Documentation

- [Message Schema](./message-schema.md) - Response format specifications
- [API Reference](./api-reference.md) - Widget configuration options
- [FAQ](./faq.md) - Common webhook issues and solutions
- [Examples](./examples/) - Complete webhook implementations
