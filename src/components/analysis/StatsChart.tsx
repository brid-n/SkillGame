import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer
} from "recharts";

export default function StatsChart({ stats }: any) {
  const data = [
    { skill: "Phản xạ", value: stats.reflexScore },
    { skill: "Logic", value: stats.logicScore },
    { skill: "Toán học", value: stats.mathScore },
  ];

  return (
    <div className="p-6 bg-gray-900 rounded-xl shadow-xl mt-8">
      <h2 className="text-2xl font-bold mb-4">📈 Biểu đồ kỹ năng</h2>

      <div className="w-full h-[350px]">
        <ResponsiveContainer>
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" stroke="#ccc" />
            <Radar
              name="Skill"
              dataKey="value"
              stroke="#4ade80"
              fill="#4ade80"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
