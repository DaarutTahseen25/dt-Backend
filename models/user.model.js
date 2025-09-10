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

// Static method to generate matric number for students (with retry logic for race conditions)
userSchema.statics.generateMatricNumber = async function() {
  const currentYear = new Date().getFullYear();
  const maxRetries = 10;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Find the highest existing matric number for current year
      const latestStudent = await this.findOne(
        { 
          role: 'student',
          matric_number: { $regex: `^DT/${currentYear}/` }
        },
        { matric_number: 1 },
        { sort: { matric_number: -1 } }
      );
      
      let nextNumber = 1;
      if (latestStudent && latestStudent.matric_number) {
        // Extract number from existing ID (e.g., "DT/2025/005" -> 5)
        const match = latestStudent.matric_number.match(/DT\/\d{4}\/(\d{3})$/);
        if (match) {
          nextNumber = parseInt(match[1], 10) + 1;
        }
      }
      
      const matricNumber = `DT/${currentYear}/${nextNumber.toString().padStart(3, '0')}`;
      
      // Check if this ID already exists (race condition check)
      const existingStudent = await this.findOne({ matric_number: matricNumber });
      if (existingStudent) {
        // ID was taken by another process, retry
        continue;
      }
      
      return matricNumber;
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(`Failed to generate unique matric number after ${maxRetries} attempts: ${error.message}`);
      }
      // Wait a bit before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 10));
    }
  }
};

// Static method to generate teacher ID for teachers (with retry logic for race conditions)
userSchema.statics.generateTeacherId = async function() {
  const currentYear = new Date().getFullYear().toString().slice(-2); // Get last 2 digits
  const maxRetries = 10;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Find the highest existing teacher ID for current year
      const latestTeacher = await this.findOne(
        { 
          role: 'teacher',
          teacher_id: { $regex: `^DT/${currentYear}/` }
        },
        { teacher_id: 1 },
        { sort: { teacher_id: -1 } }
      );
      
      let nextNumber = 1;
      if (latestTeacher && latestTeacher.teacher_id) {
        // Extract number from existing ID (e.g., "DT/25/005" -> 5)
        const match = latestTeacher.teacher_id.match(/DT\/\d{2}\/(\d{3})$/);
        if (match) {
          nextNumber = parseInt(match[1], 10) + 1;
        }
      }
      
      const teacherId = `DT/${currentYear}/${nextNumber.toString().padStart(3, '0')}`;
      
      // Check if this ID already exists (race condition check)
      const existingTeacher = await this.findOne({ teacher_id: teacherId });
      if (existingTeacher) {
        // ID was taken by another process, retry
        continue;
      }
      
      return teacherId;
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(`Failed to generate unique teacher ID after ${maxRetries} attempts: ${error.message}`);
      }
      // Wait a bit before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 10));
    }
  }
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