"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

import { useAuth } from "@/components/providers/FirebaseAuthProvider";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (pathname.startsWith("/dashboard") && !user) {
      router.replace("/signin");
    }
  }, [user, loading, pathname, router]);

  // Show loading ONLY while Firebase is still resolving auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5] 
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.4)]"
        >
          <Cpu className="w-8 h-8 text-white" />
        </motion.div>
        <p className="mt-6 text-zinc-500 font-black uppercase tracking-[0.3em] text-[10px]">Authing Identity...</p>
      </div>
    );
  }

  // After loading, if on dashboard and not logged in, redirect is happening - show blank
  if (pathname.startsWith("/dashboard") && !user) {
    return null;
  }

  return <>{children}</>;
}

