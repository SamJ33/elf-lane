"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EntryPage() {
  const [player, setPlayer] = useState("");
  const [giftTarget, setGiftTarget] = useState("");
  const router = useRouter();

  async function submit() {
    await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ player, giftTarget }),
    });

    router.push("/days");
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-[#0b2d26] p-8 rounded-xl w-full max-w-sm">
        <h1 className="text-xl mb-4">🎄 Secret Santa</h1>

        <input
          className="w-full mb-3 p-2 rounded bg-[#0f3a31]"
          placeholder="Your name"
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
        />

        <input
          className="w-full mb-6 p-2 rounded bg-[#0f3a31]"
          placeholder="Who are you gifting?"
          value={giftTarget}
          onChange={(e) => setGiftTarget(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full bg-red-600 py-2 rounded-lg"
        >
          Enter Game
        </button>
      </div>
    </div>
  );
}
