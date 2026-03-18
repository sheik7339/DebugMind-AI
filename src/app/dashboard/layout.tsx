"use client";

import { Sidebar } from "@/components/Sidebar";
import { CommandPalette } from "@/components/CommandPalette";
import AuthWrapper from "./auth-wrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper>
      <div className="min-h-screen bg-zinc-950 text-zinc-50 flex selection:bg-blue-500/30">
        <Sidebar />
        <main className="flex-1 lg:ml-0 p-4 sm:p-6 md:p-8 pt-20 lg:pt-8 relative overflow-x-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
          {children}
        </main>
        <CommandPalette />
      </div>
    </AuthWrapper>
  );
}
