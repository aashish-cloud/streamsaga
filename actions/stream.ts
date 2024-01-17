"use server";

import { getSelf } from "@/lib/auth-service";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly" | "thumbnailUrl" | "name";

interface UpdateStreamProps {
  field: FieldTypes;
  value: boolean | string | null;
}

export const updateStream = async ({ field, value }: UpdateStreamProps) => {
  try {
    const self = await getSelf();
    const selfStream = await prisma.stream.findUnique({
      where: {
        userId: self.id,
      },
    });

    if (!selfStream) throw new Error("Stream not found!");

    const stream = await prisma.stream.update({
      where: {
        id: selfStream.id,
      },
      data: {
        [field]: value,
      },
    });

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return stream;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};
