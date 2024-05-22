import mongoose from "mongoose";

interface User {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  name: string;
}

const userSchema = new mongoose.Schema<User>(
  {
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true, minlength: 3 },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model<User>("User", userSchema);
