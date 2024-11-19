import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function LogsChart() {
  const [logs, setLogs] = useState([]);
  const [chartData, setChartData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("daily");

  // Fetch attendance logs using the preload API
  useEffect(() => {
    async function fetchLogs() {
      try {
        const logsData = await window.api.getAttendanceLogs(); // Preload API call
        setLogs(logsData);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    }
    fetchLogs();
  }, []);

  // Function to generate random colors for different labs
  const generateRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`;
  };

  // Transform logs into datasets for each category
  useEffect(() => {
    if (logs.length > 0) {
      const categories = ["daily", "weekly", "monthly", "yearly"];
      const newChartData = {};

      categories.forEach((category) => {
        const categoryLogs = logs.filter((log) => log.period === category);
        const labels = categoryLogs.map((log) => log.lab || "Unknown");
        const data = categoryLogs.map((log) => log.total_attendance);

        newChartData[category] = {
          labels,
          datasets: [
            {
              label: `${category.charAt(0).toUpperCase() + category.slice(1)} Logs`,
              data,
              backgroundColor: categoryLogs.map(() => generateRandomColor()), // Generate unique colors for each lab
              borderColor: categoryLogs.map(() => "rgba(0, 0, 0, 1)"), // Border color for each bar
              borderWidth: 1,
            },
          ],
        };
      });

      setChartData(newChartData);
    }
  }, [logs]);

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,  // This will allow you to control the chart's size more easily
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Attendance Logs",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Labs",
        },
        // Adjust the width of each bar by changing the barPercentage and categoryPercentage
        barPercentage: 0.6,  // Smaller value reduces the bar width
        categoryPercentage: 0.8,  // Adjust space between categories
      },
      y: {
        title: {
          display: true,
          text: "Attendance Count",
        },
        // Adjust the y-axis scale if needed
        ticks: {
          beginAtZero: true, // Start from 0 to make the chart more readable
          stepSize: 1, // Set a custom step size for y-axis ticks
        },
      },
    },
  };

  return (
    <div className="bg-gray-100 w-7/10 h-1/2 rounded-lg bg-opacity-95 mt-2 shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-center mb-6">
        <h1 className="font-bold text-xl text-gray-800">Attendance Logs Overview</h1>
      </div>

      {/* Buttons to select the chart */}
      <div className="flex justify-center mb-6">
        {["daily", "weekly", "monthly", "yearly"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className="bg-blue-500 text-white px-4 py-2 rounded mx-2 hover:bg-blue-600"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)} Logs
          </button>
        ))}
      </div>

      {/* Displaying selected chart */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm overflow-hidden">
        <h2 className="font-semibold text-2xl text-gray-700 mb-4 capitalize">
          {selectedCategory} Logs
        </h2>
        {chartData[selectedCategory] ? (
          <div style={{ height: "300px", width: "100%" }}> {/* Adjusted chart height */}
            <Bar data={chartData[selectedCategory]} options={options} />
          </div>
        ) : (
          <p>Loading {selectedCategory} data...</p>
        )}
      </div>
    </div>
  );
}
