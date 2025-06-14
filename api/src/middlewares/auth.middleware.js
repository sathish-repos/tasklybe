import { JWT_SECRET } from "./../config/environment.js";
import jwt from "jsonwebtoken";
import User from "./../models/user.model.js";

const authorize = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) throw new Error("Unauthorized access!");

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) throw new Error("Unauthorized access!");

    req.user = user;

    next();
  } catch (error) {
    res.status(401).send("Unauthorized access!");
  }
};

export default authorize;
