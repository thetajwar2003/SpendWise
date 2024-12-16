import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fetchTransactionSummary, fetchUserBankAccounts } from '../api/transactions';
import TabsLayout from '../../layouts/TabLayout';
import DashboardSection from '../../sections/DashboardSection';
import AccountsList from '../../sections/AccountsList';

import { liabilities } from '../../mock/liabilities';
import LiabilitiesList from '../../sections/LiabilitiesList';

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
    const [userId, setUserId] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [loadingAccounts, setLoadingAccounts] = useState(false);

    useEffect(() => {
        // Safely access localStorage in client-side
        if (typeof window !== 'undefined') {
            const storedUserId = localStorage.getItem('user_id');
            const storedAccessToken = localStorage.getItem('access_token');
            setUserId(storedUserId);
            setAccessToken(storedAccessToken);
        }
    }, []);

    useEffect(() => {
        const fetchAccounts = async () => {
            if (currentTab === 1 && accessToken && userId) {
                try {
                    setLoadingAccounts(true);
                    const accountData = await fetchUserBankAccounts(accessToken, userId);
                    setAccounts(accountData);
                } catch (error) {
                    console.error('Error fetching accounts:', error);
                } finally {
                    setLoadingAccounts(false);
                }
            }
        };

        fetchAccounts();
    }, [currentTab, accessToken, userId]);


    useEffect(() => {
        const fetchData = async () => {
            if (userId && accessToken) {
                try {
                    setLoading(true);
                    const data = await fetchTransactionSummary(accessToken, userId);
                    setTransactionData(data);
                } catch (error) {
                    setError('Failed to fetch transaction summary');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [userId, accessToken]);

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
            <TabsLayout tabs={tabs} currentTab={currentTab} onTabChange={handleTabChange} />
            <ContentStyle>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <>
                        {currentTab === 0 && (
                            <DashboardSection
                                data={transactionData}
                                userId={userId}
                                accessToken={accessToken}
                            />
                        )}
                        {currentTab === 1 && <AccountsList accounts={accounts} loading={loadingAccounts} />}
                        {currentTab === 2 && <LiabilitiesList liabilities={liabilities} loading={loading} />}
                    </>
                )}
            </ContentStyle>
        </RootStyle>
    );
}
