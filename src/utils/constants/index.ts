interface InitialMessage {
  id: string;
  role: "assistant" | "data" | "system" | "user";
  content: string;
}

export const initialMessage: InitialMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "I’m your virtual assistant, here to help you navigate the intersection of innovation, law, and business. Whether you're developing new technologies, managing federal research funding, protecting your intellectual property, or launching a startup—we’re here to support your mission. How can I assist you today?",
  },
];
