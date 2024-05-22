// isAuth function

import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export default async function isAuthenticated(req: NextRequest) {
  const authorizationHeader = req.headers.get("authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return false;
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
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
