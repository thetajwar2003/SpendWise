import React from 'react';
import { render, screen } from "@testing-library/react";
import Login from "../../pages/login";
import '@testing-library/jest-dom';


describe("Login Page Elements", () => {
    it("should display Email Address input, Password input, and Sign In button", () => {
        render(<Login />);

        // Check for the Email Address input field
        const emailInput = screen.getByLabelText(/Email Address/i);
        expect(emailInput).toBeInTheDocument();

        // Check for the Password input field
        const passwordInput = screen.getByLabelText(/Password/i);
        expect(passwordInput).toBeInTheDocument();

        // Check for the Sign In button
        const signInButton = screen.getByRole("button", { name: /Sign In/i });
        expect(signInButton).toBeInTheDocument();
    });
});
