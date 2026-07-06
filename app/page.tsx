"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  Wallet,
  Building2,
  MessageCircle,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  Check,
} from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Rent collection ledger",
    body: "A live “who paid / who didn’t” board. Mark payments received in one tap and watch tenants glide between Paid, Pending and Overdue.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp reminders",
    body: "One click formats a polite rent reminder and opens WhatsApp pre-filled — no copy-pasting, no awkward phone calls.",
  },
  {
    icon: BarChart3,
    title: "Revenue & occupancy",
    body: "Monthly and yearly revenue trends, occupancy rate, and collection rate — rendered in fluid blue-to-cyan gradients.",
  },
  {
    icon: Building2,
    title: "Properties & units",
    body: "Organise buildings, units and leases. Track vacant vs occupied and rent per unit across your whole portfolio.",
  },
  {
    icon: Home,
    title: "Tenant portal",
    body: "Tenants see their next due date, a countdown banner, payment history and downloadable receipts — always up to date.",
  },
  {
    icon: ShieldCheck,
    title: "Roles & access",
    body: "Landlords and tenants each get a tailored dashboard. Secure role routing keeps everyone in the right place.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-6xl px-5">
      {/* Nav */}
      <header className="sticky top-4 z-30 mt-4">
        <div className="glass flex items-center justify-between rounded-3xl px-5 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-liquid-primary text-white shadow-glow-blue">
              <Home size={18} strokeWidth={2.4} />
            </span>
            <span className="text-base font-bold tracking-tight text-slate-900">
              Home Rentals
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <a href="#features" className="transition hover:text-slate-900">Features</a>
            <a href="#roles" className="transition hover:text-slate-900">For landlords & tenants</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login" className="btn-ghost !px-4 !py-2 text-sm">Sign in</Link>
            <Link href="/signup" className="btn-primary !px-4 !py-2 text-sm">Get started</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-16 md:pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute left-1/2 top-10 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-liquid-primary opacity-30 blur-3xl"
        />
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-glass backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
            iOS 26 Liquid Glass · Landlord & Tenant Management
          </motion.span>
          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl"
          >
            Collect rent, track tenants,{" "}
            <span className="gradient-text">without the chaos.</span>
          </motion.h1>
          <motion.p variants={item} className="mx-auto mt-6 max-w-xl text-lg text-slate-600">
            A glossy, futuristic rental platform. See who paid at a glance, send
            WhatsApp reminders in one tap, and give every tenant a beautiful portal
            of their own.
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/dashboard/landlord" className="btn-primary group w-full sm:w-auto">
              Explore landlord dashboard
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/dashboard/tenant" className="btn-ghost w-full sm:w-auto">
              View tenant portal
            </Link>
          </motion.div>
          <motion.p variants={item} className="mt-4 text-xs text-slate-400">
            Live demo with sample data — no sign-up required.
          </motion.p>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="pt-24">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Everything a landlord needs
          </h2>
          <p className="mt-3 text-slate-500">
            Purpose-built for rent collection, tenant management and clear communication.
          </p>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              whileHover={{ y: -6 }}
              className="glass group rounded-3xl p-6"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-liquid-primary text-white shadow-glow-blue transition-transform duration-300 group-hover:scale-110">
                <f.icon size={22} strokeWidth={2.2} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Roles */}
      <section id="roles" className="pt-24">
        <div className="grid gap-5 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-4xl p-8"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">For landlords</span>
            <h3 className="mt-3 text-2xl font-bold text-slate-900">Run your portfolio like a pro</h3>
            <ul className="mt-6 space-y-3">
              {["Live payment tracker with Paid / Pending / Overdue", "Revenue, occupancy & collection-rate insights", "One-tap WhatsApp rent reminders", "Add properties, units and tenants in seconds"].map((x) => (
                <li key={x} className="flex items-start gap-3 text-sm text-slate-600">
                  <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-green-500/15 text-green-600">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
            <Link href="/dashboard/landlord" className="btn-primary mt-8">Open landlord dashboard</Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-4xl p-8"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-600">For tenants</span>
            <h3 className="mt-3 text-2xl font-bold text-slate-900">Never miss a due date</h3>
            <ul className="mt-6 space-y-3">
              {["Clear rent status with a live countdown", "Full payment history & downloadable receipts", "Submit maintenance requests in a tap", "A calm, beautiful place to stay on top of rent"].map((x) => (
                <li key={x} className="flex items-start gap-3 text-sm text-slate-600">
                  <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-blue-500/15 text-blue-600">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
            <Link href="/dashboard/tenant" className="btn-ghost mt-8">Open tenant portal</Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="glass-strong relative overflow-hidden rounded-4xl p-10 text-center md:p-16">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-liquid-primary opacity-25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-liquid-primary opacity-20 blur-3xl" />
          <h2 className="relative text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Ready to collect rent the easy way?
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-slate-600">
            Jump straight into the demo, or create your account to make it yours.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/signup" className="btn-primary">Create your account</Link>
            <Link href="/dashboard/landlord" className="btn-ghost">Try the demo</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/50 py-8 text-center text-sm text-slate-400">
        <p>© {new Date().getFullYear()} Home Rentals · Built with the iOS 26 Liquid Glass design system.</p>
      </footer>
    </div>
  );
}
