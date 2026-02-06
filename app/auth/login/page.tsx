"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie"; // Added this

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (u: any) => u.email === form.email && u.password === form.password,
    );

    if (user) {
      // SET COOKIE: This allows the middleware to see you are logged in
      Cookies.set("isLoggedIn", "true", { expires: 1 });

      // Also keep localStorage for client-side persistence if needed
      localStorage.setItem("isLoggedIn", "true");

      // Force a refresh/navigation to dashboard
      router.push("/dashboard");
      router.refresh();
    } else {
      setError("INVALID_CREDENTIALS: User not found or password incorrect.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono px-4">
      <div className="w-full max-w-md p-8 border-2 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
        <h1 className="text-3xl font-black uppercase mb-2 tracking-tighter text-white italic">
          Access Portal
        </h1>
        <p className="mb-8 text-sm border-b border-white pb-2 text-gray-500 font-bold">
          SECURE_LOGIN.SYS
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase font-bold mb-1 tracking-widest text-gray-400">
              Email Address
            </label>
            <input
              required
              className="w-full bg-black border-2 border-white p-3 focus:bg-white focus:text-black outline-none transition-all placeholder:text-gray-800"
              placeholder="user@osa-hr.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold mb-1 tracking-widest text-gray-400">
              Password
            </label>
            <input
              required
              type="password"
              className="w-full bg-black border-2 border-white p-3 focus:bg-white focus:text-black outline-none transition-all"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {error && (
            <p className="text-[10px] bg-red-600 text-white p-3 font-bold border-2 border-white">
              {error}
            </p>
          )}

          <div className="space-y-4 pt-4">
            <button className="w-full bg-white text-black py-4 font-black uppercase hover:bg-black hover:text-white border-2 border-white transition-all active:scale-95">
              Execute Login
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-800"></div>
              <span className="flex-shrink mx-4 text-gray-600 text-[10px] uppercase font-bold">
                OR
              </span>
              <div className="flex-grow border-t border-gray-800"></div>
            </div>

            <Link
              href="/auth/signup"
              className="block w-full border-2 border-white py-4 font-black uppercase text-center hover:bg-white hover:text-black transition-all text-sm"
            >
              Register New ID
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
