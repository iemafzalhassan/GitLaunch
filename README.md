# GitLaunch – AI-Powered README Generator

A modern Next.js application that generates polished GitHub README profiles with AI-powered quotes, multiple icon services, and a live preview.

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Live Demo](https://img.shields.io/badge/demo-git--launch--xi.vercel.app-000?logo=vercel)](https://git-launch-xi.vercel.app)

- 🤖 **AI Quote Generation**: Personalized quotes using Google Gemini AI
- 🎨 **Multiple Icon Services**: Support for SkillIcons, Devicon, and TechIcons
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- ⚡ **Real-time Preview**: Live preview of your README as you type
- 🎯 **200+ Technologies**: Extensive tech stack selection
- 🌙 **Theme Support**: Dark/light themes for icons and stats

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Gemini API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/iemafzalhassan/GitLaunch.git
cd GitLaunch
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your Gemini API key:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your API key from: https://makersuite.google.com/app/apikey

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to http://localhost:9002

## Icon Services

### SkillIcons.dev
- 150 technologies
- Theme support (dark/light)
- Multiple technologies in single URL

### Devicon
- 200+ technologies
- Comprehensive programming languages
- Individual icon URLs

### TechIcons.dev
- 200+ technologies
- Modern development tools
- Clean, consistent design

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **AI**: Google Gemini 2.0 Flash via Genkit
- **Icons**: SkillIcons, Devicon, TechIcons

## Configuration

Environment variables:

| Variable | Required | Description |
| --- | --- | --- |
| `GEMINI_API_KEY` | yes | Google Gemini API key for quote generation |

Notes:
- SkillIcons supports dark/light themes and combined banner URLs
- Devicon/TechIcons use per-icon URLs; common names are mapped to Devicon slugs
- External images are whitelisted in `next.config.ts`

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for setup, architecture, and PR guidelines.

## License

MIT License - see LICENSE file for details.
