import { environment } from "../config/environment";
import { HttpClient } from "./httpClient";

// Use centralized environment configuration for base URL
export const httpService = new HttpClient(environment.API.BASE_URL);

export { HttpClient } from "./httpClient";
export type { ApiResponse, ApiError } from "./types";
