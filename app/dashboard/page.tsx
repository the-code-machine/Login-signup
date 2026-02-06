"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Added this for logout functionality
export default function Dashboard() {
  const router = useRouter();

  // AUTH GUARD: Check if user is logged in on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/auth/login");
    }
  }, [router]);

  const handleLogout = () => {
    // Clear the session flag
    Cookies.remove("isLoggedIn");
    localStorage.removeItem("isLoggedIn");
    // Redirect to login
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black font-mono px-4">
      <div className="border-4 border-black p-8 md:p-16 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-4xl md:text-6xl font-black mb-4 italic tracking-tighter">
          ACCESS_GRANTED
        </h1>
        <p className="text-sm md:text-xl uppercase tracking-[0.2em] border-t-2 border-black pt-6 mb-10 font-bold">
          Verified: OSA HR Solutions Official Portal
        </p>

        <button
          onClick={handleLogout}
          className="group relative inline-block px-10 py-4 font-bold border-2 border-black uppercase transition-all hover:bg-black hover:text-white active:translate-y-1"
        >
          Terminate Session [Logout]
        </button>
      </div>
    </div>
  );
}
