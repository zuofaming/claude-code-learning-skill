"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, MessageCircle, Calendar } from "lucide-react";

const WELCOME_KEY = "zenlog_welcome_shown";

export function WelcomeDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem(WELCOME_KEY);
    if (!hasSeenWelcome) {
      // Small delay for better UX
      setTimeout(() => setIsOpen(true), 500);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(WELCOME_KEY, "true");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center font-serif text-2xl">
            欢迎来到 ZenLog
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            你的心灵庇护所，记录小确幸的温暖角落
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex gap-3 p-3 rounded-lg bg-accent/30">
            <MessageCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-sm mb-1">对话式记录</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                像聊天一样分享你的快乐时刻，AI园丁会温柔地回应你，并自动为你的记录添加标签。
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-3 rounded-lg bg-accent/30">
            <Sparkles className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-sm mb-1">回声机制</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                当你分享新的快乐时刻时，ZenLog可能会唤起相关的过往记忆，让美好时光产生共鸣。
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-3 rounded-lg bg-accent/30">
            <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-sm mb-1">记忆宝库</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                浏览所有记录的快乐时刻，或随机抽取一个回忆，在需要时获得温暖和力量。
              </p>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <p className="text-xs text-muted-foreground leading-relaxed">
            所有数据都存储在你的浏览器本地<br />
            安全私密，仅你可见
          </p>
        </div>

        <Button
          onClick={handleClose}
          className="w-full rounded-full h-11"
          size="lg"
        >
          开始记录我的小确幸
        </Button>
      </DialogContent>
    </Dialog>
  );
}
