import nodemailer from "nodemailer";

const sendMail = async (email, link) => {

  console.log("Creating test account...");

  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  console.log("Sending email...");

  const info = await transporter.sendMail({
    from: '"Password Reset" <reset@example.com>',
    to: email,
    subject: "Password Reset Link",
    html: `
      <h3>Password Reset</h3>
      <p>Click the link below to reset your password:</p>
      <a href="${link}">${link}</a>
    `
  });

  console.log("Email sent");

  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
};

export default sendMail;