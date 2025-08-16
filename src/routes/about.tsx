import { createFileRoute } from "@tanstack/react-router";

const isError = false;

export const Route = createFileRoute("/about")({
	component: RouteComponent,
	pendingComponent: () => <div>Loading...</div>,

	loader: async () => {
		await new Promise((resolve, reject) => {
			if (isError) {
				reject(new Error("Errorsdsds"));
			} else {
				setTimeout(resolve, 5000);
			}
		});
		return {
			message: "Hello from about",
		};
	},
});

function RouteComponent() {
	const { message } = Route.useLoaderData();
	return <div>{message}</div>;
}
