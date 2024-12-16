import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
    Box,
    Typography,
    CircularProgress,
    Stack,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
    Collapse,
    IconButton,
    Button,
    Card,
    CardContent,
    CardMedia,
} from '@mui/material';
import { ExpandMore, ExpandLess, ArrowBack } from '@mui/icons-material';
import { fetchAccountDetails } from '../api/transactions';

export default function AccountDetails() {
    const router = useRouter();
    const { id } = router.query;

    const [accountDetails, setAccountDetails] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [recurringTransactions, setRecurringTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showType, setShowType] = useState('all');
    const [expandRecurring, setExpandRecurring] = useState(false);

    const user_id = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;
    const access_token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await fetchAccountDetails(access_token, user_id, id);
                setAccountDetails(data.account_details);
                setTransactions(data.transactions);
                setRecurringTransactions(data.recurring_transactions);
            } catch (error) {
                console.error('Error fetching account details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id && access_token && user_id) {
            fetchDetails();
        }
    }, [id, access_token, user_id]);

    const displayedTransactions =
        showType === 'all' ? transactions : recurringTransactions.flatMap((rec) => rec.transactions);

    const formatRecurringTransaction = (rec) => {
        const upcomingDate = rec.transactions?.[0]?.date || 'N/A';
        const amount = rec.transactions?.[0]?.amount || 'N/A';
        return {
            name: rec.name,
            type: 'Recurring',
            date: new Date(upcomingDate).toLocaleDateString(),
            cost: amount,
        };
    };

    return (
        <Box
            sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#f9f9f9',
                color: '#333',
                minHeight: '100vh',
            }}
        >
            {/* Back Button */}
            <Box sx={{ width: '100%', maxWidth: 960, mb: 2 }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => router.push('/dashboard?tab=1')}
                    sx={{ color: '#333' }}
                >
                    Back to Dashboard
                </Button>
            </Box>

            {loading ? (
                <CircularProgress color="inherit" />
            ) : accountDetails ? (
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 960,
                        backgroundColor: '#fff',
                        borderRadius: 2,
                        p: 3,
                        boxShadow: 3,
                    }}
                >
                    {/* Header */}
                    <Typography variant="h4" align="center" gutterBottom>
                        {accountDetails.name} ({accountDetails.mask})
                    </Typography>
                    <Typography
                        align="center"
                        variant="h3"
                        sx={{ mb: 2, color: '#4caf50', fontWeight: 'bold' }}
                    >
                        ${accountDetails.balances.available.toLocaleString()}
                    </Typography>
                    <Typography align="center" variant="body1" color="textSecondary">
                        Available balance
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    {/* Filter Dropdown */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Typography variant="h6">Showing:</Typography>
                        <Select
                            value={showType}
                            onChange={(e) => setShowType(e.target.value)}
                            sx={{ borderRadius: 1, minWidth: 180 }}
                        >
                            <MenuItem value="all">All Transactions</MenuItem>
                            <MenuItem value="recurring">Recurring Transactions</MenuItem>
                        </Select>
                    </Stack>

                    {/* Recurring Transactions View */}
                    {showType === 'recurring' && (
                        <Box>
                            {recurringTransactions.map((rec, idx) => {
                                const { name, date, cost, type } = formatRecurringTransaction(rec);
                                return (
                                    <Card key={idx} sx={{ display: 'flex', mb: 2, p: 1 }}>
                                        {rec.logo_url && (
                                            <CardMedia
                                                component="img"
                                                image={rec.logo_url}
                                                alt={name}
                                                sx={{ width: 64, height: 64, borderRadius: '50%' }}
                                            />
                                        )}
                                        <CardContent sx={{ flex: 1 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                {name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {type} | Next Due: {date}
                                            </Typography>
                                        </CardContent>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                alignSelf: 'center',
                                                color: cost < 0 ? '#f44336' : '#4caf50',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {cost < 0 ? '-' : '+'}${Math.abs(cost).toLocaleString()}
                                        </Typography>
                                    </Card>
                                );
                            })}
                        </Box>
                    )}

                    {/* Transactions Table */}
                    {showType === 'all' && (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transactions.map((txn, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{new Date(txn.date).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    {txn.logo_url && (
                                                        <Box
                                                            component="img"
                                                            src={txn.logo_url}
                                                            alt={txn.name}
                                                            sx={{ width: 24, height: 24, borderRadius: '50%' }}
                                                        />
                                                    )}
                                                    <Typography variant="body2">{txn.name}</Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell>{txn.category?.[0] || txn.transaction_type}</TableCell>
                                            <TableCell
                                                align="right"
                                                sx={{
                                                    color: txn.amount < 0 ? '#f44336' : '#4caf50',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {txn.amount < 0 ? '-' : '+'}${Math.abs(txn.amount).toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            ) : (
                <Typography>No account details found.</Typography>
            )}
        </Box>
    );
}
