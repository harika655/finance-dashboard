import { createContext, useState } from "react";
import { transactions as mockData } from "../data/mockData";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(mockData);
  const [role, setRole] = useState("viewer");
  const [darkMode, setDarkMode] = useState(false);

  return (
  <AppContext.Provider value={{
    transactions,
    setTransactions,
    role,
    setRole,
    darkMode,
    setDarkMode
    }}>
      {children}
    </AppContext.Provider>
  );
};