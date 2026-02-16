import nodemailer from "nodemailer";
import { validateRecipient } from ".";

const recipientFromEnv = process.env.MAIL_RECIPIENT_EMAIL;

if (!recipientFromEnv) {
  throw new Error("Missing MAIL_RECIPIENT_EMAIL environment variable");
}

const recipientEmail = validateRecipient(recipientFromEnv);

// export async function SendEmail(email: string, pdfBuffer: Buffer) {
export async function SendPrePayBond(pdfBuffer: Buffer) {
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
    to: recipientEmail,
    subject: `Thanks  beleaving us for trusting us `,
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

export async function SendInvoice(pdfBuffer: Buffer) {
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
    to: recipientEmail,
    subject: `Thanks  hi beleaving us for trusting us `,
    text: "we get all you documents",
    html: `<h4>black tulip funerals test suver email resend test <h4><br/>
       `,
    attachments: [
      {
        filename: "Invoice.pdf",
        content: pdfBuffer,
      },
    ],
  });

  console.log(info);
}
