
import AppError from "../utils/AppError.js";
import { createHashedPassword } from "../utils/hashedPassword.js";
import { sendOtptoMail } from "../utils/resend.js";
import { signToken } from "../utils/jwt.js";
import User from "../models/user.model.js";
import Otp from "../models/otp.model.js";

// Register User (Student/Teacher) 
export const register = async (req, res, next) => {
  try {
    const { NIN, full_name, email, gender, phone_number, password, confirm_password, role, image } = req.body;

    // Check if passwords match
    if (password !== confirm_password) {
      throw new AppError('Passwords do not match', 400);
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { NIN }]
    });

    if (existingUser) {
      const message = existingUser.email === email ? "Email already exists" : "NIN already exists";
      throw new AppError(message, 400);
    }

    // Generate a default image if not provided
  const profileImage = image ? image : `https://avatar.iran.liara.run/public/boy?username=${email}`

    // Create new user (unverified)
    const userData = {
      NIN,
      full_name,
      email,
      gender,
      phone_number,
      password: await createHashedPassword(password),
      role: role || 'student',
      image: profileImage,
      is_verified: false
    };

    const user = new User(userData);
    await user.save();

    // Generate and send OTP
    const { otp } = await Otp.createOtp(email, 'registration', user._id);
    await sendOtptoMail(email, otp);

    res.status(201).json({
      success: true,
      message: "Registration successful. Please check your email for OTP verification.",
      data: {
        id: user._id,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Registration error:", error);
    next(error);
  }
};

// Verify OTP 
export const verifyOtp = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    // Get OTP record
    const otpRecord = await Otp.getOtp(email);
    
    if (!otpRecord) {
      throw new AppError('OTP not found', 404);
    }

    if (new Date(otpRecord.expiresAt) < new Date()) {
      throw new AppError('The OTP has expired', 410);
    }

    if (otpRecord.code !== code) {
      throw new AppError('Wrong OTP', 401);
    }

    // Find and verify user
    const user = await User.findOne({ email }).select('-password');
    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Mark user as verified
    user.is_verified = true;
    await user.save();

    // Delete the used OTP
    await Otp.deleteOne({ _id: otpRecord._id });

    // Generate token
    const token = signToken({ userId: user._id });

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: { token, user }
    });

  } catch (error) {
    console.error("OTP verification error:", error);
    next(error);
  }
};

// Resend OTP
export const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (user.is_verified) {
      throw new AppError("User already verified", 400);
    }

    // Generate and send new OTP
    const { otp } = await Otp.createOtp(email, 'registration', user._id);
    await sendOtptoMail(email, otp);

    res.status(200).json({
      success: true,
      message: "OTP resent successfully"
    });

  } catch (error) {
    console.error("Resend OTP error:", error);
    next(error);
  }
};

// Login User
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError("Invalid credentials", 401); 
    }

    // Check if user is verified
    if (!user.is_verified) {
      throw new AppError("Please verify your email before logging in", 401);
    }


    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", 401);
    }

    // Generate token
    const token = signToken({ userId: user._id });

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: userResponse,
        token
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

// Get Current User Profile
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: { user }
    });

  } catch (error) {
    console.error("Get profile error:", error);
    next(error);
  }
};

// Update User Profile
export const updateProfile = async (req, res, next) => {
  try {
    const { full_name, phone_number, gender, image } = req.body;

    const updateData = {};
    if (full_name) updateData.full_name = full_name;
    if (phone_number) updateData.phone_number = phone_number;
    if (gender) updateData.gender = gender;
    if (image) updateData.image = image;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: { user }
    });

  } catch (error) {
    console.error("Update profile error:", error);
    next(error);
  }
};

// Change Password
export const changePassword = async (req, res, next) => {
  try {
    const { current_password, new_password, confirm_password } = req.body;

    if (new_password !== confirm_password) {
      throw new AppError("New passwords do not match", 400);
    }

    const user = await User.findById(req.user._id);
    
    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(current_password);
    if (!isCurrentPasswordValid) {
      throw new AppError("Current password is incorrect", 400);
    }

    // Update password
    user.password = await createHashedPassword(new_password);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully"
    });

  } catch (error) {
    console.error("Change password error:", error);
    next(error);
  }
};

// Get All Users (Admin only)
export const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    const skip = (page - 1) * limit;

    // Build filter
    let filter = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { full_name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { matric_number: { $regex: search, $options: 'i' } },
        { teacher_id: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: {
        users,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalUsers: total,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error("Get all users error:", error);
    next(error);
  }
};

// Get User by ID (Admin only)
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select('-password');
    
    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: { user }
    });

  } catch (error) {
    console.error("Get user by ID error:", error);
    next(error);
  }
};

// Update User Status (Admin only)
export const updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { is_active },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.status(200).json({
      success: true,
      message: `User ${is_active ? 'activated' : 'deactivated'} successfully`,
      data: { user }
    });

  } catch (error) {
    console.error("Update user status error:", error);
    next(error);
  }
};

// Delete User (Admin only)
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {
    console.error("Delete user error:", error);
    next(error);
  }
};

