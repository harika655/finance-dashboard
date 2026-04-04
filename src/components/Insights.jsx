import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Insights = () => {
  const { transactions } = useContext(AppContext);

  // Get expense transactions
  const expenses = transactions.filter(t => t.type === "expense");

  // Total expense
  const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0);

  // Find highest spending category
  const categoryMap = {};

  expenses.forEach(t => {
    categoryMap[t.category] =
      (categoryMap[t.category] || 0) + t.amount;
  });

  const highestCategory = Object.keys(categoryMap).reduce(
    (a, b) => (categoryMap[a] > categoryMap[b] ? a : b),
    Object.keys(categoryMap)[0]
  );

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Insights</h2>

      {expenses.length === 0 ? (
        <p>No expense data available</p>
      ) : (
        <div className="space-y-2">
          <p className="text-gray-800 dark:text-gray-300">
            Total Expenses:{totalExpense}
          </p>
          <p className="text-gray-800 dark:text-gray-300"> Highest Spending Category: {highestCategory}</p>
          <p className="text-gray-800 dark:text-gray-300"> You are spending more on {highestCategory}</p>
        </div>
      )}
    </div>
  );
};

export default Insights;