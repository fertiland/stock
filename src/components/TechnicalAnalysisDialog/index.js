// src/components/TechnicalAnalysisDialog/index.js
import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent,
  IconButton,
  Box
} from '@mui/material';
import { X } from 'lucide-react';
import TechnicalAnalysisCard from '../TechnicalAnalysisCard';

const TechnicalAnalysisDialog = ({ open, onClose, data, loading }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Detailed Technical Analysis
          <IconButton onClick={onClose} size="small">
            <X />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TechnicalAnalysisCard data={data} loading={loading} />
      </DialogContent>
    </Dialog>
  );
};

export default TechnicalAnalysisDialog;