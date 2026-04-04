import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import TransactionTable from "../components/TransactionTable";
import RoleSwitcher from "../components/RoleSwitcher";
import Charts from "../components/Charts";
import Insights from "../components/Insights";
import { motion } from "framer-motion";
import DarkModeToggle from "../components/DarkModeToggle";
import { FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";



const Dashboard = () => {
  const { transactions } = useContext(AppContext);

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;
  return (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Finance Dashboard</h1>
    <DarkModeToggle />

    {/* Role */}
    <RoleSwitcher />

    {/* ONLY CARDS HERE */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.5 }}
      
      className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 shadow rounded transform hover:scale-105 transition duration-300"
      >
        <h2>Total Balance</h2>
        <p className="text-xl font-bold">₹{balance}</p>
      </motion.div>

      <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 shadow rounded transform hover:scale-105 transition duration-300"
      >
        <h2>Income</h2>
        <p className="text-xl font-bold">₹{income}</p>
      </motion.div>

      <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 shadow rounded transform hover:scale-105 transition duration-300"
      >
        <h2>Expenses</h2>
        <p className="text-xl font-bold">₹{expenses}</p>
      </motion.div>
    </div>

    {/* CHARTS BELOW (separate section) */}
    <div className="mt-6">
      <Charts />
    </div>

    {/* TABLE BELOW */}
    <Insights />
    <TransactionTable />
  </div>
);
}
export default Dashboard;