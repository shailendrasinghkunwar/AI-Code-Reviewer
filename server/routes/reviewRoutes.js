const express = require('express');
const {
  analyzeCode,
  getUserReviews,
  getReviewById,
  deleteReview,
  getUserStats,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply auth protection to all review routes
router.use(protect);

router.post('/analyze', analyzeCode);
router.get('/', getUserReviews);
router.get('/stats', getUserStats);
router.get('/:id', getReviewById);
router.delete('/:id', deleteReview);

module.exports = router;
