# Contributing to Chat Widget

Thanks for pitching in. Follow the rules below so work doesn't get messy.

## 1. How you can help

* Bug reports
* Small fixes / perf tweaks
* New features (open an issue first)
* Docs & examples

## 2. Before you open anything

* Search existing issues and PRs.
* For features or anything breaking, open an RFC-style issue first and get a 👍 before coding.

## 3. Bug reports

Include:

1. What happened vs. what you expected
2. Repro steps (minimal repo / sandbox link preferred)
3. Env: browser, React version, widget version
4. Logs/screenshots if they help

## 4. Feature requests

Tell us:

* The problem you're solving
* Why it belongs in core (not just your project)
* Rough API/UX idea (optional but useful)

## 5. Development setup

```bash
git clone https://github.com/merteraslan/chat-widget.git
cd chat-widget
npm install
npm run dev    # demo / dev server
npm run test   # unit tests
npm run lint   # eslint + prettier
npm run build  # production build
```

## 6. Code & PR guidelines

* TypeScript only
* Follow existing patterns; no drive‑by refactors
* One problem per PR
* Update tests/docs when public API changes
* Linter must pass

### Branch & commit naming

* Branches: `feat/...`, `fix/...`, `docs/...`, `chore/...`
* Commits use Conventional Commits: `feat: add card carousel`, `fix: null ref in FormField`, etc.

### PR checklist

* [ ] Tests pass (`npm run test`)
* [ ] Lint passes (`npm run lint`)
* [ ] Docs / README / CHANGELOG updated if needed
* [ ] Linked related issue(s)

## 7. Releases

Maintainers handle releases using semver:

* Patch: bug fixes (0.0.x)
* Minor: new backwards‑compatible features (0.x.0)
* Major: breaking changes (x.0.0)

## 8. Security

The widget makes exactly one outbound request—to the webhook URL you configure.
If you find a security issue, email **[mertegithub@gmail.com](mailto:mertegithub@gmail.com)**. Do **not** open a public issue.

## 9. License

By contributing, you agree your code is MIT‑licensed.

---
