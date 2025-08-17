import type { AuthContext } from "@/modules/auth/provider/AuthProvider";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

interface RootRouteContext {
	auth?: AuthContext;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
	component: () => (
		<>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
});
