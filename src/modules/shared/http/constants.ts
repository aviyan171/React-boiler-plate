export const HTTP_STATUS_CODES = {
	// Success
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	NO_CONTENT: 204,

	// Client Errors
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	CONFLICT: 409,
	UNPROCESSABLE_ENTITY: 422,
	TOO_MANY_REQUESTS: 429,

	// Server Errors
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504,
} as const;

export const API_ENDPOINTS = {
	AUTH: {
		LOGIN: "/auth/login",
		REGISTER: "/auth/register",
		LOGOUT: "/auth/logout",
		ROTATE: "/auth/rotate", // refresh token endpoint
		PROFILE: "/auth/profile",
	},
	USERS: {
		BASE: "/users",
		BY_ID: (id: string) => `/users/${id}`,
	},
} as const;

export const HTTP_METHODS = {
	GET: "GET",
	POST: "POST",
	PUT: "PUT",
	PATCH: "PATCH",
	DELETE: "DELETE",
} as const;
