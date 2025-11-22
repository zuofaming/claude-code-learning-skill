"use client";

import { useState, useRef, useEffect } from "react";
import { useJournal } from "@/lib/context/journal-context";
import { processUserMessage } from "@/lib/ai-gardener";
import { ChatBubble } from "./chat-bubble";
import { FlashbackCard } from "./flashback-card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send, Loader2 } from "lucide-react";

export function SanctuaryChat() {
  const { messages, addMessage } = useJournal();
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userInput = input.trim();
    setInput("");
    setIsProcessing(true);

    // Add user message
    addMessage({
      role: "user",
      content: userInput,
    });

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Process the message with AI Gardener
    const userMessages = messages.filter((msg) => msg.role === "user");
    const aiResponse = processUserMessage(userInput, userMessages);

    // Add AI response
    addMessage({
      role: "assistant",
      content: aiResponse.message,
      tags: aiResponse.tags,
      sentiment: aiResponse.sentiment,
    });

    // If there's a flashback, add it as a special message
    if (aiResponse.flashback) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      addMessage({
        role: "assistant",
        content: `__FLASHBACK__${JSON.stringify(aiResponse.flashback)}`,
      });
    }

    setIsProcessing(false);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-4 sm:px-6 sm:py-5 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <h1 className="text-lg sm:text-xl font-serif text-foreground">
          心灵庇护所
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          记录你的小确幸时刻
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-3 max-w-md px-4">
              <p className="text-muted-foreground font-serif text-base">
                欢迎来到你的心灵庇护所
              </p>
              <p className="text-sm text-muted-foreground/70">
                分享今天让你感到开心的事情吧...
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => {
          // Check if this is a flashback message
          if (message.content.startsWith("__FLASHBACK__")) {
            const flashbackData = JSON.parse(
              message.content.replace("__FLASHBACK__", "")
            );
            return <FlashbackCard key={message.id} flashback={flashbackData} />;
          }

          return <ChatBubble key={message.id} message={message} />;
        })}

        {isProcessing && (
          <div className="flex justify-start mb-4">
            <div className="bg-card border border-border rounded-2xl rounded-bl-md px-5 py-3 shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 px-4 py-4 sm:px-6 border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3">
          <Input
            ref={inputRef}
            type="text"
            placeholder="分享你的快乐时刻..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isProcessing}
            className="flex-1 h-11 sm:h-12 text-base rounded-full px-5 border-border/50 focus-visible:ring-primary/20"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isProcessing}
            className="h-11 w-11 sm:h-12 sm:w-12 rounded-full flex-shrink-0"
          >
            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
