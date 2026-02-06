"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    if (existingUsers.find((u: any) => u.email === form.email)) {
      setMessage({
        text: "ERROR: Email already exists in system.",
        type: "error",
      });
      return;
    }

    const updatedUsers = [...existingUsers, form];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setMessage({
      text: "SUCCESS: User registered. Redirecting to login...",
      type: "success",
    });

    // Brief delay so user can see the success message
    setTimeout(() => {
      router.push("/auth/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center font-mono px-4">
      <div className="w-full max-w-md p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-3xl font-black uppercase mb-2 tracking-tighter italic">
          Register
        </h1>
        <p className="mb-8 text-xs border-b border-black pb-2 text-gray-500 font-bold">
          SYSTEM_SIGNUP.EXE
        </p>

        {message.text && (
          <div
            className={`mb-6 p-3 text-[10px] font-bold border-2 ${
              message.type === "success"
                ? "bg-black text-white border-black"
                : "bg-white text-red-600 border-red-600"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase font-bold mb-1">
              Full Name
            </label>
            <input
              required
              className="w-full border-2 border-black p-3 focus:bg-black focus:text-white outline-none transition-all"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold mb-1">
              Email
            </label>
            <input
              required
              type="email"
              className="w-full border-2 border-black p-3 focus:bg-black focus:text-white outline-none transition-all"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold mb-1">
              Password
            </label>
            <input
              required
              type="password"
              className="w-full border-2 border-black p-3 focus:bg-black focus:text-white outline-none transition-all"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button className="w-full bg-black text-white py-4 font-black uppercase hover:bg-white hover:text-black border-2 border-black transition-all mt-4">
            Create Account
          </button>

          <Link
            href="/auth/login"
            className="block w-full border-2 border-black py-4 font-black uppercase text-center hover:bg-black hover:text-white transition-all text-sm"
          >
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
}
