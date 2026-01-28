import express from "express";
import {
  applyAdmission,
  getAdmissions,
  approveAdmission,
  rejectAdmission,
} from "../controllers/admission.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/apply", applyAdmission); // PUBLIC (students)
router.get("/", authMiddleware, getAdmissions); // 🔥 REQUIRED
router.patch("/:id/approve", authMiddleware, approveAdmission);
router.patch("/:id/reject", authMiddleware, rejectAdmission);

export default router;
