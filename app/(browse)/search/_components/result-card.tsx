import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { VerifiedMark } from "@/components/verified-mark";
import { Stream, User } from "@prisma/client";
import Link from "next/link";

interface ResultCardProps {
  data: {
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    user: User;
  };
}

export const ResultCard = ({ data }: ResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="w-full flex gap-x-4">
        <div className="w-[16rem] h-[9rem]">
          <Thumbnail
            src={data.thumbnailUrl}
            fallback={data.user.imageUrl}
            isLive={data.isLive}
            username={data.user.username}
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <p className="text-lg font-bold text-primary hover:text-blue-600 cursor-pointer">
              {data.user.username}
            </p>
            <VerifiedMark />
          </div>
          <p className="text-muted-foreground text-sm">{data.name}</p>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="w-full flex gap-x-4">
      <div className="w-[16rem] h-[9rem] relative">
        <ThumbnailSkeleton />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
};
