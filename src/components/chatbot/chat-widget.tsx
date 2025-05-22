import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import ChatInterface from "./chat-interface";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size="icon"
        className="h-14 w-14 rounded-full fixed bottom-6 right-6 shadow-lg z-50"
      >
        <img src="/assets/logo.png" alt="logo" width={44} height={44} />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[500px] h-[600px] p-0 gap-0">
          <DialogHeader className="px-4 py-2 border-b flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <MessageSquare className="h-4 w-4" />
              </div>
              <DialogTitle>AI Assistant</DialogTitle>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-hidden h-full">
            <ChatInterface inModal={true} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
