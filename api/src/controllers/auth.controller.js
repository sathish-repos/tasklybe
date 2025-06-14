import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { JWT_EXPIRATION, JWT_SECRET } from "../config/environment.js";
import sendResponse from "../middlewares/response.middleware.js";
import User from "./../models/user.model.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;

    if (!password || password.length < 6)
      throw new Error("Password must be at least 6 characters");

    const existingUser = await User.findOne({ email }).session(session);

    if (existingUser) throw new Error("User already exists!");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (!hashedPassword) throw new Error("Password hashing failed!");

    const [newUser] = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
        },
      ],
      { session }
    );

    if (!newUser) throw new Error("User creation failed!");

    await session.commitTransaction();
    session.endSession();

    // Remove password from response
    const userObj = newUser.toObject();
    delete userObj.password;

    sendResponse(res, 201, "User creation successful!", { user: userObj });
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

    // Remove password from response
    const userObj = foundUser.toObject();
    delete userObj.password;

    sendResponse(res, 200, "User signed in successfully!", {
      user: userObj,
      token,
    });
  } catch (error) {
    next(error);
  }
};
