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

export const signIn = (req, res, next) => {
  try {
    sendResponse(res, 200, "signed in");
  } catch (error) {
    next(error);
  }
};
