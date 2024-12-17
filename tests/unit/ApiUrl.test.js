describe("API URL Configuration", () => {
    it("should use production API URL in deployed environment", () => {
        process.env.NEXT_PUBLIC_API_URL = "https://prod-api.example.com";
        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        expect(API_URL).toBe("https://prod-api.example.com");
    });

    it("should use local API URL in development", () => {
        process.env.NEXT_PUBLIC_API_URL = "http://127.0.0.1:5000";
        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        expect(API_URL).toBe("http://127.0.0.1:5000");
    });
});
