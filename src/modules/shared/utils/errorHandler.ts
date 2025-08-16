import type { ApiError } from "../http/types";

/**
 * Handle API errors and return user-friendly messages
 */
export function handleApiError(error: unknown): string {
	if (error && typeof error === "object" && "isAxiosError" in error) {
		const apiError = error as ApiError;
		return apiError.message || "An unexpected error occurred";
	}

	if (error instanceof Error) {
		return error.message;
	}

	return "An unexpected error occurred";
}

/**
 * Check if error is an API error
 */
export function isApiError(error: unknown): error is ApiError {
	return Boolean(error && typeof error === "object" && "isAxiosError" in error);
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
	if (isApiError(error)) {
		return error.status === undefined || error.status === 0;
	}
	return false;
}

/**
 * Check if error is an authentication error
 */
export function isAuthError(error: unknown): boolean {
	if (isApiError(error)) {
		return error.status === 401 || error.status === 403;
	}
	return false;
}

/**
 * Retry function with exponential backoff
 */
export async function retryWithBackoff<T>(
	fn: () => Promise<T>,
	maxRetries = 3,
	baseDelay = 1000,
): Promise<T> {
	let lastError: unknown;

	for (let attempt = 0; attempt <= maxRetries; attempt++) {
		try {
			return await fn();
		} catch (error) {
			lastError = error;

			if (attempt === maxRetries) {
				break;
			}

			// Don't retry on auth errors
			if (isAuthError(error)) {
				break;
			}

			// Exponential backoff
			const delay = baseDelay * 2 ** attempt;
			await new Promise((resolve) => setTimeout(resolve, delay));
		}
	}

	throw lastError;
}
