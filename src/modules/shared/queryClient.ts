import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000, // 5 minutes
			gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
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
			refetchOnWindowFocus: false,
			refetchOnReconnect: true,
		},
		mutations: {
			retry: false, // Don't retry mutations by default
		},
	},
});
