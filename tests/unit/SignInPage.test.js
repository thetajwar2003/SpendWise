import React from "react";
import { render, screen } from "@testing-library/react";
import Signup from "../../pages/signup"; // Update path if needed
import "@testing-library/jest-dom";

describe("Signup Page Elements", () => {
    it("should display input fields and Sign Up button", () => {
        render(<Signup />);

        // Check for First Name input field
        expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();

        // Check for Last Name input field
        expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();

        // Check for Email Address input field
        expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();

        // Find Password field using name attribute or role
        expect(
            screen.getByPlaceholderText("Password") // Use placeholder explicitly
        ).toBeInTheDocument();

        // Find Confirm Password field
        expect(
            screen.getByPlaceholderText("Confirm Password") // Use placeholder explicitly
        ).toBeInTheDocument();

        // Check for Sign Up button
        expect(screen.getByRole("button", { name: /Sign Up/i })).toBeInTheDocument();
    });
});
