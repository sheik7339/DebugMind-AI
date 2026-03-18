# 🚀 DebugMind AI - Production-Grade SaaS

DebugMind AI is a state-of-the-art, AI-powered code debugging platform designed for professional engineers. It identifies root causes, explains logic errors, and generates production-ready code fixes in seconds.

## ✨ Features

- **AI Analysis**: Deep diagnosis using GPT-4o & specialized LLMs.
- **Diff View**: Monaco-based side-by-side code comparison.
- **Persistent History**: LocalStorage-based session persistence.
- **Command Palette**: Rapid navigation with `Ctrl + K`.
- **Premium UI**: Dark-themed, high-performance glassmorphism design.
- **Fully Protected**: Identity-based access control for dashboard routes.

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS + Framer Motion (Animations)
- **Editor**: Monaco Editor (`@monaco-editor/react`)
- **Icons**: Lucide React
- **Deployment**: Vercel Optimized

## 🚀 One-Click Deployment on Vercel

1. **Push to GitHub**: Initialize git and push this repository to your GitHub account.
2. **Connect to Vercel**: 
   - Go to [vercel.com](https://vercel.com).
   - Click **Add New Project**.
   - Import this repository.
3. **Build Settings**: Vercel will automatically detect the Next.js settings.
4. **Deploy**: Click **Deploy**. Your site will be live on a `*.vercel.app` domain.

## 📦 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Authentication & Database
The project uses **Firebase** for secure authentication (Email/Password & Google) and real-time data persistence. ✨
- **Providers**: Email, Google
- **Database**: Firebase Firestore
- **State Management**: React Context via `FirebaseAuthProvider`

---
Built with 💙 by the DebugMind AI Team.
