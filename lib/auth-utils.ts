import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

class AuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "AuthError";
  }
}

export async function ensureAuthenticated() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new AuthError("Unauthorized", 401);
  }

  return session;
}
