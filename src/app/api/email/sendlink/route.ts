import { NextRequest } from "next/server";
import { Resend } from "resend";
import SendLinkTemplate from "../../../../../emails/SendLink";
import { AResponse } from "@/contants";


const tag = "email";
interface IBody {
  emails: string[];
  firstName: string;
  links: string[];
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { emails, firstName, links }: IBody = await request.json();

  const emailPromises = emails.map((email, index) => {
    return resend.emails.send({
      from: "no-reply@debbal.com",
      to: email,
      subject: "New Request from Easy",
      reply_to: "support@debbal.com",
      react: SendLinkTemplate({ name: firstName, link: links[index] }),
    });
  });
  const res = await Promise.all(emailPromises);
  return AResponse(res, "Message successfully sent ");
}
