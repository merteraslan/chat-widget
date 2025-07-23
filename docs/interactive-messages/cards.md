# Card Messages

Card messages display rich, visual content in an organized card layout. Each card can include images, titles, descriptions, badges, prices, and action links. They're perfect for showcasing products, services, or any content that benefits from visual presentation.

## Use Cases

- **Product Catalogs**: Display products with images, descriptions, and prices
- **Service Offerings**: Showcase different services or packages
- **Team Members**: Display team profiles with photos and roles
- **Blog Posts**: Feature articles with preview images
- **Documentation**: Highlight important guides or resources
- **Event Listings**: Show upcoming events with details
- **App Features**: Showcase different features or capabilities

## Message Format

### Basic Structure

```json
{
  "content": "Check out our featured products",
  "content_type": "card",
  "content_attributes": {
    "cards": {
      "title": "Featured Products",
      "description": "Our most popular items this month",
      "cards": [
        {
          "title": "Product Name",
          "description": "Product description here",
          "image": "https://example.com/image.jpg",
          "imageAlt": "Product image",
          "link": "https://example.com/product",
          "linkText": "View Product",
          "badge": "Popular",
          "price": "$99.99"
        }
      ]
    }
  }
}
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `content` | string | Header text displayed above the cards |
| `content_type` | string | Must be `"card"` |
| `content_attributes.cards` | object | Cards configuration object |
| `cards.cards` | array | Array of card objects |

### Cards Configuration

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Optional section title (overrides content if provided) |
| `description` | string | Optional section description |
| `cards` | array | Array of individual card definitions |

## Card Properties

| Property | Type | Description | Required |
|----------|------|-------------|----------|
| `title` | string | Card title/headline | ✅ |
| `description` | string | Card description text | ✅ |
| `image` | string | Image URL | ✅ |
| `imageAlt` | string | Alt text for image (defaults to title) | ❌ |
| `link` | string | URL to link to when clicked | ❌ |
| `linkText` | string | Text for the action link (default: "Learn More") | ❌ |
| `badge` | string | Badge text (e.g., "New", "Popular", "Sale") | ❌ |
| `price` | string | Price text (e.g., "$99.99", "Free") | ❌ |

## Examples

### Product Showcase

```json
{
  "content": "Featured Products",
  "content_type": "card",
  "content_attributes": {
    "cards": {
      "title": "Best Sellers",
      "description": "Our most popular products this month",
      "cards": [
        {
          "title": "Premium Headphones",
          "description": "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
          "image": "https://example.com/headphones.jpg",
          "imageAlt": "Premium wireless headphones",
          "link": "https://store.example.com/headphones",
          "linkText": "Buy Now",
          "badge": "Best Seller",
          "price": "$199.99"
        },
        {
          "title": "Smart Watch",
          "description": "Track your fitness and stay connected with this advanced smartwatch.",
          "image": "https://example.com/smartwatch.jpg",
          "imageAlt": "Smart fitness watch",
          "link": "https://store.example.com/smartwatch",
          "linkText": "View Details",
          "badge": "New",
          "price": "$299.99"
        },
        {
          "title": "Wireless Speaker",
          "description": "Portable Bluetooth speaker with rich sound and waterproof design.",
          "image": "https://example.com/speaker.jpg",
          "imageAlt": "Portable Bluetooth speaker",
          "link": "https://store.example.com/speaker",
          "linkText": "Shop Now",
          "price": "$89.99"
        }
      ]
    }
  }
}
```

### Service Packages

```json
{
  "content": "Choose your plan",
  "content_type": "card",
  "content_attributes": {
    "cards": {
      "title": "Service Plans",
      "description": "Find the perfect plan for your business needs",
      "cards": [
        {
          "title": "Starter Plan",
          "description": "Perfect for small businesses just getting started. Includes basic features and email support.",
          "image": "https://example.com/starter-plan.jpg",
          "link": "https://example.com/plans/starter",
          "linkText": "Get Started",
          "price": "$29/month"
        },
        {
          "title": "Professional Plan",
          "description": "Everything in Starter plus advanced analytics, priority support, and integrations.",
          "image": "https://example.com/pro-plan.jpg",
          "link": "https://example.com/plans/professional",
          "linkText": "Choose Pro",
          "badge": "Most Popular",
          "price": "$99/month"
        },
        {
          "title": "Enterprise Plan",
          "description": "Full-featured solution with custom integrations, dedicated support, and SLA guarantees.",
          "image": "https://example.com/enterprise-plan.jpg",
          "link": "https://example.com/plans/enterprise",
          "linkText": "Contact Sales",
          "price": "Custom"
        }
      ]
    }
  }
}
```

### Team Members

```json
{
  "content": "Meet our team",
  "content_type": "card",
  "content_attributes": {
    "cards": {
      "title": "Our Leadership Team",
      "description": "The people behind our success",
      "cards": [
        {
          "title": "Sarah Johnson",
          "description": "CEO & Founder with 15 years of industry experience. Passionate about innovation and customer success.",
          "image": "https://example.com/team/sarah.jpg",
          "imageAlt": "Sarah Johnson - CEO",
          "link": "https://linkedin.com/in/sarahjohnson",
          "linkText": "LinkedIn Profile",
          "badge": "CEO"
        },
        {
          "title": "Michael Chen",
          "description": "CTO leading our technical vision and product development. Expert in scalable architecture.",
          "image": "https://example.com/team/michael.jpg",
          "imageAlt": "Michael Chen - CTO",
          "link": "https://linkedin.com/in/michaelchen",
          "linkText": "LinkedIn Profile",
          "badge": "CTO"
        },
        {
          "title": "Emma Davis",
          "description": "Head of Marketing driving growth and brand awareness. Specializes in digital marketing strategies.",
          "image": "https://example.com/team/emma.jpg",
          "imageAlt": "Emma Davis - Head of Marketing",
          "link": "https://linkedin.com/in/emmadavis",
          "linkText": "LinkedIn Profile",
          "badge": "Marketing"
        }
      ]
    }
  }
}
```

### Documentation Resources

```json
{
  "content": "Popular documentation",
  "content_type": "card",
  "content_attributes": {
    "cards": {
      "title": "Getting Started Guides",
      "description": "Essential resources to help you get up and running quickly",
      "cards": [
        {
          "title": "Quick Start Guide",
          "description": "Get your first project running in under 5 minutes with our step-by-step guide.",
          "image": "https://example.com/docs/quickstart.jpg",
          "link": "https://docs.example.com/quickstart",
          "linkText": "Start Here",
          "badge": "Essential"
        },
        {
          "title": "API Reference",
          "description": "Complete API documentation with examples and interactive testing tools.",
          "image": "https://example.com/docs/api.jpg",
          "link": "https://docs.example.com/api",
          "linkText": "View Docs"
        },
        {
          "title": "Integration Examples",
          "description": "Real-world examples showing how to integrate with popular frameworks and tools.",
          "image": "https://example.com/docs/integrations.jpg",
          "link": "https://docs.example.com/integrations",
          "linkText": "See Examples",
          "badge": "Popular"
        }
      ]
    }
  }
}
```

### Blog Posts

```json
{
  "content": "Latest articles",
  "content_type": "card",
  "content_attributes": {
    "cards": {
      "title": "Recent Blog Posts",
      "description": "Stay updated with our latest insights and tutorials",
      "cards": [
        {
          "title": "10 Tips for Better API Design",
          "description": "Learn the best practices for designing APIs that developers love to use. From naming conventions to error handling.",
          "image": "https://example.com/blog/api-design.jpg",
          "link": "https://blog.example.com/api-design-tips",
          "linkText": "Read Article",
          "badge": "New"
        },
        {
          "title": "Building Scalable Microservices",
          "description": "A comprehensive guide to architecting microservices that can handle millions of requests.",
          "image": "https://example.com/blog/microservices.jpg",
          "link": "https://blog.example.com/scalable-microservices",
          "linkText": "Read More"
        }
      ]
    }
  }
}
```

## Features

### Image Handling

- **Automatic fallback**: If an image fails to load, a placeholder is shown
- **Lazy loading**: Images are loaded only when needed for better performance
- **Responsive**: Images adapt to different screen sizes
- **Alt text support**: Accessibility-friendly with proper alt text

### Interactive Elements

- **Clickable cards**: Entire card or specific link areas can be interactive
- **External links**: Links open in new tabs with proper security attributes
- **Hover effects**: Visual feedback when hovering over interactive elements

### Visual Enhancements

- **Badges**: Highlight special offers, popularity, or categories
- **Pricing**: Display prices prominently with flexible formatting
- **Consistent spacing**: Cards maintain uniform spacing and alignment

## Styling

Card messages come with built-in responsive styling. Key CSS classes:

- `.interactive-cards` - Main container
- `.interactive-cards-header` - Header section with title/description
- `.cards-list` - Grid container for cards
- `.card-item` - Individual card wrapper
- `.card-image-container` - Image wrapper with overlays
- `.card-content` - Text content area
- `.card-badge` - Badge styling
- `.card-price` - Price display
- `.card-link` - Action link styling

## Best Practices

1. **Use high-quality images** - Images should be at least 400x200px for best results
2. **Keep descriptions concise** - Aim for 1-2 sentences per card
3. **Consistent image dimensions** - Use similar aspect ratios for a uniform look
4. **Meaningful alt text** - Provide descriptive alt text for accessibility
5. **Limit cards per message** - 3-6 cards work best for readability
6. **Clear call-to-actions** - Use action-oriented link text
7. **Mobile-first design** - Cards stack nicely on mobile devices

## Responsive Behavior

- **Desktop**: Cards display in a grid layout (typically 3 columns)
- **Tablet**: Cards adapt to 2 columns
- **Mobile**: Cards stack vertically in a single column
- **Images**: Scale proportionally while maintaining aspect ratio

## Accessibility

- Proper semantic HTML structure
- Alt text for all images
- Keyboard navigation support
- Screen reader friendly
- High contrast support
- Focus indicators for interactive elements

## Limitations

- Maximum 10 cards per message (recommended)
- Image URLs must be publicly accessible
- Links open in new tabs (security requirement)
- No support for video content (images only)
- Badge and price text should be kept short (max 20 characters)
