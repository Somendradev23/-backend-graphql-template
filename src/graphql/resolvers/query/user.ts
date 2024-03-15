import Users from "../../../database/model/user";
import bcrypt from "bcrypt";
import yenv from "yenv";
const env = yenv("env.yaml", { env: "development" });
const jwt = require("jsonwebtoken");
// import crypto from "crypto";
import { changePasswordTemplate } from "../../utility/emailTemplate";
import nodemailer from "nodemailer";

export interface LoginInput {
  email: string;
  password: string;
}
export const login = async (_: any, input: { input: LoginInput }) => {
  const { email, password } = input?.input;

  try {
    const lowercaseLoginName = email;

    let isPasswordMatch;
    if (email && password) {
      const login: any = await Users.findOne({ email: lowercaseLoginName });
      if (login) {
        isPasswordMatch = await bcrypt.compare(password, login.password);
        if (!isPasswordMatch) {
          throw new Error(`Email and password do not match`);
        }
        const token = jwt.sign({ login }, env.JWT_SECRET, { expiresIn: "7d" });
        login.token = token;

        return login;
      }
      if (!login || !isPasswordMatch) {
        throw new Error(`Email and password do not match`);
      }
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const sendMailForForgetPassword = async (
  _: any,
  email: { email: string }
): Promise<any> => {
  try {
    const lowercaseLoginName = email?.email?.toLowerCase();
    const login: any = await Users.findOne({
      email: lowercaseLoginName,
      isDeleted: false,
    });
    if (!login) {
      return new Error("Error: This email does not exist.");
    }
    if (login) {
      const pwChangedTime = new Date(login?.updatedAt);
      const diff = new Date().getTime() - pwChangedTime.getTime();
      const minutes = Math.floor(diff / 1000 / 60);
      if (minutes < 10) {
        return new Error(
          `The password reset email has already been dispatched. Please retry after a 10-minute interval`
        );
      }
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.SMTP_USERNAME,
        pass: env.SMTP_PASSWORD,
      },
    });
    const expiresIn = "30m";
    const token = await jwt.sign({ email: login?.email }, env.JWT_SECRET, {
      expiresIn: expiresIn,
    });
    const mailOptions = {
      from: env.SMTP_SENDER,
      to: email?.email,
      subject: "Password Reset",
      html: changePasswordTemplate(login?.name, token),
    };

    const info = await transporter.sendMail(mailOptions);

    if (info) {
      await Users.findByIdAndUpdate(
        { _id: login._id },
        {
          refreshToken: token,
        }
      );

      return "Mail send successfully";
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const getAllUser = async () => {
  try {
    return await Users.find({
      isDeleted: false,
      role: "2",
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};



