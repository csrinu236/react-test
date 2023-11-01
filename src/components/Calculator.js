import React, { useEffect, useState } from "react";
import "./Calculator.css";

import { useFocusable, FocusContext } from "@noriginmedia/norigin-spatial-navigation";
import Button from "./Button";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const { ref, focusKey, focusSelf } = useFocusable();

  const handleButtonClick = (value) => {
    try {
      if (value === "=") {
        // setResult(eval(expression));
        // process.env.NODE_ENV === 'development' && setResult(eval(expression));
      } else if (value === "C") {
        setExpression("");
        setResult("");
      } else {
        setExpression(expression + value);
      }
    } catch (error) {
      setResult("Error");
    }
  };

  useEffect(() => {
    focusSelf();
    // alternatively
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="calculator">
        <div className="display">
          <div className="expression">{expression}</div>
          <div className="result">{result}</div>
        </div>
        <div className="buttons">
          <Button handleButtonClick={handleButtonClick}>7</Button>
          <Button handleButtonClick={handleButtonClick}>8</Button>
          <Button handleButtonClick={handleButtonClick}>9</Button>
          <Button handleButtonClick={handleButtonClick}>/</Button>

          <Button handleButtonClick={handleButtonClick}>4</Button>
          <Button handleButtonClick={handleButtonClick}>5</Button>
          <Button handleButtonClick={handleButtonClick}>6</Button>
          <Button handleButtonClick={handleButtonClick}>*</Button>

          <Button handleButtonClick={handleButtonClick}>1</Button>
          <Button handleButtonClick={handleButtonClick}>2</Button>
          <Button handleButtonClick={handleButtonClick}>3</Button>
          <Button handleButtonClick={handleButtonClick}>-</Button>

          <Button handleButtonClick={handleButtonClick}>0</Button>
          <Button handleButtonClick={handleButtonClick}>.</Button>
          <Button handleButtonClick={handleButtonClick}>=</Button>
          <Button handleButtonClick={handleButtonClick}>+</Button>

          <Button handleButtonClick={handleButtonClick}>C</Button>
        </div>
      </div>
    </FocusContext.Provider>
  );
};

export default Calculator;
