import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import College from "../models/College.model.js";

export const collegeLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // 2️⃣ Find college
    const college = await College.findOne({ email: email.toLowerCase() });
    if (!college) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3️⃣ Check status
    if (college.status !== "APPROVED") {
      return res.status(403).json({ message: "College not approved" });
    }

    // 4️⃣ Compare password
    const isMatch = await bcrypt.compare(password, college.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 5️⃣ Create token
    const token = jwt.sign(
      {
        collegeId: college._id,
        role: "COLLEGE",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      college: {
        id: college._id,
        name: college.name,
        email: college.email,
      },
    });
  } catch (err) {
    console.error("COLLEGE LOGIN ERROR:", err);
    res.status(500).json({ message: "Login failed" });
  }
};
