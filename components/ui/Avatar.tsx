const GRADIENTS = [
  "from-blue-500 to-indigo-500",
  "from-indigo-500 to-cyan-400",
  "from-sky-500 to-blue-600",
  "from-violet-500 to-blue-500",
  "from-cyan-400 to-blue-500",
];

function hash(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

export function Avatar({
  seed,
  size = 40,
}: {
  seed: string;
  size?: number;
}) {
  const gradient = GRADIENTS[hash(seed) % GRADIENTS.length];
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} font-bold text-white shadow-glass ring-2 ring-white/60`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {seed.slice(0, 2).toUpperCase()}
    </span>
  );
}
