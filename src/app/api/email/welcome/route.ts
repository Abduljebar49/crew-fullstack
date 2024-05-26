import { NextRequest } from "next/server";
import { Resend } from "resend";
import WelcomeTemplate from "../../../../../emails/Welcome";
import { AResponse } from "@/contants";

console.log(process.env.RESEND_API_KEY," process.env.RESEND_API_KEY")
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { email, firstName } = await request.json();
  console.log("email ; ", email, "firstName ; ", firstName)
  const res = await resend.emails.send({
    from: "no-reply@debbal.com",
    to: email,
    subject: "Welcome to Easy",
    reply_to: "support@debbal.com",
    react: WelcomeTemplate({ name: firstName }),
  });
  return AResponse(res, "Message successfully sent ");
}
