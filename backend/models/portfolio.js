import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assets: Array, // Define asset structure as needed
  // Add other portfolio fields as needed
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export default Portfolio;
