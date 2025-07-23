# Article Messages

Article messages allow you to display a list of clickable articles, documentation links, or knowledge base resources. They're perfect for providing users with relevant information and guiding them to helpful resources.

## Use Cases

- **Knowledge Base**: Surface relevant articles based on user queries
- **Help Documentation**: Provide links to specific help topics
- **API Documentation**: Share links to relevant API endpoints
- **Tutorial Guides**: Offer step-by-step guides and tutorials
- **Product Information**: Link to product pages and specifications

## Message Format

### Basic Structure

```json
{
  "content": "Header text for the article collection",
  "content_type": "article", 
  "content_attributes": {
    "items": [
      {
        "title": "Article title",
        "description": "Brief description of the article",
        "link": "https://example.com/article-url"
      }
    ]
  }
}
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `content` | string | Header text displayed above the articles |
| `content_type` | string | Must be `"article"` |
| `content_attributes.items` | array | Array of article objects |
| `items[].title` | string | Article title |
| `items[].description` | string | Article description |
| `items[].link` | string | URL to the article |

## Examples

### Simple Help Articles

```json
{
  "content": "Here are some helpful resources:",
  "content_type": "article",
  "content_attributes": {
    "items": [
      {
        "title": "Getting Started Guide",
        "description": "Learn the basics of our platform in 5 minutes",
        "link": "https://docs.example.com/getting-started"
      },
      {
        "title": "Account Setup",
        "description": "Step-by-step instructions for setting up your account",
        "link": "https://docs.example.com/account-setup"
      },
      {
        "title": "Troubleshooting Common Issues",
        "description": "Solutions to frequently encountered problems",
        "link": "https://docs.example.com/troubleshooting"
      }
    ]
  }
}
```

### API Documentation Links

```json
{
  "content": "Relevant API documentation:",
  "content_type": "article",
  "content_attributes": {
    "items": [
      {
        "title": "Authentication API",
        "description": "Learn how to authenticate your API requests",
        "link": "https://api.example.com/docs/authentication"
      },
      {
        "title": "User Management API",
        "description": "Create, update, and manage user accounts",
        "link": "https://api.example.com/docs/users"
      },
      {
        "title": "Webhooks Guide",
        "description": "Set up and configure webhook endpoints",
        "link": "https://api.example.com/docs/webhooks"
      }
    ]
  }
}
```

### Product Support Articles

```json
{
  "content": "I found these articles that might help:",
  "content_type": "article", 
  "content_attributes": {
    "items": [
      {
        "title": "How to Reset Your Password",
        "description": "Simple steps to regain access to your account",
        "link": "https://support.example.com/password-reset"
      },
      {
        "title": "Billing and Subscription FAQ",
        "description": "Common questions about billing and subscriptions",
        "link": "https://support.example.com/billing-faq"
      },
      {
        "title": "Contact Our Support Team",
        "description": "Get direct help from our customer support experts",
        "link": "https://support.example.com/contact"
      }
    ]
  }
}
```

## Backend Implementation

### Node.js Example

```javascript
app.post('/chat', (req, res) => {
  const { prompt } = req.body;
  
  // Simple keyword matching for demo
  if (prompt.toLowerCase().includes('help') || prompt.toLowerCase().includes('documentation')) {
    res.json({
      content: "I found some helpful resources for you:",
      content_type: "article",
      content_attributes: {
        items: [
          {
            title: "User Guide",
            description: "Complete guide to using our platform",
            link: "https://docs.example.com/user-guide"
          },
          {
            title: "Video Tutorials", 
            description: "Step-by-step video walkthroughs",
            link: "https://docs.example.com/tutorials"
          },
          {
            title: "FAQ",
            description: "Answers to frequently asked questions",
            link: "https://docs.example.com/faq"
          }
        ]
      }
    });
  }
  // ... other response logic
});
```

### Python Flask Example

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    prompt = data.get('prompt', '').lower()
    
    if 'help' in prompt or 'documentation' in prompt:
        return jsonify({
            "content": "Here are some resources that might help:",
            "content_type": "article",
            "content_attributes": {
                "items": [
                    {
                        "title": "Getting Started",
                        "description": "New to our platform? Start here!",
                        "link": "https://docs.example.com/getting-started"
                    },
                    {
                        "title": "Best Practices", 
                        "description": "Tips and tricks for optimal usage",
                        "link": "https://docs.example.com/best-practices"
                    },
                    {
                        "title": "Support Center",
                        "description": "Browse our complete help center",
                        "link": "https://support.example.com"
                    }
                ]
            }
        })
    
    # Default response
    return jsonify({"output": "How can I help you today?"})
```

## User Experience

### Visual Appearance

Article messages are rendered as:

- A header with the `content` text
- A list of article cards
- Each card shows:
  - Article title (clickable)
  - Description text
  - A "Read more" or "View article" link button
- Hover effects and responsive design
- Mobile-optimized layout

### Interaction Behavior

- Clicking an article title or button opens the link in a new tab
- Links are properly accessible with keyboard navigation
- Screen readers announce the articles appropriately
- Mobile users can tap to open articles

## Best Practices

### Content Guidelines

1. **Keep titles concise** - Aim for 5-8 words maximum
2. **Write descriptive descriptions** - Help users understand what they'll find
3. **Use action-oriented language** - "Learn how to...", "Get started with..."
4. **Prioritize most relevant articles** - Put the most helpful content first

### Technical Recommendations

1. **Limit to 3-5 articles** - Too many options can overwhelm users
2. **Ensure links are valid** - Test all URLs before sending
3. **Use HTTPS URLs** - For security and compatibility
4. **Consider mobile users** - Ensure linked content is mobile-friendly

### SEO and Analytics

1. **Add UTM parameters** to track article engagement:

```json
{
  "title": "Getting Started Guide",
  "description": "Learn the basics of our platform",
  "link": "https://docs.example.com/getting-started?utm_source=chatbot&utm_medium=article_message"
}
```

2. **Track click-through rates** to optimize article selection
3. **Monitor which articles are most helpful** to improve recommendations

## Error Handling

### Missing Required Fields

If required fields are missing, the widget will display an error message. Ensure all required fields are present:

```json
// ❌ Missing required fields
{
  "content": "Here are some articles:",
  "content_type": "article",
  "content_attributes": {
    "items": [
      {
        "title": "Article Title"
        // Missing description and link
      }
    ]
  }
}

// ✅ All required fields present
{
  "content": "Here are some articles:",
  "content_type": "article", 
  "content_attributes": {
    "items": [
      {
        "title": "Article Title",
        "description": "Article description",
        "link": "https://example.com/article"
      }
    ]
  }
}
```

### Invalid URLs

The widget validates URLs and will show an error for invalid links:

```json
// ❌ Invalid URL
{
  "link": "not-a-valid-url"
}

// ✅ Valid URL
{
  "link": "https://docs.example.com/guide"
}
```

## Advanced Features

### Dynamic Article Selection

Use AI or logic to select relevant articles based on user context:

```javascript
function selectRelevantArticles(userPrompt, userHistory) {
  const articles = {
    billing: [
      {
        title: "Understanding Your Bill",
        description: "Breakdown of charges and fees",
        link: "https://support.example.com/billing-breakdown"
      }
    ],
    technical: [
      {
        title: "API Troubleshooting",
        description: "Common API integration issues",
        link: "https://docs.example.com/api-troubleshooting"
      }
    ],
    general: [
      {
        title: "Getting Started",
        description: "New user onboarding guide", 
        link: "https://docs.example.com/getting-started"
      }
    ]
  };
  
  // Simple keyword matching (replace with ML/AI)
  if (userPrompt.includes('billing') || userPrompt.includes('payment')) {
    return articles.billing;
  } else if (userPrompt.includes('api') || userPrompt.includes('integration')) {
    return articles.technical;
  }
  
  return articles.general;
}
```

### Personalized Recommendations

Customize articles based on user data:

```javascript
function getPersonalizedArticles(userId, userTier) {
  const baseArticles = [
    {
      title: "User Guide",
      description: "Complete platform documentation",
      link: "https://docs.example.com/user-guide"
    }
  ];
  
  // Add tier-specific articles
  if (userTier === 'premium') {
    baseArticles.push({
      title: "Premium Features Guide",
      description: "Advanced features for premium users",
      link: "https://docs.example.com/premium-features"
    });
  }
  
  return baseArticles;
}
```

## Integration with Other Message Types

Article messages work well in combination with other interactive message types:

### Follow-up with Forms

```javascript
// First, show articles
const articlesResponse = {
  content: "Here are some helpful resources:",
  content_type: "article",
  content_attributes: { /* articles */ }
};

// Then offer a contact form if articles don't help
const followUpResponse = {
  content: "Didn't find what you were looking for? Contact us directly:",
  content_type: "form", 
  content_attributes: { /* contact form */ }
};
```

### Combine with Quick Replies

```javascript
// Offer category selection first
const quickReplyResponse = {
  content: "What type of help do you need?",
  content_type: "canned_response",
  content_attributes: {
    responses: {
      responses: [
        { id: "billing", text: "Billing Questions" },
        { id: "technical", text: "Technical Support" },
        { id: "general", text: "General Information" }
      ]
    }
  }
};

// Then show relevant articles based on selection
```

## Testing Article Messages

Use the demo page to test your article messages:

1. Update the webhook URL in `demo-interactive.html`
2. Send a test message that triggers article responses
3. Verify all links work correctly
4. Test on mobile devices
5. Check accessibility with screen readers

## Related Documentation

- [Message Schema](../message-schema.md) - Complete JSON schemas
- [Form Messages](./forms.md) - Interactive data collection
- [Card Messages](./cards.md) - Rich visual content
- [Quick Replies](./quick-replies.md) - Canned response buttons
