import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question_text: {
      type: String,
      required: true,
      trim: true,
    },
    options: [{
      text: {
        type: String,
        required: true,
        trim: true,
      },
      is_correct: {
        type: Boolean,
        required: true,
        default: false,
      }
    }],
    level: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
      lowercase: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Validation to ensure at least one correct answer
questionSchema.pre('save', function(next) {
  const hasCorrectAnswer = this.options.some(option => option.is_correct);
  if (!hasCorrectAnswer) {
    return next(new Error('At least one option must be marked as correct'));
  }
  next();
});

// Index for better performance
questionSchema.index({ level: 1 });
questionSchema.index({ is_active: 1 });

// Static method to get questions by level
questionSchema.statics.getQuestionsByLevel = async function(level, limit = 30) {
  return await this.find({ 
    level: level.toLowerCase(), 
    is_active: true 
  })
  .select('-__v')
  .limit(limit)
  .lean();
};

const Question = mongoose.model("Question", questionSchema);

export default Question;