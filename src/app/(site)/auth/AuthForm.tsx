"use client";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
type Props = {};

type formField = {
	name: String;
	email: String;
	password: String;
};

export default function AuthForm({}: Props) {
	const session = useSession();
	const router = useRouter();
	const [isSignIn, setIsSignIn] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<formField>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});
	const changeFormType = () => {
		setIsSignIn(!isSignIn);
	};

	useEffect(() => {
		if (session?.status === "authenticated") {
			console.log("authenticated");
			router.push("/users");
		}
	}, [session?.status, router]);

	const onSubmit: SubmitHandler<formField> = async (data) => {
		setIsLoading(true);

		if (isSignIn) {
			// login
			const signInPromise = signIn("credentials", {
				...data,
				redirect: false,
			})
				.then((response) => {
					console.log(response);
					if (response?.error) {
						toast.error("Invalid credentials");
					}
					if (response?.ok && !response.error) {
						toast.success("Logged In");
					}
				})
				.finally(() => setIsLoading(false));
		} else {
			// register
			try {
				const response = await axios.post("/api/register", data);

				signIn("credentials", data);
			} catch (error) {
				toast.error("Something went wrong", {
					duration: 1000,
				});
				if (error instanceof AxiosError) {
					console.log("Error:", error.message);
				} else {
					console.log("Error occured while signup", error);
				}
			} finally {
				setIsLoading(false);
			}
		}
	};

	const SocialAction = (action: string) => {
		setIsLoading(true);
		signIn(action)
			.then((response) => {
				if (response?.error) {
					toast.error("Error");
				}
				if (response?.ok && !response?.error) {
					toast.success("Logged In");
				}
			})
			.finally(() => setIsLoading(false));
	};
	return (
		<div className="min-h-screen flex items-center">
			<div className="w-full max-w-xs  mx-auto min-w-min">
				<div className="bg-white shadow-md rounded border broder-gray-200 px-8 pt-6 pb-8 mb-4">
					{/* sign in form */}
					{isSignIn ? (
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="mb-4">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="Email"
								>
									Email
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:outline focus:outline-1 focus:outline-blue-600 focus:outline-offset-0 "
									id="Email"
									type="text"
									placeholder="Email"
									{...register("email")}
								/>
								<p className="text-red-500 text-sm">{errors?.name?.message}</p>
							</div>
							<div className="mb-3">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="password"
								>
									Password
								</label>
								<input
									className="shadow appearance-none focus:outline focus:outline-1 focus:outline-blue-600 focus:outline-offset-0  border border-gray-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight "
									id="password"
									type="password"
									placeholder="password"
									{...register("password")}
								/>
								<p className="text-red-500 text-sm">
									{errors?.password?.message}
								</p>
								<Link
									className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
									href="#"
								>
									Forgot Password?
								</Link>
								<Button
									className="bg-blue-500 w-full  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
									type="submit"
									variant={"default"}
									disabled={isLoading}
								>
									Sign In
								</Button>
							</div>
						</form>
					) : (
						// sign up form
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="mb-4">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="username"
								>
									Username
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:outline focus:outline-1 focus:outline-blue-600 focus:outline-offset-0 "
									id="username"
									type="text"
									placeholder="Username"
									{...register("name")}
								/>
								<p className="text-red-500 text-sm">{errors?.name?.message}</p>
							</div>
							<div className="mb-4">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="Email"
								>
									Email
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:outline focus:outline-1 focus:outline-blue-600 focus:outline-offset-0 "
									id="Email"
									type="text"
									placeholder="Email"
									{...register("email")}
								/>
								<p className="text-red-500 text-sm">{errors?.email?.message}</p>
							</div>
							<div className="mb-3">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="password"
								>
									Password
								</label>
								<input
									className="shadow appearance-none focus:outline focus:outline-1 focus:outline-blue-600 focus:outline-offset-0  border border-gray-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight "
									id="password"
									type="password"
									placeholder="password"
									{...register("password")}
								/>
								<p className="text-red-500 text-sm">
									{errors?.password?.message}
								</p>
								<Link
									className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
									href="#"
								>
									Forgot Password?
								</Link>
								<Button
									className="bg-blue-500 w-full  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
									type="submit"
									variant={"default"}
									disabled={isLoading}
								>
									Sign Up
								</Button>
							</div>
						</form>
					)}

					<div className="my-3 flex justify-between items-center gap-2">
						<div className="border h-px grow  min-w-min  border-t-gray-300"></div>
						<span className="text-sm text-gray-500 ">or continue with</span>
						<div className="border h-px grow min-w-min  border-t-gray-300"></div>
						<hr />
					</div>

					{/* Social sign in buttons */}
					<div className="flex justify-between gap-4">
						{/* Google sign in button */}
						<Button
							type="button"
							variant={"outline"}
							disabled={isLoading}
							
							className="flex gap-2 items-center"
							onClick={() => {
								SocialAction("google");
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="0.98em"
								height="1em"
								viewBox="0 0 256 262"
							>
								<path
									fill="#4285f4"
									d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
								></path>
								<path
									fill="#34a853"
									d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
								></path>
								<path
									fill="#fbbc05"
									d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
								></path>
								<path
									fill="#eb4335"
									d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
								></path>
							</svg>
							Sign in with Google
						</Button>
						{/* Github sign in button */}
						<Button
							type="button"
							className="flex gap-2 items-center"
							disabled={isLoading}
							onClick={() => {
								SocialAction("github");
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1.1em"
								height="1.1em"
								viewBox="0 0 16 16"
							>
								<path
									fill="currentColor"
									d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.07.55-.17.55-.38c0-.19-.01-.82-.01-1.49c-2.01.37-2.53-.49-2.69-.94c-.09-.23-.48-.94-.82-1.13c-.28-.15-.68-.52-.01-.53c.63-.01 1.08.58 1.23.82c.72 1.21 1.87.87 2.33.66c.07-.52.28-.87.51-1.07c-1.78-.2-3.64-.89-3.64-3.95c0-.87.31-1.59.82-2.15c-.08-.2-.36-1.02.08-2.12c0 0 .67-.21 2.2.82c.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82c.44 1.1.16 1.92.08 2.12c.51.56.82 1.27.82 2.15c0 3.07-1.87 3.75-3.65 3.95c.29.25.54.73.54 1.48c0 1.07-.01 1.93-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
								></path>
							</svg>
							Sign With Github
						</Button>
					</div>

					<div className="my-2">
						{isSignIn ? (
							<p className="text-sm text-gray-400">
								Do not have an account?
								<button
									className="mx-2 text-blue-500 hover:underline"
									onClick={changeFormType}
								>
									Sign Up
								</button>
							</p>
						) : (
							<p className="text-sm text-gray-400">
								Already have an account?
								<button
									className="mx-2 text-blue-500 hover:underline"
									onClick={changeFormType}
								>
									log in
								</button>
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
