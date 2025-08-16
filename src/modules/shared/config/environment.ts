/**
 * Centralized Environment Configuration
 * All environment variables should be imported from this single source
 */

export const environment = {
	// API Configuration
	API: {
		BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:3200/api",
		TIMEOUT: Number.parseInt(import.meta.env.VITE_API_TIMEOUT || "10000", 10),
		RETRY_ATTEMPTS: Number.parseInt(
			import.meta.env.VITE_API_RETRY_ATTEMPTS || "3",
			10,
		),
	},

	// App Configuration
	APP: {
		NAME: import.meta.env.VITE_APP_NAME || "React Boilerplate",
		VERSION: import.meta.env.VITE_APP_VERSION || "1.0.0",
		ENVIRONMENT: import.meta.env.VITE_NODE_ENV || "development",
	},

	// Feature Flags
	FEATURES: {
		DEBUG: import.meta.env.VITE_ENABLE_DEBUG === "true",
		ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
		DEVTOOLS: import.meta.env.VITE_ENABLE_DEVTOOLS === "true",
	},

	// Authentication
	AUTH: {
		TOKEN_KEY: import.meta.env.VITE_AUTH_TOKEN_KEY || "auth_token",
		REFRESH_TOKEN_KEY:
			import.meta.env.VITE_AUTH_REFRESH_TOKEN_KEY || "refresh_token",
		TOKEN_EXPIRY: Number.parseInt(
			import.meta.env.VITE_AUTH_TOKEN_EXPIRY || "3600000",
			10,
		), // 1 hour
	},

	// Development
	DEV: {
		LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL || "info",
		SHOW_QUERY_DEVTOOLS: import.meta.env.VITE_SHOW_QUERY_DEVTOOLS === "true",
	},
} as const;

// Type for the environment configuration
export type Environment = typeof environment;

// Helper function to get environment value with type safety
export function getEnv<
	K extends keyof Environment,
	P extends keyof Environment[K],
>(section: K, key: P): Environment[K][P] {
	return environment[section][key];
}

// Export individual sections for convenience
export const { API, APP, FEATURES, AUTH, DEV } = environment;

// Default export
export default environment;
