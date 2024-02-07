import "./App.css";
import Operations from "./components/Operations";
import Transactions from "./components/Transactions";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BreakDown from "./components/BreakDown";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { useEffect, useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    fetch("http://localhost:3001/transaction/").then((result) => {
      result.json().then((result) => {
        let totalAmount = 0;
        for (let i = 0; i < result.length; i++) {
          totalAmount += result[i].amount;
        }
        setBalance(totalAmount);
      });
    });
  }, [balance]);

  const handleBalance = function (amount) {
    setBalance(balance + parseInt(amount));
  };
  return (
    <Router>
      <div className="App">
        <ResponsiveAppBar balance={balance} />
      </div>
      <Routes>
        <Route
          path="/"
          element={<Transactions handleBalance={handleBalance} />}
        />
        <Route
          path="/Operation"
          element={<Operations handleBalance={handleBalance} />}
        />
        <Route path="/Breakdown" element={<BreakDown />} />
      </Routes>
    </Router>
  );
}

export default App;
