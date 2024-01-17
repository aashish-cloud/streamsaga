import { prisma } from "./db";
import { currentUser } from "@clerk/nextjs";
import { getUserByUsername } from "./user-service";

export const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      externalUserId: self.id,
    },
  });

  if (!user) throw new Error("User not found!");

  return user;
};

//So you don't access someone else's dashboard
export const getSelfByUsername = async (username: string) => {
  const self = await currentUser();

  if (!self || !self.username) throw new Error("Unauthorized");

  const user = await getUserByUsername(username);

  if (!user) throw new Error("No user found");

  if (self.id !== user.externalUserId) throw new Error("Unauthorized");

  return user;
};
