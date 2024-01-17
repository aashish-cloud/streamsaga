"use server";

import { getSelf } from "@/lib/auth-service";
import { isBlockedByUser } from "@/lib/block-service";
import { getUserById } from "@/lib/user-service";
import { AccessToken } from "livekit-server-sdk";
import { v4 } from "uuid";

export const createViewerToken = async (hostidentity: string) => {
  let self;

  try {
    self = await getSelf();
  } catch {
    const id = v4();
    const username = `guest#${Math.floor(Math.random() * 1000)}`;
    self = { id, username };
  }

  const host = await getUserById(hostidentity);

  if (!host) throw new Error("User not found!");

  const isBlocked = await isBlockedByUser(host.id);

  if (isBlocked) throw new Error("User is blocked!");

  const isHost = self.id === host.id;

  const participantIdentity = isHost ? `host-${self.id}` : self.id;
  const participantName = self.username;

  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: participantIdentity,
      name: participantName,
    }
  );

  at.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return await Promise.resolve(at.toJwt());
};
