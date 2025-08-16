import { createFileRoute } from "@tanstack/react-router";
import { AuthCard, RegisterForm } from "../../modules/auth";

export const Route = createFileRoute("/auth/register")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<AuthCard
			title="Create account"
			subtitle="Join us and start your journey today"
		>
			<RegisterForm />
		</AuthCard>
	);
}
