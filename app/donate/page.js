"use client";

import { useState } from "react";
import { getServerSession } from "next-auth";

export default async function DonatePage() {
  const session = await getServerSession();
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("General");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/donations/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, type, userId: session?.user.id || "guest" }),
    });
    setAmount("");
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Make a Donation</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount (₹)"
          className="border p-2 w-full"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="General">General</option>
          <option value="Yatheem">Yatheem</option>
          <option value="Hifz">Hifz</option>
          <option value="Building">Building</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Donate</button>
      </form>
    </div>
  );
}