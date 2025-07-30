import nodemailer from 'nodemailer';

// Create transporter with your email service configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS  
    }
    

  });
};

export const sendOtptoMail = async (email, otp) => {
  try {
    const transporter = createTransporter();
    
    // Verify transporter configuration
    await transporter.verify();
    
    const mailOptions = {
      from: {
        name: 'Daarut-Tahseen Team',
        address: process.env.EMAIL_USER
      },
      to: email,
      subject: 'Your OTP Code for Daarut-Tahseen',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2c3e50; margin: 0; font-size: 28px;">Daarut-Tahseen</h1>
              <p style="color: #7f8c8d; margin: 5px 0 0 0; font-size: 14px;">Learning Management System</p>
            </div>
            
            <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">Welcome Aboard! 🎉</h2>
            
            <p style="color: #34495e; font-size: 16px; line-height: 1.6;">
              Thank you for registering with Daarut-Tahseen. We're excited to have you join our learning community!
            </p>
            
            <p style="color: #34495e; font-size: 16px; line-height: 1.6;">
              To complete your registration, please use the following OTP code:
            </p>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; text-align: center; margin: 30px 0; border-radius: 8px;">
              <h1 style="color: white; font-size: 36px; letter-spacing: 8px; margin: 0; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                ${otp}
              </h1>
            </div>
            
            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; padding: 15px; margin: 20px 0;">
              <p style="color: #856404; margin: 0; font-weight: bold;">⚠️ Important Security Information:</p>
              <ul style="color: #856404; margin: 10px 0 0 0; padding-left: 20px;">
                <li>This OTP is valid for <strong>10 minutes only</strong></li>
                <li>Do not share this code with anyone</li>
                <li>If you didn't request this verification, please ignore this email</li>
                <li>For security, we will never ask for your OTP via phone or SMS</li>
              </ul>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ecf0f1;">
              <p style="color: #34495e; font-size: 16px; line-height: 1.6;">
                Need help? Feel free to contact our support team.
              </p>
              
              <p style="color: #34495e; font-size: 16px; line-height: 1.6; margin-bottom: 0;">
                Best regards,<br>
                <strong>The Daarut-Tahseen Team</strong>
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #95a5a6; font-size: 12px; margin: 0;">
              This email was sent to ${email}. This is an automated message, please do not reply.
            </p>
          </div>
        </div>
      `,
      // Plain text fallback
      text: `
        Welcome to Daarut-Tahseen!
        
        Your OTP code is: ${otp}
        
        This code is valid for 10 minutes only.
        Do not share this code with anyone.
        
        If you didn't request this, please ignore this email.
        
        Best regards,
        Daarut-Tahseen Team
      `
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully:', info.messageId);
    
    return { 
      success: true, 
      messageId: info.messageId,
      response: info.response 
    };
    
  } catch (error) {
    console.error('❌ Email sending error:', error);
    
    // Log specific error details for debugging
    if (error.code === 'EAUTH') {
      console.error('Authentication failed. Check your email credentials.');
    } else if (error.code === 'ENOTFOUND') {
      console.error('SMTP server not found. Check your SMTP configuration.');
    }
    
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

// Optional: Function to test email configuration
export const testEmailConnection = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email service is ready to send emails');
    return true;
  } catch (error) {
    console.error('❌ Email service configuration error:', error);
    return false;
  }
};