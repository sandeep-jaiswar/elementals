// app/dashboard/components/StockPrediction.tsx
import React from 'react';
import { Card, CardContent, Typography, Icon } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface Prediction {
  movement: 'up' | 'down';
  probability: number;
}

interface PredictionProps {
  prediction: Prediction;
}

const StockPrediction: React.FC<PredictionProps> = ({ prediction }) => {
  const { movement, probability } = prediction;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Prediction</Typography>
        <Icon
          color={movement === 'up' ? 'success' : 'error'}
          sx={{ fontSize: 48 }}
        >
          {movement === 'up' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        </Icon>
        <Typography variant="h6">
          {probability.toFixed(2)}% chance of{' '}
          {movement === 'up' ? 'rise' : 'fall'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StockPrediction;
