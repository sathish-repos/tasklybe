import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import sendResponse from "../middlewares/response.middleware.js";
import User from "./../models/user.model.js";
import { JWT_EXPIRATION, JWT_SECRET } from "../config/environment.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;

    if (password && password.length <= 5)
      throw new Error("Password must be more then 5 characters");

    const existingUser = await User.findOne({ email });

    if (existingUser) throw new Error("User already exist!");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (!hashedPassword) throw new Error("password hashing failed!");

    const newUser = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
        },
      ],
      { session }
    );

    if (!newUser[0]) throw new Error("User creation failed!");

    await session.commitTransaction();
    session.endSession();

    sendResponse(res, 201, "User creation successful!", { user: newUser[0] });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });

    if (!foundUser) throw new Error("User not found!");

    const isValidPassword = await bcrypt.compare(password, foundUser.password);

    if (!isValidPassword) throw new Error("Invalid password");

    const token = jwt.sign({ userId: foundUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    sendResponse(res, 200, "User signed in successfully!", {
      user: foundUser,
      token,
    });
  } catch (error) {
    next(error);
  }
};
