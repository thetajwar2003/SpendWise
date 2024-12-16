import React from "react";
import { Card, CardContent, Typography, Grid, Accordion, AccordionSummary, AccordionDetails, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CreditCardIcon from "@mui/icons-material/CreditCard";

export default function CreditCardDetails({ liability }) {
    const {
        name,
        last_statement_balance,
        minimum_payment_amount,
        next_payment_due_date,
        last_payment_amount,
        last_payment_date,
        aprs,
    } = liability;

    return (
        <Box>
            {/* Header */}
            <Box display="flex" alignItems="center" mb={3}>
                <CreditCardIcon sx={{ fontSize: 48, color: "primary.main", mr: 2 }} />
                <Typography variant="h4" fontWeight="bold" color="primary.dark">
                    {name}
                </Typography>
            </Box>

            {/* General Details */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ backgroundColor: "#f3faff" }}>
                        <CardContent>
                            <Typography variant="h6">Last Statement Balance</Typography>
                            <Typography variant="h4">${last_statement_balance}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ backgroundColor: "#fff3f3" }}>
                        <CardContent>
                            <Typography variant="h6">Minimum Payment</Typography>
                            <Typography variant="h4">${minimum_payment_amount}</Typography>
                            <Typography>Due on {next_payment_due_date}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ backgroundColor: "#f3f9ff" }}>
                        <CardContent>
                            <Typography variant="h6">Last Payment</Typography>
                            <Typography variant="h4">${last_payment_amount}</Typography>
                            <Typography>Paid on {last_payment_date}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* APR Details */}
            <Box mt={3}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6" color="primary">
                            APR Details
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {aprs.map((apr, idx) => (
                            <Card key={idx} sx={{ mb: 2, p: 2, boxShadow: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    {apr.apr_type.replace(/_/g, " ").toUpperCase()}
                                </Typography>
                                <Typography>APR Percentage: {apr.apr_percentage}%</Typography>
                                <Typography>Balance Subject to APR: ${apr.balance_subject_to_apr}</Typography>
                                <Typography>Interest Charge: ${apr.interest_charge_amount}</Typography>
                            </Card>
                        ))}
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    );
}
