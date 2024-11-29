// src/utils/helpers/index.js
export const parseResponse = (text) => {
  try {
    // Ensure the input is valid
    if (!text || typeof text !== 'string') {
      throw new TypeError('Invalid input: text must be a non-empty string.');
    }
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      console.info('jsonMatch: ', jsonMatch)
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('No JSON found in response');
  } catch (error) {
    console.error('Error parsing response:', error);
    throw error;
  }
};

export const generatePrompt = (type, stockSymbol, chartData) => {
  const dailyTrade = JSON.stringify(chartData);
  const prompts = {
    technical: `Analyze the technical aspects of ${stockSymbol} stock based on trade data context below:
     ${dailyTrade}.
     Format response as a valid JSON object with field(type) , without ellipsis or comments or null:
        summary (string),
        recommendation (string),
        indicators: {
          rsi (number),
          macd (string),
          movingAverages (string)
        },
        priceHistory: Array of { date, price(number), volume(number) },
        signals: Array of { type: 'bullish' | 'bearish', name: string, description: string },
        supportLevels: number[],
        resistanceLevels: number[]
      taking response JSON object below for example:
      {
        "summary": "AAPL (Apple Inc.) stock performance and technical indicators",
        "recommendation": "",
        "indicators": {
          "rsi": 55,
          "macd": "Positive crossover, indicating bullish momentum",
          "movingAverages": "50-day MA: $150.23, 200-day MA: $130.51"
        },
        "priceHistory":  [
          { "date": "2023-02-01", "price": 180.21, "volume": 1234567 },
          { "date": "2023-02-02", "price": 182.15, "volume": 987654 },
          { "date": "2023-02-03", "price": 184.50, "volume": 456789 }
        ],
        "signals": [
          { "type": "bullish", "name": "Golden Cross", "description": "20-day MA crosses above 50-day MA" },
          { "type": "bearish", "name": "Death Cross", "description": "50-day MA crosses below 20-day MA" }
        ],
        "supportLevels": [140.00, 135.00],
        "resistanceLevels": [190.00, 195.00]
      }
      `,
    fundamental: `Analyze the fundamental aspects of ${stockSymbol} stock. Consider financial metrics, company performance, and growth potential. Format the response as JSON with fields: summary (string), recommendation (string), and metrics (object with fields: peRatio (number), eps (number), debtToEquity (number)).`,

    sentiment: `Analyze the market sentiment for ${stockSymbol} stock. Consider news, social media, and analyst opinions. Format the response as JSON with fields: summary (string), recommendation (string), and metrics (object with fields: newsScore (number), socialMediaBuzz (string), analystRatings (string)).`
  };
  return prompts[type];
};