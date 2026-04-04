import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";

function App() {
  const { darkMode } = useContext(AppContext);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-pink-900 dark:bg-blue-900 text-black dark:text-white min-h-screen">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;