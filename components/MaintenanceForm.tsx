"use client";

import { useState } from "react";
import { Wrench, Send, CheckCircle2 } from "lucide-react";

const CATEGORIES = ["Plumbing", "Electrical", "Appliance", "Other"];

export function MaintenanceForm() {
  const [sent, setSent] = useState(false);
  const [category, setCategory] = useState("Plumbing");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Phase 1: no backend — simulate submission.
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  }

  return (
    <div className="glass rounded-3xl p-5">
      <div className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-liquid-primary text-white shadow-glow-blue">
          <Wrench size={17} />
        </span>
        <div>
          <h2 className="text-base font-bold text-slate-900">Maintenance & support</h2>
          <p className="text-xs text-slate-400">Report an issue to your landlord</p>
        </div>
      </div>

      {sent ? (
        <div className="mt-5 flex flex-col items-center justify-center gap-2 rounded-2xl bg-green-500/10 py-8 text-center">
          <CheckCircle2 size={32} className="text-green-600" />
          <p className="font-semibold text-green-700">Request submitted</p>
          <p className="text-xs text-slate-500">Your landlord has been notified.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`rounded-xl px-3 py-1.5 text-sm font-medium transition ${
                  category === c
                    ? "bg-blue-600 text-white shadow-glow-blue"
                    : "bg-white/70 text-slate-600 hover:bg-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <textarea
            required
            rows={3}
            placeholder="Describe the issue…"
            className="input-glass resize-none"
          />
          <button type="submit" className="btn-primary w-full">
            <Send size={17} /> Submit request
          </button>
        </form>
      )}
    </div>
  );
}
