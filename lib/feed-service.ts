import { getSelf } from "./auth-service";
import { prisma } from "./db";

export const getStreams = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let streams = [];

  if (userId) {
    streams = await prisma.stream.findMany({
      where: {
        user: {
          NOT: {
            blocked: {
              some: {
                blockedId: userId,
              },
            },
          },
        },
      },
      select: {
        user: true,
        id: true,
        isLive: true,
        name: true,
        thumbnailUrl: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
      ],
    });
  } else {
    streams = await prisma.stream.findMany({
      select: {
        user: true,
        id: true,
        isLive: true,
        name: true,
        thumbnailUrl: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
      ],
    });
  }

  return streams;
};
