# 🧠 DebugMind AI

![DebugMind AI Preview](https://debug-mind-ai.vercel.app/logo.png) <!-- Assuming a logo or just a placeholder for aesthetics -->

**Live Demo:** [https://debug-mind-ai.vercel.app/](https://debug-mind-ai.vercel.app/)

DebugMind AI is a next-generation, AI-powered debugging assistant tailored for modern developers. Stop wasting hours wrestling with cryptic error messages or searching Stack Overflow. Simply paste your broken code and error logs, and let Google's powerful Gemini AI instantly analyze, identify, and provide the exact fix for your bugs.

## ✨ Key Features

- 🤖 **Neural AI Analysis:** Powered by Google's latest Gemini AI models to provide pinpoint root cause analysis, suggested fixes, and code optimization tips.
- 🔐 **Secure Authentication:** Seamless and secure sign-in using Firebase Authentication, supporting both GitHub and Google OAuth.
- 💻 **Real-time Code Workspace:** Integrated Monaco Editor provides a rich, IDE-like experience right in your browser with syntax highlighting.
- 🎨 **Premium Glassmorphism Design:** A beautiful, responsive, and futuristic dark-mode UI built with Tailwind CSS and Framer Motion micro-animations.
- ⚡ **Lightning Fast:** Built on Next.js for incredibly fast rendering and API routing.

## 🛠️ Technology Stack

- **Frontend:** Next.js (React), Tailwind CSS, Framer Motion, Monaco Editor
- **Backend/API:** Next.js Route Handlers
- **AI Integration:** Google Generative AI (Gemini SDK)
- **Authentication:** Firebase (Google & GitHub Auth Providers)
- **Deployment:** Vercel

## 🚀 How It Works

1. **Sign In:** Securely log in using your GitHub or Google account.
2. **Launch Workspace:** Navigate to the **Debug Tool** from your dashboard.
3. **Inject Context:** Paste your broken code snippet into the editor and provide the error message or logs in the input field.
4. **Commit Neural Analysis:** Hit the button, and the AI will analyze the code-error vector.
5. **Get the Fix:** Instantly receive structured JSON feedback detailing the `root_cause` and the exact `suggested_fix`.

## 📦 Running Locally

To run DebugMind AI on your local machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/sheik7339/DebugMind-AI.git
   cd DebugMind-AI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following keys:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/sheik7339/DebugMind-AI/issues).

## 📝 License

This project is licensed under the MIT License.

---
*Built with ❤️ by Sheik.*
