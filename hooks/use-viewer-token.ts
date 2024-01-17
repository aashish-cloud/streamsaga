import { createViewerToken } from "@/actions/token";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { JwtPayload, jwtDecode } from "jwt-decode";

export const useViewerToken = (hostidentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostidentity);
        setToken(viewerToken);

        const decodedToken: JwtPayload & {
          name?: string;
        } = jwtDecode(viewerToken);

        const name = decodedToken.name;
        const identity = decodedToken.jti;

        if (name) setName(name);
        if (identity) setIdentity(identity);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    };

    createToken();
  }, [hostidentity]);

  return { token, name, identity };
};
