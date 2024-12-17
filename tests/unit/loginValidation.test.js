import * as yup from "yup";

// Import the schema you defined
const schema = yup.object({
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().required("Password is required"),
});

describe("Login Form Validation", () => {
    it("should fail when email is empty", async () => {
        const formData = { email: "", password: "password123" };
        try {
            await schema.validate(formData);
        } catch (err) {
            expect(err.message).toBe("Email is required");
        }
    });

    it("should fail when email format is invalid", async () => {
        const formData = { email: "invalid-email", password: "password123" };
        try {
            await schema.validate(formData);
        } catch (err) {
            expect(err.message).toBe("Invalid email address");
        }
    });

    it("should fail when password is empty", async () => {
        const formData = { email: "test@example.com", password: "" };
        try {
            await schema.validate(formData);
        } catch (err) {
            expect(err.message).toBe("Password is required");
        }
    });

    it("should pass with valid email and password", async () => {
        const formData = { email: "test@example.com", password: "password123" };
        const result = await schema.validate(formData);
        expect(result).toEqual(formData);
    });
});
