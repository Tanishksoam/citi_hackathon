import express from 'express';
import { getUserPortfolio, updateUserPortfolio } from '../controllers/portfolioController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

// Fetch a user's portfolio by userId (protected)
router.get('/:userId', auth, getUserPortfolio);
// Add or update a user's portfolio (protected)
router.put('/update/:userId', auth, updateUserPortfolio);

export default router;
