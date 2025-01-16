"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { signup } from "../lib/actions/user";

export default function Page() {
  const [message, formAction, isPending] = useActionState(signup, null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    message && message.ok === true && redirect("/signin");
  }, [message]);

  return (
    <div className="flex justify-center w-screen p-10">
      <div className="flex flex-col">
        <form
          action={formAction}
          className="flex flex-col border rounded-md p-5 mt-5 bg-white"
        >
          <h1 className="text-lg mb-3">Sign up</h1>
          <hr className="mb-2" />
          <label>Username</label>
          <input
            className="border rounded-md px-2"
            name="username"
            maxLength={20}
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password</label>
          <input
            className="border rounded-md px-2"
            name="password"
            type="password"
            minLength={8}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            title="Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character."
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirm password</label>
          <input
            className="border rounded-md px-2"
            name="confirmPassword"
            type="password"
            minLength={8}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="border p-2 uppercase bg-green-400 hover:bg-green-300 rounded-md mt-3 flex justify-center items-center h-10"
            type="submit"
          >
            {isPending ? <span className="loader"></span> : "Sign up"}
          </button>
          {message && (
            <p className={message.ok ? "text-green-500" : "text-red-500"}>
              {message.message}
            </p>
          )}
        </form>
        <div className="py-2 w-full text-center">
          <p>
            Already have an account?{" "}
            <Link href="/signin" className="underline hover:text-green-400">
              Sign in
            </Link>{" "}
            here
          </p>
        </div>
      </div>
    </div>
  );
}
