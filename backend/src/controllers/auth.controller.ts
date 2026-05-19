import type {
  Request,
  Response
} from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model";

export const signup = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        error: "User already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({

      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { userId: user._id },

      process.env.JWT_SECRET as string,

      { expiresIn: "7d" }
    );

    return res.json({
      message: "Signup successful",
      token
    });

  } catch (error: any) {

    return res.status(500).json({
      error: error.message
    });
  }
};


export const login = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        error: "Invalid credentials"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        error: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { userId: user._id },

      process.env.JWT_SECRET as string,

      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token
    });

  } catch (error: any) {

    return res.status(500).json({
      error: error.message
    });
  }
};
