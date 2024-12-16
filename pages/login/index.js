import React, { useState } from "react";
import axios from "axios";
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

// Validation schema
const schema = yup.object({
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().required("Password is required"),
});

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setError("");

        try {
            // Make the login request
            const response = await axios.post("http://127.0.0.1:5000/auth/login", {
                email: data.email,
                password: data.password,
            });

            // store user_id and access_token in local storage
            localStorage.setItem("user_id", response.data.user_id);
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            localStorage.setItem("id_token", response.data.id_token);


            // Redirect to dashboard on success
            router.push("/dashboard");
        } catch (err) {
            console.error("Login Error:", err.response?.data?.error || err.message);
            setError(err.response?.data?.error || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

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
                    Login
                </Typography>
                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
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
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Sign In"}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Typography
                                variant="body2"
                                component="a"
                                href="#"
                                sx={{ textDecoration: "none" }}
                            >
                                Forgot password?
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="body2"
                                component="a"
                                href="/signup"
                                sx={{ textDecoration: "none" }}
                            >
                                {"Don't have an account? Sign Up"}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
