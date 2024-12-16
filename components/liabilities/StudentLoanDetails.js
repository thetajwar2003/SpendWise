import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

export default function StudentLoanDetails({ liability }) {
    const {
        loan_name,
        guarantor,
        repayment_plan,
        interest_rate_percentage,
        next_payment_due_date,
        minimum_payment_amount,
        outstanding_interest_amount,
        pslf_status,
    } = liability;

    return (
        <Box>
            {/* Header */}
            <Box display="flex" alignItems="center" mb={3}>
                <SchoolIcon sx={{ fontSize: 48, color: "info.main", mr: 2 }} />
                <Typography variant="h4" fontWeight="bold" color="info.dark">
                    {loan_name}
                </Typography>
            </Box>

            {/* Loan Details */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ backgroundColor: "#f3faff" }}>
                        <CardContent>
                            <Typography variant="h6">Guarantor</Typography>
                            <Typography>{guarantor}</Typography>
                            <Typography>Repayment Plan: {repayment_plan.description}</Typography>
                            <Typography>Interest Rate: {interest_rate_percentage}%</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ backgroundColor: "#fff3f3" }}>
                        <CardContent>
                            <Typography variant="h6">Next Payment</Typography>
                            <Typography variant="h4">${minimum_payment_amount}</Typography>
                            <Typography>Due on {next_payment_due_date}</Typography>
                            <Typography>Outstanding Interest: ${outstanding_interest_amount}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* PSLF Status */}
            <Box mt={3}>
                <Card sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
                    <Typography variant="h6" gutterBottom>
                        PSLF Status
                    </Typography>
                    <Typography>Payments Made: {pslf_status.payments_made}</Typography>
                    <Typography>Remaining Payments: {pslf_status.payments_remaining}</Typography>
                </Card>
            </Box>
        </Box>
    );
}
