import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid2,
  Box,
  Paper,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const FundamentalAnalysisCard = ({ data, loading }) => {
  const metrics = data?.metrics || {};
  
  const getMetricStatus = (value, benchmarks) => {
    if (!benchmarks) return 'neutral';
    if (value > benchmarks.good) return 'positive';
    if (value < benchmarks.poor) return 'negative';
    return 'neutral';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'positive': return 'success.main';
      case 'negative': return 'error.main';
      default: return 'warning.main';
    }
  };

  const MetricCard = ({ title, value, benchmarks, description }) => {
    const status = getMetricStatus(value, benchmarks);
    return (
      <Paper elevation={2} sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle1" color="text.primary">
            {title}
          </Typography>
          <Typography 
            variant="h6"
            color={getStatusColor(status)}
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
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Key Financial Metrics */}
      <Grid2 container spacing={3}>
        <Grid2 item xs={12} md={4}>
          <MetricCard
            title="P/E Ratio"
            value={metrics.peRatio || 0}
            benchmarks={{ poor: 5, good: 25 }}
            description="Price to Earnings ratio indicates valuation relative to earnings"
          />
        </Grid2>
        <Grid2 item xs={12} md={4}>
          <MetricCard
            title="Debt/Equity"
            value={metrics.debtEquity || 0}
            benchmarks={{ poor: 2, good: 0.5 }}
            description="Measures financial leverage and long-term financial health"
          />
        </Grid2>
        <Grid2 item xs={12} md={4}>
          <MetricCard
            title="Current Ratio"
            value={metrics.currentRatio || 0}
            benchmarks={{ poor: 1, good: 2 }}
            description="Indicates ability to pay short-term obligations"
          />
        </Grid2>
      </Grid2>

      {/* Financial Growth Chart */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Revenue and Earnings Growth
          </Typography>
          <Box sx={{ width: '100%', height: 400 }}>
            <LineChart
              width={800}
              height={400}
              data={data?.financialHistory || []}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="quarter" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                name="Revenue"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="earnings"
                stroke="#82ca9d"
                name="Earnings"
              />
            </LineChart>
          </Box>
        </CardContent>
      </Card>

      {/* Financial Health Indicators */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Financial Health Indicators
          </Typography>
          <Grid2 container spacing={2}>
            {data?.healthIndicators?.map((indicator, index) => (
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
                  {indicator.status === 'positive' ? (
                    <TrendingUp 
                      style={{ 
                        color: '#2e7d32', 
                        marginRight: '8px' 
                      }} 
                    />
                  ) : indicator.status === 'negative' ? (
                    <TrendingDown 
                      style={{ 
                        color: '#d32f2f', 
                        marginRight: '8px' 
                      }} 
                    />
                  ) : (
                    <AlertCircle 
                      style={{ 
                        color: '#ed6c02', 
                        marginRight: '8px' 
                      }} 
                    />
                  )}
                  <Box>
                    <Typography variant="subtitle1">
                      {indicator.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {indicator.description}
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

export default FundamentalAnalysisCard;