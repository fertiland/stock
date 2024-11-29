// src/components/TechnicalAnalysisCard/index.js
import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid2, 
  Box,
  Paper
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TechnicalAnalysisCard = ({ data, loading }) => {
  const indicators = data?.indicators || {};
  
  const getIndicatorColor = (value, threshold) => {
    if (value > threshold.high) return 'error.main';
    if (value < threshold.low) return 'success.main';
    return 'warning.main';
  };

  const IndicatorCard = ({ title, value, thresholds, description }) => (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="subtitle1" color="text.primary">
          {title}
        </Typography>
        <Typography 
          variant="h6"
          color={getIndicatorColor(value, thresholds)}
          fontWeight="bold"
        >
          {typeof value === 'number' ? value.toFixed(2) : value}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Technical Indicators Summary */}
      <Grid2 container spacing={3}>
        <Grid2 item xs={12} md={4}>
          <IndicatorCard
            title="RSI"
            value={indicators.rsi || 0}
            thresholds={{ low: 30, high: 70 }}
            description="Relative Strength Index shows overbought/oversold conditions"
          />
        </Grid2>
        <Grid2 item xs={12} md={4}>
          <IndicatorCard
            title="MACD"
            value={indicators.macd || "Neutral"}
            thresholds={{ low: -0.5, high: 0.5 }}
            description="Moving Average Convergence Divergence signal"
          />
        </Grid2>
        <Grid2 item xs={12} md={4}>
          <IndicatorCard
            title="Moving Averages"
            value={indicators.movingAverages || "Neutral"}
            thresholds={{ low: -1, high: 1 }}
            description="Trend direction based on multiple moving averages"
          />
        </Grid2>
      </Grid2>

      {/* Price and Volume Chart */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Price and Volume Analysis
          </Typography>
          <Box sx={{ width: '100%', height: 400 }}>
            <LineChart
              width={800}
              height={400}
              data={data?.priceHistory || []}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                name="Price"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="volume"
                stroke="#82ca9d"
                name="Volume"
              />
              {data?.supportLevels?.map((level, index) => (
                <ReferenceLine
                  key={`support-${index}`}
                  yAxisId="left" 
                  y={level}
                  stroke="green"
                  strokeDasharray="3 3"
                />

              ))}
              {data?.resistanceLevels?.map((level, index) => (
                <ReferenceLine
                  key={`resistance-${index}`}
                  yAxisId="left"
                  y={level}
                  stroke="red"
                  strokeDasharray="3 3"
                />
              ))}
            </LineChart>
          </Box>
        </CardContent>
      </Card>

      {/* Technical Signals */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Technical Signals
          </Typography>
          <Grid2 container spacing={2}>
            {data?.signals?.map((signal, index) => (
              <Grid2 item xs={12} sm={6} key={index}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center',
                    bgcolor: 'grey.50'
                  }}
                >
                  {signal.type === 'bullish' ? (
                    <TrendingUp 
                      style={{ 
                        color: '#2e7d32', 
                        marginRight: '8px' 
                      }} 
                    />
                  ) : (
                    <TrendingDown 
                      style={{ 
                        color: '#d32f2f', 
                        marginRight: '8px' 
                      }} 
                    />
                  )}
                  <Box>
                    <Typography variant="subtitle1">
                      {signal.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {signal.description}
                    </Typography>
                  </Box>
                </Paper>
              </Grid2>
            ))}
          </Grid2>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TechnicalAnalysisCard;