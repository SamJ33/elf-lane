export default function DaysPage() {
  const days = Array.from({ length: 7 }, (_, i) => i + 1)

  return (
    <main className="min-h-screen bg-[#071f1a] text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        🎄 Secret Santa – Voting Days
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
        {days.map((day) => (
          <a
            key={day}
            href={`/day/${day}`}
            className="block rounded-xl border border-[#184a3f] bg-[#0b2d26]/80 p-6 text-center hover:bg-[#134036] transition"
          >
            <span className="text-xl font-semibold">Day {day}</span>
          </a>
        ))}
      </div>
    </main>
  )
}
