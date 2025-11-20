import UserModel from "../model/user.model.js";
import { verifyAccessToken } from "../utils/lib/handleToken.js";

export const instructorAuthMiddleware = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return res.status(401).json({ error: "Unauthorised! Log in First!" });
    }
    const payload = verifyAccessToken(accessToken);
    if (!payload) {
      return res.status(400).json({ error: "invalid access token!" });
    }
    const user = await UserModel.findById(payload.id);
    if (!user) {
      return res.status(404).json({ error: "User not found!!!" });
    }
    if (payload.role !== "admin" && payload.role !== "instructor") {
      console.log(payload.role);
      return res.status(401).json({
        error: "Unauthorised! Only admins/instructors can create course!",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error checking authentication!");
    res.status(500).json({ error: "internal server error!" });
  }
};
