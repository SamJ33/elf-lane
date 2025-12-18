"use client";

export function Slider({ value, onValueChange, max = 100, step = 1 }) {
  return (
    <input
      type="range"
      value={value[0]}
      max={max}
      step={step}
      onChange={(e) => onValueChange([parseInt(e.target.value)])}
      className="w-full h-2 rounded-lg bg-green-600 accent-red-500"
    />
  );
}
