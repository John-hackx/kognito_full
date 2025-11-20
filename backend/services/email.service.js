import dotenv from "dotenv";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { redis } from "./upstashRedis.service.js";

dotenv.config();

export const generateOTP = () => {
  const otp = crypto.randomInt(100000, 999999).toString();
  console.log(otp);
  return otp;
};

export const storeOtpRedis = async (user, otp) => {
  const key = `otp:${user._id}`;
  await redis.set(key, otp, { ex: 10 * 60 });
};

export const deleteOtpRedis = async (user) => {
  const key = `otp:${user._id}`;
  await redis.del(key);
};

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2f80670723a9ac",
    pass: process.env.MAILTRAP_TOKEN,
  },
});

export const sendOTPEmail = async (emailAddress, otp, firstName) => {
  const mailOptions = {
    from: "test@example.com",
    to: emailAddress,
    subject: "Verify Email - OTP Code",
    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Email Verification</h2>
                <p>Hi ${firstName},</p>
                <p>Thank you for registering! Please use the following OTP to verify your email address:</p>
                <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
                <h1 style="color: #007bff; font-size: 32px; letter-spacing: 5px; margin: 0;">${otp}</h1>
                </div>
                <p>This OTP will expire in 10 minutes.</p>
                <p>If you didn't create an account, please ignore this email.</p>
                <p>Best regards,<br>Your App Team</p>
            </div>
        `,
  };

  await transporter.sendMail(mailOptions);
};
