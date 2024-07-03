import "../App.css";

export default function EntryKeys({ setRegisters }) {
  function entryKey(e) {
    const keyPressed = e.target.id;
    switch (keyPressed) {
      case "ENTER":
        setRegisters((currentRegisters) => {
          const newStack = [...currentRegisters.stack];
          if (currentRegisters.input) {
            let formattedNumber = currentRegisters.input;
            let exponent = currentRegisters.expDisplay;
            if (exponent) {
              exponent = exponent[0] === "-" ? exponent : "+" + exponent;
              formattedNumber += "e" + exponent;
            }
            newStack.unshift(formattedNumber);
          }
          return {
            ...currentRegisters,
            input: "",
            expDisplay: "",
            stack: newStack,
            arcFlag: false,
          };
        });
        break;
      case "CH S":
        setRegisters((currentRegisters) => {
          let newInput = currentRegisters.input;
          let newExp = currentRegisters.expDisplay;
          const newStack = [...currentRegisters.stack];

          if (newExp) {
            newExp[0] === "-"
              ? (newExp = newExp.slice(1))
              : (newExp = "-" + newExp);
          } else if (newInput) {
            newInput[0] === "-"
              ? (newInput = newInput.slice(1))
              : (newInput = "-" + newInput);
          } else {
            newStack[0][0] === "-"
              ? (newStack[0] = newStack[0].slice(1))
              : (newStack[0] = "-" + newStack[0]);
          }
          return {
            ...currentRegisters,
            input: newInput,
            stack: newStack,
            expDisplay: newExp,
          };
        });
        break;
      case "E EX":
        setRegisters((currentRegisters) => {
          if (currentRegisters.input && !currentRegisters.expDisplay) {
            return {
              ...currentRegisters,
              expDisplay: "0",
            };
          } else {
            return currentRegisters;
          }
        });
        break;
      case "CL X":
        setRegisters((currentRegisters) => {
          return { ...currentRegisters, input: "", expDisplay: "" };
        });
        break;
    }
  }

  return (
    <ul className="entryKeys">
      <button className="enterButton" id="ENTER" key="ENTER" onClick={entryKey}>
        ENTER{"\u2191"}
      </button>
      {["CH S", "E EX", "CL X"].map((key) => {
        return (
          <button className="miscButton" id={key} key={key} onClick={entryKey}>
            {key}
          </button>
        );
      })}
    </ul>
  );
}
