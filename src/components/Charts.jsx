import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";


const Charts = () => {
  const { transactions } = useContext(AppContext);

  // 📈 Line chart data (by date)
  const lineData = transactions.map((t) => ({
    date: t.date,
    amount: t.amount,
  }));

  // 🥧 Pie chart data (expenses only)
  const expenseData = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => {
      const existing = acc.find((a) => a.name === curr.category);
      if (existing) {
        existing.value += curr.amount;
      } else {
        acc.push({ name: curr.category, value: curr.amount });
      }
      return acc;
    }, []);

  const COLORS = ["#3b82f6", "#10b981", "#f97316", "#ef4444"];
  const { darkMode } = useContext(AppContext);

  return (
    <div className="mt-6 grid md:grid-cols-2 gap-6">
      
      {/* 📈 Line Chart */}
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded shadow">
        <h2 className="font-bold mb-4">Trend</h2>
        <LineChart width={300} height={200} data={lineData}>
          <XAxis dataKey="date" stroke={darkMode ? "#fff" : "#000"} />
          <YAxis stroke={darkMode ? "#fff" : "#000"} />
          <Tooltip
          contentStyle={{
            backgroundColor: darkMode ? "#1f2937" : "#fff",
            color: darkMode ? "#fff" : "#000",
            }}
            />
          <Line
          type="monotone"
          dataKey="amount"
          stroke={darkMode ? "#4ade80" : "#8884d8"}
          />
        </LineChart>
      </div>

      {/* 🥧 Pie Chart */}
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded shadow">
        <h2 className="font-bold mb-4">Spending Breakdown</h2>
        <PieChart width={300} height={200}>
          <Pie
            data={expenseData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
          >
            {expenseData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
          contentStyle={{
            backgroundColor: darkMode ? "#1f2937" : "#fff",
            color: darkMode ? "#fff" : "#000",
            }}
            />
        </PieChart>
      </div>

    </div>
  );
};

export default Charts;