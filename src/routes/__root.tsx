import type { AuthContext } from "@/modules/auth/provider/AuthProvider";
import { useRouteLoading } from "@/modules/shared/hooks/useRouteLoading";
import { Outlet, createRootRouteWithContext, useRouterState } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

interface RootRouteContext {
	auth?: AuthContext;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
	
	component:RootRouteComponent,
});

function RootRouteComponent() {
	const { isLoading, isTransitioning } = useRouterState();
	useRouteLoading({ isLoading: isLoading || isTransitioning });

	return (
		<>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	);
}