"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User, ArrowRight } from "lucide-react";
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
  showPDFButton?: boolean;
}

interface MessagesCardProps {
  status: "submitted" | "streaming" | "ready" | "error";
  inModal: boolean;
  messages: Message[];
  onOptionSelect?: (option: ChatOption) => void;
  onEstimateRequest?: () => void;
  onConsultationRequest?: () => void;
}

const MessagesCard: React.FC<MessagesCardProps> = ({
  status,
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
  }, [messages, status]);

  const handleOptionClick = (option: ChatOption) => {
    onOptionSelect?.(option);
  };

  const renderOptions = (options: ChatOption[]) => (
    <div className="flex flex-col gap-2 mt-3">
      {options.map((option) => (
        <Button
          key={option.id}
          variant="link"
          className="justify-start text-left h-auto p-3 whitespace-normal bg-[#104D96]"
          onClick={() => handleOptionClick(option)}
        >
          <span className="flex items-center gap-2 w-full">
            <span className="text-sm flex-1 text-white">{option.text}</span>
            <ArrowRight className="h-4 w-4 opacity-50 flex-shrink-0 text-white" />
          </span>
        </Button>
      ))}
    </div>
  );

  const renderActionButtons = (message: Message) => (
    <div className="flex flex-col sm:flex-row gap-2 mt-3">
      {message.showEstimateButton && (
        <Button
          variant="outline"
          onClick={onEstimateRequest}
          className="flex-1 bg-[#F6A652] text-black rounded-[114px]  h-[52px]"
        >
          Get Tailored Estimate
        </Button>
      )}
      {message.showConsultationButton && (
        <Button
          variant="outline"
          onClick={onConsultationRequest}
          className="flex-1 bg-[#F6A652] text-black rounded-[114px]  h-[52px]"
        >
          Schedule Free Consultation
        </Button>
      )}
      {message.showPDFButton && (
        <a
          href="/dummy.pdf"
          download="dummy.pdf"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="outline" className="flex-1">
            Download PDF
          </Button>
        </a>
      )}
    </div>
  );

  const TypingIndicator = () => (
    <div className="flex items-center gap-2 text-gray-500 text-sm px-4 py-2">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
      </div>
      <span>Chatbot is typing...</span>
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
                  ? "ml-auto max-w-[80%] bg-[#F1F8FA]"
                  : `mr-auto max-w-[90%] ${
                      message.id === "welcome"
                        ? "bg-transparent"
                        : "bg-[#104D96]"
                    }`
              )}
            >
              <div
                className={
                  message.role === "user"
                    ? "flex shrink-0 select-none items-center justify-center border rounded-[20px] h-[38px] w-[38px] shadow bg-primary text-primary-foreground"
                    : "flex shrink-0 select-none items-center justify-center"
                }
              >
                {message.role === "user" ? <User className="h-6 w-6" /> : ""}
              </div>
              <div className="flex-1">
                {message.role === "user" ? (
                  <div
                    className={`text-sm whitespace-pre-wrap text-[#104D96] mt-[8px]`}
                  >
                    {message.content}
                  </div>
                ) : (
                  <div
                    className={`text-sm whitespace-pre-wrap ${
                      message.id === "welcome" ? "text-[#104D96]" : "text-white"
                    } mt-[8px]`}
                  >
                    {message.content}
                  </div>
                )}
                {message.options && renderOptions(message.options)}
                {(message.showEstimateButton ||
                  message.showConsultationButton ||
                  message.showPDFButton) &&
                  renderActionButtons(message)}
              </div>
            </div>
          ))}

          {status === "streaming" && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
    </Card>
  );
};

export default MessagesCard;
