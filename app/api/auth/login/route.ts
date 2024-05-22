import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcryptjs");
import User from "@/app/models/User";
import connectDB from "@/app/libs/connectDB";
import createToken from "@/app/libs/createToken";

interface Body {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
    console.log("Connecting to database");
    await connectDB();

  const body: Body = await request.json();
  const user = await User.findOne({ email: body.email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }
  if (!bcrypt.compareSync(body.password, user.password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  }
  const token = createToken(user._id.toString());
  return NextResponse.json({ user, token });
}
