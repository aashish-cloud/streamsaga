import { SignInButton, currentUser, UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import { Clapperboard } from "lucide-react";

export const Actions = async () => {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-end">
      {!user && <SignInButton>
        <Button size="sm" variant="primary">Login</Button>
        </SignInButton>}
      {!!user && (
        <div className="flex items-center gap-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link className="flex" href={`/u/${user.username}`}>
              <Clapperboard className="h-5 w-5 lg:mr-2"/>
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <UserButton afterSignOutUrl="/"/>
        </div>
      )}
    </div>
  );
};
