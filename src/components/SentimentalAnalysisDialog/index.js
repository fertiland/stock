// src/components/SentimentAnalysisDialog/index.js
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box
} from '@mui/material';
import { X } from 'lucide-react';
import SentimentalAnalysisCard from '../SentimentalAnalysisCard';

const SentimentAnalysisDialog = ({ open, onClose, data, loading }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Detailed Sentiment Analysis
          <IconButton onClick={onClose} size="small">
            <X />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <SentimentalAnalysisCard data={data} loading={loading} />
      </DialogContent>
    </Dialog>
  );
};

export default SentimentAnalysisDialog;