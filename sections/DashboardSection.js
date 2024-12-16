import React, { useEffect, useState } from 'react';
import { Grid, Stack, Typography, Divider } from '@mui/material';
import BankingWidgetSummary from '../components/bank/BankingWidgetSummary';
import BankingCurrentBalance from '../components/bank/BankingCurrentBalance';
import BankingBalanceStatistics from '../components/bank/BankingBalanceStatistics';
import BankingExpensesCategories from '../components/bank/BankingExpensesCategories';
import BankingLoanWheel from '../components/bank/BankingLoanWheel';
import { extractTransactionAmounts } from '../utils/extractTransactionAmounts';
import { fetchMonthlySummary, fetchExpenseCategories } from '../pages/api/transactions';

export default function DashboardSection({ data, userId, accessToken }) {
    const income = data?.income || 0;
    const expenses = data?.expenses || 0;

    const [monthlySummary, setMonthlySummary] = useState([]);
    const [expenseCategories, setExpenseCategories] = useState({
        categories: [],
        totalCategories: 0,
        totalExpenses: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (accessToken && userId) {
                    const summary = await fetchMonthlySummary(accessToken, userId);
                    setMonthlySummary(summary);

                    const response = await fetchExpenseCategories(accessToken, userId);
                    setExpenseCategories({
                        categories: response.categories || [],
                        totalCategories: response.total_categories || 0,
                        totalExpenses: response.total_expenses || 0,
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [accessToken, userId]);

    return (
        <>
            <Typography variant="h2">Welcome Back!</Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                        <BankingWidgetSummary
                            title="Income"
                            icon={'eva:diagonal-arrow-right-up-fill'}
                            percent={2.6}
                            total={income}
                            chartData={extractTransactionAmounts(data?.income_details)}
                        />
                        <BankingWidgetSummary
                            title="Expenses"
                            color="warning"
                            icon={'eva:diagonal-arrow-right-down-fill'}
                            percent={-0.5}
                            total={expenses}
                            chartData={extractTransactionAmounts(data?.expense_details)}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={5}>
                    <BankingCurrentBalance />
                </Grid>

                <Grid item xs={12} md={12}>
                    <BankingBalanceStatistics monthlyData={monthlySummary} />
                </Grid>

                <Grid item xs={12} md={12}>
                    <BankingExpensesCategories
                        categories={expenseCategories.categories}
                        totalCategories={expenseCategories.totalCategories}
                        totalExpenses={expenseCategories.totalExpenses}
                    />
                </Grid>

                {/* <Grid item xs={12} md={4}>
                    <BankingLoanWheel />
                </Grid> */}
            </Grid>
        </>
    );
}
