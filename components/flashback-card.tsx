"use client";

import { FlashbackCard as FlashbackCardType } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface FlashbackCardProps {
  flashback: FlashbackCardType;
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "今天";
  if (diffDays === 1) return "昨天";
  if (diffDays < 30) return `${diffDays}天前`;
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months}个月前`;
  }
  const years = Math.floor(diffDays / 365);
  return `${years}年前`;
}

export function FlashbackCard({ flashback }: FlashbackCardProps) {
  return (
    <div className="flex w-full mb-4 justify-start animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="max-w-[85%] sm:max-w-[75%]">
        <Card className="border-2 border-accent bg-gradient-to-br from-accent/30 to-accent/10 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-start gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <span className="text-xs font-serif text-muted-foreground">
                回忆片段 · {formatDate(flashback.timestamp)}
              </span>
            </div>
            <p className="text-[15px] leading-relaxed text-foreground/90 font-serif italic">
              "{flashback.content}"
            </p>
            {flashback.tags && flashback.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {flashback.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
