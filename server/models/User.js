import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  role: { 
    type: String, 
    enum: ["student", "faculty", "authority"], 
    default: "student" 
  },
  avatar: String,
});

export default mongoose.model("User", userSchema);
