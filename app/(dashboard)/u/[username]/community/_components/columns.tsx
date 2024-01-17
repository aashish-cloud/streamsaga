"use client";

import { UserAvatar } from "@/components/user-avatar";
import { ColumnDef } from "@tanstack/react-table";
import { UnblockButton } from "./unblock-button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export type BlockedUser = {
  userId: string;
  imageUrl: string;
  username: string;
  createdAt: string;
};

export const columns: ColumnDef<BlockedUser>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="pl-3 flex items-center gap-x-2">
          <UserAvatar
            username={row.original.username}
            imageUrl={row.original.imageUrl}
          />
          <span>{row.original.username}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date blocked
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => <div className="pl-4">{row.original.createdAt}</div> 
  },
  {
    id: "actions",
    header: () => <div className="w-full text-center">Action</div>,
    cell: ({ row }) => <UnblockButton userId={row.original.userId} />,
  },
];
