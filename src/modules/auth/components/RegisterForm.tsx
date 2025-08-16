import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { handleApiError, useRegister } from "../index";

export function RegisterForm() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		middleName: "", // Added middle name field
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [validationErrors, setValidationErrors] = useState<
		Record<string, string>
	>({});

	const registerMutation = useRegister();

	const validateForm = () => {
		const errors: Record<string, string> = {};

		if (formData.password !== formData.confirmPassword) {
			errors.confirmPassword = "Passwords do not match";
		}

		if (formData.password.length < 6) {
			errors.password = "Password must be at least 6 characters";
		}

		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		// Remove confirmPassword before sending to API
		const { confirmPassword, ...registerData } = formData;
		registerMutation.mutate(registerData);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear validation error when user starts typing
		if (validationErrors[name]) {
			setValidationErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const errorMessage = registerMutation.error
		? handleApiError(registerMutation.error)
		: "";

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{errorMessage && (
				<div className="bg-red-50 border border-red-200 rounded-lg p-4">
					<p className="text-sm text-red-600">{errorMessage}</p>
				</div>
			)}

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="firstName"
						className="block text-sm font-medium text-gray-700 mb-2"
					>
						First name
					</label>
					<input
						id="firstName"
						name="firstName"
						type="text"
						autoComplete="given-name"
						required
						value={formData.firstName}
						onChange={handleInputChange}
						disabled={registerMutation.isPending}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
						placeholder="First name"
					/>
				</div>
				<div>
					<label
						htmlFor="lastName"
						className="block text-sm font-medium text-gray-700 mb-2"
					>
						Last name
					</label>
					<input
						id="lastName"
						name="lastName"
						type="text"
						autoComplete="family-name"
						required
						value={formData.lastName}
						onChange={handleInputChange}
						disabled={registerMutation.isPending}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
						placeholder="Last name"
					/>
				</div>
			</div>

			{/* Middle Name Field - Optional */}
			<div>
				<label
					htmlFor="middleName"
					className="block text-sm font-medium text-gray-700 mb-2"
				>
					Middle name <span className="text-gray-500 text-xs">(optional)</span>
				</label>
				<input
					id="middleName"
					name="middleName"
					type="text"
					autoComplete="additional-name"
					value={formData.middleName}
					onChange={handleInputChange}
					disabled={registerMutation.isPending}
					className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
					placeholder="Middle name (optional)"
				/>
			</div>

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
						disabled={registerMutation.isPending}
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
						autoComplete="new-password"
						required
						value={formData.password}
						onChange={handleInputChange}
						disabled={registerMutation.isPending}
						className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 pr-12 disabled:opacity-50 disabled:cursor-not-allowed ${
							validationErrors.password ? "border-red-500" : "border-gray-300"
						}`}
						placeholder="Create a password"
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						disabled={registerMutation.isPending}
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
				{validationErrors.password && (
					<p className="mt-1 text-sm text-red-600">
						{validationErrors.password}
					</p>
				)}
			</div>

			<div>
				<label
					htmlFor="confirmPassword"
					className="block text-sm font-medium text-gray-700 mb-2"
				>
					Confirm password
				</label>
				<div className="relative">
					<input
						id="confirmPassword"
						name="confirmPassword"
						type={showConfirmPassword ? "text" : "password"}
						autoComplete="new-password"
						required
						value={formData.confirmPassword}
						onChange={handleInputChange}
						disabled={registerMutation.isPending}
						className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 pr-12 disabled:opacity-50 disabled:cursor-not-allowed ${
							validationErrors.confirmPassword
								? "border-red-500"
								: "border-gray-300"
						}`}
						placeholder="Confirm your password"
					/>
					<button
						type="button"
						onClick={() => setShowConfirmPassword(!showConfirmPassword)}
						disabled={registerMutation.isPending}
						className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
					>
						{showConfirmPassword ? (
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
									d="M13.875 18.825A5.05 5.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
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
				{validationErrors.confirmPassword && (
					<p className="mt-1 text-sm text-red-600">
						{validationErrors.confirmPassword}
					</p>
				)}
			</div>

			<div className="flex items-center">
				<input
					id="agree-terms"
					name="agree-terms"
					type="checkbox"
					required
					disabled={registerMutation.isPending}
					className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
				/>
				<label
					htmlFor="agree-terms"
					className="ml-2 block text-sm text-gray-700"
				>
					I agree to the{" "}
					<Link
						to="/auth/register"
						className="text-blue-600 hover:text-blue-500 transition-colors"
					>
						Terms of Service
					</Link>{" "}
					and{" "}
					<Link
						to="/auth/login"
						className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
					>
						Privacy Policy
					</Link>
				</label>
			</div>

			<button
				type="submit"
				disabled={registerMutation.isPending}
				className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
			>
				{registerMutation.isPending ? (
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
						Creating account...
					</div>
				) : (
					"Create account"
				)}
			</button>

			<div className="text-center">
				<p className="text-sm text-gray-600">
					Already have an account?{" "}
					<Link
						to="/auth/login"
						className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
					>
						Sign in
					</Link>
				</p>
			</div>
		</form>
	);
}
