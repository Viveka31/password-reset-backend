import nodemailer from "nodemailer";

const sendMail = async (email, link) => {

  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  const info = await transporter.sendMail({
    from: '"Password Reset" <test@example.com>',
    to: email,
    subject: "Reset Password",
    html: `<a href="${link}">${link}</a>`
  });

  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
};

export default sendMail;