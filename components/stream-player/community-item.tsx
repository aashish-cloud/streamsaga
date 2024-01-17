"use client";

import { MinusCircle } from "lucide-react";
import { Hint } from "../hint";
import { cn } from "@/lib/utils";
import stc from "string-to-color";
import { Button } from "../ui/button";
import { onBlock } from "@/actions/block";
import { useTransition } from "react";
import { toast } from "sonner";

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

export const CommunityItem = ({
  hostName,
  viewerName,
  participantIdentity,
  participantName,
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition();

  const color = stc(participantName || "");
  const isSelf = participantName === viewerName;
  const isHost = hostName === viewerName;

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return;

    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => toast.success(`Blocked ${participantName}`))
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <p style={{ color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block">
          <Button
            disabled={isPending}
            variant="ghost"
            className="h-auto w-auto opacity-0 group-hover:opacity-100 p-1 transition"
            onClick={handleBlock}
          >
            <MinusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
};
