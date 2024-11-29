// src/components/AnalysisCard/index.js
import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  CircularProgress, 
  Grid2, 
  Paper,
  Button
} from '@mui/material';
import { AlertCircle } from 'lucide-react';

export const AnalysisCard = ({ 
  title, 
  icon: Icon, 
  content, 
  loading,
  onViewDetails // new prop
}) => (
  <Card sx={{ width: '100%', mb: 2 }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Icon size={24} sx={{ mr: 1 }} />
        <Typography variant="h6">{title}</Typography>
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <CircularProgress />
        </Box>
      ) : content ? (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>{content.summary}</Typography>
          {content.recommendation && (
            <Paper sx={{ p: 2, bgcolor: '#f0f7ff', mb: 2 }}>
              <Typography variant="body2">
                <strong>Recommendation:</strong> {content.recommendation}
              </Typography>
            </Paper>
          )}
          {content.metrics && (
            <Grid2 container spacing={2}>
              {Object.entries(content.metrics).map(([key, value]) => (
                <Grid2 item xs={6} key={key}>
                  <Paper sx={{ p: 1.5, bgcolor: '#f5f5f5' }}>
                    <Typography variant="caption" color="textSecondary">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {value}
                    </Typography>
                  </Paper>
                </Grid2>
              ))}
            </Grid2>
          )}
          {onViewDetails && (
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={onViewDetails}
              >
                View Detailed Analysis
              </Button>
            </Box>
          )}
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', color: 'text.secondary', py: 2 }}>
          <AlertCircle style={{ marginBottom: '8px' }} />
          <Typography>No analysis performed yet</Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);