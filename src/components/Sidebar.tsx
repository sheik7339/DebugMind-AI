import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Bug, History, User, LogOut, Menu, X, Home, CreditCard, Activity, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "Home Page", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/debug", label: "Debug Tool", icon: Bug },
  { href: "/dashboard/history", label: "History", icon: History },
  { href: "/dashboard/pricing", label: "Billing & Plans", icon: CreditCard },
  { href: "/dashboard/account", label: "Account", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Burger Menu Button */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed top-6 left-6 z-[60] p-3 bg-zinc-900 border border-white/10 rounded-xl text-white shadow-2xl"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950 border-r border-zinc-900 transition-transform duration-300 lg:translate-x-0 lg:static flex flex-col p-4",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <Link href="/" className="flex items-center gap-2 mb-10 mt-2 px-2 text-xl font-bold tracking-tight text-white/90 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shadow-lg shadow-blue-500/10">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span>DebugMind <span className="text-blue-500">AI</span></span>
        </Link>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative",
                  isActive
                    ? "bg-zinc-800/80 text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 w-1 h-5 bg-blue-500 rounded-r-full" />
                )}
                <item.icon className={cn("w-5 h-5", isActive ? "text-blue-500" : "text-zinc-500 group-hover:text-zinc-300")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/[0.03] space-y-4">
           {/* Neural Heartbeat Indicator */}
           <div className="px-2">
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-3 shadow-inner">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className="relative">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                          <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-50" />
                       </div>
                       <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Neural Link</span>
                    </div>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[7px] font-black text-blue-500 uppercase tracking-widest">
                       <Zap className="w-2 h-2 fill-blue-500" /> Live
                    </div>
                 </div>
                 
                 <div className="flex items-end justify-between">
                    <div>
                       <p className="text-[10px] font-black text-white uppercase tracking-tighter">System Integrity</p>
                       <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mt-0.5">Latency: 42ms</p>
                    </div>
                    <Activity className="w-5 h-5 text-emerald-500/20" />
                 </div>
              </div>
           </div>

           <button
             onClick={() => {
               signOut(auth);
               setIsOpen(false);
             }}
             className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-colors group"
           >
             <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
             End Session
           </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
