"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRef, useState, useTransition } from "react";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";
import { Hint } from "../hint";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}

export const InfoModal = ({
  initialName,
  initialThumbnailUrl,
}: InfoModalProps) => {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

  const closeRef = useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = useTransition();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStream({ field: "name", value: name })
        .then(() => {
          toast.success("Stream updated");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  const onRemove = () => {
    startTransition(() => {
      updateStream({ field: "thumbnailUrl", value: null })
        .then(() => {
          toast.success("Thumbnail removed");
          setThumbnailUrl("");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Edit stream info</DialogTitle>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                onChange={onChange}
                placeholder="Stream name"
                value={name}
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <Label>Thumbnail</Label>
              {thumbnailUrl ? (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                  <div className="absolute top-2 right-2 z-[10]">
                    <Hint label="Remove thumbnail" asChild side="left">
                      <Button
                        type="button"
                        disabled={isPending}
                        onClick={onRemove}
                        className="h-auto w-auto p-1.5"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </Hint>
                  </div>
                  <Image
                    alt="Thumbnail"
                    src={thumbnailUrl}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="rounded-xl border outline-dashed outline-muted">
                  <UploadDropzone
                    endpoint="thumbnailUploader"
                    onClientUploadComplete={(res) => {
                      console.log(res);
                      setThumbnailUrl(res?.[0].url);
                      router.refresh();
                      closeRef?.current?.click();
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <DialogClose ref={closeRef} asChild>
                <Button variant="secondary" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button variant="primary" type="submit" disabled={isPending}>
                Save
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
