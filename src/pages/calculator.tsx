import React from "react";
import "../css/calculator.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CalForm from "../components/calForm";
import Result from "../components/result";

const Calculator: React.FC = () => {
  return (
    <div className="page-container d-flex justify-content-center align-items-center">
      <CalForm />
      <div className="separator"></div>
      <Result />
    </div>
  );
};

export default Calculator;
