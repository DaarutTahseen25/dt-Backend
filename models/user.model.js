import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    NIN: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    full_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    phone_number: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'teacher', 'student', 'admin'],
      default: 'student',
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      lowercase: true,
      default: null,
    },
    matric_number: {
      type: String,
      unique: true,
      sparse: true, 
    },
    teacher_id: {
      type: String,
      unique: true,
      sparse: true, 
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    verification_token: {
      type: String,
      default: null,
    },
    reset_password_token: {
      type: String,
      default: null,
    },
    reset_password_expires: {
      type: Date,
      default: null,
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

// Static method to generate matric number for students
userSchema.statics.generateMatricNumber = async function() {
  const currentYear = new Date().getFullYear();
  const count = await this.countDocuments({ 
    role: 'student',
    matric_number: { $regex: `^DT/${currentYear}/` }
  });
  
  const nextNumber = (count + 1).toString().padStart(3, '0');
  return `DT/${currentYear}/${nextNumber}`;
};

// Static method to generate teacher ID for teachers
userSchema.statics.generateTeacherId = async function() {
  const currentYear = new Date().getFullYear().toString().slice(-2); // Get last 2 digits
  const count = await this.countDocuments({ 
    role: 'teacher',
    teacher_id: { $regex: `^DT/${currentYear}/` }
  });
  
  const nextNumber = (count + 1).toString().padStart(3, '0');
  return `DT/${currentYear}/${nextNumber}`;
};

// Pre-save middleware to auto-generate matric number or teacher ID
userSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      if (this.role === 'student' && !this.matric_number) {
        this.matric_number = await this.constructor.generateMatricNumber();
      } else if (this.role === 'teacher' && !this.teacher_id) {
        this.teacher_id = await this.constructor.generateTeacherId();
      }
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Index for better performance
userSchema.index({ role: 1 });

const User = mongoose.model("User", userSchema);

export default User;