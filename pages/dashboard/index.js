import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fetchTransactionSummary } from '../api/transactions';
import TabsLayout from '../../layouts/TabLayout';
import DashboardSection from '../../sections/DashboardSection';

const RootStyle = styled(Box)(({ theme }) => ({
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
}));

const ContentStyle = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    overflowY: 'auto',
    backgroundColor: theme.palette.background.paper,
}));

export default function Dashboard() {
    const [currentTab, setCurrentTab] = useState(0);
    const [transactionData, setTransactionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user_id = typeof window !== 'undefined' ? localStorage.getItem("user_id") : null;
    const access_token = typeof window !== 'undefined' ? localStorage.getItem("access_token") : null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await fetchTransactionSummary(access_token, user_id);
                setTransactionData(data);
            } catch (error) {
                setError('Failed to fetch transaction summary');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [access_token, user_id]);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const tabs = [
        { label: 'Overview' },
        { label: 'Accounts' },
        { label: 'Liabilities' },
    ];

    return (
        <RootStyle>
            {/* Tabs Navigation */}
            <TabsLayout tabs={tabs} currentTab={currentTab} onTabChange={handleTabChange} />

            {/* Tab Content */}
            <ContentStyle>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <>
                        {currentTab === 0 && <DashboardSection data={transactionData} />}
                        {currentTab === 1 && (
                            <Typography variant="h4">Accounts Section - Work in Progress</Typography>
                        )}
                        {currentTab === 2 && (
                            <Typography variant="h4">Liabilities Section - Work in Progress</Typography>
                        )}
                    </>
                )}
            </ContentStyle>
        </RootStyle>
    );
}
