// src/App.js
import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Tabs, Tab } from '@mui/material';
import { TrendingUp, BookOpen, MessageSquare } from 'lucide-react';
import { StockInput } from './components/StockInput';
import { PriceChart } from './components/PriceChart';
import { AnalysisCard } from './components/AnalysisCard';
import TechnicalAnalysisDialog from './components/TechnicalAnalysisDialog';
import FundamentalAnalysisDialog from './components/FundamentalAnalysisDialog';
import SentimentAnalysisDialog from './components/SentimentalAnalysisDialog';
import { useStockAnalysis } from './hooks/useStockAnalysis';

function App() {
  const [stockSymbol, setStockSymbol] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [technicalDialogOpen, setTechnicalDialogOpen] = useState(false);
  const [fundamentalDialogOpen, setFundamentalDialogOpen] = useState(false);
  const [sentimentDialogOpen, setSentimentDialogOpen] = useState(false);

  const [chartData, setChartData] = useState([]); // State for chart data
  const { analysis, loading, error, performAnalysis } = useStockAnalysis();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    const types = ['technical', 'fundamental', 'sentiment'];
    performAnalysis(types[newValue], stockSymbol, chartData);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );

  // Callback to update chart data from PriceChart
  const handleDataUpload = (data) => {
    setChartData(data);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Stock Analysis Dashboard
          </Typography>
          <StockInput 
            value={stockSymbol}
            onChange={setStockSymbol}
            error={error}
          />
          {/* Pass the chart data and upload handler */}
          <PriceChart data={chartData} onDataUpload={handleDataUpload} />
        </CardContent>
      </Card>

      <Box sx={{ width: '100%' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          sx={{ mb: 3 }}
        >
          <Tab 
            icon={<TrendingUp size={20} />} 
            label="Technical" 
            iconPosition="start"
          />
          <Tab 
            icon={<BookOpen size={20} />} 
            label="Fundamental" 
            iconPosition="start"
          />
          <Tab 
            icon={<MessageSquare size={20} />} 
            label="Sentiment" 
            iconPosition="start"
          />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <AnalysisCard
            title="Technical Analysis"
            icon={TrendingUp}
            content={analysis.technical}
            loading={loading}
            onViewDetails={() => setTechnicalDialogOpen(true)}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <AnalysisCard
            title="Fundamental Analysis"
            icon={BookOpen}
            content={analysis.fundamental}
            loading={loading}
            onViewDetails={() => setFundamentalDialogOpen(true)}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <AnalysisCard
            title="Sentiment Analysis"
            icon={MessageSquare}
            content={analysis.sentiment}
            loading={loading}
            onViewDetails={() => setSentimentDialogOpen(true)}
          />
        </TabPanel>
      </Box>

      <TechnicalAnalysisDialog
        open={technicalDialogOpen}
        onClose={() => setTechnicalDialogOpen(false)}
        data={analysis.technical}
        loading={loading}
      />
      <FundamentalAnalysisDialog
        open={fundamentalDialogOpen}
        onClose={() => setFundamentalDialogOpen(false)}
        data={analysis.fundamental}
        loading={loading}
      />
      <SentimentAnalysisDialog
        open={sentimentDialogOpen}
        onClose={() => setSentimentDialogOpen(false)}
        data={analysis.sentiment}
        loading={loading}
      />
    </Box>
  );
}

export default App;
