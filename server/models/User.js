// server/src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: { type: String, unique: true, index: true },
    passwordHash: String,            // for email login
    provider: { type: String, enum: ["google", "github", "local"], default: "local" },
    avatar: String,
    roles: [{ type: String, default: "contributor" }]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
