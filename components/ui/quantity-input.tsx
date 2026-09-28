"use client";

export function QuantityInput({
  value,
  min = 1,
  max,
  onChange,
  label = "數量",
}: {
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
  label?: string;
}) {
  return (
    <div className="inline-flex items-center border border-line bg-cream">
      <button
        type="button"
        className="px-3 py-2 text-lg leading-none disabled:opacity-30"
        aria-label={`減少${label}`}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        −
      </button>
      <span className="min-w-8 text-center text-sm" aria-live="polite" aria-label={`${label} ${value}`}>
        {value}
      </span>
      <button
        type="button"
        className="px-3 py-2 text-lg leading-none disabled:opacity-30"
        aria-label={`增加${label}`}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
}
