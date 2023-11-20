import config from '../config';
import { getTransporter } from './getTransporter';

type ISendMail = {
  message: string;
  subject: string;
  to: string | string[];
};

export const sendMail = async (
  data: ISendMail,
): Promise<
  | {
      sent: boolean;
    }
  | undefined
> => {
  const transporter = getTransporter();

  const mailOptions = {
    from: config.email.user,
    to: data.to,
    subject: data.subject,
    html: data.message,
  };

  const info = await transporter.sendMail(mailOptions);
  if (!info) {
    throw new Error('Email not sent');
  }
  if (info.messageId) {
    return { sent: true };
  }
};
