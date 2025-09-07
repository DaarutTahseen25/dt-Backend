import AppError from "../utils/AppError.js";
import Level from "../models/level.model.js";

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

    console.log("🔍 Checking existing level registration for user:", userId);
    const existingLevel = await Level.findOne({ user_id: userId });

    if (existingLevel) {
      if (existingLevel.level === level.toLowerCase()) {
        console.log("❌ User already registered for this level:", level);
        throw new AppError('You are already registered for this level', 400);
      }

      console.log("🔄 Updating existing level registration from", existingLevel.level, "to", level);
      existingLevel.level = level.toLowerCase();
      existingLevel.registered_at = new Date();
      await existingLevel.save();

      console.log("✅ Level updated successfully");
      return res.status(200).json({
        success: true,
        message: `Level updated successfully to ${level}`,
        data: {
          user_id: existingLevel.user_id,
          level: existingLevel.level,
          registered_at: existingLevel.registered_at,
          is_active: existingLevel.is_active
        }
      });
    }

    console.log("💾 Creating new level registration");
    const newLevel = new Level({
      user_id: userId,
      level: level.toLowerCase(),
      registered_at: new Date()
    });

    await newLevel.save();
    console.log("✅ Level registered successfully:", newLevel._id);

    res.status(201).json({
      success: true,
      message: `Successfully registered for ${level} level`,
      data: {
        user_id: newLevel.user_id,
        level: newLevel.level,
        registered_at: newLevel.registered_at,
        is_active: newLevel.is_active
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
    const userLevel = await Level.findOne({ user_id: userId, is_active: true });

    if (!userLevel) {
      console.log("❌ No level found for user");
      throw new AppError('No level registered for this user', 404);
    }

    console.log("✅ Level found:", userLevel.level);
    res.status(200).json({
      success: true,
      message: 'User level retrieved successfully',
      data: {
        user_id: userLevel.user_id,
        level: userLevel.level,
        registered_at: userLevel.registered_at,
        is_active: userLevel.is_active
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

    const userLevel = await Level.findOne({ user_id: userId });

    if (!userLevel) {
      console.log("❌ No level registration found");
      throw new AppError('No level registration found for this user', 404);
    }

    if (userLevel.level === level.toLowerCase()) {
      console.log("❌ Same level provided");
      throw new AppError('You are already registered for this level', 400);
    }

    console.log("🔄 Updating level from", userLevel.level, "to", level);
    userLevel.level = level.toLowerCase();
    userLevel.registered_at = new Date();
    await userLevel.save();

    console.log("✅ Level updated successfully");
    res.status(200).json({
      success: true,
      message: `Level updated successfully to ${level}`,
      data: {
        user_id: userLevel.user_id,
        level: userLevel.level,
        registered_at: userLevel.registered_at,
        is_active: userLevel.is_active
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
        description: 'Basic questions suitable for beginners',
        difficulty: 1
      },
      { 
        name: 'intermediate', 
        description: 'Moderate questions for intermediate learners',
        difficulty: 2
      },
      { 
        name: 'advanced', 
        description: 'Challenging questions for advanced learners',
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