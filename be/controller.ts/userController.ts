import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import userModel from "../model/userModel";

export const createAccount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);
    const token = crypto.randomBytes(4).toString("hex");

    const user = await userModel.create({
      name,
      email,
      passsword: hashed,
      verifiedToken: token,
    });
    return res.status(201).json({
      message: "account created successfully",
      status: 201,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating account",
      status: 500,
    });
  }
};
