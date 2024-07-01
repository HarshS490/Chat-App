import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
type Props = {};

export default function SignUpForm({}: Props) {
    
  return (
    <form className="">
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
        />
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
        />
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
        />
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
        >
          Sign In
        </Button>
      </div>
    </form>
  );
}
