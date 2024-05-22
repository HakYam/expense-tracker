//mongoose schema
import mongoose from "mongoose";

interface Transaction {
  _id: mongoose.Types.ObjectId;
  amount: number;
  name: string;
  userId: mongoose.Schema.Types.ObjectId;
  startDate: Date;
}

const TransactionSchema = new mongoose.Schema<Transaction>(
  {
    amount: { type: Number, required: true },
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    startDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

//mongos model (name, schema)
export default mongoose.models.Transaction || mongoose.model<Transaction>("User", TransactionSchema);
