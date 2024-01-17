import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import Link from "next/link";

interface NavItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
}

const NavItem = ({ label, href, icon: Icon, isActive }: NavItemProps) => {
  const { collapsed } = useCreatorSidebar();

  return (
    <div>
      <Button
        asChild
        variant="ghost"
        className={cn(
          "w-full h-12",
          collapsed ? "justify-center" : "justify-start",
          isActive && "bg-accent"
        )}
      >
        <Link href={href}>
          <div className="flex items-center gap-x-4">
            <Icon className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
            {!collapsed && <span>{label}</span>}
          </div>
        </Link>
      </Button>
    </div>
  );
};

export default NavItem;
