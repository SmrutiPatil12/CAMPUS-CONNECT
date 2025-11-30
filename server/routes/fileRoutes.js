// server/routes/fileRoutes.js
import express from "express";
import { upload } from "../config/multerConfig.js";
import { uploadFile, getFiles, deleteFile } from "../controllers/fileController.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/", getFiles);
router.delete("/:id", deleteFile);

export default router;