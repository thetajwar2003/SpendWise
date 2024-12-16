import React, { useEffect, useState } from 'react';
import { Grid, Stack, Typography, Divider } from '@mui/material';
import BankingWidgetSummary from '../components/bank/BankingWidgetSummary';
import BankingCurrentBalance from '../components/bank/BankingCurrentBalance';
import BankingBalanceStatistics from '../components/bank/BankingBalanceStatistics';
import BankingExpensesCategories from '../components/bank/BankingExpensesCategories';
import BankingLoanWheel from '../components/bank/BankingLoanWheel';
import { extractTransactionAmounts } from '../utils/extractTransactionAmounts';
import { fetchMonthlySummary } from '../pages/api/transactions';


export default function DashboardSection({ data }) {
    const income = data?.income || 0;
    const expenses = data?.expenses || 0;

    const [monthlySummary, setMonthlySummary] = useState([]);

    const user_id = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;
    const access_token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const summary = await fetchMonthlySummary(access_token, user_id);
                setMonthlySummary(summary);
            } catch (error) {
                console.error('Error fetching monthly summary:', error);
            }
        };

        fetchData();
    }, [access_token, user_id]);

    return (
        <>
            <Typography variant="h2">Welcome John!</Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
                {/* Income and Expense Widgets */}
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

                {/* Current Balance Widget */}
                <Grid item xs={12} md={5}>
                    <BankingCurrentBalance />
                </Grid>

                {/* Balance Statistics */}
                <Grid item xs={12} md={12}>
                    <BankingBalanceStatistics monthlyData={monthlySummary} />
                </Grid>

                {/* Expenses Categories and Loan Wheel */}
                <Grid item xs={12} md={8}>
                    <BankingExpensesCategories />
                </Grid>
                <Grid item xs={12} md={4}>
                    <BankingLoanWheel />
                </Grid>
            </Grid>
        </>
    );
}
