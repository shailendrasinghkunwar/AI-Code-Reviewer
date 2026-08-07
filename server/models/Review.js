const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
  line: { type: Number, default: 0 },
  description: { type: String, required: true },
  severity: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
  fix: { type: String, default: '' },
});

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: 'Untitled Code Review',
      trim: true,
    },
    language: {
      type: String,
      required: [true, 'Programming language is required'],
      trim: true,
      lowercase: true,
    },
    code: {
      type: String,
      required: [true, 'Code content is required'],
    },
    score: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    timeComplexity: {
      type: String,
      default: 'Not specified',
    },
    spaceComplexity: {
      type: String,
      default: 'Not specified',
    },
    bugs: [bugSchema],
    codeQuality: [{ type: String }],
    performance: [{ type: String }],
    security: [{ type: String }],
    bestPractices: [{ type: String }],
    readability: [{ type: String }],
    improvedCode: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
