# AI Prompt Optimizer

## Overview

AI Prompt Optimizer is a lightweight, browser-based web application that helps users craft clearer, more effective prompts for large language models (LLMs). Instead of relying on external APIs or paid services, it uses a transparent, rule-based engine to analyze a user's raw prompt and enhance it with proven prompt-engineering techniques — such as role clarification, output formatting, step-by-step reasoning, and edge-case handling.

This project was built as part of a B.Tech Generative AI internship to demonstrate practical prompt-engineering principles through a clean, interactive interface.

## Features

- **Prompt input** — A spacious text area for entering any raw prompt.
- **One-click optimization** — The "Optimize Prompt" button runs the rule-based engine and instantly returns an improved version.
- **Transparent improvements** — Each optimization lists the specific techniques applied (shown as tags), so users learn *why* the prompt improved.
- **Copy to clipboard** — Copy the optimized prompt with a single click, complete with a visual confirmation.
- **Clear / reset** — Wipe both the input and the result to start fresh.
- **Responsive design** — Works smoothly across mobile, tablet, and desktop screens.
- **No dependencies on external services** — Runs entirely in the browser. No API keys, logins, or databases required.

## Technologies Used

| Category | Technology |
|---|---|
| Frontend framework | React 18 (with TypeScript) |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| Language | TypeScript |

## How It Works

The core logic lives in a standalone, framework-agnostic module (`src/lib/optimizePrompt.ts`). It defines a list of **rules**, where each rule has:

1. A **test** — a condition (usually a regex or word-count check) that detects whether the input prompt is *missing* a particular prompt-engineering best practice.
2. An **apply** function — the transformation that appends or prepends the missing element to the prompt.
3. A **label** — a human-readable name for the improvement, surfaced in the UI.

When the user clicks **Optimize Prompt**, the engine iterates through every rule. For each rule whose test passes (meaning the prompt lacks that element), it applies the transformation and records the rule's label. Rules that the prompt already satisfies are skipped, so the optimizer only adds what is genuinely missing.

The applied rules are:

- **Clarify the role** — Prepends an "Act as an expert…" instruction if no role is defined.
- **Specify the output format** — Asks for a clear, well-structured response.
- **Add context** — Requests relevant background for short, vague prompts.
- **Request step-by-step reasoning** — Asks the model to walk through its reasoning.
- **Ask for examples** — Requests concrete examples to illustrate points.
- **Set quality bar** — Asks for accuracy and precision while avoiding filler.
- **Define edge cases** — Prompts the model to state assumptions and caveats.

The final string is whitespace-cleaned and returned along with the list of applied rules for display.

## Project Structure

```
ai-prompt-optimizer/
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
├── package-lock.json          # Locked dependency versions
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind theme + custom animations
├── postcss.config.js          # PostCSS setup
├── tsconfig.json              # TypeScript configuration
├── eslint.config.js           # ESLint configuration
├── project-config/
│   ├── config.json            # Project configuration
│   └── prompt                 # Project prompt/configuration
└── src/
    ├── main.tsx               # React app bootstrap
    ├── App.tsx                # Main UI component
    ├── index.css              # Tailwind CSS
    ├── vite-env.d.ts          # Vite type declarations
    └── lib/
        └── optimizePrompt.ts  # Rule-based optimization engine
```

## Installation and Usage

### Prerequisites

- Node.js (v18 or newer)
- npm

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open the app in your browser
#    (Vite prints the local URL, typically http://localhost:5173)
```

### Production build

```bash
npm run build      # Builds the app into dist/
npm run preview    # Serves the production build locally
```

### Using the app

1. Type a simple prompt into the text area (e.g., `write a blog post about productivity`).
2. Click **Optimize Prompt**.
3. Review the improved prompt and the list of applied improvements.
4. Click **Copy** to copy the optimized prompt to your clipboard.
5. Click **Clear** to reset both fields and start over.

## Example

**Input prompt:**
```
write a blog post about productivity
```

**Optimized prompt:**
```
Act as an expert assistant. write a blog post about productivity Provide your response in a clear, well-structured format. Include relevant context and background so the response is accurate and tailored. Walk through your reasoning step by step before giving the final answer. Include concrete examples to illustrate your points. Be accurate, precise, and avoid unnecessary filler. If anything is ambiguous, state your assumptions and note any caveats.
```

**Improvements applied:**
- Clarify the role
- Specify the output format
- Add context
- Request step-by-step reasoning
- Ask for examples
- Set quality bar
- Define edge cases

## Future Enhancements

- **LLM integration** — Connect to an actual generative AI model (e.g., OpenAI, Gemini, or an open-source LLM) for context-aware rewriting rather than rule-based appending.
- **Prompt templates** — Offer pre-built templates for common use cases (coding, marketing, summarization, etc.).
- **Prompt history** — Save previously optimized prompts locally for quick reuse.
- **Quality scoring** — Rate the original and optimized prompts on clarity, specificity, and completeness.
- **Multi-language support** — Detect and optimize prompts written in languages other than English.
- **Export options** — Download optimized prompts as `.txt` or copy them in a structured Markdown format.
