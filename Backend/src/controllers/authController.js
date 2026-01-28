import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import College from "../models/College.model.js";

export const collegeLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const college = await College.findOne({ email });

    if (!college) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, college.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        sub: college._id.toString(),
        collegeId: college._id.toString(),
        role: "COLLEGE",
        status: college.status,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      college: {
        id: college._id,
        email: college.email,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login failed" });
  }
};
