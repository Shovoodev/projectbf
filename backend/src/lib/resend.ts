import { Resend } from "resend";

import nodemailer from "nodemailer";

export default async function SendEmail(email: string, pdfBuffer: Buffer) {
  // const getAttendenceDataResponse = await getresponsesById(user);
  const token = "helo";
  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 465,
    secure: true,
    auth: {
      user: "resend",
      pass: process.env.RESEND_API_KEY,
    },
  });
  const info = await transporter.sendMail({
    from: '"Administrator" <Blacktulipfunerals@toukir.cc',
    to: email,
    subject: `Thanks  ${email} beleaving us for trusting us `,
    text: "we get all you documents",
    html: `<h4>black tulip funerals test suver email resend test <h4><br/>
        <a href="http://localhost:5173/finish">Click to Preview all you selected services</a>
       `,
    attachments: [
      {
        filename: "Funeral bond.pdf",
        content: pdfBuffer,
      },
    ],
  });

  console.log(info);
}
