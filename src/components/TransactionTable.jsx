import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const TransactionTable = () => {
  const { transactions, role, setTransactions } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const filteredData = transactions.filter((t) => {
  const matchesSearch = t.category
    ?.toLowerCase()
    .includes(search.toLowerCase());

  const matchesFilter =
    filter === "all" || t.type === filter;

  return matchesSearch && matchesFilter;
});


  return (
    <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      {role === "admin" && (
        <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          const newTransaction = {
            id: Date.now(),
            date: "2026-04-05",
            amount: 100,
            category: "New",
            type: "expense",
          };
          setTransactions([...transactions, newTransaction]);
        }}
        >
          + Add Transaction
          </motion.button>
        )}

      {/* Search */}
      <input
      type="text"
      placeholder="Search by category..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border p-2 mb-4 w-full rounded bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300"
      />
      <select
      className="border p-2 mb-4 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Table */}
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>

        

<tbody>
  {filteredData.map((t) => (
    <motion.tr
      key={t.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="border-b"
    >
      <td>{t.date}</td>
      <td>{t.category}</td>
      <td>₹{t.amount}</td>
      <td
        className={
          t.type === "income"
            ? "text-green-600"
            : "text-red-600"
        }
      >
        {t.type}
      </td>
    </motion.tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default TransactionTable;