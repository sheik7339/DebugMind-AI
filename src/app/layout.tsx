import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { FirebaseAuthProvider } from "@/components/providers/FirebaseAuthProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://debugmind-ai.vercel.app"),
  title: {
    default: "DebugMind AI | AI-Powered Code Debugging for Professionals",
    template: "%s | DebugMind AI"
  },
  description: "Stop wasting hours on stack traces. DebugMind AI explains the root cause of your bugs and generates production-ready fixes in seconds.",
  keywords: ["AI debugger", "code analysis", "bug fixer", "programming assistant", "GPT-4o coding", "automated debugging"],
  authors: [{ name: "DebugMind AI Team" }],
  creator: "DebugMind AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://debugmind-ai.vercel.app",
    siteName: "DebugMind AI",
    title: "DebugMind AI | Fix Bugs Instantly",
    description: "The world's most advanced AI-powered debugging platform. Shrink your debug time from hours to seconds.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DebugMind AI Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DebugMind AI | Fix Bugs Instantly",
    description: "AI-powered code debugging platform. Stop searching, start shipping.",
    images: ["/og-image.png"],
    creator: "@debugmindai",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/site.webmanifest",
};

import { StarBackground } from "@/components/StarBackground";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased selection:bg-blue-500/30 bg-[#050505]`}>
        <Toaster richColors position="top-center" toastOptions={{
          style: {
            background: 'rgba(9, 9, 11, 0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            color: '#fff',
          }
        }} />
        <StarBackground />
        <FirebaseAuthProvider>
          {children}
        </FirebaseAuthProvider>
      </body>
    </html>
  );
}
