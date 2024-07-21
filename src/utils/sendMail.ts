import nodemailer, { TransportOptions } from 'nodemailer';

export const sendEmail = async (options: { email: string; subject: string; message: string }) => {
  const transpoter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  } as TransportOptions);

  const htmlBody = `<html>
  <head>
    <title>${options.subject}</title>
  </head>
  <body>
    <h1>${options.subject}</h1>
    <p>${options.message}</p>
  </body>
</html>`;

  await transpoter.sendMail({
    from: 'Askme<motemed24@gmail.com>',
    to: options.email,
    subject: options.subject,
    html: htmlBody,
  });
};
