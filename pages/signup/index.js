import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    CircularProgress,
} from "@mui/material";
import { usePlaidLink } from "react-plaid-link";
import axios from "axios";

const schema = yup.object({
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
});

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SignUp() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [linkToken, setLinkToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // Send signup data to backend
            const signupResponse = await axios.post(`${ API_URL }/auth/register`, data);

            if (signupResponse.status === 201) {
                setUserId(signupResponse.data.user_id);
                // Fetch Plaid Link token
                const tokenResponse = await axios.post(
                    `${ API_URL }/plaid/create_link_token`,
                    {
                        user_id: signupResponse.data.user_id, // Replace with actual unique user ID
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );


                setLinkToken(tokenResponse.data.link_token);
            }
        } catch (error) {
            console.error("Error during signup or Plaid setup:", error);
        } finally {
            setLoading(false);
        }
    };

    // Initialize Plaid Link
    const { open, ready } = usePlaidLink({
        token: linkToken,
        onSuccess: (publicToken) => {
            // Send the public token to the backend to exchange for an access token
            axios.post("http://127.0.0.1:5000/plaid/exchange_public_token", { public_token: publicToken, user_id: userId })
                .then((response) => {
                    router.push("/login");
                })
                .catch((error) => console.error("Error exchanging public token:", error));
        },
        onExit: (error) => {
            if (error) {
                console.error("Plaid Link exited with error:", error);
            }
            router.push("/signup");
        },
    });

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="first_name"
                        label="First Name"
                        {...register("first_name")}
                        error={!!errors.first_name}
                        helperText={errors.first_name?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="last_name"
                        label="Last Name"
                        {...register("last_name")}
                        error={!!errors.last_name}
                        helperText={errors.last_name?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        {...register("confirmPassword")}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Sign Up"}
                    </Button>
                </Box>
                {linkToken && ready && (
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={open}
                        sx={{ mt: 3 }}
                    >
                        Connect Your Bank Account
                    </Button>
                )}
                <Grid container>
                    <Grid item>
                        <Typography
                            variant="body2"
                            component="a"
                            href="/login"
                            sx={{ textDecoration: "none" }}
                        >
                            {"Already have an account? Login"}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
