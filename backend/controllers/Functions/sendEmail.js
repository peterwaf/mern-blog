const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'peterwafulah@gmail.com',
      pass: process.env.EMAIL_PASSWORD
    }
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(from, to, subject, text, html) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    text: text,
    html: html,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  return info;
}

module.exports = {sendMail}