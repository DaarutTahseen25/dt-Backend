import { Resend } from 'resend';

const resend = new Resend('re_88MExKeu_M4j5Bz9gC7qFAPMZwVWTrHbA');

export const sendOtptoMail = async (email, otp) => {
  try {
    const { data, error } = await resend.emails.send({
      from:  'onboarding@resend.dev',
      to: [email],
      subject: 'Your OTP Code for Daarut-Tahseen',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; text-align: center;">Welcome Aboard!</h2>
          <p>Thank you for registering with Daarut-Tahseen.</p>
          <p>To complete your registration, please use the following OTP code:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #007bff; font-size: 32px; letter-spacing: 5px; margin: 0;">${otp}</h1>
          </div>
          <p><strong>Important:</strong></p>
          <ul>
            <li>This OTP is valid for 10 minutes only</li>
            <li>Do not share this code with anyone</li>
            <li>If you didn't request this, please ignore this email</li>
          </ul>
          <p>Best regards,<br>DaaruTahseen Team</p>
        </div>
      `
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, messageId: data.id };
    
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send email');
  }
};
