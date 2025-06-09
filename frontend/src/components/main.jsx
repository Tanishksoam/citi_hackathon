import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  Shield,
  Target,
  User,
  Calendar,
  Loader,
} from "lucide-react";
import PortfolioPage from "./PortfolioPage";
import HomePage from "./HomePage";
import { fetchInvestmentRecommendation } from "../api/api";
import PortfolioDashboard from "./recommendations";

// PortfolioRecommender component
const PortfolioRecommender = ({ onNavigate, setUserData }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    income: "",
    riskTolerance: "",
    goal: "",
    assets: [
      // Example initial asset
      { assetType: "", name: "", symbol: "", quantity: "", currentValue: "" },
    ],
    totalInvestment: "",
    annualSavings: "",
    timeHorizon: "",
  });

  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change for normal fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle asset field changes
  const handleAssetChange = (idx, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedAssets = prev.assets.map((asset, i) =>
        i === idx ? { ...asset, [name]: value } : asset
      );
      return { ...prev, assets: updatedAssets };
    });
  };

  // Add a new asset row
  const handleAddAsset = () => {
    setFormData((prev) => ({
      ...prev,
      assets: [
        ...prev.assets,
        { assetType: "", name: "", symbol: "", quantity: "", currentValue: "" },
      ],
    }));
  };

  // Remove an asset row
  const handleRemoveAsset = (idx) => {
    setFormData((prev) => ({
      ...prev,
      assets: prev.assets.filter((_, i) => i !== idx),
    }));
  };

  const calculatePortfolio = (age, riskTolerance, goal) => {
    let stocks = 0;
    let bonds = 0;
    let cash = 0;

    // Base allocation based on age (rule of thumb: 100 - age = stock percentage)
    const baseStockPercentage = Math.max(20, Math.min(90, 100 - parseInt(age)));

    // Adjust based on risk tolerance
    let riskMultiplier = 1;
    switch (riskTolerance) {
      case "Low":
        riskMultiplier = 0.7;
        break;
      case "Medium":
        riskMultiplier = 1;
        break;
      case "High":
        riskMultiplier = 1.3;
        break;
    }

    stocks = Math.min(
      90,
      Math.max(10, Math.round(baseStockPercentage * riskMultiplier))
    );

    // Adjust based on goal
    switch (goal) {
      case "Retirement":
        if (parseInt(age) > 50) {
          stocks = Math.max(30, stocks - 10);
          bonds = 60;
          cash = 10;
        } else {
          bonds = Math.round((100 - stocks) * 0.8);
          cash = 100 - stocks - bonds;
        }
        break;
      case "Education":
        stocks = Math.max(40, stocks - 5);
        bonds = Math.round((100 - stocks) * 0.7);
        cash = 100 - stocks - bonds;
        break;
      case "Growth":
        stocks = Math.min(85, stocks + 5);
        bonds = Math.round((100 - stocks) * 0.6);
        cash = 100 - stocks - bonds;
        break;
    }

    // Ensure percentages add up to 100
    const total = stocks + bonds + cash;
    if (total !== 100) {
      const diff = 100 - total;
      bonds += diff;
    }

    return { stocks, bonds, cash };
  };

  const generateAIExplanation = async (userData, allocation) => {
    // Simulate AI API call with realistic explanation generation
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API delay

    const { age, riskTolerance, goal, income } = userData;
    const { stocks, bonds, cash } = allocation;

    let explanation = `Based on your profile, here's why we recommend this allocation:\n\n`;

    // Age-based reasoning
    if (parseInt(age) < 35) {
      explanation += `At ${age} years old, you have a long investment horizon, allowing for higher equity exposure to maximize growth potential. `;
    } else if (parseInt(age) < 55) {
      explanation += `At ${age} years old, you're in your prime earning years with moderate time horizon, balancing growth with some stability. `;
    } else {
      explanation += `At ${age} years old, we've increased bond allocation to preserve capital while maintaining some growth exposure. `;
    }

    // Risk tolerance reasoning
    switch (riskTolerance) {
      case "Low":
        explanation += `Your conservative risk profile led us to emphasize stability with ${bonds}% bonds and ${cash}% cash, while still maintaining ${stocks}% stocks for inflation protection. `;
        break;
      case "Medium":
        explanation += `Your moderate risk tolerance allows for a balanced approach with ${stocks}% stocks for growth and ${bonds}% bonds for stability. `;
        break;
      case "High":
        explanation += `Your high risk tolerance enables aggressive growth with ${stocks}% stocks, accepting higher volatility for potentially greater returns. `;
        break;
    }

    // Goal-based reasoning
    switch (goal) {
      case "Retirement":
        explanation += `For retirement planning, we've structured this portfolio to provide long-term growth while gradually becoming more conservative as you approach retirement age.`;
        break;
      case "Education":
        explanation += `For education funding, this allocation balances growth potential with capital preservation, ensuring funds will be available when needed.`;
        break;
      case "Growth":
        explanation += `For wealth growth, we've maximized equity exposure while maintaining prudent diversification across asset classes.`;
        break;
    }

    explanation += `\n\nThis allocation aligns with Citi's investment philosophy of diversified, risk-adjusted portfolio construction tailored to your individual circumstances.`;

    return explanation;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (
  //     !formData.age ||
  //     !formData.income ||
  //     !formData.riskTolerance ||
  //     !formData.goal ||
  //     !formData.totalInvestment ||
  //     !formData.annualSavings ||
  //     !formData.timeHorizon
  //   ) {
  //     setError("Please fill in all required fields.");
  //     return;
  //   }

  //   setLoading(true);
  //   setError("");

  //   try {
  //     const allocation = calculatePortfolio(
  //       formData.age,
  //       formData.riskTolerance,
  //       formData.goal
  //     );
  //     const explanation = await generateAIExplanation(formData, allocation);

  //     setRecommendation({
  //       allocation,
  //       explanation,
  //       userData: formData,
  //     });
  //     setUserData({
  //       name: formData.name,
  //       age: formData.age,
  //       income: formData.income,
  //       riskTolerance: formData.riskTolerance,
  //       financialGoal: formData.goal,
  //       assets: formData.assets,
  //       totalInvestment: formData.totalInvestment,
  //       annualSavings: formData.annualSavings,
  //       timeHorizon: formData.timeHorizon,
  //     });
  //     onNavigate("portfolio");
  //   } catch (err) {
  //     setError("Failed to generate recommendation. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.age ||
      !formData.income ||
      !formData.riskTolerance ||
      !formData.goal ||
      !formData.totalInvestment ||
      !formData.annualSavings ||
      !formData.timeHorizon
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    const result = await fetchInvestmentRecommendation(formData);

    console.log("API Result:", result);

    if (result.success) {
      setRecommendation(result.data);
    } else {
      setError(result.error);
    }
  };

  const pieData = recommendation
    ? [
        {
          name: "Stocks",
          value: recommendation.allocation.stocks,
          color: "#0066CC",
        },
        {
          name: "Bonds",
          value: recommendation.allocation.bonds,
          color: "#66B2FF",
        },
        {
          name: "Cash",
          value: recommendation.allocation.cash,
          color: "#B3D9FF",
        },
      ]
    : [];

  const COLORS = ["#0066CC", "#66B2FF", "#B3D9FF"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Citi Wealth Management
              </h1>
              <p className="text-sm text-gray-600">
                AI-Powered Portfolio Recommender
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-1 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Your Investment Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name (Optional)
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="18"
                    max="100"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="25"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Annual Income *
                  </label>
                  <input
                    type="number"
                    name="income"
                    value={formData.income}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="75000"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Risk Tolerance *
                </label>
                <select
                  name="riskTolerance"
                  value={formData.riskTolerance}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select risk tolerance</option>
                  <option value="Low">Low - Conservative</option>
                  <option value="Medium">Medium - Balanced</option>
                  <option value="High">High - Aggressive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Target className="w-4 h-4 inline mr-1" />
                  Financial Goal *
                </label>
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select your goal</option>
                  <option value="Retirement">Retirement Planning</option>
                  <option value="Education">Education Funding</option>
                  <option value="Growth">Wealth Growth</option>
                </select>
              </div>

              {/* New fields for assets */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assets
                </label>
                {formData.assets.map((asset, idx) => (
                  <div
                    key={idx}
                    className="mb-4 p-4 border rounded-lg bg-gray-50 relative"
                  >
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        name="assetType"
                        value={asset.assetType}
                        onChange={(e) => handleAssetChange(idx, e)}
                        className="px-2 py-1 border rounded"
                        placeholder="Asset Type (e.g. stock)"
                      />
                      <input
                        type="text"
                        name="name"
                        value={asset.name}
                        onChange={(e) => handleAssetChange(idx, e)}
                        className="px-2 py-1 border rounded"
                        placeholder="Name (e.g. Apple Inc.)"
                      />
                      <input
                        type="text"
                        name="symbol"
                        value={asset.symbol}
                        onChange={(e) => handleAssetChange(idx, e)}
                        className="px-2 py-1 border rounded"
                        placeholder="Symbol (e.g. AAPL)"
                      />
                      <input
                        type="number"
                        name="quantity"
                        value={asset.quantity}
                        onChange={(e) => handleAssetChange(idx, e)}
                        className="px-2 py-1 border rounded"
                        placeholder="Quantity"
                        min="0"
                      />
                      <input
                        type="number"
                        name="currentValue"
                        value={asset.currentValue}
                        onChange={(e) => handleAssetChange(idx, e)}
                        className="px-2 py-1 border rounded"
                        placeholder="Current Value"
                        min="0"
                      />
                    </div>
                    {formData.assets.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAsset(idx)}
                        className="absolute top-2 right-2 text-red-500 text-xs"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddAsset}
                  className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                >
                  Add Asset
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Investment *
                  </label>
                  <input
                    type="number"
                    name="totalInvestment"
                    value={formData.totalInvestment}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Total Investment"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Savings *
                  </label>
                  <input
                    type="number"
                    name="annualSavings"
                    value={formData.annualSavings}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Annual Savings"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Horizon (years) *
                  </label>
                  <input
                    type="number"
                    name="timeHorizon"
                    value={formData.timeHorizon}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Time Horizon"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {loading && !recommendation ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Generating Recommendation...
                  </>
                ) : (
                  "Get Portfolio Recommendation"
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {!recommendation && !loading && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Your Portfolio Awaits
                </h3>
                <p className="text-gray-600">
                  Complete the form to receive your personalized investment
                  recommendation
                </p>
              </div>
            )}

            {loading && !recommendation && (
              <div className="text-center py-12">
                <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Analyzing Your Profile
                </h3>
                <p className="text-gray-600">
                  Our AI is crafting your personalized portfolio...
                </p>
              </div>
            )}

            {recommendation && (
              <>
                <PortfolioDashboard portfolioData={recommendation} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main navigation logic
const Main = () => {
  const [page, setPage] = useState("home");
  const [userData, setUserData] = useState(null);

  return (
    <>
      {page === "form" && (
        <PortfolioRecommender onNavigate={setPage} setUserData={setUserData} />
      )}
      {page === "portfolio" && (
        <PortfolioPage onNavigate={setPage} userData={userData} />
      )}
      {page === "home" && <HomePage onNavigate={setPage} />}
    </>
  );
};

export default Main;
