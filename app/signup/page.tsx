"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Phone, Building2, Home, Loader2 } from "lucide-react";
import { AuthShell } from "@/components/AuthShell";
import type { Role } from "@/lib/types";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("landlord");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Phase 1: no backend. On real build this creates a Supabase user +
    // a `profiles` row with the chosen role, then routes accordingly.
    setLoading(true);
    setTimeout(() => {
      router.push(role === "landlord" ? "/dashboard/landlord" : "/dashboard/tenant");
    }, 600);
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Pick your role and get started in seconds."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </>
      }
    >
      <div className="mb-5 grid grid-cols-2 gap-3">
        {([
          { value: "landlord", icon: Building2, desc: "I own & manage properties" },
          { value: "tenant", icon: Home, desc: "I rent a place" },
        ] as { value: Role; icon: typeof Home; desc: string }[]).map((r) => (
          <button
            key={r.value}
            type="button"
            onClick={() => setRole(r.value)}
            className={`rounded-2xl border p-4 text-left transition ${
              role === r.value
                ? "border-blue-400 bg-blue-50/70 shadow-glow-blue"
                : "border-white/60 bg-white/60 hover:border-slate-200"
            }`}
          >
            <span
              className={`grid h-9 w-9 place-items-center rounded-xl ${
                role === r.value ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
              }`}
            >
              <r.icon size={18} />
            </span>
            <p className="mt-2.5 text-sm font-bold capitalize text-slate-900">{r.value}</p>
            <p className="text-xs text-slate-400">{r.desc}</p>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input required placeholder="Full name" className="input-glass pl-11" />
        </div>
        <div className="relative">
          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="email" required placeholder="you@email.com" className="input-glass pl-11" />
        </div>
        <div className="relative">
          <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input required placeholder="WhatsApp number (+237…)" className="input-glass pl-11" />
        </div>
        <div className="relative">
          <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="password" required placeholder="Password" className="input-glass pl-11" />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? <Loader2 size={18} className="animate-spin" /> : `Create ${role} account`}
        </button>
      </form>
    </AuthShell>
  );
}
