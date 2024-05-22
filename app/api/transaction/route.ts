import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/libs/connectDB";
import Transaction from "@/app/models/Transaction";

interface Body {
  amount: number;
  name: string;
  userId: string;
  startDate: Date;
}

//get trans by userId
export async function GET(request: NextRequest) {
  try {
     connectDB();
    const userId = request.cookies.get("userId")?.value;
    const transactions = await Transaction.find({ userId });
    // return trans as a NextResponse
    return NextResponse.json(transactions);
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 500 });
  }
}

// create trans by userId
export async function POST(request: NextRequest) {
  try {
    connectDB();
    const { name, amount, startDate }: Body = await request.json();
    const userId = request.cookies.get("userId")?.value;

    const transaction = await Transaction.create({
      name,
      amount,
      userId,
      startDate,
    });
    return NextResponse.json(transaction);

  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 500 });
  }
}

// delete trans by userId
export async function DELETE(request: NextRequest) {
  try {
    connectDB();
    const userId = request.cookies.get("userId")?.value;
    await Transaction.deleteMany({ userId });
    return NextResponse.json({ message: "All transactions deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 500 });
  }
}
