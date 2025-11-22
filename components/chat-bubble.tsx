"use client";

import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: Message;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-in fade-in slide-in-from-bottom-2 duration-500",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3 shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-card border border-border rounded-bl-md"
        )}
      >
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </p>
        {message.tags && message.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {message.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  isUser
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-accent text-accent-foreground"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
