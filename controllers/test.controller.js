import AppError from "../utils/AppError.js";
import Question from "../models/question.model.js";
import Level from "../models/level.model.js";
import TestSubmission from "../models/testSubmission.model.js";
import { seedQuestions } from "../utils/seedQuestions.js";

export const getTest = async (req, res, next) => {
  try {
    const userId = req.user._id;

    console.log("📋 Test request from user:", userId);

    const userLevel = await Level.findOne({ user_id: userId, is_active: true });

    if (!userLevel) {
      console.log("❌ No level registered for user");
      throw new AppError('Please register for a level first', 400);
    }

    // Check if user has already taken test for this level
    const hasAlreadyTaken = await TestSubmission.hasUserTakenTest(userId, userLevel.level);
    if (hasAlreadyTaken) {
      console.log("❌ User has already taken test for level:", userLevel.level);
      throw new AppError('You have already taken the test for this level', 400);
    }

    console.log("🔍 Getting questions for level:", userLevel.level);
    const questions = await Question.getQuestionsByLevel(userLevel.level, 30);

    if (questions.length === 0) {
      console.log("❌ No questions found for level:", userLevel.level);
      throw new AppError(`No questions available for ${userLevel.level} level`, 404);
    }

    const formattedQuestions = questions.map(question => ({
      _id: question._id,
      question_text: question.question_text,
      options: question.options.map(option => ({
        text: option.text,
        _id: option._id
      })),
      subject: question.subject,
      level: question.level
    }));

    console.log(`✅ Retrieved ${questions.length} questions for ${userLevel.level} level`);

    res.status(200).json({
      success: true,
      message: `Test questions retrieved for ${userLevel.level} level`,
      data: {
        level: userLevel.level,
        total_questions: formattedQuestions.length,
        questions: formattedQuestions
      }
    });

  } catch (error) {
    console.error("💥 Get test error:", error);
    next(error);
  }
};

export const submitTest = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { answers } = req.body;

    console.log("📝 Test submission from user:", userId);

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      console.log("❌ Invalid answers provided");
      throw new AppError('Answers are required and must be an array', 400);
    }

    const userLevel = await Level.findOne({ user_id: userId, is_active: true });
    if (!userLevel) {
      console.log("❌ No level registered for user");
      throw new AppError('No level registration found', 400);
    }

    // Check if user has already taken test for this level
    const hasAlreadyTaken = await TestSubmission.hasUserTakenTest(userId, userLevel.level);
    if (hasAlreadyTaken) {
      console.log("❌ User has already taken test for level:", userLevel.level);
      throw new AppError('You have already taken the test for this level', 400);
    }

    console.log("🔍 Processing test submission for level:", userLevel.level);

    const questionIds = answers.map(answer => answer.question_id);
    const questions = await Question.find({ 
      _id: { $in: questionIds },
      level: userLevel.level 
    });

    if (questions.length !== answers.length) {
      console.log("❌ Question count mismatch");
      throw new AppError('Invalid questions in submission', 400);
    }

    let correctAnswers = 0;
    const processedAnswers = [];

    for (const answer of answers) {
      const question = questions.find(q => q._id.toString() === answer.question_id);
      
      if (!question) {
        console.log("❌ Question not found:", answer.question_id);
        throw new AppError('Invalid question in submission', 400);
      }

      const correctOption = question.options.find(opt => opt.is_correct);
      const isCorrect = correctOption && correctOption.text === answer.selected_option;

      if (isCorrect) correctAnswers++;

      processedAnswers.push({
        question_id: question._id,
        selected_option: answer.selected_option,
        is_correct: isCorrect
      });
    }

    const score = Math.round((correctAnswers / questions.length) * 100);

    console.log("📊 Test results:", {
      correct: correctAnswers,
      total: questions.length,
      score
    });

    const testSubmission = new TestSubmission({
      user_id: userId,
      level: userLevel.level,
      answers: processedAnswers,
      score,
      total_questions: questions.length,
      correct_answers: correctAnswers,
      submitted_at: new Date()
    });

    await testSubmission.save();
    console.log("✅ Test submission saved:", testSubmission._id);

    res.status(201).json({
      success: true,
      message: 'Test submitted successfully',
      data: {
        submission_id: testSubmission._id,
        level: testSubmission.level,
        score: testSubmission.score,
        percentage: testSubmission.percentage,
        correct_answers: testSubmission.correct_answers,
        total_questions: testSubmission.total_questions,
        passed: testSubmission.passed,
        pass_mark: testSubmission.pass_mark,
        submitted_at: testSubmission.submitted_at
      }
    });

  } catch (error) {
    console.error("💥 Test submission error:", error);
    next(error);
  }
};

export const getTestHistory = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;

    console.log("📚 Getting test history for user:", userId);

    const skip = (page - 1) * limit;
    
    const submissions = await TestSubmission.find({ user_id: userId })
      .sort({ submitted_at: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-answers')
      .lean();

    const totalSubmissions = await TestSubmission.countDocuments({ user_id: userId });

    console.log(`✅ Retrieved ${submissions.length} test submissions`);

    res.status(200).json({
      success: true,
      message: 'Test history retrieved successfully',
      data: {
        submissions,
        pagination: {
          current_page: parseInt(page),
          total_pages: Math.ceil(totalSubmissions / limit),
          total_submissions: totalSubmissions,
          has_next: skip + submissions.length < totalSubmissions,
          has_prev: page > 1
        }
      }
    });

  } catch (error) {
    console.error("💥 Get test history error:", error);
    next(error);
  }
};

export const getTestDetails = async (req, res, next) => {
  try {
    const { submissionId } = req.params;
    const userId = req.user._id;

    console.log("🔍 Getting test details for submission:", submissionId);

    const submission = await TestSubmission.findOne({ 
      _id: submissionId, 
      user_id: userId 
    })
    .populate('answers.question_id', 'question_text options subject')
    .lean();

    if (!submission) {
      console.log("❌ Test submission not found");
      throw new AppError('Test submission not found', 404);
    }

    console.log("✅ Test details retrieved");

    res.status(200).json({
      success: true,
      message: 'Test details retrieved successfully',
      data: submission
    });

  } catch (error) {
    console.error("💥 Get test details error:", error);
    next(error);
  }
};

export const getLevelStats = async (req, res, next) => {
  try {
    const { level } = req.params;

    console.log("📊 Getting statistics for level:", level);

    if (!['beginner', 'intermediate', 'advanced'].includes(level.toLowerCase())) {
      console.log("❌ Invalid level:", level);
      throw new AppError('Invalid level specified', 400);
    }

    const stats = await TestSubmission.getLevelStats(level);

    console.log("✅ Level statistics retrieved");

    res.status(200).json({
      success: true,
      message: `Statistics for ${level} level retrieved successfully`,
      data: {
        level,
        stats: stats[0] || {
          totalAttempts: 0,
          averageScore: 0,
          passRate: 0,
          averageTime: 0
        }
      }
    });

  } catch (error) {
    console.error("💥 Get level stats error:", error);
    next(error);
  }
};

export const seedTestQuestions = async (req, res, next) => {
  try {
    console.log("🌱 Seeding test questions...");

    if (req.user.role !== 'admin') {
      console.log("❌ Unauthorized seed attempt from:", req.user._id);
      throw new AppError('Only administrators can seed questions', 403);
    }

    const result = await seedQuestions();

    console.log("✅ Questions seeded successfully");

    res.status(200).json({
      success: true,
      message: 'Test questions seeded successfully',
      data: result
    });

  } catch (error) {
    console.error("💥 Seed questions error:", error);
    next(error);
  }
};