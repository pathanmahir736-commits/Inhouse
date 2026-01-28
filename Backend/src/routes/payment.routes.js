import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { payFees, getPayments } from "../controllers/payment.controller.js";

const router = express.Router();

// 🔥 COLLECT FEE
router.post(
  "/payments/collect/:admissionId",
  authMiddleware,
  payFees
);

// 🔥 GET PAYMENTS
router.get(
  "/payments",
  authMiddleware,
  getPayments
);

export default router;
