"use client";

import { useState } from "react";
import { JournalProvider } from "@/lib/context/journal-context";
import { SanctuaryChat } from "@/components/sanctuary-chat";
import { MemoryJar } from "@/components/memory-jar";
import { WelcomeDialog } from "@/components/welcome-dialog";
import { MessageCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "sanctuary" | "memories";

function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>("sanctuary");

  return (
    <div className="flex flex-col h-screen bg-background">
      <WelcomeDialog />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "sanctuary" ? <SanctuaryChat /> : <MemoryJar />}
      </div>

      {/* Bottom Navigation */}
      <div className="flex-shrink-0 border-t border-border/50 bg-background/95 backdrop-blur-sm">
        <nav className="flex justify-around items-center h-16 sm:h-18 max-w-lg mx-auto px-4">
          <button
            onClick={() => setActiveTab("sanctuary")}
            className={cn(
              "flex flex-col items-center justify-center gap-1 px-6 py-2 rounded-xl transition-all duration-200",
              activeTab === "sanctuary"
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            <MessageCircle
              className={cn(
                "h-5 w-5 sm:h-6 sm:w-6",
                activeTab === "sanctuary" && "fill-current"
              )}
            />
            <span className="text-xs sm:text-sm font-medium">庇护所</span>
          </button>

          <button
            onClick={() => setActiveTab("memories")}
            className={cn(
              "flex flex-col items-center justify-center gap-1 px-6 py-2 rounded-xl transition-all duration-200",
              activeTab === "memories"
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            <Sparkles
              className={cn(
                "h-5 w-5 sm:h-6 sm:w-6",
                activeTab === "memories" && "fill-current"
              )}
            />
            <span className="text-xs sm:text-sm font-medium">记忆</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <JournalProvider>
      <HomePage />
    </JournalProvider>
  );
}
