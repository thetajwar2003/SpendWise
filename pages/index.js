// pages/index.js
import React from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { useRouter } from "next/router";

export default function LandingPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to SpendWise
        </Typography>
        <Typography variant="h6" component="p" sx={{ mb: 4 }}>
          Manage your finances effortlessly. Track your accounts, make secure transactions, and more.
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
