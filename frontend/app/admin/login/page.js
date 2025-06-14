"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      username: userInfo.username,
      password: userInfo.password,
    });

    if (res?.error) {
      setError("Invalid username or password");
    } else {
      setError(null);
      router.push("/admin");
    }
  }

  return (
    <div className="py-20">
      <div className="flex h-full items-center justify-center">
        <div className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
          <div className="flex h-full flex-col justify-center gap-4 p-6">
            <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-4">
                <h1 className="mb-4 text-2xl font-bold dark:text-white">Login</h1>

                <div>
                  <div className="mb-2">
                    <label
                      className="text-sm font-medium text-gray-900 dark:text-gray-300"
                      htmlFor="username"
                    >
                      Username:
                    </label>
                  </div>
                  <div className="flex w-full rounded-lg pt-1">
                    <input
                      className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                      id="username"
                      type="text"
                      name="username"
                      placeholder="your_username"
                      value={userInfo.username}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, username: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2">
                    <label
                      className="text-sm font-medium text-gray-900 dark:text-gray-300"
                      htmlFor="password"
                    >
                      Password
                    </label>
                  </div>
                  <div className="flex w-full rounded-lg pt-1">
                    <input
                      className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                      id="password"
                      type="password"
                      name="password"
                      value={userInfo.password}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, password: e.target.value })
                      }
                      required
                    />
                  </div>
                  <p className="mt-2 cursor-pointer text-blue-500 hover:text-blue-600">
                    Forgot password?
                  </p>
                </div>

                {error && (
                  <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
                )}

                <div className="flex flex-col gap-2">
                  <button
                    type="submit"
                    className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg"
                  >
                    <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base">
                      Login
                    </span>
                  </button>
                </div>
              </form>

              <div className="min-w-[270px]">
                <div className="mt-4 text-center dark:text-gray-200">
                  New user?{" "}
                  <a
                    className="text-blue-500 underline hover:text-blue-600"
                    href="/signup"
                  >
                    Create account here
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
