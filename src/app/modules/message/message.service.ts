import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { getTransporter } from '../../../shared/getTransporter';
import { IMessage } from './message.interface';

const sendMessage = async (data: IMessage) => {
  const transporter = getTransporter();

  const mailOptions = {
    from: data.email,
    to: config.email.to_email,
    subject: `New message from Carx - ${data.subject} - from ${data.name}`,
    html: `
        <h1>You have a new message from Carx</h1>
        <p><b>Name</b>: ${data.name}</p>
        <p><b>Email</b>: ${data.email}</p>
        <p><b>Subject</b>: ${data.subject}</p>
        <p><b>Message</b>: ${data.message}</p>    
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  if (!info) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Email not sent');
  }

  if (info.messageId) {
    // send auto reply to user
    const autoReplyOptions = {
      from: config.email.user,
      to: data.email,
      subject: `Thank you for contacting Carx`,
      html: `
          <h1>Thank you for contacting Carx</h1>
          <p>We will get back to you as soon as possible</p>
      `,
    };
    await transporter.sendMail(autoReplyOptions);
  }
};
export const MessageService = {
  sendMessage,
};
