import { SuccessMailEmailHTML } from "@/app/_components/Email/SubmissionSuccessTemplate";
import { SchemaType } from "@/app/validations/schema";
import { sesSend } from "@/utils/mail/send";

export async function POST(req: Request) {
  if (!process.env.EMAIL) throw new Error("Email from  not set");
  const data: SchemaType = await req.json();
  try {
    const res = await sesSend({
      from: process.env.EMAIL as string,
      html: SuccessMailEmailHTML(data),
      subject: "Successfull submit",
      to: data.email as string,
    });
  } catch (error) {
    console.log(error);
  }

  return new Response(JSON.stringify({ data }));
}
