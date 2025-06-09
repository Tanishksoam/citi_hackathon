import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  age: {
    type: Number,
    min: 18,
    max: 100,
    required: true
  },
  income: {
    type: Number,
    min: 0,
    required: true
  },
  riskProfile: {
    type: Number,
    min: 0,
    max: 100,
    required: true // risk as a percentage
  },
  investmentGoals: {
    type: [String],
    default: [],
    validate: v => Array.isArray(v)
  },
  assets: [
    {
      assetType: { type: String, required: true },
      name: { type: String, required: true },
      symbol: { type: String },
      quantity: { type: Number, min: 0, required: true },
      currentValue: { type: Number, min: 0, required: true }
    }
  ],
  totalInvestment: {
    type: Number,
    min: 0,
    required: true
  },
  annualSavings: {
    type: Number,
    min: 0,
    required: true
  },
  timeHorizon: {
    type: Number,
    min: 1,
    max: 100,
    required: true
  }
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export default Portfolio;
