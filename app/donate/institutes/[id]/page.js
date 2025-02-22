import { useState } from "react";

export default function InstituteDonationPage({ params }) {
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/donations/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, type: "Institute", instituteId: params.id, userId: "1" }),
    });
    setAmount("");
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Donate to Institute</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount (₹)"
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Donate</button>
      </form>
    </div>
  );
}