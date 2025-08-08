# Changelog

## [0.6.4] - 2025-07-23

### Added
- New features and enhancements

### Changed
- Improvements and updates

### Fixed
- Bug fixes and issue resolutions


## [0.6.3] - 2025-07-23

### Added
- New features and enhancements

### Changed
- Improvements and updates

### Fixed
- Bug fixes and issue resolutions


## [0.6.2] - 2025-07-23

### Added
- New features and enhancements

### Changed
- Improvements and updates

### Fixed
- Bug fixes and issue resolutions


## [0.6.1] - 2025-07-23

### Added
- New features and enhancements

### Changed
- Improvements and updates

### Fixed
- Bug fixes and issue resolutions


All notable changes to the Chat Widget will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.0] - 2025-07-23

### Added

- Comprehensive documentation structure in `docs/` folder
- Complete JSON schemas for all message types
- FAQ documentation covering CORS, CSP, SSR, and form submission issues
- Troubleshooting guide with common solutions

### Changed

- Improved documentation organization and consolidation

## [0.0.4] - 2025-01-15

### Added (v0.0.4)

- **Canned Response Messages**: Quick reply buttons for user selections
- **Enhanced Card Messages**: Added badge and price display features  
- **Agent Name Display**: Optional `agentName` prop for branded message prefixes
- **Improved Form Validation**: Better error handling and user feedback
- **TypeScript Enhancements**: Better type definitions and IntelliSense support

### Changed (v0.0.4)

- **Enhanced Color Theming**: More consistent color inheritance across all interactive elements
- **Improved Mobile Experience**: Better touch interactions and responsive design
- **Performance Optimizations**: Reduced bundle size and improved rendering speed

### Fixed (v0.0.4)

- Form submission error handling for network failures
- Image loading fallbacks in card messages
- Keyboard navigation accessibility improvements
- Memory leak prevention in event listeners

## [0.0.3] - 2024-12-20

### Added (v0.0.3)

- **Interactive Form Messages**: Complete form support with validation
  - Text, email, tel, textarea, select, checkbox, and radio field types
  - Client-side validation with custom patterns and error messages
  - Form submission to custom endpoints with JSON payload
- **Card Messages**: Rich visual content with images and call-to-action buttons
- **Improved Color Theming**: CSS custom properties for consistent color inheritance
- **Enhanced Accessibility**: Better keyboard navigation and screen reader support

### Changed (v0.0.3)

- **Message Type Architecture**: Refactored to support extensible interactive message types
- **Styling System**: Moved to CSS custom properties for better theming control
- **Component Structure**: Improved separation of concerns in interactive messages

### Fixed (v0.0.3)

- Mobile responsiveness issues with interactive elements
- Form input focus states and validation timing
- Color contrast accessibility issues

## [0.0.2] - 2024-11-10

### Added (v0.0.2)

- **Interactive Article Messages**: Display clickable article links and resources
- **Enhanced Webhook Support**: Better error handling and response parsing
- **Mobile Responsive Design**: Optimized experience for mobile devices
- **CSRF Token Support**: Security enhancement for server-side integrations
- **Custom Color Theming**: Configurable primary color for brand consistency

### Changed (v0.0.2)

- **Improved UI/UX**: Cleaner animations and better visual feedback
- **Message Display**: Enhanced message bubble design and spacing
- **Performance**: Optimized rendering and reduced unnecessary re-renders

### Fixed (v0.0.2)

- Webhook request headers and CORS handling
- Message ordering and timestamp display
- Input field focus and keyboard navigation

## [0.0.1] - 2024-10-01

### Added (v0.0.1)

- **Initial Release**: Basic chat widget functionality
- **Webhook Integration**: POST requests to configurable endpoints
- **React Component**: TypeScript-first React component with proper typing
- **Basic Styling**: CSS-in-JS styling with floating button design
- **Essential Props**: `webhookUrl`, `title`, `initialMessage`, `sessionId` support
- **Message Types**: Basic text message support
- **Chat Interface**:
  - Floating toggle button
  - Expandable chat window
  - Message history
  - User input with send button
  - Typing indicators

### Technical Features (v0.0.1)

- Built with Vite and TypeScript
- React 19+ peer dependency support
- ES modules and UMD builds
- Proper tree-shaking support
- Lightweight bundle (~50KB gzipped)

---

## Version Numbering

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR** version when making incompatible API changes
- **MINOR** version when adding functionality in a backwards compatible manner  
- **PATCH** version when making backwards compatible bug fixes

## Release Process

1. Update version in `package.json`
2. Update this CHANGELOG.md with new version details
3. Create git tag with version number (e.g., `v0.0.4`)
4. Push tag to trigger GitHub Actions release workflow
5. Publish to GitHub Packages registry

## Migration Guides

### Upgrading to v0.0.4

No breaking changes. New features:

- Add `agentName` prop for branded message prefixes
- Use new `canned_response` message type for quick replies
- Enhanced card messages support `badge` and `price` fields

### Upgrading to v0.0.3

No breaking changes. New features:

- Interactive form messages with `content_type: "form"`
- Card messages with `content_type: "card"`
- Enhanced color theming via CSS custom properties

### Upgrading to v0.0.2

No breaking changes. New features:

- Interactive article messages with `content_type: "article"`
- Enhanced webhook response format support
- CSRF token support via `csrfToken` prop

## Feedback & Contributions

- **Bug Reports**: [GitHub Issues](https://github.com/merteraslan/chat-widget/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/merteraslan/chat-widget/discussions)
- **Pull Requests**: Welcome! Please read [Contributing Guidelines](./CONTRIBUTING.md)
