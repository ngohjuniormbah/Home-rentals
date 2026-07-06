"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Building2, User, Loader2 } from "lucide-react";
import { AuthShell } from "@/components/AuthShell";
import type { Role } from "@/lib/types";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("landlord");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Phase 1: no backend yet — route by selected role.
    // Supabase Auth + profile.role lookup will replace this later.
    setLoading(true);
    setTimeout(() => {
      router.push(role === "landlord" ? "/dashboard/landlord" : "/dashboard/tenant");
    }, 500);
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your Home Rentals account."
      footer={
        <>
          Don’t have an account?{" "}
          <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-500">
            Create one
          </Link>
        </>
      }
    >
      <div className="mb-5 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100/70 p-1">
        {(["landlord", "tenant"] as Role[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold capitalize transition ${
              role === r ? "bg-white text-slate-900 shadow-glass" : "text-slate-500"
            }`}
          >
            {r === "landlord" ? <Building2 size={16} /> : <User size={16} />}
            {r}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="email" required placeholder="you@email.com" defaultValue="demo@homerentals.app" className="input-glass pl-11" />
        </div>
        <div className="relative">
          <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="password" required placeholder="Password" defaultValue="password" className="input-glass pl-11" />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? <Loader2 size={18} className="animate-spin" /> : `Sign in as ${role}`}
        </button>
      </form>
    </AuthShell>
  );
}
