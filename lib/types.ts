export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  tags?: string[];
  sentiment?: "positive" | "neutral" | "negative";
}

export interface FlashbackCard {
  id: string;
  content: string;
  timestamp: number;
  tags?: string[];
}
