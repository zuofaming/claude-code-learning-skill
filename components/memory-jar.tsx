"use client";

import { useState } from "react";
import { useJournal } from "@/lib/context/journal-context";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Sparkles, Calendar, Trash2 } from "lucide-react";

export function MemoryJar() {
  const { getUserMessages, deleteMessage } = useJournal();
  const [randomMemory, setRandomMemory] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const userMessages = getUserMessages();
  const positiveMessages = userMessages.filter(
    (msg) => msg.sentiment === "positive" || !msg.sentiment
  );

  const handleRandomPick = () => {
    if (positiveMessages.length === 0) return;
    const randomIndex = Math.floor(Math.random() * positiveMessages.length);
    setRandomMemory(positiveMessages[randomIndex].id);

    // Clear highlight after 3 seconds
    setTimeout(() => setRandomMemory(null), 3000);
  };

  const handleDelete = (id: string) => {
    deleteMessage(id);
    setDeletingId(null);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-4 sm:px-6 sm:py-5 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-xl font-serif text-foreground">
              记忆宝库
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {positiveMessages.length} 个美好时刻
            </p>
          </div>
          <Button
            onClick={handleRandomPick}
            disabled={positiveMessages.length === 0}
            variant="outline"
            size="sm"
            className="rounded-full gap-2"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">随机回忆</span>
          </Button>
        </div>
      </div>

      {/* Memory Cards */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        {positiveMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-3 max-w-md px-4">
              <Sparkles className="h-12 w-12 text-muted-foreground/50 mx-auto" />
              <p className="text-muted-foreground font-serif text-base">
                还没有记录
              </p>
              <p className="text-sm text-muted-foreground/70">
                去"心灵庇护所"分享你的快乐时刻吧
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {positiveMessages
              .slice()
              .reverse()
              .map((message) => (
                <Card
                  key={message.id}
                  className={`group relative transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                    randomMemory === message.id
                      ? "ring-2 ring-primary shadow-xl scale-[1.02]"
                      : ""
                  }`}
                >
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDate(message.timestamp)}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                        onClick={() =>
                          deletingId === message.id
                            ? handleDelete(message.id)
                            : setDeletingId(message.id)
                        }
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>

                    {deletingId === message.id ? (
                      <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 mb-3">
                        <p className="text-xs text-destructive font-medium mb-2">
                          确定删除这条记录？
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDeletingId(null)}
                            className="flex-1 h-7 text-xs"
                          >
                            取消
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(message.id)}
                            className="flex-1 h-7 text-xs"
                          >
                            删除
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm sm:text-base leading-relaxed text-foreground/90 line-clamp-4">
                        {message.content}
                      </p>
                    )}

                    {message.tags && message.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {message.tags.map((tag) => (
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
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
