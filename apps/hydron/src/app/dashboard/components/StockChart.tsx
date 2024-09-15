// app/dashboard/components/StockChart.tsx
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Card, CardContent, Typography } from '@mui/material';

interface StockChartProps {
  chartData: {
    labels: string[];
    prices: number[];
  };
}

const StockChart: React.FC<StockChartProps> = ({ chartData }) => {
  const { labels, prices } = chartData;

  const options = {
    xAxis: {
      type: 'category',
      data: labels, // X-axis labels (e.g., dates or time)
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: prices, // Stock prices
        type: 'line',
        smooth: true, // Smooth the line chart
        areaStyle: {}, // Optional: Fill the area under the line
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
    title: {
      text: 'Stock Performance',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Stock Performance</Typography>
        <ReactECharts
          option={options}
          style={{ height: '400px', width: '100%' }}
        />
      </CardContent>
    </Card>
  );
};

export default StockChart;
