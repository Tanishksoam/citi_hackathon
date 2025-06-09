import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  User,
  Target,
  DollarSign,
  Shield,
  Calendar,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const portfolioData = {
  name: "Rahul Sharma",
  age: 25,
  income: 9000000,
  risk: "high",
  goal: "Retirement",
  allocation: {
    Stocks: 60,
    Bonds: 30,
    Cash: 10,
  },
  portfolio: {
    Stocks: [
      {
        name: "HDFC Bank",
        amount_invested: 1080000,
        details:
          "Leading private sector bank in India. Strong market position and consistent growth. Diversified operations and robust risk management.",
        expected_return: "15%",
        risk: "Medium",
      },
      {
        name: "Reliance Industries",
        amount_invested: 1080000,
        details:
          "Conglomerate with diverse interests in energy, petrochemicals, retail, and telecom. Strong growth potential due to its Jio platform and expanding retail presence.",
        expected_return: "18%",
        risk: "Medium",
      },
      {
        name: "Infosys",
        amount_invested: 810000,
        details:
          "Leading IT services company. Strong track record of growth and profitability. Benefiting from the digital transformation trend.",
        expected_return: "16%",
        risk: "Medium",
      },
      {
        name: "Tata Consultancy Services (TCS)",
        amount_invested: 810000,
        details:
          "Largest IT services company in India. Strong brand reputation and global presence. Consistent dividend payer.",
        expected_return: "14%",
        risk: "Medium",
      },
      {
        name: "ICICI Bank",
        amount_invested: 810000,
        details:
          "Second-largest private sector bank in India. Focused on technology and innovation. Growing market share and improving asset quality.",
        expected_return: "17%",
        risk: "Medium",
      },
      {
        name: "Larsen & Toubro (L&T)",
        amount_invested: 540000,
        details:
          "Leading engineering and construction company. Strong order book and diversified operations. Benefiting from government infrastructure spending.",
        expected_return: "19%",
        risk: "Medium",
      },
      {
        name: "Asian Paints",
        amount_invested: 324000,
        details:
          "Dominant player in the Indian paints industry. Strong brand reputation and distribution network. Consistent growth and profitability.",
        expected_return: "13%",
        risk: "Medium",
      },
      {
        name: "Titan Company",
        amount_invested: 324000,
        details:
          "Leading player in the Indian jewelry and watch market. Strong brand reputation and expanding retail presence. Benefiting from rising disposable incomes.",
        expected_return: "20%",
        risk: "High",
      },
      {
        name: "Divi's Laboratories",
        amount_invested: 270000,
        details:
          "Leading pharmaceutical company manufacturing active pharmaceutical ingredients (APIs). Strong growth potential due to increasing demand for APIs.",
        expected_return: "22%",
        risk: "High",
      },
      {
        name: "Bajaj Finance",
        amount_invested: 270000,
        details:
          "Leading NBFC focused on consumer finance. Strong growth potential due to increasing demand for personal loans and consumer durables financing.",
        expected_return: "25%",
        risk: "High",
      },
      {
        name: "Hindustan Unilever Limited (HUL)",
        amount_invested: 270000,
        details:
          "India's largest Fast Moving Consumer Goods company. Strong brand and wide distribution network.",
        expected_return: "12%",
        risk: "Low",
      },
    ],
    Bonds: [
      {
        type: "Government Bonds (G-Secs)",
        amount_invested: 900000,
        details:
          "Sovereign bonds issued by the Indian government. Low risk and guaranteed returns. 10-year tenure.",
        expected_return: "7.2%",
        risk: "Low",
      },
      {
        type: "Corporate Bonds (AAA Rated)",
        amount_invested: 900000,
        details:
          "Bonds issued by highly rated (AAA) corporations. Offer higher yields than government bonds but carry slightly more risk. 5-year tenure.",
        expected_return: "8.5%",
        risk: "Low",
      },
      {
        type: "Tax-Free Bonds (NHAI/REC)",
        amount_invested: 900000,
        details:
          "Bonds issued by government-owned entities where interest income is exempt from tax. Suitable for high-income individuals. 10-year tenure.",
        expected_return: "6.8% (Tax-Free)",
        risk: "Low",
      },
    ],
    Cash: [
      {
        instrument: "Liquid Funds",
        amount_invested: 450000,
        details:
          "Mutual funds that invest in short-term debt instruments. Offer high liquidity and relatively stable returns. Suitable for emergency funds and short-term goals.",
        expected_return: "6%",
        risk: "Low",
      },
      {
        instrument: "Fixed Deposits (FDs)",
        amount_invested: 450000,
        details:
          "Offer guaranteed returns for a fixed period. Safe and reliable investment option. Suitable for parking funds for specific short-term needs.",
        expected_return: "7%",
        risk: "Low",
      },
    ],
  },
};

const PortfolioDashboard = ({ portfolioData }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [activeTab, setActiveTab] = useState("all");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const allocationData = [
    {
      name: "Stocks",
      value: portfolioData.allocation.Stocks,
      color: "#3B82F6",
    },
    { name: "Bonds", value: portfolioData.allocation.Bonds, color: "#10B981" },
    { name: "Cash", value: portfolioData.allocation.Cash, color: "#F59E0B" },
  ];

  const totalInvestment =
    portfolioData.portfolio.Stocks.reduce(
      (sum, stock) => sum + stock.amount_invested,
      0
    ) +
    portfolioData.portfolio.Bonds.reduce(
      (sum, bond) => sum + bond.amount_invested,
      0
    ) +
    portfolioData.portfolio.Cash.reduce(
      (sum, cash) => sum + cash.amount_invested,
      0
    );

  // Combine all investments into one table format
  const getAllInvestments = () => {
    const stocks = portfolioData.portfolio.Stocks.map((stock) => ({
      name: stock.name,
      category: "Stock",
      amount_invested: stock.amount_invested,
      expected_return: parseFloat(stock.expected_return.replace("%", "")),
      expected_return_display: stock.expected_return,
      risk: stock.risk,
      details: stock.details,
      projected_value:
        stock.amount_invested *
        (1 + parseFloat(stock.expected_return.replace("%", "")) / 100),
    }));

    const bonds = portfolioData.portfolio.Bonds.map((bond) => ({
      name: bond.type,
      category: "Bond",
      amount_invested: bond.amount_invested,
      expected_return: parseFloat(
        bond.expected_return.replace(/[%()]/g, "").split(" ")[0]
      ),
      expected_return_display: bond.expected_return,
      risk: bond.risk,
      details: bond.details,
      projected_value:
        bond.amount_invested *
        (1 +
          parseFloat(bond.expected_return.replace(/[%()]/g, "").split(" ")[0]) /
            100),
    }));

    const cash = portfolioData.portfolio.Cash.map((cash) => ({
      name: cash.instrument,
      category: "Cash",
      amount_invested: cash.amount_invested,
      expected_return: parseFloat(cash.expected_return.replace("%", "")),
      expected_return_display: cash.expected_return,
      risk: cash.risk,
      details: cash.details,
      projected_value:
        cash.amount_invested *
        (1 + parseFloat(cash.expected_return.replace("%", "")) / 100),
    }));

    return [...stocks, ...bonds, ...cash];
  };

  const allInvestments = getAllInvestments();

  const getFilteredInvestments = () => {
    if (activeTab === "all") return allInvestments;
    return allInvestments.filter(
      (inv) => inv.category.toLowerCase() === activeTab
    );
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedInvestments = () => {
    const filteredData = getFilteredInvestments();
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (sortConfig.key === "name") {
        return sortConfig.direction === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }

      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (sortConfig.direction === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case "low":
        return "text-green-700 bg-green-100 border-green-200";
      case "medium":
        return "text-yellow-700 bg-yellow-100 border-yellow-200";
      case "high":
        return "text-red-700 bg-red-100 border-red-200";
      default:
        return "text-gray-700 bg-gray-100 border-gray-200";
    }
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case "stock":
        return "text-blue-700 bg-blue-100 border-blue-200";
      case "bond":
        return "text-green-700 bg-green-100 border-green-200";
      case "cash":
        return "text-yellow-700 bg-yellow-100 border-yellow-200";
      default:
        return "text-gray-700 bg-gray-100 border-gray-200";
    }
  };

  const sortedInvestments = getSortedInvestments();

  return (
    <div className="w-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                {portfolioData.name}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Age: {portfolioData.age}
                </span>
                <span className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  Income: {formatCurrency(portfolioData.income)}
                </span>
                <span className="flex items-center">
                  <Target className="w-4 h-4 mr-1" />
                  Goal: {portfolioData.goal}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Allocation Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Asset Allocation
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Portfolio Value */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-600" />
              Portfolio Overview
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600">Total Investment</p>
                <p className="text-2xl font-bold text-slate-800">
                  {formatCurrency(totalInvestment)}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">
                  Projected Value (1 Year)
                </p>
                <p className="text-xl font-bold text-green-600">
                  {formatCurrency(
                    allInvestments.reduce(
                      (sum, inv) => sum + inv.projected_value,
                      0
                    )
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Risk Profile</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(
                    portfolioData.risk
                  )}`}
                >
                  {portfolioData.risk.charAt(0).toUpperCase() +
                    portfolioData.risk.slice(1)}{" "}
                  Risk
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex space-x-4 mb-6">
            {["all", "stock", "bond", "cash"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab !== "all" && (
                  <span className="ml-2 text-xs">
                    (
                    {tab === "stock"
                      ? portfolioData.portfolio.Stocks.length
                      : tab === "bond"
                      ? portfolioData.portfolio.Bonds.length
                      : portfolioData.portfolio.Cash.length}
                    )
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Investment Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-3 font-semibold text-slate-700">
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center hover:text-blue-600 transition-colors"
                    >
                      Investment Name
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    </button>
                  </th>
                  <th className="text-left p-3 font-semibold text-slate-700">
                    <button
                      onClick={() => handleSort("category")}
                      className="flex items-center hover:text-blue-600 transition-colors"
                    >
                      Category
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    </button>
                  </th>
                  <th className="text-right p-3 font-semibold text-slate-700">
                    <button
                      onClick={() => handleSort("amount_invested")}
                      className="flex items-center hover:text-blue-600 transition-colors"
                    >
                      Amount Invested
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    </button>
                  </th>
                  <th className="text-center p-3 font-semibold text-slate-700">
                    <button
                      onClick={() => handleSort("expected_return")}
                      className="flex items-center hover:text-blue-600 transition-colors"
                    >
                      Expected Return
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    </button>
                  </th>
                  <th className="text-right p-3 font-semibold text-slate-700">
                    <button
                      onClick={() => handleSort("projected_value")}
                      className="flex items-center hover:text-blue-600 transition-colors"
                    >
                      Projected Value
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    </button>
                  </th>
                  <th className="text-center p-3 font-semibold text-slate-700">
                    <button
                      onClick={() => handleSort("risk")}
                      className="flex items-center hover:text-blue-600 transition-colors"
                    >
                      Risk Level
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedInvestments.map((investment, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-3">
                      <div>
                        <div className="font-medium text-slate-800">
                          {investment.name}
                        </div>
                        <div
                          className="text-xs text-slate-500 mt-1 max-w-xs truncate"
                          title={investment.details}
                        >
                          {investment.details}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                          investment.category
                        )}`}
                      >
                        {investment.category}
                      </span>
                    </td>
                    <td className="p-3 text-right font-semibold text-slate-800">
                      {formatCurrency(investment.amount_invested)}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center">
                        {investment.expected_return >= 15 ? (
                          <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-yellow-600 mr-1" />
                        )}
                        <span className="font-medium text-green-600">
                          {investment.expected_return_display}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      <div className="font-semibold text-slate-800">
                        {formatCurrency(investment.projected_value)}
                      </div>
                      <div className="text-xs text-green-600">
                        +
                        {formatCurrency(
                          investment.projected_value -
                            investment.amount_invested
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(
                          investment.risk
                        )}`}
                      >
                        {investment.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Summary */}
          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Total Investments:</span>
                <div className="font-semibold text-slate-800">
                  {sortedInvestments.length}
                </div>
              </div>
              <div>
                <span className="text-slate-600">Total Amount:</span>
                <div className="font-semibold text-slate-800">
                  {formatCurrency(
                    sortedInvestments.reduce(
                      (sum, inv) => sum + inv.amount_invested,
                      0
                    )
                  )}
                </div>
              </div>
              <div>
                <span className="text-slate-600">Projected Value:</span>
                <div className="font-semibold text-green-600">
                  {formatCurrency(
                    sortedInvestments.reduce(
                      (sum, inv) => sum + inv.projected_value,
                      0
                    )
                  )}
                </div>
              </div>
              <div>
                <span className="text-slate-600">Expected Gain:</span>
                <div className="font-semibold text-green-600">
                  {formatCurrency(
                    sortedInvestments.reduce(
                      (sum, inv) =>
                        sum + (inv.projected_value - inv.amount_invested),
                      0
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDashboard;
