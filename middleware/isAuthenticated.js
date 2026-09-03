import jwt from "jsonwebtoken";
import { getOtherUsers } from "../controllers/userController";
import { router } from "../routes/userRoute";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token; // here we are taking out the data or token  from cookies need to import cookie parser
    if (!token) {
      return res.status(401).json({ message: "user not authenticated" });
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.status(401).json({ message: "invalid token" });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
export default isAuthenticated;
router.route("/").get(isAuthenticated, getOtherUsers);
