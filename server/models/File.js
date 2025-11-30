// server/models/File.js
import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true },
    uploadedBy: { type: String, default: "Guest User" }
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);
export default File;