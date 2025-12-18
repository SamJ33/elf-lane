import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Star } from "lucide-react";

export default function Home() {
  const [confidence, setConfidence] = useState(50);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const snowContainer = document.getElementById("snow");
    if (!snowContainer) return;
    for (let i = 0; i < 40; i++) {
      const snowflake = document.createElement("span");
      snowflake.className = "snowflake";
      snowflake.style.left = Math.random() * 100 + "%";
      snowflake.style.animationDuration = 5 + Math.random() * 5 + "s";
      snowflake.style.opacity = Math.random().toString();
      snowContainer.appendChild(snowflake);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#071f1a] to-[#031412] text-white px-4 py-10">
      <div id="snow" className="pointer-events-none absolute inset-0 overflow-hidden" />

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-center text-3xl font-serif text-red-500">Secret Santa Day 1–7</h1>
      </motion.div>

      {/* Example Card */}
      <Card className="mt-8 bg-[#0b2d26]/80 border border-[#184a3f] rounded-2xl shadow-xl">
        <CardContent>
          <h2 className="text-xl font-semibold mb-1">Who is your Santa?</h2>
          <select className="w-full bg-[#0f3a31] border border-[#205c4f] rounded-lg p-2 mb-6" title="Select a player">
            <option>Select a player…</option>
            <option>Alice</option>
            <option>Bob</option>
            <option>Charlie</option>
          </select>
          <div className="mb-2 text-sm">Confidence: {confidence}%</div>
          <Slider value={[confidence]} onValueChange={(v: number[]) => setConfidence(v[0])} max={100} step={1} />
        </CardContent>
      </Card>

      {/* Example Rating */}
      <Card className="mt-6 bg-[#0b2d26]/80 border border-[#184a3f] rounded-2xl shadow-xl">
        <CardContent>
          <h2 className="text-xl font-semibold mb-1">Rate Your Gift</h2>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                onClick={() => setRating(i)}
                className={`cursor-pointer ${rating >= i ? "fill-yellow-400 text-yellow-400" : "text-gray-500"}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <motion.button whileTap={{ scale: 0.95 }} className="mt-8 w-full bg-red-600 hover:bg-red-700 transition rounded-xl py-3 font-semibold">
        Cast Your Votes
      </motion.button>

      <style jsx>{`
        .snowflake {
          position: absolute;
          top: -10px;
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 9999px;
          animation: fall linear infinite;
        }
        @keyframes fall {
          to {
            transform: translateY(110vh);
          }
        }
      `}</style>
    </div>
  );
}
