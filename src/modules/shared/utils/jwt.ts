import { jwtDecode } from "jwt-decode";

export const decodeJwt = (token: string) => {
	const decoded = jwtDecode(token);
	return decoded;
};

export const isJwtExpired = (token: string) => {
	const decoded = decodeJwt(token);
	return decoded.exp && decoded.exp < Date.now() / 1000;
};
