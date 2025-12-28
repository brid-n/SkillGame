import { useEffect, useState } from "react";
import { fetchGameResults } from "../hooks/useGameResults";
import { analyzePlayer } from "../lib/gemini";

import InsightCard from "../components/analysis/InsightCard";
import StatsChart from "../components/analysis/StatsChart";

interface AnalysisResult {
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  stats: {
    reflexScore: number;
    logicScore: number;
    mathScore: number;
  };
}

export default function PhanTich() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    (async () => {
      const results = await fetchGameResults();
      const ai = await analyzePlayer(results);
      setAnalysis(ai);
    })();
  }, []);

  if (!analysis) {
    return (
      <div className="p-8 text-black text-xl">
        🔄 Đang phân tích dữ liệu người chơi...
      </div>
    );
  }

  return (
    <div className="p-8 text-black space-y-8">
      <h1 className="text-4xl font-bold mb-6">📊 Phân tích người chơi</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InsightCard
          title="🔥 Điểm mạnh"
          items={analysis.strengths}
          color="border-green-400"
        />

        <InsightCard
          title="⚠️ Điểm yếu"
          items={analysis.weaknesses}
          color="border-red-400"
        />

        <InsightCard
          title="💡 Gợi ý cải thiện"
          items={analysis.recommendations}
          color="border-yellow-400"
        />
      </div>

      {/* Stats chart */}
      <StatsChart stats={analysis.stats} />
    </div>
  );
}
