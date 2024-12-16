import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

export default function MortgageDetails({ liability }) {
    const {
        name,
        loan_term,
        interest_rate,
        next_monthly_payment,
        next_payment_due_date,
        current_late_fee,
        escrow_balance,
        property_address,
        origination_date,
        origination_principal_amount,
    } = liability;

    return (
        <Box>
            {/* Header */}
            <Box display="flex" alignItems="center" mb={3}>
                <HomeIcon sx={{ fontSize: 48, color: "secondary.main", mr: 2 }} />
                <Typography variant="h4" fontWeight="bold" color="secondary.dark">
                    {name}
                </Typography>
            </Box>

            {/* Loan Details */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ backgroundColor: "#f3faff" }}>
                        <CardContent>
                            <Typography variant="h6">Loan Term</Typography>
                            <Typography>{loan_term}</Typography>
                            <Typography>Interest Rate: {interest_rate.percentage}% ({interest_rate.type})</Typography>
                            <Typography>Origination Date: {origination_date}</Typography>
                            <Typography>Principal Amount: ${origination_principal_amount}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ backgroundColor: "#fff3f3" }}>
                        <CardContent>
                            <Typography variant="h6">Next Payment</Typography>
                            <Typography variant="h4">${next_monthly_payment}</Typography>
                            <Typography>Due on {next_payment_due_date}</Typography>
                            <Typography>Late Fee: ${current_late_fee}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Property Address */}
            <Box mt={3}>
                <Card sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
                    <Typography variant="h6" gutterBottom>
                        Property Address
                    </Typography>
                    <Typography>
                        {property_address.street}, {property_address.city}, {property_address.region} {property_address.postal_code}
                    </Typography>
                </Card>
            </Box>
        </Box>
    );
}
