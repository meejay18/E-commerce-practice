import { model, Schema, Document } from "mongoose";

interface iUser {
  name: string;
  email: string;
  passsword: string;
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
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    passsword: {
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
