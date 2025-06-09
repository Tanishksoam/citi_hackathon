import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Allocation based on risk
const allocationMap = {
  Low: { Stocks: 30, Bonds: 50, Cash: 20 },
  Medium: { Stocks: 60, Bonds: 30, Cash: 10 },
  High: { Stocks: 80, Bonds: 15, Cash: 5 },
};

app.post("/recommendation", async (req, res) => {
  const { name = "Client", age, income, risk, goal } = req.body;

  if (!age || !income || !risk || !goal) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const allocation = allocationMap[risk] || allocationMap["Medium"];

  // More detailed prompt for Indian market & JSON output
  const prompt = `
You are an expert Indian financial advisor.

Given the following client profile:
- Age: ${age}
- Income: ₹${income.toLocaleString("en-IN")}
- Risk Tolerance: ${risk}
- Investment Goal: ${goal}

Suggest a detailed investment portfolio allocation based on these risk percentages:
- Stocks: ${allocation.Stocks}%
- Bonds: ${allocation.Bonds}%
- Cash: ${allocation.Cash}%

Assuming the client invests ₹${income.toLocaleString(
    "en-IN"
  )} annually, calculate the exact amount in ₹ to allocate to each category.

For each category, provide:

1. **Stocks**
   - List specific Indian stocks to invest in.
   - Specify the exact amount to invest in each stock.
   - Brief details about each stock (industry, market position, growth potential).
   - Expected annual return % and risk level (Low, Medium, High) for each stock.

2. **Bonds**
   - Recommend types of bonds (government, corporate, tax-free bonds, etc.).
   - Specify exact amount to invest in each bond type.
   - Details about the bond types, including tenure and yield.
   - Expected annual return % and risk level for each bond type.

3. **Cash Instruments**
   - Recommend specific cash instruments (fixed deposits, liquid funds, savings accounts).
   - Specify exact amount to invest in each instrument.
   - Explain why each instrument is suitable for cash allocation.
   - Expected annual return % and risk level for each instrument.

Return your answer strictly as a JSON object with this structure:

{
  "Stocks": [
    {
      "name": "Stock Name",
      "amount_invested": number,
      "details": "Brief info about stock",
      "expected_return": "x%",
      "risk": "Low|Medium|High"
    },
    ...
  ],
  "Bonds": [
    {
      "type": "Bond Type",
      "amount_invested": number,
      "details": "Brief info about bond",
      "expected_return": "x%",
      "risk": "Low|Medium|High"
    },
    ...
  ],
  "Cash": [
    {
      "instrument": "Instrument Name",
      "amount_invested": number,
      "details": "Why suitable",
      "expected_return": "x%",
      "risk": "Low|Medium|High"
    },
    ...
  ]
}
`;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
      }
    );

    const rawText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Try to extract JSON from the raw text response
    // (AI might return some text before/after JSON, so we parse carefully)
    const jsonStart = rawText.indexOf("{");
    const jsonEnd = rawText.lastIndexOf("}") + 1;
    let portfolioData = {};

    if (jsonStart !== -1 && jsonEnd !== -1) {
      const jsonString = rawText.substring(jsonStart, jsonEnd);
      try {
        portfolioData = JSON.parse(jsonString);
      } catch (err) {
        console.warn("Failed to parse AI JSON response, returning raw text");
        portfolioData = { raw: rawText };
      }
    } else {
      portfolioData = { raw: rawText };
    }

    res.json({
      name,
      age,
      income,
      risk,
      goal,
      allocation,
      portfolio: portfolioData,
    });
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch explanation from Gemini." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
