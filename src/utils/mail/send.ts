import nodemailer from "nodemailer";
import "dotenv/config";

const { EMAIL, PASSWORD, SERVICE } = process.env;

if (!PASSWORD) throw new Error("Missing env var for email password");
if (!EMAIL) throw new Error("Missing env var for email address");
if (!SERVICE) throw new Error("Missing env var for email service");
const transporter = nodemailer.createTransport({
  service: SERVICE,
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

type Message = {
  to: string;
  from: string;
  subject: string;
  html: string;
  text?: string;
  cc?: string;
};

export const sesSend = async (message: Message) => {
  try {
    const results = await transporter.sendMail(message);
    if (results.rejected?.length > 0) {
      return { status: "Error", message: "Email not sent" } as const;
    }
    return { status: "Success", messageId: results.messageId } as const;
  } catch (error) {
    return { status: "Error", message: "Email not sent" } as const;
  }
};
