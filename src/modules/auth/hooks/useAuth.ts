import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { TokenInput } from "../../shared/http/types";
import { handleApiError } from "../../shared/utils/errorHandler";
import {
	getProfile as getProfileApi,
	login as loginApi,
	logout as logoutApi,
	refreshToken as refreshTokenApi,
	register as registerApi,
} from "../api/authService";

// Query keys for caching
export const authKeys = {
	all: ["auth"] as const,
	profile: () => [...authKeys.all, "profile"] as const,
};

// Hook for user profile
export function useProfile() {
	return useQuery({
		queryKey: authKeys.profile(),
		queryFn: getProfileApi,
		enabled: !!localStorage.getItem("auth_token"),
		staleTime: 5 * 60 * 1000, // 5 minutes
		retry: (failureCount, error: unknown) => {
			// Don't retry on 401 errors
			if (
				error &&
				typeof error === "object" &&
				"response" in error &&
				error.response &&
				typeof error.response === "object" &&
				"status" in error.response &&
				error.response.status === 401
			) {
				return false;
			}
			return failureCount < 3;
		},
	});
}

// Hook for login
export function useLogin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: loginApi,
		onSuccess: (data) => {
			// Update cache with user profile
			queryClient.setQueryData(authKeys.profile(), data.user);

			// Invalidate and refetch profile
			queryClient.invalidateQueries({ queryKey: authKeys.profile() });

			// Redirect to dashboard or home only on success
			navigate({ to: "/" });
		},
		onError: (error) => {
			// Don't redirect on error - let the UI show the error message
			console.error("Login failed:", error);
			// The error will be handled by the component's error handling
		},
	});
}

// Hook for registration
export function useRegister() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: registerApi,
		onSuccess: (data) => {
			// Update cache with user profile
			queryClient.setQueryData(authKeys.profile(), data.user);

			// Invalidate and refetch profile
			queryClient.invalidateQueries({ queryKey: authKeys.profile() });

			// Redirect to dashboard or home
			navigate({ to: "/" });
		},
		onError: (error) => {
			console.error("Registration failed:", error);
		},
	});
}

// Hook for logout
export function useLogout() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: logoutApi,
		onSuccess: () => {
			// Clear all queries from cache
			queryClient.clear();

			// Redirect to login
			navigate({ to: "/auth/login" });
		},
		onError: (error) => {
			console.error("Logout failed:", error);
			// Even if logout fails, clear local data
			queryClient.clear();
			navigate({ to: "/auth/login" });
		},
	});
}

// Hook for refreshing token
export function useRefreshToken() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (tokenData: TokenInput) => refreshTokenApi(tokenData),
		onSuccess: () => {
			// Refetch profile with new token
			queryClient.invalidateQueries({ queryKey: authKeys.profile() });
		},
		onError: () => {
			// If refresh fails, logout user
			queryClient.clear();
			window.location.href = "/auth/login";
		},
	});
}

// Hook to check if user is authenticated
export function useAuth() {
	const { data: profile, isLoading, error } = useProfile();

	return {
		user: profile,
		isAuthenticated: !!profile,
		isLoading,
		error,
	};
}

// Export error handler for components
export { handleApiError };
