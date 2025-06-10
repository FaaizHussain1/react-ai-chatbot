import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import ChatInterface from "./chat-interface";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size="icon"
        className="h-14 w-14 rounded-full fixed bottom-6 right-6 shadow-lg z-50 bg-[#104D96]"
      >
        <img src="/assets/logo.png" alt="logo" width={44} height={44} />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[525px] md:max-w-[600px] h-[600px] p-0 gap-0 border-none">
          <DialogHeader className="px-6 py-4 bg-gradient-to-r from-[#02276B] to-[#161139] flex flex-row items-center justify-start border-b gap-3">
            <div className="relative">
              <img
                src="https://placehold.co/600x600?text=VA"
                alt="Virtual Assistant Avatar"
                className="h-12 w-12 rounded-full border-2 border-white/20"
              />
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></div>
            </div>
            <div className="flex flex-col">
              <DialogTitle className="text-white text-xl font-medium">
                Virtual Assistant
              </DialogTitle>
              <p className="text-gray-200 text-sm">Admin Support</p>
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
