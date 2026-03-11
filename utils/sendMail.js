import nodemailer from "nodemailer"

const sendMail = async (email, link) => {
    console.log("Preparing transporter")

    const transporter = nodemailer.createTransport({

        service:"gmail",

        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }

    })
     console.log("Sending email...")

    const mailOptions = {

        from:process.env.EMAIL_USER,
        to:email,
        subject:"Password Reset Link",

        html:`
        <h3>Password Reset</h3>
        <p>Click the link below</p>
        <a href="${link}">${link}</a>
        `

    }

    await transporter.sendMail(mailOptions)
    console.log("Email sent successfully")

}

export default sendMail