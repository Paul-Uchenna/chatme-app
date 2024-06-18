"use client";

import UseConversation from "@/app/Hooks/UseConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = UseConversation();

  useEffect(() => {
    if (!conversationId) {
      console.error("No conversation ID found");
      return;
    }

    const markAsSeen = async () => {
      try {
        await axios.post(`/api/conversations/${conversationId}/seen`);
      } catch (error) {
        console.error("Failed to mark as seen", error);
      }
    };

    markAsSeen();
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, index) => (
        <MessageBox
          isLast={index === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
