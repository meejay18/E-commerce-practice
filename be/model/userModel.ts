import { model, Schema, Document } from "mongoose";

interface iUser {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  avatarID: string;
  verifiedToken: string;
  isVerified: boolean;
  otp: string;
  otpExpiresIn: Date;
}

interface iUserData extends iUser, Document {}

const userModel = new Schema<iUserData>(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    username: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifiedToken: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    otp: {
      type: String,
    },
    otpExpiresIn: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default model<iUserData>("user", userModel);
