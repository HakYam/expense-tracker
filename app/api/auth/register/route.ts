import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/app/models/User';
import createToken from '@/app/libs/createToken';
import connectDB from '@/app/libs/connectDB';

interface Body {
  name: string;
  password: string;
  confirmPassword?: string;
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body: Body = await request.json();

    // Delete the password confirmation field from the body
    delete body.confirmPassword;

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(body.password, 12);

    // Add the user to the database
    const user = await User.create({
      name: body.name,
      password: hashedPassword,
      email: body.email,
    });

    // Generate an authentication token from the user ID
    const token = await createToken(user._id.toString());
    return NextResponse.json({ user: { id: user._id.toString(), name: user.name }, token });
  } catch (error) {
    console.error('Error in POST /api/auth/register:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
