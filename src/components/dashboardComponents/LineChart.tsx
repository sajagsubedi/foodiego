"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

interface LineChartProps {
  title: string;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
}

const LineChart: React.FC<LineChartProps> = ({ title, data }) => {
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#1f2937",
        },
      },
      title: {
        display: false,
        text: title,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6b7280", // gray-500
        },
        grid: {
          color: "#e5e7eb", // gray-200
        },
      },
      y: {
        ticks: {
          color: "#6b7280",
        },
        grid: {
          color: "#e5e7eb",
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-medium text-gray-700 mb-4">{title}</h3>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
