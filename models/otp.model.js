import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      length: 6
    },
    type: {
      type: String,
      enum: ['registration', 'password_reset'],
      default: 'registration',
      required: true
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
    },
    attempts: {
      type: Number,
      default: 0,
      max: 5
    },
    verified: {
      type: Boolean,
      default: false
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    }
  },
  { 
    timestamps: true 
  }
);

// TTL index for auto-deletion
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Compound index for better query performance
otpSchema.index({ email: 1, type: 1 });

// Static method to generate OTP
otpSchema.statics.generateOtp = function() {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Static method to create OTP
otpSchema.statics.createOtp = async function(email, type = 'registration', userId = null) {
  // Delete any existing OTP for this email and type
  await this.deleteMany({ email, type });
  
  const code = this.generateOtp();
  const otp = new this({
    email,
    code,
    type,
    userId
  });
  
  await otp.save();
  return { otp: code, expiresAt: otp.expiresAt };
};

// Static method to get OTP (for your existing pattern)
otpSchema.statics.getOtp = async function(email, type = 'registration') {
  return await this.findOne({ 
    email, 
    type, 
    verified: false,
    expiresAt: { $gt: new Date() }
  });
};

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;