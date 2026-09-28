const display = document.getElementById("display");
const box = document.querySelectorAll(".box");
let justCalculated = false;
let lastOperator = "";
let lastOperand = "";

box.forEach(function (box) {
  box.addEventListener("click", function () {
    const top = document.getElementById("top");
    if (box.textContent === "C") {
      display.value = "";
      top.textContent = "";
      justCalculated = false;
    } else if (box.textContent === "=") {
      if (justCalculated && lastOperator && lastOperand) {
        let answer = Number(display.value);
        let operand = Number(lastOperand);
        if (lastOperator === "+") {
          display.value = answer + operand;
        } else if (lastOperator === "-") {
          display.value = answer - operand;
        } else if (lastOperator === "x") {
          display.value = answer * operand;
        }
      } else {
        top.textContent = display.value;
        if (display.value.includes("+")) {
          lastOperator = "+";
        } else if (display.value.includes("-")) {
          lastOperator = "-";
        } else if (display.value.includes("÷")) {
          lastOperator = "÷";
        } else if (display.value.includes("x")) {
          lastOperator = "x";
        } else if (display.value.includes("%")) {
          lastOperator = "%";
        }
        lastOperand = display.value.split(lastOperator).pop();
        let expression = display.value
          .replace("^", "**")
          .replace(/x/g, "*")
          .replace(/÷/g, "/");

        try {
          top.textContent = display.value;
          display.value = eval(expression);
          justCalculated = true;
        } catch {
          display.value = " Syntax error";
          //justCalculated = true;
        }
      }
    } else if (box.textContent === "√") {
      display.value = Math.sqrt(Number(display.value));
    } else if (box.textContent === "%") {
      display.value = Number(display.value) / 100;
    } else if(box.textContent === "π") {
      display.value += Math.PI

    } else if(box.textContent === "Del") {
      display.value = display.value.slice(0, -1);
    } else {
      const operators = ["+", "-", "x", "÷", "π", "%", "^"];
      if (justCalculated) {
        if (operators.includes(box.textContent)) {
          display.value += box.textContent;
        } else {
          display.value = box.textContent;
        }
        justCalculated = false;
      } else {
        display.value += box.textContent;
      }
    }
  });
});
