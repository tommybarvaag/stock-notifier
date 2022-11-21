import sendgridMail from "@sendgrid/mail";

sendgridMail.setApiKey(process.env.NEXT_PUBLIC_SENDING_KEY ?? "");

export default sendgridMail;
