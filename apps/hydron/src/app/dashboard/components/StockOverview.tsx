// app/dashboard/components/StockOverview.tsx
import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

interface Stock {
  symbol: string;
  price: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
}

interface StockOverviewProps {
  stock: Stock;
}

const StockOverview: React.FC<StockOverviewProps> = ({ stock }) => {
  const { symbol, price, changePercent, volume, high, low } = stock;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{symbol}</Typography>
        <Typography variant="h6">${price.toFixed(2)}</Typography>
        <Typography color={changePercent > 0 ? 'success.main' : 'error.main'}>
          {changePercent.toFixed(2)}%
        </Typography>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={4}>
            <Typography variant="body2">Volume: {volume}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">High: {high}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">Low: {low}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StockOverview;
