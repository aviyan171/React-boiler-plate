import { environment, getLocalStorage, httpService } from "@/modules/shared";
import { decodeJwt } from "@/modules/shared/utils/jwt";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { type User, useRefreshToken } from "..";

export interface AuthContext {
	isAuthenticated: boolean;
	login: (accessToken: string, user: User | null) => Promise<void>;
	logout: () => Promise<void>;
	accessToken: string | null;
	user: User | null;
	isLoading: boolean;
}

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const isAuthenticated = !!user;
	const refreshToken = getLocalStorage(environment.AUTH.REFRESH_TOKEN_KEY);
	const { mutateAsync: refreshTokenMutation, isPending } = useRefreshToken();
	const isMounted = useRef(true);

	const logout = useCallback(async () => {
		setAccessToken(null);
		setUser(null);
	}, []);

	const login = useCallback(async (accessToken: string, user: User | null) => {
		setAccessToken(accessToken);
		setUser(user);
	}, []);

	useEffect(() => {
		if (refreshToken && isMounted.current) {
			console.log("fetching refresh token");
			const fetchRefreshToken = async () => {
				try {
					const response = await refreshTokenMutation({
						refreshToken,
					});
					const user = decodeJwt(response.accessToken) as User;
					setUser(user);
					setAccessToken(response.accessToken);

					console.log("refresh token fetched");
				} catch (error) {
					console.error(error);
				}
			};
			fetchRefreshToken();
		}
		return () => {
			isMounted.current = false;
		};
	}, [refreshToken, refreshTokenMutation]);

	useLayoutEffect(() => {
		if (accessToken) {
			httpService.setupInterceptors(accessToken);
		}
	}, [accessToken]);

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				login,
				logout,
				user,
				accessToken,
				isLoading: isPending,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
