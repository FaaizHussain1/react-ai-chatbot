/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatFormProps {
  input: string;
  handleSubmit: (e?: any) => void;
  handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const ChatForm: React.FC<ChatFormProps> = ({
  input,
  handleSubmit,
  handleInputChange,
}) => {
  return (
    <form onSubmit={handleSubmit} className="relative">
      <Textarea
        placeholder="Ask a legal question..."
        className="min-h-24 resize-none pr-14 py-3"
        value={input}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <Button
        type="submit"
        size="icon"
        className="absolute right-2 bottom-2"
        disabled={!input.trim()}
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
export default ChatForm;
