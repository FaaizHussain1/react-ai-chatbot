/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type React from "react";
import { useChat } from "@ai-sdk/react";
import ChatForm from "./chat-form";
import MessagesCard from "./messages-card";
import { chatApiMiddleware } from "@/utils/api";

interface ChatInterfaceProps {
  inModal?: boolean;
}

export default function ChatInterface({ inModal = false }: ChatInterfaceProps) {
  const { messages, input, handleInputChange, setMessages } = useChat({
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content:
          "Hello! I'm your SciTech & IP Law chatbot. How can I help you with your legal questions today?",
      },
    ],
    api: "/api/chat",

    onResponse(response) {
      console.log(response, "response");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    // Update messages with the user's message
    // @ts-ignore
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    handleInputChange({ target: { value: "" } } as any);

    try {
      const assistantResponse = await chatApiMiddleware([
        ...messages,
        userMessage,
      ]);

      setMessages((prevMessages) => [...prevMessages, assistantResponse]);
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };

  return (
    <div
      className={`flex flex-col ${
        inModal
          ? "h-[calc(600px-64px)]"
          : "h-[calc(100vh-12rem)] max-w-3xl mx-auto"
      }`}
    >
      <MessagesCard inModal={inModal} messages={messages} />
      <ChatForm
        input={input}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}
