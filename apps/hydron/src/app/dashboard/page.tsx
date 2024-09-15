'use client';

import React, { useState } from 'react';
import { Container, Grid, Box } from '@mui/material';
import StockSearchBar from './components/StockSearchBar';
import StockOverview from './components/StockOverview';
import StockPrediction from './components/StockPrediction';
import StockChart from './components/StockChart';

interface Stock {
  symbol: string;
  price: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
}

interface ChartData {
  labels: string[];
  prices: number[];
}

const StockDashboard: React.FC = () => {
  const [stock, setStock] = useState<Stock | null>(null);
  const [prediction, setPrediction] = useState(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);

  const handleSearch = async (searchValue: string) => {
    try {
      // Fetch stock data
      const stockResponse = await fetch(`/api/stock?symbol=${searchValue}`);
      const stockData = await stockResponse.json();

      if (stockData.error) {
        console.error(stockData.error);
        return;
      }

      // Update stock overview and chart data
      setStock({
        symbol: stockData.symbol,
        price: stockData.regularMarketPrice,
        changePercent: stockData.regularMarketChangePercent,
        volume: stockData.regularMarketVolume,
        high: stockData.regularMarketDayHigh,
        low: stockData.regularMarketDayLow,
      });

      setChartData({
        labels: ['Open', 'High', 'Low', 'Close'], // Placeholder
        prices: [
          stockData.regularMarketOpen,
          stockData.regularMarketDayHigh,
          stockData.regularMarketDayLow,
          stockData.regularMarketPreviousClose,
        ],
      });

      // Fetch stock prediction
      const predictionResponse = await fetch('/api/predictStockMovement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: stockData.symbol,
          historicalData: {
            open: stockData.regularMarketOpen,
            high: stockData.regularMarketDayHigh,
            low: stockData.regularMarketDayLow,
            close: stockData.regularMarketPreviousClose,
          },
        }),
      });

      const predictionData = await predictionResponse.json();
      setPrediction(predictionData.prediction);
    } catch (error) {
      console.error('Error fetching stock data or prediction:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <StockSearchBar onSearch={handleSearch} />
      </Box>
      {stock && (
        <Grid container spacing={4} mt={2}>
          <Grid item xs={12} md={4}>
            <StockOverview stock={stock} />
          </Grid>
          <Grid item xs={12} md={4}>
            {prediction && <StockPrediction prediction={prediction} />}
          </Grid>
        </Grid>
      )}
      {chartData && (
        <Box mt={4}>
          <StockChart chartData={chartData} />
        </Box>
      )}
    </Container>
  );
};

export default StockDashboard;
