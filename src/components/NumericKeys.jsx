import "../App.css";
import { basicOperators } from "../utils/BasicMathsFuncs";

export default function NumericKeys({ setRegisters }) {
  function operatorKey(e) {
    let keyPressed = e.target.id;
    setRegisters((currentRegisters) => {
      if (currentRegisters.stack.length < 1) {
        return currentRegisters;
      } else {
        switch (keyPressed) {
          case "+":
          case "-":
            break;
          case "x":
            keyPressed = "*";
            break;
          case "\u00F7":
            keyPressed = "/";
            break;
        }
      }
      return basicOperators(currentRegisters, keyPressed);
    });
  }

  function numericKey(e) {
    const keyPressed = e.target.id;
    setRegisters((currentRegisters) => {
      let newExp = "";
      let expIsNegative = false;
      if (currentRegisters.expDisplay) {
        newExp = currentRegisters.expDisplay;
        if (newExp[0] === "-") {
          expIsNegative = true;
          newExp = newExp.slice(1);
        }
        if (/[0-9]/.test(keyPressed) && newExp.length < 2) {
          newExp += keyPressed;
          if (newExp.startsWith("0")) {
            newExp = newExp.slice(1);
          }
        }
        if (expIsNegative) {
          newExp = "-" + newExp;
        }
        return { ...currentRegisters, expDisplay: newExp };
      }

      let newValue = currentRegisters.input;
      switch (keyPressed) {
        case "\u03C0":
          newValue = "3.141592654";
          break;
        case ".":
          newValue += newValue.includes(".") ? "" : ".";
          break;
        default:
          if (newValue === "0") {
            newValue = "";
          }
          newValue += keyPressed;
      }
      return { ...currentRegisters, input: newValue };
    });
  }

  return (
    <>
      <ul className="operatorKeys">
        {["-", "+", "x", "\u00F7"].map((key) => {
          return (
            <button
              className="operatorButton"
              id={key}
              key={key}
              onClick={operatorKey}
            >
              {key}
            </button>
          );
        })}
      </ul>
      <ul className="numericKeys">
        {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "\u03C0"].map(
          (key) => {
            return (
              <button
                className="numericButton"
                id={key}
                key={key}
                onClick={numericKey}
              >
                {key}
              </button>
            );
          }
        )}
      </ul>
    </>
  );
}
