import { cn } from "@/lib/utils";

interface LiveBadgeProps {
  className?: string;
}

export const LiveBadge = ({ className }: LiveBadgeProps) => {
  return (
    <div
      className={cn(
        "bg-rose-500 rounded text-[10px] uppercase p-0.5 px-1.5 text-center border border-background font-semibold tracking-wide",
        className
      )}
    >
      Live
    </div>
  );
};
