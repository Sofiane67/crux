import { type Env, envSchema } from "./env.schema";

export const validateEnv = (raw: Record<string, unknown>): Env => {
	const result = envSchema.safeParse(raw);

	if (!result.success) {
		const issues = result.error.issues
			.map((i) => `${i.path.join(".")}: ${i.message}`)
			.join("\n");

		throw new Error(`Invalid environment variables:\n${issues}`);
	}

	return result.data;
};
