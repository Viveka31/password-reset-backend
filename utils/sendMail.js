import nodemailer from "nodemailer";

const sendMail = async (email, link) => {

  console.log("Preparing transporter");

  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  });

  console.log("Sending email");

  const info = await transporter.sendMail({
    from: '"Password Reset" <reset@test.com>',
    to: email,
    subject: "Password Reset Link",
    html: `
      <h3>Password Reset</h3>
      <p>Click the link below</p>
      <a href="${link}">${link}</a>
    `
  });

  console.log("Email sent:", info.messageId);
};

export default sendMail;