import React from "react";
import dynamic from "next/dynamic";
import { useGlobalContext } from "../context/globalState";
import { calculateAudits } from "../utils";

// Importation dynamique pour éviter les problèmes SSR avec ApexCharts
const ChartCard = dynamic(() => import("./ChartCard"), { ssr: false });

const Audits = () => {
  const { User, loading } = useGlobalContext();

  if (loading) return <div>Loading...</div>;
  if (!User || !User[0]) return <div>No user data available</div>;

  // Supposons que calculateAudits retourne un objet avec les champs pass et fail
  const auditsData = calculateAudits(User[0].audited);

  // Définir la fonction directement dans le composant Audits
  const getAuditsChartOptions = (auditsData) => {
    const total = auditsData.pass + auditsData.fail;
    const passPercentage = (auditsData.pass / total) * 100;
    const failPercentage = (auditsData.fail / total) * 100;

    return {
      series: [passPercentage, failPercentage],
      labels: [`Pass ${auditsData.pass}`, `Fail  ${auditsData.fail}`],
      colors: ["#FF9B05", "#FFC46B"],
      chart: {
        width: "50px",
      },
      states: {
        hover: {
          filter: {
            type: "none",
          },
        },
      },
      legend: {
        show: true,
        position: "bottom",
        color: "#000",
        fontSize: "14px",
      },
      dataLabels: {
        enabled: true,
      },
      hover: { mode: null },
      plotOptions: {
        donut: {
          expandOnClick: true,
          donut: {
            labels: {
              show: false,
            },
          },
        },
      },
      fill: {
        colors: ["#FF9B05", "#FFC46B"],
      },
      tooltip: {
        enabled: true,
        theme: "dark",
        style: {
          fontSize: "12px",
          fontFamily: undefined,
          backgroundColor: "#000000",
        },
      },
    };
  };

  const options = getAuditsChartOptions(auditsData);

  return (
    <div>
      <ChartCard
        title={"Total Audits"}
        chartData={options.series}
        chartOptions={options}
        type={"pie"}
      /> 
    </div>
  );
};

export default Audits;
