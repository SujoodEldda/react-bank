import logo from "./logo.svg";
import "./App.css";
import Operations from "./components/Operations";
import Transactions from "./components/Transactions";

function App() {
  return (
    <Router>
      <div className="App">
        <Operations />
      </div>
      <Routes>
        <Route path="/" element={<Transactions />} />
      </Routes>
    </Router>
  );
}

export default App;
