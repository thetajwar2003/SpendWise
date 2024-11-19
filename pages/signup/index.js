import React from "react";
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
} from "@mui/material";

const schema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
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

export default function SignUp() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log("Sign-Up Data:", data);
        if (data.firstName && data.lastName && data.email && data.password) {
            router.push("/dashboard");
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
                        id="firstName"
                        label="First Name"
                        {...register("firstName")}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        {...register("lastName")}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
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
                    >
                        Sign Up
                    </Button>
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
            </Box>
        </Container>
    );
}
