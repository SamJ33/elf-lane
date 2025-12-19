"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function GamePage() {
  const { day } = useParams();
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [guess, setGuess] = useState("");

  async function submit() {
    await fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify({ day, rating }),
    });

    await fetch("/api/guess", {
      method: "POST",
      body: JSON.stringify({ day, guess }),
    });

    router.push("/days");
  }

  return (
    <div className="min-h-screen bg-[#071f1a] text-white p-6">
      <h1 className="text-2xl mb-4">Day {day}</h1>

      <input
        className="w-full p-2 rounded bg-[#0f3a31] mb-4"
        placeholder="Who do you think gifted you?"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />

      <button
        onClick={submit}
        className="w-full bg-red-600 py-3 rounded-xl"
      >
        Submit Day {day}
      </button>
    </div>
  );
}
