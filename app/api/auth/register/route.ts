import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/User";
import createToken from "../../../libs/createToken";
import connectDB from "@/app/libs/connectDB";

interface Body {
  username: string;
  password: string;
  confirmPassword?: string;
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body: Body = await request.json();

    
    // if (body.password !== body.confirmPassword) {
    //   return NextResponse.json(
    //     { error: "Passwords do not match" },
    //     { status: 400 }
    //   );
    // }

    // Delete the password confirmation field from the body
    delete body.confirmPassword;

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(body.password, 12);

    // Add the user to the database
    const user = await User.create({
      username: body.username,
      password: hashedPassword,
      email: body.email,
    });

    // Generate an authentication token from the user ID
    const token = createToken(user._id.toString());
    return NextResponse.json({ user, token });
  } catch (error) {
    console.error('Error in POST /api/auth/register:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
