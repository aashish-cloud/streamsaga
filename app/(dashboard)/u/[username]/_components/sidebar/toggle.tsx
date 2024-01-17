"use client";

import { Button } from "@/components/ui/button";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Hint } from "@/components/hint";

export const Toggle = () => {
  const { collapsed, onExpand, onCollapse } = useCreatorSidebar((state) => state);

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <div>
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
          <Hint label={label} side="left" asChild>
            <Button onClick={onExpand} className="h-auto p-2" variant="ghost">
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="hidden lg:flex items-center w-full p-3 pl-6 mb-2">
          <p className="text-primary text-semibold">Dashboard</p>
          <Hint label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              className="h-auto p-2 ml-auto"
              variant="ghost"
            >
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </div>
  );
};
