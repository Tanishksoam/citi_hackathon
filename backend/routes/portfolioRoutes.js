import express from 'express';
import { getPortfolio, updatePortfolio } from '../controllers/portfolioController.js';

const router = express.Router();

router.get('/:userId', getPortfolio);
router.put('/:userId', updatePortfolio);

export default router;
