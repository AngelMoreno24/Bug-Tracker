import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" } // short-lived
  );
};

// Generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" } // long-lived
  );
};

// -------------------------
// Login
// -------------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    // ✅ Store refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ user: { id: user._id, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------------
// Refresh Token
// -------------------------
export const refresh = (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid refresh token" });

      // Issue new access token
      const token = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: "15m" });

      res.json({ userId: decoded.userId }); // optional: can also send user info
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------------
// Logout
// -------------------------
export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
};