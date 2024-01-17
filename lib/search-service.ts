import { getSelf } from "./auth-service";
import { prisma } from "./db";

export const getSearch = async (term: string) => {
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
          blocked: {
            none: {
              blockedId: userId,
            },
          },
          OR: [
            {
              username: {
                contains: term,
              },
            },
            {
              stream: {
                name: {
                  contains: term,
                },
              },
            },
          ],
        },
      },
      select: {
        name: true,
        thumbnailUrl: true,
        isLive: true,
        user: true,
      },
    });
  } else {
    streams = await prisma.stream.findMany({
      where: {
        OR: [
          {
            name: {
              contains: term,
            },
          },
          {
            user: {
              username: {
                contains: term,
              },
            },
          },
        ],
      },
      select: {
        name: true,
        thumbnailUrl: true,
        isLive: true,
        user: true,
      },
    });
  }

  return streams;
};
