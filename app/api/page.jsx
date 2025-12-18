"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Star } from "lucide-react";

export default function DayContainer() {
  const [currentDay, setCurrentDay] = useState(1);

  // Store guesses and ratings for all days
  const [daysData, setDaysData] = useState(
    Array.from({ length: 7 }, () => ({
      guessedSanta: "",
      confidence: 50,
      rating: 0,
    }))
  );

  // Snow effect
  useEffect(() => {
    const snowContainer = document.getElementById("snow");
    if (!snowContainer) return;
    snowContainer.innerHTML = "";
    for (let i = 0; i < 40; i++) {
      const snowflake = document.createElement("span");
      snowflake.className = "snowflake";
      snowflake.style.left = Math.random() * 100 + "%";
      snowflake.style.animationDuration = 5 + Math.random() * 5 + "s";
      snowflake.style.opacity = Math.random();
      snowContainer.appendChild(snowflake);
    }
  }, [currentDay]);

  const handleChange = (field, value) => {
    const updated = [...daysData];
    updated[currentDay - 1][field] = value;
    setDaysData(updated);
  };

 const handleSubmit = async () => {
  const data = daysData[currentDay - 1];

  try {
    const response = await fetch("/api/submit-day", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        day: currentDay,
        guessedSanta: data.guessedSanta,
        confidence: data.confidence,
        rating: data.rating,
      }),
    });

    const result = await response.json();
    alert(`Day ${currentDay} submitted! ${result.message}`);
  } catch (err) {
    console.error(err);
    alert("Error submitting data!");
  }
};


  const currentData = daysData[currentDay - 1];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#071f1a] to-[#031412] text-white px-4 py-10">
      <div id="snow" className="pointer-events-none absolute inset-0 overflow-hidden" />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-center text-3xl font-serif text-red-500">Day {currentDay} of 7</h1>
        <p className="text-center text-sm text-gray-300 mt-2">
          Submit your guesses and rating for today.
        </p>
      </motion.div>

      {/* Guess Card */}
      <Card className="mt-8 bg-[#0b2d26]/80 border border-[#184a3f] rounded-2xl shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-1">Who is your Santa?</h2>
          <p className="text-sm text-gray-300 mb-4">
            Make your best guess and set your confidence level.
          </p>

          <select
            className="w-full bg-[#0f3a31] border border-[#205c4f] rounded-lg p-2 mb-6"
            value={currentData.guessedSanta}
            onChange={(e) => handleChange("guessedSanta", e.target.value)}
          >
            <option value="">Select a player…</option>
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
            <option value="Charlie">Charlie</option>
          </select>

          <div className="mb-2 text-sm">Confidence: {currentData.confidence}%</div>
          <Slider
            value={[currentData.confidence]}
            onValueChange={(v) => handleChange("confidence", v[0])}
            max={100}
            step={1}
          />
        </CardContent>
      </Card>

      {/* Rating Card */}
      <Card className="mt-6 bg-[#0b2d26]/80 border border-[#184a3f] rounded-2xl shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-1">Rate Your Gift</h2>
          <p className="text-sm text-gray-300 mb-4">
            How much did you like the gift you received today?
          </p>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                onClick={() => handleChange("rating", i)}
                className={`cursor-pointer ${
                  currentData.rating >= i ? "fill-yellow-400 text-yellow-400" : "text-gray-500"
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleSubmit}
        className="mt-8 w-full bg-red-600 hover:bg-red-700 transition rounded-xl py-3 font-semibold"
      >
        Submit Today
      </motion.button>

      {/* Day Navigation */}
      <div className="flex justify-center mt-8 gap-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentDay(i + 1)}
            className={`px-4 py-2 rounded ${
              currentDay === i + 1 ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300"
            }`}
          >
            Day {i + 1}
          </button>
        ))}
      </div>

      {/* Snowflake styles */}
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
