import React from 'react';
import { useRouter } from 'next/router';
import {
    Box,
    Typography,
    CircularProgress,
    Card,
    CardContent,
    CardActions,
    Button,
    Divider,
    Stack,
    Avatar,
} from '@mui/material';

export default function AccountsList({ accounts, loading }) {
    const router = useRouter();

    const handleAccountClick = (accountId) => {
        router.push(`/accounts/${ accountId }`);
    };

    return (
        <Box sx={{ p: 3, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            {/* Header */}
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                User Accounts
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {/* Loading State */}
            {loading ? (
                <Stack alignItems="center" justifyContent="center" sx={{ minHeight: '50vh' }}>
                    <CircularProgress />
                </Stack>
            ) : accounts.length > 0 ? (
                <Stack spacing={3}>
                    {accounts.map((account) => (
                        <Card
                            key={account.account_id}
                            variant="outlined"
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                boxShadow: 3,
                                borderRadius: 2,
                                p: 2,
                                backgroundColor: '#ffffff',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                },
                            }}
                        >
                            {/* Account Icon */}
                            <Avatar
                                src={`https://source.unsplash.com/random/100x100?bank`}
                                alt={account.name}
                                sx={{ width: 64, height: 64, marginRight: 2 }}
                            />

                            {/* Account Details */}
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                                    {account.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Available Balance: $
                                    {account.balances.available || account.balances.current || 'N/A'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Type: {account.subtype || account.type || 'N/A'}
                                </Typography>
                            </CardContent>

                            {/* Action Button */}
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleAccountClick(account.account_id)}
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    View Details
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Stack>
            ) : (
                <Typography variant="h6" color="textSecondary" sx={{ textAlign: 'center' }}>
                    No accounts available.
                </Typography>
            )}
        </Box>
    );
}
