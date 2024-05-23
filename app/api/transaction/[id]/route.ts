import connectDB from "@/app/libs/connectDB";
import Transaction from "@/app/models/Transaction";
import { NextResponse, NextRequest } from "next/server";

interface Params {
    id: string;
}

interface Body {
    name: string;
    amount: number;
    startDate: Date;
}

// get trans by id
export async function GET(request: NextRequest, { params }: { params: Params }) {
    try {
        await connectDB();
        const transaction = await Transaction.findById(params.id);
        if (!transaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }
        return NextResponse.json(transaction);
    } catch (err) {
        console.error("Error fetching transaction by ID:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// update trans by id
export async function PUT(request: NextRequest, { params }: { params: Params }) {
    try {
        await connectDB();
        const { name, amount, startDate }: Body = await request.json();
        const transaction = await Transaction.findByIdAndUpdate(
            params.id,
            {
                name,
                amount,
                startDate,
            },
            { new: true }
        );
        if (!transaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }
        return NextResponse.json(transaction);
    } catch (err) {
        console.error("Error updating transaction by ID:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
