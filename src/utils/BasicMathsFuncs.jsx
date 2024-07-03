export function basicOperators(currentRegisters, keyPressed) {
  const newStack = [...currentRegisters.stack];

  let firstOperand = "";
  let secondOperand = "";
  if (currentRegisters.input) {
    secondOperand = currentRegisters.input;
  } else {
    secondOperand = newStack.shift();
  }
  firstOperand = newStack.shift();
  if (!firstOperand) {
    firstOperand = secondOperand; // HP-35 shortcut :)
  }

  const result = String(eval(firstOperand + keyPressed + secondOperand));
  newStack.unshift(result);

  return { ...currentRegisters, stack: newStack, input: "", arcFlag: false };
}
