import jwt from "jsonwebtoken";



const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token; // here we are taking out the data or token  from cookies need to import cookie parser
    if (!token) {
      return res.status(401).json({ message: "user not authenticated" });
    }
    const decode =  jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.status(401).json({ message: "invalid token" });
    }
    req.id = decode.id;
    next(); //dusra function run hora in messageRoute.js
  } catch (error) {
     return res.status(401).json({ message: "invalid or expired token" });
  }
};

export default isAuthenticated;


