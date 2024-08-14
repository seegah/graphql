"use client"

import React from "react";
import dynamic from "next/dynamic";
import { useGlobalContext } from "../context/globalState";
import { formatSize, projectName } from "../utils";

const ChartCard = dynamic(() => import("./ChartCard"), { ssr: false });

const XpTransaction = () => {
  const { XpView, loading } = useGlobalContext();

  if (loading) return <div>Loading...</div>;
  if (!XpView || XpView.length === 0) return <div>No Xp Transaction Found</div>;

  const data = XpView.map((item) => ({
    name: projectName(item.path),
    xpAmount: item.amount,
  }));
  const xpTransactionData = [
    {
      name: "XpAmount",
      data: data.map((item) => item.xpAmount),
    },
  ];

  const xpTransactionCategory = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#000000",
      },
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
      theme: "dark",
    },
    xaxis: {
      categories: data.map((item) => item.name), // Utilisez les noms des projets comme catégories
      show: false,
      labels: {
        show: true,
        style: {
          colors: "#000",
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      tickPlacement: "on",
    },
    yaxis: {
      categories: data.map((item) => item.xpAmount),
      labels: {
        show: true,
        style: {
          colors: "#000",
          fontSize: "12px",
        },
        formatter: formatSize, // Utilisez la fonction de formatage pour les étiquettes de l'axe des ordonnées
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
    },
    grid: {
      show: false,
      strokeDashArray: 12,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          [
            {
              offset: 0,
              color: "#FF9B05",
              opacity: 1,
            },
            {
              offset: 100,
              color: "#FFC46B",
              opacity: 0.8,
            },
          ],
        ],
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 12,
        columnWidth: "25px",
      },
    },
  };

  return (
    <div>
      <ChartCard
        title={"XP Transaction"}
        chartData={xpTransactionData}
        chartOptions={xpTransactionCategory}
        type={"bar"}
      />
    </div>
  );
};

export default XpTransaction;
