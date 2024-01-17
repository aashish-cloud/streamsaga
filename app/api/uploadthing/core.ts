import { getSelf } from "@/lib/auth-service";
import { prisma } from "@/lib/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  thumbnailUploader: f({
      image: {
        maxFileSize: "4MB",
        maxFileCount: 1,
      },
    })
    .middleware(async () => {
      const self = await getSelf();
      return { userId: self.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.stream.update({
        where: {
          userId: metadata.userId,
        },
        data: {
          thumbnailUrl: file.url,
        },
      });

      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
