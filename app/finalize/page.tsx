"use client";

export default function FinalizePage() {
  async function finalize() {
    await fetch("/api/finalize", { method: "POST" });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <button
        onClick={finalize}
        className="bg-red-600 px-6 py-3 rounded-xl"
      >
        Finalize Game
      </button>
    </div>
  );
}
