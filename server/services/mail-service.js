import nodemailer from "nodemailer";

const auth = {
  user: "nobik.posts@gmail.com",
  pass: "balx ofip ryma iydz",
};
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: auth,
});
console.log(process.env.SMTP_PASSWORD)
class MailClassSevice {
  async sendActivationLink(to, link, activateCode) {
    try {
      transporter.sendMail({
        from: process.env.SMTP_USER,
        to: to,
        subject: `Activation code for acccess to "Nobik-Posts"`,
        text: null,
        html: `<div>
            <p>Here is your activation code:${activateCode}</p>
            <p>
              Or click on this link to activate your acc auto:<a>${link}</a>
            </p>
          </div>`,
      });
    } catch (error) {
      console.log(`Failed to send activation code to ${to}`);
      console.log(error);
    }
  }

  async sendPassResetCode(to, link, resetCode) {
    try {
      transporter.sendMail({
        from: process.env.SMTP_USER,
        to: to,
        subject: `Code for reset password on "Nobik-Posts"`,
        text: null,
        html: `<div>
            <p>Here is your password reset code:${resetCode}</p>
            <p>
              Or click on this link to reset your pass auto:<a href=${link}>Reset auto</a>
            </p>
          </div>`,
      });
    } catch (error) {
      console.log(`Failed to send reset code to ${to}`);
      console.log(error);
    }
  }
}

export const MailService = new MailClassSevice();
