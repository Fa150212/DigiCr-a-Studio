"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submit = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) router.push("/dashboardAdmin");
  };

  return (
    <form onSubmit={submit} className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded w-80">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <input onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full mb-3 p-2 border" />
        <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full mb-3 p-2 border" />
        <button className="bg-blue-600 text-white w-full py-2">Login</button>
      </div>
    </form>
  );
}
