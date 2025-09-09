import AppError from "../utils/AppError.js";
import User from "../models/user.model.js";

export const registerLevel = async (req, res, next) => {
  try {
    console.log("📝 Level registration attempt:", { 
      userId: req.user._id, 
      level: req.body.level 
    });

    const { level } = req.body;
    const userId = req.user._id;

    if (!level) {
      console.log("❌ Level not provided");
      throw new AppError('Level is required', 400);
    }

    const validLevels = ['beginner', 'intermediate', 'advanced'];
    if (!validLevels.includes(level.toLowerCase())) {
      console.log("❌ Invalid level:", level);
      throw new AppError('Invalid level. Must be beginner, intermediate, or advanced', 400);
    }

    console.log("🔄 Updating user level");
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { level: level.toLowerCase() },
      { new: true, select: '_id full_name email level role' }
    );

    if (!updatedUser) {
      console.log("❌ User not found");
      throw new AppError('User not found', 404);
    }

    console.log("✅ Level registered successfully");
    res.status(200).json({
      success: true,
      message: `Successfully registered for ${level} level`,
      data: {
        user_id: updatedUser._id,
        level: updatedUser.level,
        full_name: updatedUser.full_name,
        email: updatedUser.email,
        role: updatedUser.role
      }
    });

  } catch (error) {
    console.error("💥 Level registration error:", error);
    next(error);
  }
};

export const getUserLevel = async (req, res, next) => {
  try {
    const userId = req.user._id;

    console.log("🔍 Getting level for user:", userId);
    const user = await User.findById(userId).select('_id full_name email level role');

    if (!user) {
      console.log("❌ User not found");
      throw new AppError('User not found', 404);
    }

    if (!user.level) {
      console.log("❌ No level registered for user");
      throw new AppError('No level registered for this user', 404);
    }

    console.log("✅ Level found:", user.level);
    res.status(200).json({
      success: true,
      message: 'User level retrieved successfully',
      data: {
        user_id: user._id,
        level: user.level,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("💥 Get user level error:", error);
    next(error);
  }
};

export const updateLevel = async (req, res, next) => {
  try {
    const { level } = req.body;
    const userId = req.user._id;

    console.log("🔄 Level update attempt:", { 
      userId, 
      newLevel: level 
    });

    if (!level) {
      console.log("❌ Level not provided");
      throw new AppError('Level is required', 400);
    }

    const validLevels = ['beginner', 'intermediate', 'advanced'];
    if (!validLevels.includes(level.toLowerCase())) {
      console.log("❌ Invalid level:", level);
      throw new AppError('Invalid level. Must be beginner, intermediate, or advanced', 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      console.log("❌ User not found");
      throw new AppError('User not found', 404);
    }

    if (user.level === level.toLowerCase()) {
      console.log("❌ Same level provided");
      throw new AppError('You are already registered for this level', 400);
    }

    console.log("🔄 Updating level from", user.level, "to", level);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { level: level.toLowerCase() },
      { new: true, select: '_id full_name email level role' }
    );

    console.log("✅ Level updated successfully");
    res.status(200).json({
      success: true,
      message: `Level updated successfully to ${level}`,
      data: {
        user_id: updatedUser._id,
        level: updatedUser.level,
        full_name: updatedUser.full_name,
        email: updatedUser.email,
        role: updatedUser.role
      }
    });

  } catch (error) {
    console.error("💥 Level update error:", error);
    next(error);
  }
};

export const getAllLevels = async (_, res, next) => {
  try {
    console.log("📋 Getting all available levels");

    const availableLevels = [
      { 
        name: 'beginner', 
        description: 'Basic Islamic knowledge (5 pillars, prayers, Quran basics)',
        difficulty: 1
      },
      { 
        name: 'intermediate', 
        description: 'Islamic jurisprudence, history, theology, and practices',
        difficulty: 2
      },
      { 
        name: 'advanced', 
        description: 'Complex Islamic philosophy, scholarship, and advanced theology',
        difficulty: 3
      }
    ];

    console.log("✅ Available levels retrieved");
    res.status(200).json({
      success: true,
      message: 'Available levels retrieved successfully',
      data: availableLevels
    });

  } catch (error) {
    console.error("💥 Get all levels error:", error);
    next(error);
  }
};