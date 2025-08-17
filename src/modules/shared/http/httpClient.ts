import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import { environment } from "../config/environment";
import { setLocalStorage } from "../utils/storage";
import { HTTP_STATUS_CODES } from "./constants";
import type { ApiError, ApiResponse } from "./types";

export class HttpClient {
	private client: AxiosInstance;

	constructor(baseURL: string) {
		this.client = axios.create({
			baseURL,
			timeout: environment.API.TIMEOUT,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	public setupInterceptors(token?: string): void {
		// Request interceptor
		this.client.interceptors.request.use(
			(config) => {
				// Add auth token if available
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}
				return config;
			},
			(error) => {
				return Promise.reject(this.handleError(error));
			},
		);

		// Response interceptor
		this.client.interceptors.response.use(
			(response: AxiosResponse) => {
				return response;
			},
			(error) => {
				return Promise.reject(this.handleError(error));
			},
		);
	}

	private handleError(error: unknown): ApiError {
		if (axios.isAxiosError(error)) {
			const status = error.response?.status;
			const message = error.response?.data?.message || error.message;

			// Handle specific HTTP status codes
			switch (status) {
				case HTTP_STATUS_CODES.UNAUTHORIZED:
					this.handleUnauthorized();
					break;
				case HTTP_STATUS_CODES.FORBIDDEN:
					this.handleForbidden();
					break;
				case HTTP_STATUS_CODES.NOT_FOUND:
					this.handleNotFound();
					break;
				case HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR:
					this.handleServerError();
					break;
			}

			return {
				status,
				message,
				code: error.code,
				isAxiosError: true,
			};
		}

		// Handle non-Axios errors
		return {
			status: 0,
			message:
				error instanceof Error ? error.message : "An unexpected error occurred",
			code: "UNKNOWN_ERROR",
			isAxiosError: false,
		};
	}

	private handleUnauthorized(): void {
		// Clear token but don't redirect automatically
		// Let the UI handle the error gracefully
		this.clearAuthToken();
		console.warn("Authentication failed - token cleared");
		// Don't redirect here - let the component handle it
	}

	private handleForbidden(): void {
		// Handle forbidden access
		console.warn("Access forbidden");
	}

	private handleNotFound(): void {
		// Handle not found
		console.warn("Resource not found");
	}

	private handleServerError(): void {
		// Handle server errors
		console.error("Internal server error");
	}

	// Public methods for token management
	public setAuthToken(accessToken: string, refreshToken?: string): void {
		if (refreshToken) {
			setLocalStorage(environment.AUTH.REFRESH_TOKEN_KEY, refreshToken);
		}
		this.client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
	}

	public clearAuthToken(): void {
		localStorage.removeItem(environment.AUTH.TOKEN_KEY);
		localStorage.removeItem(environment.AUTH.REFRESH_TOKEN_KEY);
		this.client.defaults.headers.common.Authorization = "";
	}

	public getAuthToken(): string | null {
		return localStorage.getItem(environment.AUTH.TOKEN_KEY);
	}

	public getRefreshToken(): string | null {
		return localStorage.getItem(environment.AUTH.REFRESH_TOKEN_KEY);
	}

	// HTTP methods
	public async get<T>(
		url: string,
		config?: AxiosRequestConfig,
	): Promise<ApiResponse<T>> {
		try {
			const response = await this.client.get<{ data: T }>(url, config);
			return {
				data: response.data.data,
				status: response.status,
				success: true,
			};
		} catch (error) {
			throw this.handleError(error);
		}
	}

	public async post<T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<ApiResponse<T>> {
		try {
			const response = await this.client.post<{ data: T }>(url, data, config);
			return {
				data: response.data.data,
				status: response.status,
				success: true,
			};
		} catch (error) {
			throw this.handleError(error);
		}
	}

	public async put<T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<ApiResponse<T>> {
		try {
			const response = await this.client.put<{ data: T }>(url, data, config);
			return {
				data: response.data.data,
				status: response.status,
				success: true,
			};
		} catch (error) {
			throw this.handleError(error);
		}
	}

	public async patch<T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<ApiResponse<T>> {
		try {
			const response = await this.client.patch<{ data: T }>(url, data, config);
			return {
				data: response.data.data,
				status: response.status,
				success: true,
			};
		} catch (error) {
			throw this.handleError(error);
		}
	}

	public async delete<T>(
		url: string,
		config?: AxiosRequestConfig,
	): Promise<ApiResponse<T>> {
		try {
			const response = await this.client.delete<{ data: T }>(url, config);
			return {
				data: response.data.data,
				status: response.status,
				success: true,
			};
		} catch (error) {
			throw this.handleError(error);
		}
	}

	// Utility methods
	public isAuthenticated(): boolean {
		return !!this.getAuthToken();
	}

	public getBaseURL(): string {
		return this.client.defaults.baseURL || "";
	}
}
