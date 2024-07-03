import "../App.css";
import {
  clearAllFunction,
  memRecallFunction,
  memStoreFunction,
  powerFunction,
  rollRegistersFunction,
  singleOperandFunction,
  swapRegistersFunction,
  trigFunction,
} from "../utils/MathsFuncs";

export default function FunctionKeys({ setRegisters }) {
  function functionKey(e) {
    const keyPressed = e.target.id;
    switch (keyPressed) {
      case "x\u02B8":
        powerFunction(setRegisters);
        break;
      case "LOG":
        singleOperandFunction(setRegisters, "LOG");
        break;
      case "LN":
        singleOperandFunction(setRegisters, "LN");
        break;
      case "e\u02E3":
        singleOperandFunction(setRegisters, "e^x");
        break;
      case "CLR":
        clearAllFunction(setRegisters);
        break;
      case "\u221A": // square root
        singleOperandFunction(setRegisters, "SQRT");
        break;
      case "ARC":
        setRegisters((currentRegisters) => {
          return { ...currentRegisters, arcFlag: true };
        });
        break;
      case "SIN":
        trigFunction(setRegisters, "SIN");
        break;
      case "COS":
        trigFunction(setRegisters, "COS");
        break;
      case "TAN":
        trigFunction(setRegisters, "TAN");
        break;
      case "1/x":
        singleOperandFunction(setRegisters, "1/x");
        break;
      case "x\u2194y":
        swapRegistersFunction(setRegisters);
        break;
      case "R\u2193":
        rollRegistersFunction(setRegisters);
        break;
      case "STO":
        memStoreFunction(setRegisters);
        break;
      case "RCL":
        memRecallFunction(setRegisters);
        break;
    }
  }
  return (
    <ul className="functionKeys">
      {["x\u02B8", "LOG", "LN", "e\u02E3"].map((key) => {
        return (
          <button
            className="functionButton"
            id={key}
            key={key}
            onClick={functionKey}
          >
            {key}
          </button>
        );
      })}
      <button
        className="functionButton"
        style={{ backgroundColor: "#16acf2" }}
        id="CLR"
        key="CLR"
        onClick={functionKey}
      >
        CLR
      </button>
      {[
        "\u221A",
        "ARC",
        "SIN",
        "COS",
        "TAN",
        "1/x",
        "x\u2194y",
        "R\u2193",
        "STO",
        "RCL",
      ].map((key) => {
        return (
          <button
            className="functionButton"
            id={key}
            key={key}
            onClick={functionKey}
          >
            {key}
          </button>
        );
      })}
    </ul>
  );
}
