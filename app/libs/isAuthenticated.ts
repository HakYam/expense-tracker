import { NextRequest } from "next/server";
import * as jose from "jose";

export default async function isAuthenticated(req: NextRequest) {
  const authorizationHeader = req.headers.get("authorization");
  console.log("Authorization Header Received:", authorizationHeader);
  console.log("JWT_SECRET in isAuthenticated:", process.env.JWT_SECRET);

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    console.error("Authorization header is missing or incorrect");
    return null;
  }

  const token = authorizationHeader.replace("Bearer ", "");
  const JWT_SECRET = process.env.JWT_SECRET as string;

  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );

    const userId = payload.userId as string;
    return userId;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}
