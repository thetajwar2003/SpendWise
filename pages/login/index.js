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
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().required("Password is required"),
});

export default function Login() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log("Login Data:", data);
        if (data.email && data.password) {
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
                    Login
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
                    >
                        Sign In
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
