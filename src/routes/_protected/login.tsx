import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthCard, LoginForm } from "../../modules/auth";

export const Route = createFileRoute("/_protected/login")({
	component: RouteComponent,
	pendingComponent: () => <div>Loading...</div>,

	beforeLoad: ({ context }) => {
		if (context.auth) {
			const { isAuthenticated } = context.auth;

			if (isAuthenticated) {
				throw redirect({ to: "/" });
			}
		}
	},
});

function RouteComponent() {
	return (
		<AuthCard
			title="Welcome back"
			subtitle="Sign in to your account to continue"
		>
			<LoginForm />
		</AuthCard>
	);
}
