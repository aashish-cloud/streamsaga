"use client";

import { useMediaQuery } from "usehooks-ts";
import { useEffect } from "react";
import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";

export const Container = ({ children }: { children: React.ReactNode }) => {
  const matches = useMediaQuery("(min-width: 1024px)");
  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);

  useEffect(() => {
    if (matches) {
      onExpand();
    } else {
      onCollapse();
    }
  }, [matches]);

  return (
    <div className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}>
      {children}
    </div>
  );
};
