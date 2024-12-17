import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../../pages/login";
import { useRouter } from "next/router";
import axios from "axios";

jest.mock("axios");
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

describe("Login Redirect", () => {
    it("should redirect to /dashboard after successful login", async () => {
        const push = jest.fn();
        useRouter.mockImplementation(() => ({ push }));

        axios.post.mockResolvedValueOnce({
            data: {
                user_id: "mock_user_id",
                access_token: "mock_token",
            },
        });

        render(<Login />);

        fireEvent.change(screen.getByLabelText(/Email Address/i), {
            target: { value: "rahmant72@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/Password/i), {
            target: { value: "Tajwar2003!" },
        });
        fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

        await waitFor(() => expect(push).toHaveBeenCalledWith("/dashboard"));
    });
});
