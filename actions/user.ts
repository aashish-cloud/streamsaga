"use server";

import { getSelf } from "@/lib/auth-service";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

type FieldType = "bio";

interface UpdateUserProps {
  field: FieldType;
  value: string | null;
}

export const updateUser = async ({ field, value }: UpdateUserProps) => {
  const self = await getSelf();

  const user = await prisma.user.update({
    where: { id: self.id },
    data: { [field]: value },
  });

  revalidatePath(`/${self.username}`);
  revalidatePath(`/u/${self.username}`);

  return user;
};
