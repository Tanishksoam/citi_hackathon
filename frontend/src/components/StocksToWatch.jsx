import React, { useEffect, useState } from "react";

const API_URL = "https://api.marketaux.com/v1/news/all";
const API_KEY = "6DzbzuRLTa32nnny0j0KNezh3O2Xes0EzOxVdX0y";

const StocksToWatch = () => {
  const [stocks, setStocks] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockNews = async () => {
      try {
        const params = new URLSearchParams({
          industries: "Financial Services",
          filter_entities: "true",
          limit: "10",
          published_after: "2025-06-08T06:14",
          api_token: API_KEY
        });

        const response = await fetch(`${API_URL}?${params.toString()}`);
        const result = await response.json();
        const data = result.data || [];

        const positive = {};

        data.forEach(article => {
          (article.entities || []).forEach(entity => {
            const sentiment = entity.sentiment_score || 0;
            if (sentiment >= 0.3) {
              positive[entity.symbol] = entity.name;
            }
          });
        });

        setStocks(positive);
      } catch (error) {
        console.error("Failed to fetch stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockNews();
  }, []);

  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "2rem auto",
      padding: "1.5rem",
      border: "1px solid #ddd",
      borderRadius: "12px",
      background: "#f9f9f9",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{
        fontSize: "1.6rem",
        marginBottom: "1rem",
        color: "#2e7d32",
        borderBottom: "2px solid #2e7d32",
        paddingBottom: "0.5rem"
      }}>
        📈 Stocks to Watch
      </h2>

      {loading ? (
        <p style={{ color: "#888" }}>⏳ Loading...</p>
      ) : Object.keys(stocks).length === 0 ? (
        <p style={{ color: "#999" }}>🤷 No bullish signals right now.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {Object.entries(stocks).map(([symbol, name]) => (
            <li key={symbol} style={{
              padding: "0.6rem 1rem",
              marginBottom: "0.5rem",
              backgroundColor: "#e8f5e9",
              borderRadius: "8px",
              border: "1px solid #c8e6c9",
              color: "#1b5e20",
              fontWeight: "bold"
            }}>
              • {name} ({symbol})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StocksToWatch;
