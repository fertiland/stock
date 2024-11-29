// src/hooks/useStockAnalysis/index.js
import { useState } from 'react';
import { generateAnalysis } from '../../services/ollamaService';
import { parseResponse, generatePrompt } from '../../utils/helpers';

export const useStockAnalysis = () => {
    const [analysis, setAnalysis] = useState({
        technical: null,
        fundamental: null,
        sentiment: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const performAnalysis = async (type, stockSymbol, chartData) => {
        if (!stockSymbol) {
            setError('Please enter a stock symbol');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const prompt = generatePrompt(type, stockSymbol, chartData);
            console.info("prompt:", prompt);
            const data = await generateAnalysis(prompt);
            const analysisResult = parseResponse(data.response);

            setAnalysis(prev => ({
                ...prev,
                [type]: analysisResult
            }));
        } catch (error) {
            console.error('Analysis error:', error);
            setError('Failed to perform analysis. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    // const performAnalysis = async (type) => {
    //     setLoading(true);
    //     // Simulate API call to LLM
    //     setTimeout(() => {
    //         const mockResponses = {
    //             technical: {
    //                 summary: "Based on technical indicators, the stock shows a bullish trend with strong momentum. The 50-day moving average crossed above the 200-day moving average, forming a golden cross pattern.",
    //                 recommendation: "Consider buying with a stop loss at $145",
    //                 indicators: {
    //                     rsi: 65,
    //                     macd: "Positive",
    //                     movingAverages: "Bullish"
    //                 },
    //                 priceHistory: [
    //                     { "date": "2023-02-20", "price": 180.21, "volume": 1234567 },
    //                     { "date": "2023-03-01", "price": 182.15, "volume": 987654 },
    //                     { "date": "2023-03-15", "price": 184.50, "volume": 456789 }
    //                 ],
    //                 signals: [
    //                     { "type": "bullish", "name": "Golden Cross", "description": "20-day MA crosses above 50-day MA" },
    //                     { "type": "bearish", "name": "Death Cross", "description": "50-day MA crosses below 20-day MA" }
    //                 ],
    //                 "supportLevels": [140.00, 135.00],
    //                 "resistanceLevels": [190.00, 195.00]
    //             },
    //             fundamental: {
    //                 summary: "The company shows strong fundamentals with healthy profit margins and consistent revenue growth.",
    //                 metrics: {
    //                     peRatio: 22.5,
    //                     eps: 3.45,
    //                     debtToEquity: 0.8
    //                 },
    //                 recommendation: "Strong long-term investment potential"
    //             },
    //             sentiment: {
    //                 summary: "Overall positive market sentiment with increasing institutional interest.",
    //                 metrics: {
    //                     newsScore: 7.5,
    //                     socialMediaBuzz: "Positive",
    //                     analystRatings: "Buy"
    //                 }
    //             }
    //         };

    //         setAnalysis(prev => ({
    //             ...prev,
    //             [type]: mockResponses[type]
    //         }));
    //         setLoading(false);
    //     }, 1500);
    // };
    return { analysis, loading, error, performAnalysis };
};