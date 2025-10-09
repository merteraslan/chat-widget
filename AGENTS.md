# Agent Instructions

## Scope
These guidelines apply to the entire `chat-widget` repository unless a more specific `AGENTS.md` is present deeper in the tree.

## Tooling & environment
- Use Node.js 18 or newer; the project relies on Vite, Vitest, and TypeScript configured for ESM.
- Prefer the bundled npm scripts for automation:
  - `npm run lint` for ESLint.
  - `npm run typecheck` for TypeScript checks.
  - `npm test` / `npm run test:run` for Vitest (use `-t` to target individual specs when practical).
- Do not introduce alternative package managers or tooling without a compelling reason.

## Coding conventions
- Source is authored in TypeScript/React; keep modules ESM and favour `type` imports where appropriate.
- Preserve the existing functional component patterns and state hooks—avoid class components.
- Follow the existing CSS organization (plain `.css` files colocated with components) and keep selectors scoped to the widget when adding styles.
- Never wrap import statements in `try/catch` blocks.

## Testing expectations
Run the relevant npm scripts for any area you modify and report the exact commands executed. If you intentionally skip tests, call that out with a justification.

## Documentation
Update README, docs, or type declarations when you add or change public-facing behaviour or props. Keep changelog entries concise and grouped under the newest unreleased heading when applicable.
