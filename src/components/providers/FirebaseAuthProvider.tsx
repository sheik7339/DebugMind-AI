"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  tier: "free" | "pro";
  usageCount: number;
  incrementUsage: () => { allowed: boolean; reason?: string };
  upgradeToPro: () => void;
  geminiKey: string | null;
  setGeminiKey: (key: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true, 
  tier: "free", 
  usageCount: 0,
  incrementUsage: () => ({ allowed: false }),
  upgradeToPro: () => {},
  geminiKey: null,
  setGeminiKey: () => {}
});

export function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [tier, setTier] = useState<"free" | "pro">("free");
  const [usageCount, setUsageCount] = useState(0);
  const [lastReset, setLastReset] = useState<number>(0);
  const [geminiKey, setGeminiKeyInternal] = useState<string | null>(null);

  useEffect(() => {
    const savedTier = localStorage.getItem("debugmind_tier") as "free" | "pro";
    const savedUsage = parseInt(localStorage.getItem("debugmind_usage") || "0");
    const savedReset = parseInt(localStorage.getItem("debugmind_last_reset") || "0");
    const savedKey = localStorage.getItem("debugmind_custom_gemini_key");
    
    if (savedTier) setTier(savedTier);
    setUsageCount(savedUsage);
    setLastReset(savedReset);
    setGeminiKeyInternal(savedKey);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const setGeminiKey = (key: string | null) => {
    setGeminiKeyInternal(key);
    if (key) {
      localStorage.setItem("debugmind_custom_gemini_key", key);
    } else {
      localStorage.removeItem("debugmind_custom_gemini_key");
    }
  };

  const incrementUsage = (): { allowed: boolean; reason?: string } => {
    const now = Date.now();
    const oneHour = 3600000;

    // Reset counter if more than an hour has passed
    if (now - lastReset > oneHour) {
      setUsageCount(0);
      setLastReset(now);
      localStorage.setItem("debugmind_usage", "0");
      localStorage.setItem("debugmind_last_reset", now.toString());
    }

    if (tier === "pro" || geminiKey) {
      setUsageCount(prev => prev + 1);
      return { allowed: true };
    }
    
    if (usageCount >= 3) {
      return { 
        allowed: false, 
        reason: "Neural Node saturated. Free tier limit is 3 requests/hour. Upgrade to Pro for instant access." 
      };
    }

    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem("debugmind_usage", newCount.toString());
    return { allowed: true };
  };

  const upgradeToPro = () => {
    setTier("pro");
    localStorage.setItem("debugmind_tier", "pro");
  };

  return (
    <AuthContext.Provider value={{ user, loading, tier, usageCount, incrementUsage, upgradeToPro, geminiKey, setGeminiKey }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
