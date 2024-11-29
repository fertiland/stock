// src/components/SentimentalAnalysisCard/index.js
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Paper,
  LinearProgress
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, MessageSquare } from 'lucide-react';

const SentimentalAnalysisCard = ({ data, loading }) => {
  const sentiment = data?.sentiment || {};
  
  const getSentimentalColor = (score) => {
    if (score >= 0.6) return 'success.main';
    if (score <= 0.4) return 'error.main';
    return 'warning.main';
  };

  const SentimentalMetricCard = ({ title, value, description }) => (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="subtitle1" color="text.primary">
          {title}
        </Typography>
        <Typography 
          variant="h6"
          color={getSentimentalColor(value)}
          fontWeight="bold"
        >
          {typeof value === 'number' ? (value * 100).toFixed(1) + '%' : value}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Sentiment Summary */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SentimentalMetricCard
            title="Overall Sentiment"
            value={sentiment.overall || 0}
            description="Aggregated sentiment score from all sources"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SentimentalMetricCard
            title="News Sentiment"
            value={sentiment.news || 0}
            description="Sentiment analysis from recent news articles"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SentimentalMetricCard
            title="Social Sentiment"
            value={sentiment.social || 0}
            description="Sentiment from social media discussions"
          />
        </Grid>
      </Grid>

      {/* Sentiment Trends Chart */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Sentiment Trends
          </Typography>
          <Box sx={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart
                data={data?.sentimentHistory || []}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="positive" fill="#4caf50" name="Positive" />
                <Bar dataKey="neutral" fill="#ff9800" name="Neutral" />
                <Bar dataKey="negative" fill="#f44336" name="Negative" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      {/* Key Mentions */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Key Mentions
          </Typography>
          <Grid container spacing={2}>
            {data?.mentions?.map((mention, index) => (
              <Grid item xs={12} key={index}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'flex-start',
                    bgcolor: 'grey.50'
                  }}
                >
                  <MessageSquare 
                    style={{ 
                      color: getSentimentalColor(mention.sentiment),
                      marginRight: '8px',
                      marginTop: '4px'
                    }} 
                  />
                  <Box>
                    <Typography variant="subtitle1">
                      {mention.source}
                    </Typography>
                    <Typography variant="body2" sx={{ my: 1 }}>
                      {mention.content}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {mention.date} • Sentimental Score: {(mention.sentiment * 100).toFixed(1)}%
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SentimentalAnalysisCard;