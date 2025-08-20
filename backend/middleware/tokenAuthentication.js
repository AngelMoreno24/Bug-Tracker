import jwt from 'jsonwebtoken';
import User from "../models/UserModel.js";

export const authenticateToken  = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken; // retrieve token from cookie  

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET); // verify refresh token
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ message: "Token invalid or expired" });
  }
};