import React, { useState, useEffect } from 'react';
import { PieChart, TrendingUp, DollarSign, Target, ArrowRight, RefreshCw } from 'lucide-react';
import { generatePortfolio } from '../data/mockData';

const OverviewCard = ({ icon: Icon, value, label, colorClass }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <Icon className={`h-8 w-8 ${colorClass}`} />
      <span className="text-2xl font-bold text-gray-900">{value}</span>
    </div>
    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{label}</h3>
  </div>
);

const PortfolioPage = ({ onNavigate, userData }) => {
  const [portfolio, setPortfolio] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const riskTolerance = userData?.riskTolerance || 'Medium';
    if (typeof generatePortfolio === 'function') {
      setPortfolio(generatePortfolio(riskTolerance));
    }
    setTimeout(() => setIsLoading(false), 1000);
  }, [userData]);

  const totalAmount = portfolio.reduce((sum, item) => sum + (item.amount || 0), 0);
  const expectedReturn =
    userData?.riskTolerance === 'High'
      ? 12.5
      : userData?.riskTolerance === 'Low'
      ? 6.2
      : 8.8;

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low':
        return 'text-green-600 bg-green-100';
      case 'High':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Generating your personalized portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl w-fit mx-auto mb-6">
            <PieChart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {userData?.name ? `${userData.name}'s` : 'Your'} AI-Generated Portfolio
          </h1>
          <p className="text-lg text-gray-600">
            Optimized for {userData?.riskTolerance?.toLowerCase() || 'medium'} risk tolerance and{' '}
            {userData?.financialGoal?.toLowerCase() || 'wealth building'}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Portfolio Overview Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <OverviewCard
              icon={DollarSign}
              value={`$${totalAmount.toLocaleString()}`}
              label="Total Portfolio Value"
              colorClass="text-green-600"
            />
            <OverviewCard
              icon={TrendingUp}
              value={`${expectedReturn}%`}
              label="Expected Annual Return"
              colorClass="text-blue-600"
            />
            <OverviewCard
              icon={Target}
              value={
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(
                    userData?.riskTolerance || 'Medium'
                  )}`}
                >
                  {userData?.riskTolerance || 'Medium'} Risk
                </span>
              }
              label="Risk Profile"
              colorClass="text-purple-600"
            />
          </div>

          {/* Portfolio Allocation */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Portfolio Allocation</h2>
              <div className="space-y-6">
                {portfolio.map((item, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="font-semibold text-gray-900">{item.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-gray-900">
                          ${item.amount?.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">{item.percentage}%</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out group-hover:brightness-110"
                        style={{
                          backgroundColor: item.color,
                          width: `${item.percentage}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!userData && (
              <button
                aria-label="Create Your Personal Portfolio"
                onClick={() => onNavigate('form')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
              >
                Create Your Personal Portfolio
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            )}

            <button
              aria-label="View Market Sentiment"
              onClick={() => onNavigate('sentiment')}
              className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-blue-300 transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
            >
              View Market Sentiment
              <TrendingUp className="ml-2 h-5 w-5" />
            </button>

            <button
              aria-label="Regenerate Portfolio"
              onClick={() => window.location.reload()}
              className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Regenerate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;