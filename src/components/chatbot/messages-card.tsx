"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bot, User, ArrowRight } from "lucide-react";
import type React from "react";
import { useEffect, useRef } from "react";

interface ChatOption {
  id: string;
  text: string;
  value: string;
}

interface Message {
  id: number | string;
  role: string;
  content: string;
  options?: ChatOption[];
  showEstimateButton?: boolean;
  showConsultationButton?: boolean;
}

interface MessagesCardProps {
  inModal: boolean;
  messages: Message[];
  onOptionSelect?: (option: ChatOption) => void;
  onEstimateRequest?: () => void;
  onConsultationRequest?: () => void;
}

const MessagesCard: React.FC<MessagesCardProps> = ({
  inModal,
  messages,
  onOptionSelect,
  onEstimateRequest,
  onConsultationRequest,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleOptionClick = (option: ChatOption) => {
    onOptionSelect?.(option);
  };

  const renderOptions = (options: ChatOption[]) => (
    <div className="flex flex-col gap-2 mt-3">
      {options.map((option) => (
        <Button
          key={option.id}
          variant="outline"
          className="justify-start text-left h-auto p-3 whitespace-normal"
          onClick={() => handleOptionClick(option)}
        >
          <span className="flex items-center gap-2 w-full">
            <span className="text-sm font-medium text-primary">
              {option.id}.
            </span>
            <span className="text-sm flex-1">{option.text}</span>
            <ArrowRight className="h-4 w-4 opacity-50 flex-shrink-0" />
          </span>
        </Button>
      ))}
    </div>
  );

  const renderActionButtons = (message: Message) => (
    <div className="flex flex-col sm:flex-row gap-2 mt-3">
      {message.showEstimateButton && (
        <Button onClick={onEstimateRequest} className="flex-1">
          Get Tailored Estimate
        </Button>
      )}
      {message.showConsultationButton && (
        <Button
          variant="outline"
          onClick={onConsultationRequest}
          className="flex-1"
        >
          Schedule Free Consultation
        </Button>
      )}
    </div>
  );

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
                  : "mr-auto max-w-[90%] bg-primary/10"
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
              <div className="flex-1">
                <div className="text-sm whitespace-pre-wrap">
                  {message.content}
                </div>
                {message.options && renderOptions(message.options)}
                {(message.showEstimateButton ||
                  message.showConsultationButton) &&
                  renderActionButtons(message)}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
    </Card>
  );
};

export default MessagesCard;
