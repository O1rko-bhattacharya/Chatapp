import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppStore } from "@/store";
import { useSocket } from "@/contexts/SocketContext";

const Logo = () => {
  const [newbroadcast, setNewbroadcast] = useState(false);
  const { directMessagesContacts } = useAppStore();
  const [bm, setBm] = useState("");
  const socket = useSocket();
  const { userInfo } = useAppStore();
  const f = async () => {
    directMessagesContacts.map((contact) => handleSendMessage(contact));
  };

  const handleSendMessage = async (contact) => {
    socket.emit("sendMessage", {
      sender: userInfo.id,
      content: bm,
      recipient: contact._id,
      messageType: "text",
      audioUrl: undefined,
      fileUrl: undefined,
    });
  };
  return (
    <>
      <div className="flex p-5  justify-start items-center gap-2">
        <span className="text-3xl font-semibold ">Messenger</span>
        <span className="text-2l px-3 mx-3">
          <Button onClick={() => setNewbroadcast(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
            >
              <path d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9"></path>
              <path d="M7.8 4.7a6.14 6.14 0 0 0-.8 7.5"></path>
              <circle cx="12" cy="9" r="2"></circle>
              <path d="M16.2 4.8c2 2 2.26 5.11.8 7.47"></path>
              <path d="M19.1 1.9a9.96 9.96 0 0 1 0 14.1"></path>
              <path d="M9.5 18h5"></path>
              <path d="m8 22 4-11 4 11"></path>
            </svg>
          </Button>
        </span>
      </div>
      <Dialog open={newbroadcast} onOpenChange={setNewbroadcast}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogDescription className="hidden">
            Write message
          </DialogDescription>
          <DialogHeader>
            <DialogTitle>New Broadcast </DialogTitle>
          </DialogHeader>
          <div>
            <Input
              placeholder="Broadcast message"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => setBm(e.target.value)}
            />
          </div>
          <button className="text-white bg-green-500" onClick={() => f()}>
            Send
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Logo;
