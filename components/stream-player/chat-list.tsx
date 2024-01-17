"use client";

import { ReceivedChatMessage } from "@livekit/components-react";
import { ChatMessage } from "./chat-message";
import { Skeleton } from "../ui/skeleton";

interface ChatListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}

export const ChatList = ({ isHidden, messages }: ChatListProps) => {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex items-center flex-1 justify-center">
        <p className="text-muted-foreground text-sm">
          {isHidden ? "Chat is disabled" : "Welcome to the chat!"}
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col-reverse flex-1 overflow-y-auto p-3 h-full">
      {messages.map((message) => (
        <ChatMessage key={message.timestamp} data={message} />
      ))}
    </div>
  );
};

export const ChatListSkeleton = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="w-1/2 h-6" />
    </div>
  );
};
