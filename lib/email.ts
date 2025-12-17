import { Resend } from "resend";
import { logger } from "./logger";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendEmailOptions = {
  to: string;
  subject: string;
  react: React.ReactElement;
  from?: string;
};

async function send(options: SendEmailOptions) {
  const { data, error } = await resend.emails.send({
    ...options,
    from: options.from ?? "Miuma <nao-responda@miuma.com>",
  });

  if (error) {
    logger.error({
      msg: "Error sending email",
      error,
      to: options.to,
      subject: options.subject,
    });
  }

  return { data, error };
}

export const email = {
  send,
};
