import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import React, { useEffect, useRef } from "react";

interface MessagesCardProps {
  inModal: boolean;
  messages: {
    id: number | string;
    role: string;
    content: string;
  }[];
}

const MessagesCard: React.FC<MessagesCardProps> = ({ inModal, messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Card
      className={cn(
        "flex-1 p-4 mb-4 overflow-hidden",
        inModal && "border-0 shadow-none rounded-none"
      )}
    >
      <ScrollArea className="h-full pr-4">
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3 rounded-lg p-4",
                message.role === "user"
                  ? "ml-auto max-w-[80%] bg-muted"
                  : "mr-auto max-w-[80%] bg-primary/10"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
                  message.role === "user"
                    ? "bg-background"
                    : "bg-primary text-primary-foreground"
                )}
              >
                {message.role === "user" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1 text-sm">{message.content}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
    </Card>
  );
};
export default MessagesCard;
