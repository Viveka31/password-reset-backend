import nodemailer from "nodemailer";
import dns from "dns";

const sendMail = async (email, link) => {

  console.log("Preparing transporter");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    dnsLookup: (hostname, options, callback) => {
      return dns.lookup(hostname, { family: 4 }, callback); // force IPv4
    }
  });

  console.log("Sending email check");

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Link",
    html: `
      <h3>Password Reset</h3>
      <p>Click the link below</p>
      <a href="${link}">${link}</a>
    `
  });

  console.log("Email sent successfully", info.messageId);
};

export default sendMail;