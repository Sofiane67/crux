import { z } from "zod";

export const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),
	PORT: z.coerce.number().int().positive().default(3100),
	DATABASE_URL: z.string().url(),
	REDIS_URL: z.string(),
	APP_NAME: z.string().default("Crux API"),
	APP_VERSION: z.string().default("0.1.0")
});

export type Env = z.infer<typeof envSchema>;
