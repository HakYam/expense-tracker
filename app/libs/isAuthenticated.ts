import { NextRequest } from "next/server";
import * as jose from "jose";

export default async function isAuthenticated(req: NextRequest) {
  const authorizationHeader = req.headers.get("authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    console.error("Authorization header is missing or incorrect");
    return null;
  }

  const token = authorizationHeader.replace("Bearer ", "");
  const JWT_SECRET = process.env.JWT_SECRET as string;

  if (!JWT_SECRET) {
    console.error("JWT_SECRET is not defined");
    return null;
  }

  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );

    const userId = payload.userId as string;
    return userId;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
