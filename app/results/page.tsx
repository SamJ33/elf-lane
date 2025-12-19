"use client";

import { useEffect, useState } from "react";

export default function Results() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/results")
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="min-h-screen bg-[#031412] text-white p-8">
      <h1 className="text-3xl text-center mb-8 text-red-500">Results</h1>

      {data.map((row, i) => (
        <div key={i} className="bg-[#0b2d26] p-4 mb-4 rounded">
          {row.name} — Score: {row.score}
        </div>
      ))}
    </div>
  );
}
