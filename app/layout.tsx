import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home Rentals — Tenant Management System",
  description:
    "A liquid-glass rental & tenant management platform for landlords and tenants. Track rent, occupancy, and payments with WhatsApp reminders.",
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="page-bg" aria-hidden />
        {children}
      </body>
    </html>
  );
}
