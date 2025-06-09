import axios from "axios";

export const fetchInvestmentRecommendation = async (formData) => {
  try {
    const response = await axios.post("http://localhost:3000/recommendation", {
      name: formData.name || "Client",
      age: Number(formData.age),
      income: Number(formData.income),
      risk: formData.riskTolerance, // <-- renamed field
      goal: formData.goal,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("API Error:", error);
    return {
      success: false,
      error: error.response?.data?.error || "Failed to get recommendations",
    };
  }
};
