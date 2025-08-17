import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { handleApiError, useLogin } from "../index";
import { useAuthContext } from "../provider/AuthProvider";

export function LoginForm() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const { login } = useAuthContext();

	const loginMutation = useLogin();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		loginMutation.mutate(formData, {
			onSuccess: (data) => {
				login(data.accessToken, data.user);
			},
		});
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const errorMessage = loginMutation.error
		? handleApiError(loginMutation.error)
		: "";

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{errorMessage && (
				<div className="bg-red-50 border border-red-200 rounded-lg p-4">
					<p className="text-sm text-red-600">{errorMessage}</p>
				</div>
			)}

			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700 mb-2"
				>
					Email address
				</label>
				<div className="relative">
					<input
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						required
						value={formData.email}
						onChange={handleInputChange}
						disabled={loginMutation.isPending}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
						placeholder="Enter your email"
					/>
					<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
						<svg
							className="h-5 w-5 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
							/>
						</svg>
					</div>
				</div>
			</div>

			<div>
				<label
					htmlFor="password"
					className="block text-sm font-medium text-gray-700 mb-2"
				>
					Password
				</label>
				<div className="relative">
					<input
						id="password"
						name="password"
						type={showPassword ? "text" : "password"}
						autoComplete="current-password"
						required
						value={formData.password}
						onChange={handleInputChange}
						disabled={loginMutation.isPending}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 pr-12 disabled:opacity-50 disabled:cursor-not-allowed"
						placeholder="Enter your password"
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						disabled={loginMutation.isPending}
						className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
					>
						{showPassword ? (
							<svg
								className="h-5 w-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
								/>
							</svg>
						) : (
							<svg
								className="h-5 w-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
								/>
							</svg>
						)}
					</button>
				</div>
			</div>

			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<input
						id="remember-me"
						name="remember-me"
						type="checkbox"
						disabled={loginMutation.isPending}
						className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
					/>
					<label
						htmlFor="remember-me"
						className="ml-2 block text-sm text-gray-700"
					>
						Remember me
					</label>
				</div>
				<Link
					to="/auth/register"
					className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
				>
					Forgot your password?
				</Link>
			</div>

			<button
				type="submit"
				disabled={loginMutation.isPending}
				className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
			>
				{loginMutation.isPending ? (
					<div className="flex items-center">
						<svg
							className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							/>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
						Signing in...
					</div>
				) : (
					"Sign in"
				)}
			</button>

			<div className="text-center">
				<p className="text-sm text-gray-600">
					Don't have an account?{" "}
					<Link
						to="/auth/register"
						className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
					>
						Sign up
					</Link>
				</p>
			</div>
		</form>
	);
}
