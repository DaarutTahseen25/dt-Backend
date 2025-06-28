import { Resend } from "resend"

export const sendOtptoMail = async (email, otp) => {
  await Resend.emails.send({
    from: 'verify@yourdomain.com',
    to: email,
    subject: 'Your OTP Code for Daarut-Tahseen',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>🔐 Your OTP Code</h2>
        <p>Hello,</p>
        <p>Your one-time password (OTP) is:</p>
        <h1 style="letter-spacing: 4px;">${otp}</h1>
        <p>This code is valid for <strong>5 minutes</strong>. Do not share it with anyone.</p>
        <p>Regards,<br/><strong>Daarut-Tahseen</strong> Team</p>
      </div>
    `,
    text: `Your OTP is ${otp}. It expires in 5 minutes. Do not share this code.`,
  });
};
