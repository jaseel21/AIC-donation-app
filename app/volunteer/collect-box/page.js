"use client";

import { useState } from "react";

export default function CollectBoxPage() {
  const [boxId, setBoxId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/boxes/collect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ boxId }),
    });
    setBoxId("");
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Collect Box</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={boxId}
          onChange={(e) => setBoxId(e.target.value)}
          placeholder="Box ID"
          className="border p-2 w-full"
        />

  
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Collect</button>
      </form>
    </div>
  );
}