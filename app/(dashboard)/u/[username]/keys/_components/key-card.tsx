"use client";

import { Input } from "@/components/ui/input";
import CopyButton from "./copy-button";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface KeyCardProps {
  value: string | null;
}

const KeyCard = ({ value }: KeyCardProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="p-6 bg-muted rounded-xl">
      <div className="flex items-center gap-x-10">
        <p className="font-semibold shrink-0">Stream Key</p>
        <div className="flex w-full space-x-2">
          <Input
            value={value || ""}
            type={show ? "text" : "password"}
            disabled
            placeholder="Stream Key"
          />
          <CopyButton value={value || ""} />
          {value && (
            <Button onClick={() => setShow(!show)} size="sm" variant="link">
              {show ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeyCard;
