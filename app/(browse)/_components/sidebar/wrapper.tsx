"use client";

import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { useIsClient } from "usehooks-ts";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { FollowingSkeleton } from "./following";

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const isClient = useIsClient();

  const { collapsed } = useSidebar((state) => state);

  if (!isClient) {
    return (
      <aside
        className={cn(
          "fixed left-0 w-[70px] lg:w-60 flex flex-col bg-background h-full border-r border-[#2D2E35] z-50"
        )}
      >
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "fixed left-0 w-60 flex flex-col bg-background h-full border-r border-[#2D2E35] z-50",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
