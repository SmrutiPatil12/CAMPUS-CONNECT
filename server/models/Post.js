// server/models/Post.js  ← UPDATE THIS
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["General Discussion", "Doubts & Help", "Project Showcase", "Tech News"],
      default: "General Discussion"
    },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);