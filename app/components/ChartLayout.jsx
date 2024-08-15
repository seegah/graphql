"use client";

import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const ChartLayout = ({ chartData, chartOptions, type }) => {
  const [updateChartData, setUpdateChartData] = useState([]);
  const [updateChartOptions, setUpdateChartOptions] = useState({});

  useEffect(() => {
    setUpdateChartOptions(chartOptions);
    setUpdateChartData(chartData);
  }, []);

  return (
    <Chart
      options={updateChartOptions}
      series={updateChartData}
      type={type}
      width={"100%"}
      height={"100%"}
    />
  );
};

export default ChartLayout;
