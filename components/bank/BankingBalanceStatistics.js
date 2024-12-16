import merge from 'lodash/merge';
import { useState } from 'react';
import { Card, CardHeader, Box, TextField } from '@mui/material';
import ReactApexChart, { Options } from '../graphs';

export default function BankingBalanceStatistics({ monthlyData }) {
  const [seriesData, setSeriesData] = useState('Year');

  const handleChangeSeriesData = (event) => {
    setSeriesData(event.target.value);
  };

  // Generate dynamic chart data from monthlyData
  const chartData = [
    {
      year: 'Year',
      data: [
        { name: 'Income', data: monthlyData.map((item) => item.income) },
        { name: 'Expenses', data: monthlyData.map((item) => item.expenses) },
      ],
    },
  ];

  const chartOptions = merge(Options(), {
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: { categories: monthlyData.map((item) => item.month) },
    tooltip: {
      y: { formatter: (val) => `$${ val }` },
    },
  });

  return (
    <Card>
      <CardHeader
        title="Balance Statistics"
        action={
          <TextField
            select
            fullWidth
            value={seriesData}
            SelectProps={{ native: true }}
            onChange={handleChangeSeriesData}
            sx={{
              '& fieldset': { border: '0 !important' },
              '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
              '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
              '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 },
            }}
          >
            {chartData.map((option) => (
              <option key={option.year} value={option.year}>
                {option.year}
              </option>
            ))}
          </TextField>
        }
      />

      {chartData.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <ReactApexChart type="bar" series={item.data} options={chartOptions} height={364} />
          )}
        </Box>
      ))}
    </Card>
  );
}
