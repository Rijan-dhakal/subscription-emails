import { transporter } from "../config/nodemailer.js";
import { generateTemplate } from "./emailTemplates.js";

const sendEmail = async (to, userData) => {
  const htmlContent = generateTemplate(userData);

  const mailOptions = {
    from: 'developmentmailsend01@gmail.com',
    to,
    subject: 'Your Subscription Info',
    html: htmlContent
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (err) {
    console.error('Failed to send email:', err);
  }
}

export default sendEmail;