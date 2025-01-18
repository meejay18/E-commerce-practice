import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import userModel from "../model/userModel";
import jwt from "jsonwebtoken";
import env from "dotenv";
import cloudinary from "../utils/cloudinary";
env.config();

export const createAccount = async (
  req: any,
  res: Response
): Promise<Response> => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);
    const token = crypto.randomBytes(4).toString("hex");
    // const { secure_url, public_id }: any = await cloudinary.uploader.upload(
    //   req.file.path
    // );

    const user = await userModel.create({
      firstname,
      lastname,
      username,
      email,
      password: hashed,
      verifiedToken: token,
      // avatar: secure_url,
      // avatarID: public_id,
    });
    return res.status(201).json({
      message: "account created successfully",
      status: 201,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating account",
      status: 404,
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      const check = await bcrypt.compare(password, user?.password);

      if (check) {
        if (user?.isVerified && user?.verifiedToken === "") {
          const token: any = jwt.sign(
            { id: user?._id },
            process.env.JWT_SECRET as string,
            {
              expiresIn: process.env.JWT_EXPIRES as string,
            }
          );
          return res.status(201).json({
            message: "Login Successful",
            status: 201,
            data: token,
          });
        } else {
          return res.status(404).json({
            message: "Couldnt verify user",
            status: 404,
          });
        }
      } else {
        return res.status(404).json({
          message: "Error with Password",
          status: 404,
        });
      }
    } else {
      return res.status(404).json({
        message: "Error with email",
        status: 404,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error Logging in",
      status: 404,
    });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;
    const { otp } = req.body;

    const user = await userModel.findById(userID);
    if (user) {
      if (otp === user?.otp) {
        const updatedUser = await userModel.findByIdAndUpdate(
          userID,
          {
            verifiedToken: "",
            isVerified: true,
          },
          { new: true }
        );
        return res.status(201).json({
          message: "User verified successfully",
          status: 201,
          data: updatedUser,
        });
      } else {
        return res.status(404).json({
          message: "Otp mismatch",
          status: 404,
        });
      }
    } else {
      return res.status(404).json({
        message: "User not found",
        status: 404,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error verifying user",
      status: 404,
    });
  }
};
export const readOneUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;

    const user = await userModel.findById(userID);

    return res.status(200).json({
      message: "User successfully found",
      status: 200,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error reading user",
      status: 404,
    });
  }
};
export const readAllUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await userModel.find();
    return res.status(201).json({
      message: "Users Read Successfully",
      status: 201,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Couldnt read all users",
      status: 404,
    });
  }
};
