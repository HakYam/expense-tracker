//mongoos schema
import mongoose from "mongoose";
interface User {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema<User>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true, minlength: 6 },
}, {
    timestamps: true
});

//mongoos model (name, schema)
export default mongoose.models.User || mongoose.model<User>("User", userSchema);