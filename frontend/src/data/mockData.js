// filepath: c:\Users\JARVIS\Desktop\citi_hackathon\frontend\src\data\mockData.js
export function generatePortfolio(riskTolerance = "Medium") {
  // Example mock data, adjust as needed
  if (riskTolerance === "High") {
    return [
      { category: "Stocks", amount: 70000, percentage: 70, color: "#0066CC" },
      { category: "Bonds", amount: 20000, percentage: 20, color: "#66B2FF" },
      { category: "Cash", amount: 10000, percentage: 10, color: "#B3D9FF" },
    ];
  }
  if (riskTolerance === "Low") {
    return [
      { category: "Stocks", amount: 30000, percentage: 30, color: "#0066CC" },
      { category: "Bonds", amount: 50000, percentage: 50, color: "#66B2FF" },
      { category: "Cash", amount: 20000, percentage: 20, color: "#B3D9FF" },
    ];
  }
  // Default: Medium
  return [
    { category: "Stocks", amount: 50000, percentage: 50, color: "#0066CC" },
    { category: "Bonds", amount: 35000, percentage: 35, color: "#66B2FF" },
    { category: "Cash", amount: 15000, percentage: 15, color: "#B3D9FF" },
  ];
}