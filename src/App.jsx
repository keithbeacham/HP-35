import { useState } from "react";
import "./App.css";
import Display from "./components/Display";
import FunctionKeys from "./components/FunctionKeys";
import NumericKeys from "./components/NumericKeys";
import EntryKeys from "./components/EntryKeys";

function App() {
  const [registers, setRegisters] = useState({
    input: "", //x register in HP
    expDisplay: "", //exponent during entry
    memory: "",
    stack: [], //y,z,t registers in HP
    arcFlag: false, //arc has been pushed
  });

  return (
    <>
      <h2 className="title">HP-35 Calculator</h2>
      <Display registers={registers} />
      <FunctionKeys setRegisters={setRegisters} />
      <EntryKeys setRegisters={setRegisters} />
      <NumericKeys setRegisters={setRegisters} />
    </>
  );
}

export default App;
