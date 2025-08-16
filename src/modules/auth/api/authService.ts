import { API_ENDPOINTS } from "../../shared/http/constants";
import { httpService } from "../../shared/http/httpService";
import type {
	AuthResponse,
	LoginCredentials,
	LogoutResponse,
	RefreshTokenResponse,
	RegisterData,
	TokenInput,
	User,
} from "../../shared/http/types";

/**
 * Authenticate user with email and password
 */
export async function login(
	credentials: LoginCredentials,
): Promise<AuthResponse> {
	const response = await httpService.post<AuthResponse>(
		API_ENDPOINTS.AUTH.LOGIN,
		credentials,
	);

	// Store token automatically on successful login
	httpService.setAuthToken(response.data.token);

	return response.data;
}

/**
 * Register new user
 */
export async function register(userData: RegisterData): Promise<AuthResponse> {
	const response = await httpService.post<AuthResponse>(
		API_ENDPOINTS.AUTH.REGISTER,
		userData,
	);

	// Store token automatically on successful registration
	httpService.setAuthToken(response.data.token);

	return response.data;
}

/**
 * Logout user
 */
export async function logout(): Promise<LogoutResponse> {
	try {
		const response = await httpService.post<LogoutResponse>(
			API_ENDPOINTS.AUTH.LOGOUT,
		);
		return response.data;
	} finally {
		// Always clear token on logout attempt
		httpService.clearAuthToken();
	}
}

/**
 * Refresh authentication token using rotate endpoint
 */
export async function refreshToken(
	tokenData: TokenInput,
): Promise<RefreshTokenResponse> {
	const response = await httpService.post<RefreshTokenResponse>(
		API_ENDPOINTS.AUTH.ROTATE,
		tokenData,
	);

	// Update token automatically on successful refresh
	httpService.setAuthToken(response.data.token);

	return response.data;
}

/**
 * Get current user profile
 */
export async function getProfile(): Promise<User> {
	const response = await httpService.get<User>(API_ENDPOINTS.AUTH.PROFILE);
	return response.data;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
	return httpService.isAuthenticated();
}

/**
 * Get current auth token
 */
export function getAuthToken(): string | null {
	return httpService.getAuthToken();
}

/**
 * Clear auth token (useful for manual logout)
 */
export function clearAuthToken(): void {
	httpService.clearAuthToken();
}
