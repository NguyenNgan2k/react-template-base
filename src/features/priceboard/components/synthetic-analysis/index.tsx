import ChartIndexDashboard from "./ChartIndexDashboard";
import SynTheticTable from "./SynTheticTable";

export default function SynAnalysisPriceBoard() {
  return (
    <div className="w-full h-full grid max-xl:grid-cols-2 grid-cols-4 gap-3">
      <div className="max-xl:col-span-1 col-span-3">
        <ChartIndexDashboard />
      </div>

      <div className="col-span-1">
        <SynTheticTable />
      </div>
    </div>
  );
}
