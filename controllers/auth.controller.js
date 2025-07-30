import AppError from "../utils/AppError.js";
import { createHashedPassword } from "../utils/hashedPassword.js";
import { sendOtptoMail } from "../utils/nodemailer.js";
import { signToken } from "../utils/jwt.js";
import User from "../models/user.model.js";
import Otp from "../models/otp.model.js";

// Register User 
export const register = async (req, res, next) => {
  try {
    console.log("📝 Registration attempt:", { email: req.body.email, role: req.body.role || 'student' });
    
    const { NIN, full_name, email, gender, phone_number, password, confirm_password, role, image } = req.body;

    if (password !== confirm_password) {
      console.log("❌ Password mismatch for:", email);
      throw new AppError('Passwords do not match', 400);
    }

    console.log("🔍 Checking existing user for:", email);
    const existingUser = await User.findOne({
      $or: [{ email }, { NIN }]
    });

    if (existingUser) {
      const message = existingUser.email === email ? "Email already exists" : "NIN already exists";
      console.log("❌ User exists:", message, "for", email);
      throw new AppError(message, 400);
    }

    const profileImage = image ? image : `https://avatar.iran.liara.run/public/boy?username=${email}`;
    console.log("🖼️ Profile image set:", profileImage);

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

    console.log("💾 Creating user:", { email, role: userData.role });
    const user = new User(userData);
    await user.save();
    console.log("✅ User created with ID:", user._id);

    console.log("🔐 Generating OTP for:", email);
    const { otp } = await Otp.createOtp(email, 'registration', user._id);
    console.log("📧 Sending OTP to:", email);
    await sendOtptoMail(email, otp);

    console.log("✅ Registration successful for:", email);
    res.status(201).json({
      success: true,
      message: "Registration successful. Please check your email for OTP verification.",
      data: {
        id: user._id,
        email: user.email
      }
    });

  } catch (error) {
    console.error("❌ Registration error:", error.message);
    next(error);
  }
};

// Verify Otp 
export const verifyOtp = async (req, res, next) => {
  try {
    console.log("🔐 OTP verification attempt for:", req.body.email);
    
    const { email, code } = req.body;

    console.log("🔍 Looking for OTP record:", email);
    const otpRecord = await Otp.getOtp(email);
    
    if (!otpRecord) {
      console.log("❌ OTP not found for:", email);
      throw new AppError('OTP not found', 404);
    }

    if (new Date(otpRecord.expiresAt) < new Date()) {
      console.log("⏰ OTP expired for:", email);
      throw new AppError('The OTP has expired', 410);
    }

    if (otpRecord.code !== code) {
      console.log("❌ Wrong OTP code for:", email, "Expected:", otpRecord.code, "Got:", code);
      throw new AppError('Wrong OTP', 401);
    }

    console.log("🔍 Finding user:", email);
    const user = await User.findOne({ email }).select('-password');
    if (!user) {
      console.log("❌ User not found for:", email);
      throw new AppError("User not found", 404);
    }

    console.log("✅ Marking user as verified:", email);
    user.is_verified = true;
    await user.save();

    console.log("🗑️ Deleting used OTP for:", email);
    await Otp.deleteOne({ _id: otpRecord._id });

    console.log("🎫 Generating token for:", email);
    const token = signToken({ userId: user._id });

    console.log("✅ OTP verification successful for:", email);
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: { token, user }
    });

  } catch (error) {
    console.error("❌ OTP verification error:", error.message);
    next(error);
  }
};

// ResendOtp 
export const resendOtp = async (req, res, next) => {
  try {
    console.log("🔄 Resend OTP request for:", req.body.email);
    
    const { email } = req.body;

    console.log("🔍 Checking user exists:", email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found for resend:", email);
      throw new AppError("User not found", 404);
    }

    if (user.is_verified) {
      console.log("❌ User already verified:", email);
      throw new AppError("User already verified", 400);
    }

    console.log("🔐 Generating new OTP for:", email);
    const { otp } = await Otp.createOtp(email, 'registration', user._id);
    console.log("📧 Sending new OTP to:", email);
    await sendOtptoMail(email, otp);

    console.log("✅ OTP resent successfully to:", email);
    res.status(200).json({
      success: true,
      message: "OTP resent successfully"
    });

  } catch (error) {
    console.error("❌ Resend OTP error:", error.message);
    next(error);
  }
};

// login 
export const login = async (req, res, next) => {
  try {
    console.log("🔐 Login attempt for:", req.body.email);
    
    const { email, password } = req.body;

    console.log("🔍 Finding user:", email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found for login:", email);
      throw new AppError("Invalid credentials", 401); 
    }

    if (!user.is_verified) {
      console.log("❌ User not verified:", email);
      throw new AppError("Please verify your email before logging in", 401);
    }

    console.log("🔒 Checking password for:", email);
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log("❌ Invalid password for:", email);
      throw new AppError("Invalid credentials", 401);
    }

    console.log("🎫 Generating token for:", email);
    const token = signToken({ userId: user._id });

    const userResponse = user.toObject();
    delete userResponse.password;

    console.log("✅ Login successful for:", email, "Role:", user.role);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: userResponse,
        token
      }
    });

  } catch (error) {
    console.error("❌ Login error:", error.message);
    next(error);
  }
};

// get profiles (authenticated route) 
export const getProfile = async (req, res, next) => {
  try {
    console.log("👤 Get profile request for user ID:", req.user._id);
    
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      console.log("❌ User not found for profile:", req.user._id);
      throw new AppError("User not found", 404);
    }

    console.log("✅ Profile retrieved for:", user.email);
    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: { user }
    });

  } catch (error) {
    console.error("❌ Get profile error:", error.message);
    next(error);
  }
};

// update profile (authenticated route ) 
export const updateProfile = async (req, res, next) => {
  try {
    console.log("✏️ Update profile request for:", req.user._id, "Data:", req.body);
    
    const { full_name, phone_number, gender, image } = req.body;

    const updateData = {};
    if (full_name) updateData.full_name = full_name;
    if (phone_number) updateData.phone_number = phone_number;
    if (gender) updateData.gender = gender;
    if (image) updateData.image = image;

    console.log("💾 Updating user profile with:", updateData);
    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    console.log("✅ Profile updated for:", user.email);
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: { user }
    });

  } catch (error) {
    console.error("❌ Update profile error:", error.message);
    next(error);
  }
};


// change password (authenticated route)
export const changePassword = async (req, res, next) => {
  try {
    console.log("🔐 Change password request for user ID:", req.user._id);
    
    const { current_password, new_password, confirm_password } = req.body;

    if (new_password !== confirm_password) {
      console.log("❌ New passwords don't match for user:", req.user._id);
      throw new AppError("New passwords do not match", 400);
    }

    const user = await User.findById(req.user._id);
    
    console.log("🔒 Verifying current password");
    const isCurrentPasswordValid = await user.comparePassword(current_password);
    if (!isCurrentPasswordValid) {
      console.log("❌ Current password incorrect for user:", req.user._id);
      throw new AppError("Current password is incorrect", 400);
    }

    console.log("💾 Updating password for user:", req.user._id);
    user.password = await createHashedPassword(new_password);
    await user.save();

    console.log("✅ Password changed for user:", req.user._id);
    res.status(200).json({
      success: true,
      message: "Password changed successfully"
    });

  } catch (error) {
    console.error("❌ Change password error:", error.message);
    next(error);
  }
};


// get all users (admin route)
export const getAllUsers = async (req, res, next) => {
  try {
    console.log("📋 Get all users request:", req.query);
    
    const { page = 1, limit = 10, role, search } = req.query;
    const skip = (page - 1) * limit;

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

    console.log("🔍 Finding users with filter:", filter);
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    console.log("✅ Found", users.length, "users out of", total, "total");
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
    console.error("❌ Get all users error:", error.message);
    next(error);
  }
};

// get user by id (public route)
export const getUserById = async (req, res, next) => {
  try {
    console.log("👤 Get user by ID request:", req.params.id);
    
    const { id } = req.params;

    const user = await User.findById(id).select('-password');
    
    if (!user) {
      console.log("❌ User not found with ID:", id);
      throw new AppError("User not found", 404);
    }

    console.log("✅ User found:", user.email);
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: { user }
    });

  } catch (error) {
    console.error("❌ Get user by ID error:", error.message);
    next(error);
  }
};

// update user status (admin route)
export const updateUserStatus = async (req, res, next) => {
  try {
    console.log("🔄 Update user status request:", req.params.id, "Status:", req.body.is_active);
    
    const { id } = req.params;
    const { is_active } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { is_active },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      console.log("❌ User not found for status update:", id);
      throw new AppError("User not found", 404);
    }

    console.log("✅ User status updated:", user.email, "Active:", is_active);
    res.status(200).json({
      success: true,
      message: `User ${is_active ? 'activated' : 'deactivated'} successfully`,
      data: { user }
    });

  } catch (error) {
    console.error("❌ Update user status error:", error.message);
    next(error);
  }
};

// delete user (admin route ) 
export const deleteUser = async (req, res, next) => {
  try {
    console.log("🗑️ Delete user request:", req.params.id);
    
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      console.log("❌ User not found for deletion:", id);
      throw new AppError("User not found", 404);
    }

    console.log("✅ User deleted:", user.email);
    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {
    console.error("❌ Delete user error:", error.message);
    next(error);
  }
};