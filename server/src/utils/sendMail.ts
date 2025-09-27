// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config()
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "anujkaran420@gmail.com",
    pass: "ufip hcat udun xffd", // App Password
  },
});

export const sendMail = async (to: string, subject: string, html: string) => {
  try {
    const mailOptions = {
      from: `Code Sync <anujkaran420@gmail.com>`,
      to,
      subject,
      html,
    };
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error)
  }
};
