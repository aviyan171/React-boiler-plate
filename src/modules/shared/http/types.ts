import type { UserRole } from "../enums";

// HTTP Service Types
export interface ApiResponse<T> {
	data: T;
	status: number;
	success: boolean;
}

export interface ApiError {
	status: number | undefined;
	message: string;
	code: string | undefined;
	isAxiosError: boolean;
}

// Domain Types - Updated to match backend schemas
export interface User {
	email: string;
	firstName: string;
	lastName: string;
	middleName?: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	role: UserRole;
}

export interface AuthResponse {
	user: User;
	accessToken: string;
	refreshToken: string;
}

// Updated to match backend Zod schemas
export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterData {
	firstName: string;
	lastName: string;
	middleName?: string; // Optional as per backend schema
	email: string;
	password: string;
}

export interface LogoutResponse {
	message: string;
}

export interface RefreshTokenResponse {
	accessToken: string;
}

export interface TokenInput {
	refreshToken: string;
}

export interface DeleteResponse {
	message: string;
}

// API Request Types
export interface PaginationParams {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
}

export interface SearchParams {
	query?: string;
	filters?: Record<string, unknown>;
}

export interface ApiParams extends PaginationParams, SearchParams {}

// HTTP Client Configuration
export interface HttpClientConfig {
	baseURL: string;
	timeout?: number;
	headers?: Record<string, string>;
}

// Error Handling
export interface ErrorHandler {
	handleError: (error: unknown) => ApiError;
}

// Token Management
export interface TokenManager {
	setAuthToken: (token: string) => void;
	clearAuthToken: () => void;
	getAuthToken: () => string | null;
	isAuthenticated: () => boolean;
}
