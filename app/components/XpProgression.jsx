"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useGlobalContext } from "../context/globalState";
import { formatSize } from "../utils";

const ChartCard = dynamic(() => import("./ChartCard"), { ssr: false });

const XpProgression = () => {
  const { XpTransaction, loading } = useGlobalContext();

  if (loading) return <div>Loading...</div>;
  if (!XpTransaction || XpTransaction.length === 0)
    return <div>No Xp Transaction Found</div>;

  const xpTransactionData = XpTransaction.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    }),
    fullDate: new Date(item.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    value: item.amount,
  }));

  xpTransactionData.sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate));

  const options = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#000000",
      },
      theme: "dark",
    },
    grid: {
      show: false,
    },
    xaxis: {
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      categories: xpTransactionData.map((data) => data.date),
      labels: {
        style: {
          colors: "#000",
          fontSize: "12px",
          fontWeight: "400",
        },
      },
      type: "text",
    },
    yaxis: {
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      labels: {
        style: {
          colors: "#000",
          fontSize: "12px",
          fontWeight: "400",
        },
        formatter: formatSize,
      },
    },
    fill: {
      type: "solid",
      colors: ["#FF9B05"],
    },
  };

  const series = [
    {
      name: "XP Amount",
      data: xpTransactionData.map((data) => data.value),
      color: "#FF9B05",
    },
  ];

  return (
    <ChartCard
      title={"XP Progression"}
      chartData={series}
      chartOptions={options}
      type={"area"}
    />
  );
};

export default XpProgression;
