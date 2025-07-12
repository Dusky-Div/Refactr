# ⚡ Refactr

Refactr is a modern web app that analyzes and refactors code using Google’s Gemini API. Just paste your code, get instant feedback, and see a cleaner version ready to use — all inside a slick, editor-like UI.

This repo contains the **frontend & backend code** of this app, built with React, TypeScript, Tailwind CSS, Firebase Auth, and the Monaco editor.

---

## ✨ Features

- 🔐 **Firebase Authentication** – Signup/Login with email (Google OAuth optional)
- 💡 **Code Analysis** – Get insights on performance, issues, and improvements
- 🛠️ **AI Refactoring** – Cleaner, optimized version of your code using Gemini API
- 🌐 **Monaco Editor** – Rich code editing experience, just like VS Code
- ⚙️ **Language Support** – Choose from multiple programming languages
- 📋 **Copy to Clipboard** – Grab refactored code in one click
- 📁 **SideNav with Saved Items** – Neatly organized code snippets (static for now)

---

## 🧑‍💻 Tech Stack

| Layer    | Tools                                                           |
| -------- | --------------------------------------------------------------- |
| Frontend | React, TypeScript, Vite                                         |
| Styling  | Tailwind CSS, Shadcn/UI, Lucide Icons, Framer Motion            |
| Auth     | Firebase Authentication                                         |
| AI       | Google Gemini API (via `generateContent`)                       |
| Editor   | Monaco Editor, Prism.js                                         |
| UX       | Toast Notifications (`react-toastify`), Transitions, ScrollArea |

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js >= 18
- Firebase project
- Gemini API key from Google AI Studio

### 📦 Installation

```bash
git clone https://github.com/your-username/refactr-frontend.git
cd refactr-frontend
npm install
npm run dev
```
