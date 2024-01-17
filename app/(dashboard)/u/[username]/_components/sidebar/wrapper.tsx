"use client";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useCreatorSidebar((state) => state);
  return (
    <aside
      className={cn(
        "fixed left-0 h-full w-60 bg-background border-r border-[#2D2E35] z-50 flex flex-col",
        collapsed ? "w-[70px]" : "w-[70px] lg:w-60" 
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
