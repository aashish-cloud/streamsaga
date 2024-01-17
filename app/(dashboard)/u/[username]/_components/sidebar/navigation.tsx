"use client";

import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import NavItem from "./nav-item";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";

const Navigation = () => {
  const path = usePathname();
  const { user } = useUser();

  if(!user?.username) {
    return <ul className="space-y-4 px-2 pt-4 lg:pt-0">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-12 w-full"/>
      ))}
    </ul>
  }

  const routes = [
    {
      label: "Stream",
      href: `/u/${user?.username}`,
      icon: Fullscreen,
    },
    {
      label: "Keys",
      href: `/u/${user?.username}/keys`,
      icon: KeyRound,
    },
    {
      label: "Chat",
      href: `/u/${user?.username}/chat`,
      icon: MessageSquare,
    },
    {
      label: "Community",
      href: `/u/${user?.username}/community`,
      icon: Users,
    },
  ];

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route, index) => (
        <NavItem
          key={index}
          label={route.label}
          href={route.href}
          icon={route.icon}
          isActive={path === route.href}
        />
      ))}
    </ul>
  );
};

export default Navigation;
