"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Message } from "@/lib/types";

interface JournalContextType {
  messages: Message[];
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  clearMessages: () => void;
  getUserMessages: () => Message[];
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

const STORAGE_KEY = "zenlog_messages";

export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load messages from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setMessages(parsed);
      } catch (error) {
        console.error("Failed to parse stored messages:", error);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages, isHydrated]);

  const addMessage = (message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getUserMessages = () => {
    return messages.filter((msg) => msg.role === "user");
  };

  return (
    <JournalContext.Provider
      value={{ messages, addMessage, clearMessages, getUserMessages }}
    >
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error("useJournal must be used within a JournalProvider");
  }
  return context;
}
