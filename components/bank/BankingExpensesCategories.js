import React from 'react';
import { Card, CardHeader, Box, Stack, Divider, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import ReactApexChart from '../graphs';
import merge from 'lodash/merge';

// Styled Card Component
const RootStyle = styled(Card)(({ theme }) => ({
  '& .apexcharts-legend': {
    width: 240,
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'wrap',
      height: 160,
      width: '50%',
    },
  },
  '& .apexcharts-datalabels-group': {
    display: 'none',
  },
}));

export default function BankingExpensesCategories({
  categories,
  totalCategories,
  totalExpenses,
}) {
  const theme = useTheme();

  // Chart Labels & Data
  const chartLabels = categories.map((item) => item.category);
  const chartData = categories.map((item) => item.amount);

  // Chart Options
  const chartOptions = merge(
    {
      chart: {
        type: 'polarArea',
      },
      stroke: {
        colors: [theme.palette.background.paper],
      },
      fill: { opacity: 0.8 },
      legend: {
        position: 'right',
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
      },
      responsive: [
        {
          breakpoint: theme.breakpoints.values.sm,
          options: {
            legend: {
              position: 'bottom',
              horizontalAlign: 'left',
            },
          },
        },
      ],
    },
    {
      labels: chartLabels,
      colors: [
        theme.palette.primary.main,
        theme.palette.info.darker,
        theme.palette.chart.yellow[0],
        theme.palette.chart.blue[0],
        theme.palette.chart.red[0],
        theme.palette.chart.green[0],
      ],
    }
  );

  return (
    <RootStyle>
      {/* Card Header */}
      <CardHeader title="Expenses Categories" />

      {/* Chart */}
      <Box sx={{ my: 5 }} dir="ltr">
        <ReactApexChart
          type="polarArea"
          series={chartData}
          options={chartOptions}
          height={360}
        />
      </Box>

      <Divider />

      {/* Summary */}
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
          <Typography sx={{ mb: 1, typography: 'body2', color: 'text.secondary' }}>
            Categories
          </Typography>
          <Typography sx={{ typography: 'h4' }}>{totalCategories}</Typography>
        </Box>

        <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
          <Typography sx={{ mb: 1, typography: 'body2', color: 'text.secondary' }}>
            Total Expenses
          </Typography>
          <Typography sx={{ typography: 'h4' }}>${totalExpenses.toLocaleString()}</Typography>
        </Box>
      </Stack>
    </RootStyle>
  );
}
