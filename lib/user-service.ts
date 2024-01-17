import { prisma } from "./db";

export const getUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true, 
      bio: true, 
      imageUrl: true,
      externalUserId: true,
      stream: {
        select: {
          id: true,
          isLive: true,
          isChatDelayed: true,
          isChatEnabled: true,
          isChatFollowersOnly: true,
          thumbnailUrl: true,
          name: true,
        }
      },
      _count: {
        select: {
          follower: true,
        },
      },
    },
  });

  return user;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      stream: true,
    },
  });

  return user;
};
