const Review = require('../models/Review');
const getGeminiClient = require('../config/gemini');
const { buildReviewPrompt, parseGeminiResponse } = require('../utils/geminiPrompt');

// @desc    Analyze code using Gemini API & save review
// @route   POST /api/reviews/analyze
// @access  Private
const analyzeCode = async (req, res, next) => {
  try {
    const { code, language, title } = req.body;

    if (!code || !code.trim()) {
      return res.status(400).json({ success: false, message: 'Code content is required' });
    }

    if (!language || !language.trim()) {
      return res.status(400).json({ success: false, message: 'Programming language is required' });
    }

    const prompt = buildReviewPrompt(code, language);

    console.log(`[Gemini Request] Analyzing ${language} code for user ${req.user._id}...`);

    let analysisResult;
    try {
      const geminiClient = getGeminiClient();
      const result = await geminiClient.models.generateContent({
        // Gemini 1.5 Flash was retired. Keep the model configurable so it can be
        // changed without editing source code when Google updates model lifecycles.
        model: process.env.GEMINI_MODEL || 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });
      const responseText = result.text;
      if (!responseText) {
        throw new Error('Gemini returned an empty response.');
      }
      analysisResult = parseGeminiResponse(responseText);
    } catch (aiError) {
      console.error('[Gemini API Error]', aiError.message);
      const statusCode = aiError.status === 429 ? 429 : 502;
      return res.status(statusCode).json({
        success: false,
        message: 'Gemini analysis failed. Verify your API key, available quota, and model access.',
        detail: process.env.NODE_ENV === 'development' ? aiError.message : undefined,
      });
    }

    // Save review to database
    const review = await Review.create({
      user: req.user._id,
      title: title && title.trim() ? title.trim() : `${language.toUpperCase()} Code Review`,
      language: language.toLowerCase(),
      code,
      score: analysisResult.score,
      summary: analysisResult.summary,
      timeComplexity: analysisResult.timeComplexity,
      spaceComplexity: analysisResult.spaceComplexity,
      bugs: analysisResult.bugs,
      codeQuality: analysisResult.codeQuality,
      performance: analysisResult.performance,
      security: analysisResult.security,
      bestPractices: analysisResult.bestPractices,
      readability: analysisResult.readability,
      improvedCode: analysisResult.improvedCode,
    });

    res.status(201).json({
      success: true,
      message: 'Code analysis completed successfully',
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reviews for logged-in user
// @route   GET /api/reviews
// @access  Private
const getUserReviews = async (req, res, next) => {
  try {
    const { language, search, page = 1, limit = 10 } = req.query;

    const query = { user: req.user._id };

    if (language) {
      query.language = language.toLowerCase();
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const reviews = await Review.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Review.countDocuments(query);

    res.status(200).json({
      success: true,
      count: reviews.length,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single review by ID
// @route   GET /api/reviews/:id
// @access  Private
const getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    // Verify ownership
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this review' });
    }

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete review by ID
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    // Verify ownership
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this review' });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get analytics statistics for logged-in user
// @route   GET /api/reviews/stats
// @access  Private
const getUserStats = async (req, res, next) => {
  try {
    const reviews = await Review.find({ user: req.user._id });

    const totalReviews = reviews.length;
    if (totalReviews === 0) {
      return res.status(200).json({
        success: true,
        data: {
          totalReviews: 0,
          averageScore: 0,
          totalBugsFound: 0,
          languagesCount: {},
        },
      });
    }

    const totalScore = reviews.reduce((acc, curr) => acc + (curr.score || 0), 0);
    const averageScore = Number((totalScore / totalReviews).toFixed(1));

    const totalBugsFound = reviews.reduce((acc, curr) => acc + (curr.bugs ? curr.bugs.length : 0), 0);

    const languagesCount = {};
    reviews.forEach((r) => {
      const lang = r.language || 'unknown';
      languagesCount[lang] = (languagesCount[lang] || 0) + 1;
    });

    res.status(200).json({
      success: true,
      data: {
        totalReviews,
        averageScore,
        totalBugsFound,
        languagesCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeCode,
  getUserReviews,
  getReviewById,
  deleteReview,
  getUserStats,
};
