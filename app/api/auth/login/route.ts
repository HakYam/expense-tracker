import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/app/models/User';
import connectDB from '@/app/libs/connectDB';
import createToken from '@/app/libs/createToken';

interface Body {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  console.log("Connecting to database");
  await connectDB();

  const body: Body = await req.json();
  const user = await User.findOne({ email: body.email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }
  if (!bcrypt.compareSync(body.password, user.password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  }
  const token = await createToken(user._id.toString());
  return NextResponse.json({ user: { id: user._id.toString(), name: user.name }, token });
}
