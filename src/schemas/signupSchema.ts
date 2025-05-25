import z from "zod";

export const signupSchema = z.object({
  username: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters" }),
});
