"use client";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

import { useState } from "react";
import { SendHorizonal } from "lucide-react";
import { ChatInfo } from "./chat-info";

interface ChatFormProps {
  onSubmit: () => void;
  onChange: (value: string) => void;
  value: string;
  isHidden: boolean;
  isFollowersOnly: boolean;
  isDelayed: boolean;
  isFollowing: boolean;
}

export const ChatForm = ({
  onSubmit,
  onChange,
  value,
  isHidden,
  isFollowersOnly,
  isDelayed,
  isFollowing,
}: ChatFormProps) => {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);

  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
  const isDisabled =
    isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    }

    if (!isDelayed) {
      onSubmit();
    }
  };

  if (isHidden) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-end space-x-1 p-3"
    >
      <div className="w-full">
        <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
        <Input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={isDisabled}
          placeholder="Send a message"
          className={cn(
            "border-white/10",
            (isFollowersOnly || isDelayed) && "border-t-0 rounded-t-none"
          )}
        />
      </div>
      <Button type="submit" variant="ghost" size="sm" disabled={isDisabled}>
        <SendHorizonal />
      </Button>
    </form>
  );
};

export const ChatFormSkeleton = () => {
  return (
    <div className="flex w-full items-center space-x-1 p-3">
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
