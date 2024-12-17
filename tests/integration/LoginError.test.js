import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../../pages/login";
import axios from "axios";
import "@testing-library/jest-dom";

jest.mock("axios");

describe("Login API Failure", () => {
    it("should show error message on failed login", async () => {
        // Mock Axios to simulate a rejected API call
        axios.post.mockRejectedValueOnce({
            response: { data: { error: "Invalid credentials" } },
        });

        // Render the Login component
        render(<Login />);

        // Simulate user input for email and password
        fireEvent.change(screen.getByLabelText(/Email Address/i), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/Password/i), {
            target: { value: "wrongpassword" },
        });

        // Simulate clicking the "Sign In" button
        fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

        // Wait for the error message to appear
        await waitFor(() => {
            const errorMessage = screen.getByText("Invalid credentials");
            expect(errorMessage).toBeInTheDocument();
        });
    });
});
