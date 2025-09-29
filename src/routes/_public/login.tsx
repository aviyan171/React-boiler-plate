import { AuthContext } from "@/modules/auth/provider/AuthProvider";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useContext } from "react";
import { AuthCard, LoginForm } from "../../modules/auth";

export const Route = createFileRoute("/_public/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const authContext = useContext(AuthContext);

	if (authContext?.isAuthenticated) {
		return navigate({ to: "/home" });
	}

	return (
		<AuthCard
			title="Welcome back"
			subtitle="Sign in to your account to continue"
		>
			<LoginForm />
		</AuthCard>
	);
}
