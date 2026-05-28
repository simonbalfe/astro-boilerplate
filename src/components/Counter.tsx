import { useState } from "react";

export default function Counter({ initial = 0 }: { initial?: number }) {
  const [count, setCount] = useState(initial);

  return (
    <div className="rounded-lg border border-border bg-card p-4 flex items-center justify-between gap-4">
      <div>
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          React island
        </div>
        <div className="text-2xl font-bold tabular-nums text-foreground">{count}</div>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setCount((c) => c - 1)}
          className="rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold text-secondary-foreground hover:bg-secondary/80 transition-colors"
        >
          -1
        </button>
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          +1
        </button>
      </div>
    </div>
  );
}
