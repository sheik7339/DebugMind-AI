"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { Bug, History, LayoutDashboard, LogOut, Search } from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] md:pt-[20vh] px-4 md:px-0 cmdk-backdrop">
      <Command 
        className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden glass mix-blend-normal"
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
      >
        <div className="flex items-center border-b border-zinc-800 px-3">
          <Search className="w-4 h-4 text-zinc-500" />
          <Command.Input 
            autoFocus 
            placeholder="Type a command or search..." 
            className="w-full bg-transparent outline-none p-4 text-sm text-white placeholder:text-zinc-500"
          />
        </div>

        <Command.List className="p-2 max-h-[300px] overflow-y-auto">
          <Command.Empty className="p-4 text-sm text-center text-zinc-500">
            No results found.
          </Command.Empty>

          <Command.Group heading={<span className="text-xs font-semibold text-zinc-500 px-2 uppercase tracking-wide">Quick Actions</span>}>
            <Command.Item 
              value="Debug New Code"
              onSelect={() => runCommand(() => router.push("/dashboard/debug"))}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-zinc-300 aria-selected:bg-blue-600 aria-selected:text-white cursor-pointer group"
            >
              <Bug className="w-4 h-4 group-aria-selected:text-white text-blue-500" />
              Debug New Code
            </Command.Item>
            <Command.Item 
              value="Open Debug History"
              onSelect={() => runCommand(() => router.push("/dashboard/history"))}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-zinc-300 aria-selected:bg-zinc-800 aria-selected:text-white cursor-pointer group"
            >
              <History className="w-4 h-4 group-aria-selected:text-white text-zinc-500" />
              Open Debug History
            </Command.Item>
            <Command.Item 
              value="Go to Dashboard"
              onSelect={() => runCommand(() => router.push("/dashboard"))}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-zinc-300 aria-selected:bg-zinc-800 aria-selected:text-white cursor-pointer group"
            >
              <LayoutDashboard className="w-4 h-4 group-aria-selected:text-white text-zinc-500" />
              Go to Dashboard
            </Command.Item>
            <Command.Item 
              value="Logout"
              onSelect={() => runCommand(() => router.push("/"))}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-red-400 aria-selected:bg-red-500/20 aria-selected:text-red-300 cursor-pointer group mt-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
