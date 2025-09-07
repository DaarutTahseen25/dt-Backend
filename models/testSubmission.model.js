import mongoose from "mongoose";

const testSubmissionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    level: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
      lowercase: true,
    },
    answers: [{
      question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
      },
      selected_option: {
        type: String,
        required: true,
      },
      is_correct: {
        type: Boolean,
        required: true,
      }
    }],
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    total_questions: {
      type: Number,
      required: true,
      default: 30,
    },
    correct_answers: {
      type: Number,
      required: true,
      min: 0,
    },
    submitted_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    passed: {
      type: Boolean,
      required: true,
      default: false,
    },
    pass_mark: {
      type: Number,
      default: 60, // 60% to pass
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Calculate percentage and pass status before saving
testSubmissionSchema.pre('save', function(next) {
  this.percentage = (this.correct_answers / this.total_questions) * 100;
  this.passed = this.percentage >= this.pass_mark;
  next();
});

// Index for better performance
testSubmissionSchema.index({ user_id: 1 });
testSubmissionSchema.index({ level: 1 });
testSubmissionSchema.index({ submitted_at: -1 });

// Static method to get user's test history
testSubmissionSchema.statics.getUserTestHistory = async function(userId, limit = 10) {
  return await this.find({ user_id: userId })
    .sort({ submitted_at: -1 })
    .limit(limit)
    .populate('user_id', 'full_name email matric_number teacher_id')
    .select('-answers.question_id')
    .lean();
};

// Static method to get level statistics
testSubmissionSchema.statics.getLevelStats = async function(level) {
  return await this.aggregate([
    { $match: { level: level.toLowerCase() } },
    {
      $group: {
        _id: null,
        totalAttempts: { $sum: 1 },
        averageScore: { $avg: '$percentage' },
        passRate: {
          $avg: {
            $cond: [{ $gte: ['$passed', true] }, 1, 0]
          }
        }
      }
    }
  ]);
};

// Static method to check if user has already taken test for a level
testSubmissionSchema.statics.hasUserTakenTest = async function(userId, level) {
  const submission = await this.findOne({ 
    user_id: userId, 
    level: level.toLowerCase() 
  });
  return !!submission;
};

const TestSubmission = mongoose.model("TestSubmission", testSubmissionSchema);

export default TestSubmission;