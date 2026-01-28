import Payment from "../models/Payment.model.js";
import Admission from "../models/Admission.model.js";
import Course from "../models/Course.model.js";
import mongoose from "mongoose";

/* ================================
   COLLECT / PAY FEES
================================ */
export const payFees = async (req, res) => {
  try {
    const { admissionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(admissionId)) {
      return res.status(400).json({ message: "Invalid admissionId" });
    }

    const admission = await Admission.findById(admissionId);

    if (!admission || admission.status !== "approved") {
      return res.status(400).json({ message: "Invalid admission" });
    }

    const payment = await Payment.findOne({ admissionId });

    if (!payment) {
      return res.status(404).json({ message: "Payment record missing" });
    }

    if (payment.status === "PAID") {
      return res.status(400).json({ message: "Already paid" });
    }

    payment.paidAmount = payment.totalAmount;
    payment.status = "PAID";

    await payment.save();

    admission.feeCollected = true;
    await admission.save();

    res.json(payment);
  } catch (err) {
    console.error("PAY FEES ERROR:", err);
    res.status(500).json({ message: "Payment failed" });
  }
};

/* ================================
   GET ALL PAYMENTS (COLLEGE)
================================ */
export const getPayments = async (req, res) => {
  try {
    const collegeId = req.user.collegeId;

    const payments = await Payment.find({ collegeId })
      .populate({
        path: "admissionId",
        select: "email studentName courseId",
        populate: {
          path: "courseId",
          select: "name fees",
        },
      })
      .sort({ createdAt: -1 });

    const ledger = payments.map(p => {
      const admission = p.admissionId;
      const course = admission?.courseId;

      const total = p.totalAmount || 0;
      const paid = p.paidAmount || 0;
      const remaining = total - paid;

      return {
        _id: p._id,

        name: p.studentName,
        email: admission?.email || "-",
        course: course?.name || "-",

        total,
        paid,
        remaining,

        status: remaining === 0 ? "PAID" : "PENDING",

        createdAt: p.createdAt,
      };
    });

    res.json(ledger);
  } catch (err) {
    console.error("GET PAYMENTS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch payments" });
  }
};

