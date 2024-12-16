import React from "react";
import { useRouter } from "next/router";
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
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";

export default function LiabilitiesList({ liabilities, loading }) {
    const router = useRouter();

    const handleLiabilityClick = (accountId) => {
        router.push(`/liabilities/${ accountId }`);
    };

    const getIconForSubtype = (subtype) => {
        switch (subtype) {
            case "credit card":
                return <CreditCardIcon sx={{ fontSize: 40 }} />;
            case "student":
                return <SchoolIcon sx={{ fontSize: 40 }} />;
            case "mortgage":
                return <HomeIcon sx={{ fontSize: 40 }} />;
            default:
                return <AccountBalanceIcon sx={{ fontSize: 40 }} />;
        }
    };

    return (
        <Box sx={{ p: 3, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
            {/* Header */}
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold" }}>
                Liabilities
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {/* Loading State */}
            {loading ? (
                <Stack alignItems="center" justifyContent="center" sx={{ minHeight: "50vh" }}>
                    <CircularProgress />
                </Stack>
            ) : liabilities && liabilities.length > 0 ? (
                <Stack spacing={3}>
                    {liabilities.map((liabilityGroup) =>
                        Object.entries(liabilityGroup).map(([type, accounts]) =>
                            accounts.map((account) => (
                                <Card
                                    key={account.account_id}
                                    variant="outlined"
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        boxShadow: 3,
                                        borderRadius: 2,
                                        p: 2,
                                        backgroundColor: "#ffffff",
                                        transition: "transform 0.3s",
                                        "&:hover": {
                                            transform: "scale(1.02)",
                                        },
                                    }}
                                >
                                    {/* Liability Icon */}
                                    <Avatar
                                        sx={{
                                            width: 64,
                                            height: 64,
                                            marginRight: 2,
                                            backgroundColor: "#e3f2fd",
                                            color: "#1976d2",
                                        }}
                                    >
                                        {getIconForSubtype(account.subtype)}
                                    </Avatar>

                                    {/* Liability Details */}
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                                            {account.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                            Balance: ${account.balances.current.toLocaleString()}{" "}
                                            {account.balances.iso_currency_code || ""}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Type: {account.subtype || account.type || "N/A"}
                                        </Typography>
                                    </CardContent>

                                    {/* Action Button */}
                                    <CardActions>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleLiabilityClick(account.account_id)}
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            View Details
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))
                        )
                    )}
                </Stack>
            ) : (
                <Typography variant="h6" color="textSecondary" sx={{ textAlign: "center" }}>
                    No liabilities found.
                </Typography>
            )}
        </Box>
    );
}
