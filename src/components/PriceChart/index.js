import React from 'react';
import { Box, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Papa from 'papaparse';

export const PriceChart = ({ data, onDataUpload }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          const formattedData = result.data.map((item) => ({
            date: item.Date,
            price: item.Close,
            volume: item.Volume
          }));
          onDataUpload(formattedData); // Pass the data up to App
        },
        error: (error) => {
          console.error('Error parsing file:', error);
        },
      });
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Button
        variant="contained"
        component="label"
        sx={{ mb: 2 }}
      >
        Upload Stock History
        <input
          type="file"
          accept=".csv"
          hidden
          onChange={handleFileUpload}
        />
      </Button>
      {data.length > 0 && (
        <LineChart width={700} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
          <Line type="monotone" dataKey="volume" stroke="#8884d8" />
        </LineChart>
      )}
    </Box>
  );
};
