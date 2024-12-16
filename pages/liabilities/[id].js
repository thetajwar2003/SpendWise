import React from "react";
import { useRouter } from "next/router";
import { Box, Button, Typography, Divider } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import CreditDetails from "../../components/liabilities/CreditDetails";
import MortgageDetails from "../../components/liabilities/MortgageDetails";
import StudentLoanDetails from "../../components/liabilities/StudentLoanDetails";
import { liabilities } from "../../mock/liabilities";

export default function LiabilityPage() {
    const router = useRouter();
    const { id } = router.query;

    // Flatten liabilities data
    const allLiabilities = [
        ...liabilities[0].credit,
        ...liabilities[1].mortgage,
        ...liabilities[2].student,
    ];
    const liability = allLiabilities.find((item) => item.account_id === id);

    if (!liability) return <Box>Loading...</Box>;

    console.log(liabilities);
    return (
        <Box sx={{ p: 3, maxWidth: 960, mx: "auto" }}>
            <Box sx={{ mb: 3 }}>
                {/* Back Button */}
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => router.push("/dashboard?tab=2")}
                    sx={{ color: "#333", fontWeight: "bold" }}
                >
                    Back to Dashboard
                </Button>

                {/* Title */}
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        mt: 2,
                        mb: 1,
                        color: "#333",
                    }}
                >
                    {liability.name}
                </Typography>

                {/* Divider */}
                <Divider sx={{ mb: 2 }} />
            </Box>
            {liability.subtype === "credit card" && <CreditDetails liability={liability} />}
            {liability.subtype === "mortgage" && <MortgageDetails liability={liability} />}
            {liability.subtype === "student" && <StudentLoanDetails liability={liability} />}
        </Box>
    );
}
