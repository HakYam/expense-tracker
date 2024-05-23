import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/libs/connectDB";
import Transaction from "@/app/models/Transaction";

interface Body {
  amount: number;
  name: string;
  userId: string;
  startDate: Date;
}

// Connect to the database
async function connectToDatabase() {
  try {
    await connectDB();
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Database connection failed");
  }
}

// Get transactions by userId
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const userId = request.cookies.get("userId")?.value;
    if (!userId) {
      return NextResponse.json({ error: "User ID not provided" }, { status: 400 });
    }
    const transactions = await Transaction.find({ userId });
    return NextResponse.json(transactions);
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}

// Create transaction by userId
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { name, amount, startDate, userId }: Body = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const transaction = await Transaction.create({
      name,
      amount,
      userId,
      startDate,
    });
    return NextResponse.json(transaction);

  } catch (err) {
    console.error("Error creating transaction:", err);
    return NextResponse.json({ error: "Internal Server Error", details: err.message }, { status: 500 });
  }
}
// Delete transactions by userId
export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase();
    const userId = request.cookies.get("userId")?.value;
    if (!userId) {
      return NextResponse.json({ error: "User ID not provided" }, { status: 400 });
    }
    await Transaction.deleteMany({ userId });
    return NextResponse.json({ message: "All transactions deleted" });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete transactions" }, { status: 500 });
  }
}
