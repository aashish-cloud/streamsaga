import { prisma } from "./db";
import { getSelf } from "./auth-service";

export const getUsersYouFollow = async () => {
  try {
    const self = await getSelf();
    const usersYouFollow = await prisma.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          AND: [
            {
              blockedBy: {
                none: {
                  blockerId: self.id,
                },
              },
            },
            {
              blocked: {
                none: {
                  blockedId: self.id,
                },
              },
            },
          ],
        },
      },
      include: {
        following: {
          include: {
            stream: {
              select: {
                isLive: true,
              },
            },
          },
        },
      },
    });

    return usersYouFollow;
  } catch (error) {
    return [];
  }
};

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) throw new Error("User not found");

    if (self.id === otherUser.id) return true;

    const isFollowing = await prisma.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    return !!isFollowing;
  } catch (error) {
    return false;
  }
};

export const followUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) throw new Error("User not found!");

  if (otherUser.id === self.id) throw new Error("Cannot follow yourself");

  const existingFollow = await prisma.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (existingFollow) {
    throw new Error("Already following");
  }

  const follow = await prisma.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      follower: true,
      following: true,
    },
  });

  return follow;
};

export const unfollowUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) throw new Error("User not found!");

  if (otherUser.id === self.id) throw new Error("Cannot unfollow yourself");

  const existingFollow = await prisma.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (!existingFollow) {
    throw new Error("Not following");
  }

  const follow = await prisma.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  });

  return follow;
};
