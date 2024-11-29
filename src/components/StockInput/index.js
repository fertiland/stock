// src/components/StockInput/index.js
import React from 'react';
import { TextField, Alert } from '@mui/material';

export const StockInput = ({ value, onChange, error }) => (
  <>
    <TextField
      fullWidth
      placeholder="Enter stock symbol (e.g., AAPL)"
      value={value}
      onChange={(e) => onChange(e.target.value.toUpperCase())}
      sx={{ mb: 2 }}
    />
    {error && (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    )}
  </>
);