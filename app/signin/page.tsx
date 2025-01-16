"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { redirect } from "next/navigation";
import { signin } from "../lib/actions/user";

export default function Page() {
  const [message, formAction, isPending] = useActionState(signin, null);

  useEffect(() => {
    message && message.ok === true && redirect("/");
  }, [message]);

  return (
    <div className="flex justify-center w-screen p-10">
      <div>
        <form
          action={formAction}
          className="flex flex-col border rounded-md p-5 mt-5 bg-white"
        >
          <h1 className="text-lg mb-3">Sign in</h1>
          <hr className="mb-2" />
          <label>Username</label>
          <input className="border rounded-md px-2" name="username" required />
          <label>Password</label>
          <input
            className="border rounded-md px-2"
            name="password"
            type="password"
            required
          />
          <button
            className="border p-2 uppercase bg-green-400 hover:bg-green-300 rounded-md mt-3 flex justify-center items-center h-10"
            type="submit"
          >
            {isPending ? <span className="loader"></span> : "Sign in"}
          </button>
          {message && (
            <p className={message.ok ? "text-green-500" : "text-red-500"}>
              {message.message}
            </p>
          )}
        </form>
        <div className="py-2 w-full text-center">
          <p>
            No account yet?{" "}
            <Link href="/signup" className="underline hover:text-green-400">
              Sign up
            </Link>{" "}
            here
          </p>
        </div>
      </div>
    </div>
  );
}
