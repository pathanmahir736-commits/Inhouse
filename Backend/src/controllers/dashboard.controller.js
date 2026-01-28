import Course from "../models/Course.model.js";
import Admission from "../models/Admission.model.js";
import Payment from "../models/Payment.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const collegeId = req.user.collegeId;

    /* ===============================
       COURSES
    =============================== */
    const totalCourses = await Course.countDocuments({ collegeId });

    /* ===============================
       ADMISSIONS
    =============================== */
    const totalAdmissions = await Admission.countDocuments({
      collegeId,
      status: "approved",
    });

    const pendingAdmissions = await Admission.countDocuments({
      collegeId,
      status: "pending",
    });

    /* ===============================
       PAYMENTS (REAL FINANCE LOGIC)
    =============================== */
    const payments = await Payment.find({ collegeId });

    let collected = 0;
    let pending = 0;

    for (const p of payments) {
      const total = Number(p.totalAmount || 0);
      const paid = Number(p.paidAmount || 0);

      collected += paid;
      pending += Math.max(total - paid, 0);
    }

    /* ===============================
       SEATS
    =============================== */
    const courses = await Course.find({ collegeId });

    const totalSeats = courses.reduce(
      (sum, c) => sum + (c.totalSeats || 0),
      0
    );

    const availableSeats = courses.reduce(
      (sum, c) => sum + (c.availableSeats || 0),
      0
    );

    /* ===============================
       RESPONSE
    =============================== */
    res.json({
      totalCourses,
      totalAdmissions,
      pendingAdmissions,

      revenue: {
        collected,
        pending,
      },

      seats: {
        total: totalSeats,
        filled: totalSeats - availableSeats,
      },
    });
  } catch (err) {
    console.error("DASHBOARD ERROR:", err);
    res.status(500).json({ message: "Dashboard failed" });
  }
};
