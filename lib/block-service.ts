import { prisma } from "./db";
import { getSelf } from "./auth-service";

// Checks if the currently logged in user is blocked by any specific user that we are loading

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) throw new Error("User does not exist");

    if (otherUser.id === self.id) return false;

    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: otherUser.id,
        blockedId: self.id,
      },
    });

    return !!existingBlock;
  } catch (error) {
    return false;
  }
};

export const blockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) throw new Error("Can't block yourself");

  const otherUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) throw new Error("No user found");

  const existingBlock = await prisma.block.findFirst({
    where: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
  });

  if (existingBlock) throw new Error("Already blocked");

  const block = await prisma.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: {
      blocker: true,
      blocked: true,
    },
  });

  return block;
};

export const unblockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) throw new Error("Can't unblock yourself");

  const otherUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) throw new Error("No user found");

  const existingBlock = await prisma.block.findFirst({
    where: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
  });

  if (!existingBlock) throw new Error("Already unblocked");

  const unblock = await prisma.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocker: true,
      blocked: true,
    },
  });

  return unblock;
};

export const getBlockedUsers = async () => {
  const self = await getSelf();

  const blockedUsers = await prisma.block.findMany({
    where: {
      blockerId: self.id,
    },
    include: {
      blocked: true,
    },
  });

  return blockedUsers;
};
