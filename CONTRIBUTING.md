# Contributing to GitLaunch

Thanks for your interest in contributing! This document explains how to set up your environment, the contribution workflow, code standards, and areas where help is most welcome.

Repository: [iemafzalhassan/GitLaunch](https://github.com/iemafzalhassan/GitLaunch.git)

## Project overview

GitLaunch is a Next.js (App Router) app written in TypeScript that generates polished GitHub READMEs with:
- Multiple icon services (SkillIcons, Devicon, TechIcons)
- Live preview + copy/download
- AI quote generation using Google Gemini via Genkit
- Tailwind CSS + Radix UI components

## Getting started

1) Fork and clone the repo
```bash
git clone https://github.com/<your-username>/GitLaunch.git
cd GitLaunch
```

2) Prerequisites
- Node.js 18+
- npm (or yarn/pnpm)

3) Install dependencies
```bash
npm install
```

4) Environment variables
Create `.env` (copy from `.env.example`) and add your Gemini key:
```dotenv
GEMINI_API_KEY=your_gemini_api_key_here
```

5) Run the app
```bash
npm run dev   # Next.js dev server (default: http://localhost:9002)
```

Optional (Genkit local tooling):
```bash
npm run genkit:dev
```

## Architecture (quick map)

- `src/app` – App Router pages/layout, server actions
- `src/components` – UI components, form, preview, tech picker
- `src/lib` – core logic (README generator, icon services, tech data, utils, types)
  - `icon-services.ts` – service config + URL generation for SkillIcons/Devicon/TechIcons
  - `tech-stack-data.ts` – base tech list by category
  - `extended-tech-stack-data.ts` – extended list for Devicon/TechIcons
  - `tech-utils.ts` – helpers for deduping/filtering available technologies

## How to contribute

### 1. Open an issue first
- Propose a feature/fix and discuss the approach
- Link to relevant files/APIs you plan to touch

### 2. Create a feature branch
```bash
git checkout -b feat/short-description
# or fix/short-description, docs/short-description
```

### 3. Make your change
- Prefer small, focused PRs
- Update docs and types alongside code
- Keep imports relative to the existing module boundaries and alias setup (`@/`)

### 4. Run checks locally
```bash
npm run typecheck   # TypeScript
npm run lint        # Next.js lint rules
npm run build       # Ensure the app builds
npm run dev         # Manual verification
```

### 5. Commit style
Use clear, descriptive messages. Conventional Commits are encouraged:
```
feat(readme): add Github stats theme selector
fix(icons): map cs -> csharp for devicon
chore: bump deps
docs(contributing): add PR checklist
```

### 6. Pull Request checklist
- [ ] Linked an issue or clearly described the problem/solution
- [ ] Kept the PR size reasonable and focused
- [ ] Added/updated types and docs where needed
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Manually verified main flows: form -> preview -> README output

## Coding guidelines

### TypeScript
- Strong typing; avoid `any`
- Keep exported APIs explicitly typed
- Use meaningful names (no abbreviations)

### React/Next.js
- App Router patterns; prefer server actions for backend calls (`src/app/actions.ts`)
- Avoid deep prop drilling; keep components composable
- Keep components small and focused; move logic to `src/lib` where possible

### Styling/UI
- Tailwind CSS utility-first with Radix components
- Favor accessible patterns; keep interactive elements keyboard/focus friendly
- Keep copy short and scannable

## Working on icons

GitLaunch supports three icon services. When adding or fixing icons:

- SkillIcons (combined URL banner)
- Devicon / TechIcons (individual URLs)

Implementation is centralized in `src/lib/icon-services.ts`:
- Update `DEVICON_SLUG_MAP` if a tech name doesn’t match Devicon’s slug
- Use `generateIconUrl` or `generateMultipleIconUrls` depending on the service

To add more technologies:
- Add to `src/lib/tech-stack-data.ts` (base) or `src/lib/extended-tech-stack-data.ts` (extended)
- Keep categories accurate
- `tech-utils.ts` dedupes and filters; ensure new entries resolve to valid slugs
- If external images are needed, whitelist domains in `next.config.ts`

## Docs & examples
- Update `README.md` with user-facing changes
- Add examples/screenshots where useful

## Security / responsible disclosure
If you discover a vulnerability, please do not open a public issue. Email the maintainer instead and we’ll coordinate a fix.

## License
By contributing, you agree that your contributions will be licensed under the MIT License.

---
Thank you for helping improve GitLaunch! If you’ve made it this far, open a small PR (even a docs fix) to get started. 🙌
