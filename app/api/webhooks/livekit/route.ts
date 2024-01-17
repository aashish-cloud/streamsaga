import { prisma } from "@/lib/db";
import { WebhookReceiver } from "livekit-server-sdk";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const receiver = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
  );

  const body = await req.text();
  const headerPayload = headers();
  const authorization = headerPayload.get("authorization");

  if (!authorization)
    return new Response("No authorization header", { status: 400 });

  const event = receiver.receive(body, authorization);

  const stream = await prisma.stream.findFirst({
    where: {
      ingressId: event.ingressInfo?.ingressId,
    },
  });

  if (!stream)
    return new Response("No stream found corresponding to the given ingress!", {
      status: 400,
    });

  if (event.event === "ingress_started") {
    await prisma.stream.update({
      where: {
        id: stream.id,
      },
      data: {
        isLive: true,
      },
    });
  }

  if (event.event === "ingress_ended") {
    await prisma.stream.update({
      where: {
        id: stream.id,
      },
      data: {
        isLive: false,
      },
    });
  }
  
  return new Response("", { status: 200 });
}
