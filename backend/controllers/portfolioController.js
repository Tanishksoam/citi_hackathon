import Portfolio from '../models/portfolio.js';

// Fetch a user's portfolio by userId
export const getUserPortfolio = async (req, res) => {
  try {
    const { userId } = req.params;
    const portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add or update a user's portfolio
export const updateUserPortfolio = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = req.body;
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId },
      { ...data, userId },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json({ message: 'Portfolio saved', portfolio });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
