"use client"

import dynamic from "next/dynamic";
import { auditRatioChartOptions } from "../utils/chartData";

const ChartCard = dynamic(() => import("./ChartCard"), {
  ssr: false,
});
const AuditRatio = ({ totalDown = 0, totalUp = 0 }) => {
  const data = [
    Number((totalUp / 1000000).toFixed(2)),
    Number((totalDown / 1000000).toFixed(2)),
  ];

  return (
    <div>
      <ChartCard
        title={"Audits Ratio"}
        chartData={data}
        chartOptions={auditRatioChartOptions}
        type={"donut"}
      />
    </div>
  );
};

export default AuditRatio;
