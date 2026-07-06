import Link from "next/link";
import { Home } from "lucide-react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-10">
      <Link href="/" className="mx-auto mb-8 flex items-center gap-2.5">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-liquid-primary text-white shadow-glow-blue">
          <Home size={22} strokeWidth={2.4} />
        </span>
        <span className="text-xl font-bold tracking-tight text-slate-900">Home Rentals</span>
      </Link>

      <div className="glass-strong rounded-4xl p-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </div>

      <div className="mt-6 text-center text-sm text-slate-500">{footer}</div>
    </div>
  );
}
