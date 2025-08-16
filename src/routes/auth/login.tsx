import { createFileRoute } from "@tanstack/react-router";
import { AuthCard, LoginForm } from "../../modules/auth";

export const Route = createFileRoute("/auth/login")({
	component: RouteComponent,
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
