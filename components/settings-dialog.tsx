"use client";

import { useState } from "react";
import { useJournal } from "@/lib/context/journal-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings, Trash2, BarChart3, AlertTriangle } from "lucide-react";

export function SettingsDialog() {
  const { messages, clearMessages } = useJournal();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const userMessages = messages.filter((msg) => msg.role === "user");
  const positiveCount = userMessages.filter(
    (msg) => msg.sentiment === "positive" || !msg.sentiment
  ).length;

  const handleClearData = () => {
    clearMessages();
    setShowConfirm(false);
    setIsOpen(false);
  };

  const stats = [
    { label: "总记录", value: userMessages.length },
    { label: "快乐时刻", value: positiveCount },
    { label: "总对话", value: messages.length },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="设置"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-serif">设置</DialogTitle>
          <DialogDescription>管理你的日记数据和偏好设置</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Statistics Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="h-4 w-4 text-primary" />
              <h3 className="font-medium">统计数据</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-accent/30 rounded-lg p-3 text-center"
                >
                  <div className="text-2xl font-serif font-semibold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clear Data Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Trash2 className="h-4 w-4 text-destructive" />
              <h3 className="font-medium">数据管理</h3>
            </div>

            {!showConfirm ? (
              <Button
                variant="outline"
                className="w-full justify-start text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                onClick={() => setShowConfirm(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                清除所有数据
              </Button>
            ) : (
              <div className="space-y-3 p-4 border-2 border-destructive/30 rounded-lg bg-destructive/5">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-destructive">
                      确认删除？
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      这将永久删除所有日记记录，此操作无法撤销。
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowConfirm(false)}
                    className="flex-1"
                  >
                    取消
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleClearData}
                    className="flex-1"
                  >
                    确认删除
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <p className="text-xs text-muted-foreground text-center w-full">
            数据存储在浏览器本地，仅你可见
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
