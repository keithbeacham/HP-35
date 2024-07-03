import "../App.css";

export default function Display({ registers }) {
  let plusMinus = "";
  let expSign = "";
  let exponential = "";

  let display = registers.input;
  if (!display) {
    if (registers.stack.length > 0) {
      display = registers.stack[0];
    } else {
      display = "0";
    }
  }
  if (display[0] === "-") {
    display = display.slice(1);
    plusMinus = "-";
  }

  if (display.includes("e")) {
    const indexOfE = display.indexOf("e");
    exponential = display.slice(indexOfE + 2);
    expSign = display.charAt(indexOfE + 1) === "-" ? "-" : "";
    display = display.substring(0, indexOfE);
  } else if (registers.expDisplay) {
    exponential = registers.expDisplay;
    if (exponential[0] === "-") {
      exponential = exponential.slice(1);
      expSign = "-";
    }
  }

  display = display.includes(".") ? display : display + ".";

  return (
    <div className="displayScreen">
      <div className="displaySign">{plusMinus}</div>
      <div className="displayNumber">{display}</div>
      <div className="displayExpSign">{expSign}</div>
      <div className="displayExponential">{exponential}</div>
    </div>
  );
}
