import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import {
  getCollegeProfile,
  saveCollegeProfile,
  uploadProfileDocument,
} from "../controllers/collegeProfile.controller.js";

const router = express.Router();

router.get("/profile", authMiddleware, getCollegeProfile);
router.post("/profile", authMiddleware, saveCollegeProfile);

// 🔥 THIS LINE IS CRITICAL
router.post(
  "/profile/documents/:type",
  authMiddleware,
  upload.single("file"), // MUST BE "file"
  uploadProfileDocument
);

export default router;
