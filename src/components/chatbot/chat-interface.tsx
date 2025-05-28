/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type React from "react";
import { useChat } from "@ai-sdk/react";
import ChatForm from "./chat-form";
import MessagesCard from "./messages-card";
import { chatApiMiddleware } from "@/utils/api";

interface ChatOption {
  id: string;
  text: string;
  value: string;
}

interface ChatInterfaceProps {
  inModal?: boolean;
}

// Predefined options for the SciTech & IP Law Firm
const INITIAL_OPTIONS: ChatOption[] = [
  {
    id: "1",
    text: "I'm launching a new product, app, or service",
    value: "launching",
  },
  {
    id: "2",
    text: "I want to protect a new invention or idea",
    value: "invention",
  },
  { id: "3", text: "I'm creating or using creative content", value: "content" },
  {
    id: "4",
    text: "I want to protect my brand, name, or logo",
    value: "brand",
  },
  {
    id: "5",
    text: "I'm working with federal funding, tech transfer, or regulated R&D",
    value: "federal",
  },
  {
    id: "6",
    text: "I'm not sure — I need general guidance or a consultation",
    value: "guidance",
  },
  {
    id: "7",
    text: "I'm not sure — I need documentation for the list of services you provide",
    value: "pdf",
  },
];

export default function ChatInterface({ inModal = false }: ChatInterfaceProps) {
  const { messages, input, handleInputChange, setMessages } = useChat({
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: `Welcome to The SciTech & IP Law Firm — Where Strategy Meets Science.

I'm your virtual assistant, here to help you navigate the intersection of innovation, law, and business. Whether you're developing new technologies, managing federal research funding, protecting your intellectual property, or launching a startup—we're here to support your mission.

How can I assist you today?
(Choose an option to get started or ask a question below.)`,
        // @ts-ignore - Adding custom properties for options
        options: INITIAL_OPTIONS,
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

  const handleOptionSelect = async (option: ChatOption) => {
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: option.text,
    };

    // Update messages with the user's selection
    // @ts-ignore
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Create a contextual message for the AI based on the selection
      const contextualMessage = {
        id: (Date.now() + 1).toString(),
        role: "user",
        content: `User selected option: ${option.value} - ${option.text}. Please provide appropriate follow-up questions and service recommendations based on this selection for The SciTech & IP Law Firm.`,
      };

      const assistantResponse = await chatApiMiddleware([
        ...messages,
        userMessage,
        contextualMessage,
      ]);

      const responseWithActions = {
        ...assistantResponse,
        showEstimateButton: option.value === "guidance",
        showConsultationButton: option.value === "pdf" ? false : true,
        showPDFButton: option.value === "pdf",
      };

      setMessages((prevMessages) => [...prevMessages, responseWithActions]);
    } catch (error) {
      console.error("Error handling option selection:", error);
    }
  };

  const handleEstimateRequest = () => {
    const estimateMessage = {
      id: Date.now().toString(),
      role: "assistant",
      content: `Perfect! I'll redirect you to our secure intake form where you can provide a few additional details about your needs. Based on your responses, you'll receive a personalized estimate within 24 hours.

Our estimates include:
• Transparent flat fees or milestone-based pricing
• Clear timelines and deliverables
• Recommended legal actions aligned with your goals

Would you like me to open the estimate form for you?`,
    };

    // @ts-ignore
    setMessages((prevMessages) => [...prevMessages, estimateMessage]);

    // In a real implementation, this would redirect to the Microsoft Form
    console.log("Redirecting to estimate form...");
    // window.open('https://forms.office.com/your-form-url', '_blank');
  };

  const handleConsultationRequest = () => {
    const consultationMessage = {
      id: Date.now().toString(),
      role: "assistant",
      content: `Excellent choice! I'll connect you with our scheduling system where you can book a free 15-30 minute consultation with one of our legal strategists.

During your consultation, we'll discuss:
• Your current innovation or business goals
• Legal priorities and potential challenges
• Recommended next steps and timeline
• How our services can support your mission

Would you like me to open the scheduling system for you?`,
    };

    // @ts-ignore
    setMessages((prevMessages) => [...prevMessages, consultationMessage]);

    // In a real implementation, this would open the scheduling system
    console.log("Opening scheduling system...");
    // window.open('https://calendly.com/your-scheduling-link', '_blank');
  };

  return (
    <div
      className={`flex flex-col ${
        inModal
          ? "h-[calc(600px-64px)]"
          : "h-[calc(100vh-12rem)] max-w-3xl mx-auto"
      }`}
    >
      <MessagesCard
        inModal={inModal}
        messages={messages}
        onOptionSelect={handleOptionSelect}
        onEstimateRequest={handleEstimateRequest}
        onConsultationRequest={handleConsultationRequest}
      />
      <ChatForm
        input={input}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}
