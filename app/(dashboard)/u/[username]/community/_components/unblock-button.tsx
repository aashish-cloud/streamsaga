import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

export const UnblockButton = ({ userId }: { userId: string }) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) =>
          toast.success(`User ${data.blocked.username} is unblocked`)
        )
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <Button
      variant="link"
      size="sm"
      disabled={isPending}
      onClick={onClick}
      className="text-blue-500 w-full"
    >
      Unblock
    </Button>
  );
};
