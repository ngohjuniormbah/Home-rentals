import { ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  return (
    <Tag
      className={`glass rounded-3xl transition-all duration-300 ${className}`}
    >
      {children}
    </Tag>
  );
}
