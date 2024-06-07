import "./App.css";
import { SalaryCalculatorProvider } from "./context/salaryCalContext";
import Calculator from "./pages/calculator";

function App() {
  return (
    <SalaryCalculatorProvider>
      <div className="App">
        <Calculator />
      </div>
    </SalaryCalculatorProvider>
  );
}

export default App;
