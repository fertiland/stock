import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box
} from '@mui/material';
import { X } from 'lucide-react';
import FundamentalAnalysisCard from '../FundamentalAnalysisCard';

const FundamentalAnalysisDialog = ({ open, onClose, data, loading }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Detailed Fundamental Analysis
          <IconButton onClick={onClose} size="small">
            <X />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <FundamentalAnalysisCard data={data} loading={loading} />
      </DialogContent>
    </Dialog>
  );
};

export default FundamentalAnalysisDialog;