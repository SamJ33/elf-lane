"use client";

import { useRouter } from "next/navigation";

export default function GamePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#031412] text-white p-8">
      <h1 className="text-center text-3xl text-red-500 mb-8">Select a Day</h1>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {[1,2,3,4,5,6,7].map(day => (
          <button
            key={day}
            onClick={() => router.push(`/game/day/${day}`)}
            className="bg-[#0b2d26] p-6 rounded-xl hover:bg-[#145c4d]"
          >
            Day {day}
          </button>
        ))}
      </div>
    </div>
  );
}
