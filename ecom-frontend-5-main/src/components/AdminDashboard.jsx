import { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register components
ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [summary, setSummary] = useState({});
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9090/api/analytics/summary")
      .then((res) => setSummary(res.data))
      .catch((err) => console.error("Summary fetch error:", err));

    axios
      .get("http://localhost:9090/api/analytics/monthly-sales")
      .then((res) => setSalesData(res.data))
      .catch((err) => console.error("Sales data fetch error:", err));

    axios
      .get("http://localhost:9090/api/analytics/top-products")
      .then((res) => setTopProducts(res.data))
      .catch((err) => console.error("Top products fetch error:", err));
  }, []);

  // Line Chart Data for Monthly Sales
  const monthlySalesData = {
    labels: salesData.map((entry) => entry.monthName || `Month ${entry.month}`),
    datasets: [
      {
        label: "Monthly Sales ($)",
        data: salesData.map((entry) => entry.totalSales),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  };

  // Bar Chart Data for Top Products
  const topProductsData = {
    labels: topProducts.map((p) => p.productName),
    datasets: [
      {
        label: "Total Sold Quantity",
        data: topProducts.map((p) => p.totalQuantity),
        backgroundColor: "rgba(153,102,255,0.6)",
        borderColor: "rgba(153,102,255,1)",
        borderWidth: 1,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Monthly Sales Overview"
      }
    }
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Top Selling Products"
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📊 Admin Analytics Dashboard</h2>
      <div className="mb-4">
        <p><strong>Total Orders:</strong> {summary.orders}</p>
        <p><strong>Total Revenue:</strong> ${summary.revenue}</p>
        <p><strong>Total Products:</strong> {summary.products}</p>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", marginBottom: "40px" }}>
        <Line data={monthlySalesData} options={chartOptions} />
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Bar data={topProductsData} options={barOptions} />
      </div>
    </div>
  );
};

export default AdminDashboard;
