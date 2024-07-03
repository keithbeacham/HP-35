export function powerFunction(setRegisters) {
  setRegisters((currentRegisters) => {
    const newStack = [...currentRegisters.stack];

    let firstOperand = "";
    if (currentRegisters.input) {
      firstOperand = currentRegisters.input;
    } else {
      firstOperand = newStack.shift();
    }
    const secondOperand = newStack.shift();

    const x = firstOperand ? Number(firstOperand) : 0;
    const y = secondOperand ? Number(secondOperand) : 0;

    const result = String(Math.pow(x, y));

    newStack.unshift(result);
    return { ...currentRegisters, stack: newStack, input: "", arcFlag: false };
  });
}

export function clearAllFunction(setRegisters) {
  setRegisters({
    input: "",
    expDisplay: "",
    stack: [],
    memory: "",
    arcFlag: false,
  });
}

export function swapRegistersFunction(setRegisters) {
  setRegisters((currentRegisters) => {
    const newStack = [...currentRegisters.stack];

    let firstOperand = "";
    let secondOperand = "";
    if (currentRegisters.input) {
      firstOperand = currentRegisters.input;
    } else {
      firstOperand = newStack.shift();
    }
    secondOperand = firstOperand;
    firstOperand = newStack.shift();

    newStack.unshift(secondOperand);
    newStack.unshift(firstOperand);

    return { ...currentRegisters, stack: newStack, input: "", arcFlag: false };
  });
}

export function rollRegistersFunction(setRegisters) {
  setRegisters((currentRegisters) => {
    const newStack = [...currentRegisters.stack];

    const newInput = newStack.shift();
    newStack.push(currentRegisters.input);

    return {
      ...currentRegisters,
      stack: newStack,
      input: newInput,
      arcFlag: false,
    };
  });
}

export function memStoreFunction(setRegisters) {
  setRegisters((currentRegisters) => {
    const newStack = [...currentRegisters.stack];
    let memory = "0";

    if (currentRegisters.input) {
      newStack.unshift(currentRegisters.input);
    }
    if (newStack.length > 0) {
      memory = newStack[0];
    }

    return {
      ...currentRegisters,
      memory,
      input: "",
      stack: newStack,
      arcFlag: false,
    };
  });
}

export function memRecallFunction(setRegisters) {
  setRegisters((currentRegisters) => {
    const newStack = [...currentRegisters.stack];

    if (currentRegisters.memory) {
      newStack.unshift(currentRegisters.memory);
    }

    return { ...currentRegisters, stack: newStack, arcFlag: false };
  });
}

export function singleOperandFunction(setRegisters, func) {
  setRegisters((currentRegisters) => {
    const newStack = [...currentRegisters.stack];
    let operand = 0;
    let result = "";

    if (currentRegisters.input) {
      operand = Number(currentRegisters.input);
    } else {
      operand = Number(newStack.shift());
    }
    if (!operand) {
      operand = 0;
    }
    switch (func) {
      case "LOG":
        result = String(Math.log10(operand));
        break;
      case "LN":
        result = String(Math.log(operand));
        break;
      case "e^x":
        result = String(Math.exp(operand));
        break;
      case "SQRT":
        result = String(Math.sqrt(operand));
        break;
      case "1/x":
        result = String(1 / operand);
        break;
    }
    newStack.unshift(result);

    return { ...currentRegisters, stack: newStack, input: "", arcFlag: false };
  });
}

export function trigFunction(setRegisters, trigFunction) {
  setRegisters((currentRegisters) => {
    const newStack = [...currentRegisters.stack];
    let operand = 0;
    let result = "";

    if (currentRegisters.input) {
      operand = Number(currentRegisters.input);
    } else {
      operand = Number(newStack.shift());
    }
    if (!operand) {
      operand = 0;
    }
    switch (trigFunction) {
      case "SIN":
        if (currentRegisters.arcFlag) {
          result = String((Math.asin(operand) * 180) / Math.PI);
        } else {
          result = String(Math.sin((operand * Math.PI) / 180));
        }
        break;
      case "COS":
        if (currentRegisters.arcFlag) {
          result = String((Math.acos(operand) * 180) / Math.PI);
        } else {
          result = String(Math.cos((operand * Math.PI) / 180));
        }
        break;
      case "TAN":
        if (currentRegisters.arcFlag) {
          result = String((Math.atan(operand) * 180) / Math.PI);
        } else {
          result = String(Math.tan((operand * Math.PI) / 180));
        }
        break;
    }
    newStack.unshift(result);

    return { ...currentRegisters, stack: newStack, input: "", arcFlag: false };
  });
}
