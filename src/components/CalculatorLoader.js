import React, { useEffect, useState } from "react";
import "./Calculator.css";

const CalculatorLoader = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  return (
    <div className="calculator">
      <div className="display">
        <div className="expression">{expression}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons-loader">
        <div className="btn-loader"></div>
        <div className="btn-loader"></div>
        <div className="btn-loader"></div>
        <div className="btn-loader"></div>
        <div className="btn-loader"></div>
        <div className="btn-loader"></div>
        <div className="btn-loader"></div>
        <div className="btn-loader"></div>
        <div className="btn-loader"></div>
        <div className="btn-loader"></div>
        <div className="btn-loader"></div>
        <div className="btn-loader"></div>
        <div className="btn-loader"></div>
        <div className="btn-loader"></div>
        <div className="btn-loader"></div>
        <div className="btn-loader"></div>
        <div className="btn-loader"></div>
      </div>
    </div>
  );
};

export default CalculatorLoader;
