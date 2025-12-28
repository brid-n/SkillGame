interface InsightCardProps {
  title: string;
  items: string[];
  color?: string;
}

export default function InsightCard({ title, items, color }: InsightCardProps) {
  return (
    <div className={`p-6 rounded-xl bg-gray-900 shadow-xl border-l-4 ${color ?? "border-blue-400"}`}>
      <h2 className="text-2xl font-bold mb-3">{title}</h2>

      <ul className="space-y-1 text-gray-300">
        {items.map((i, idx) => (
          <li key={idx}>• {i}</li>
        ))}
      </ul>
    </div>
  );
}
