//calculator values
let current = "0";
let stored = "";
let result = 0;
let symbol = "";

//display variables
const displayValueCurrent = document.getElementById("current");
const displayValueStored = document.getElementById("stored");
const displayValueResult = document.getElementById("result");
displayValueCurrent.textContent = current;

//control variables
let oneshot = false;
let ifRepeated = 0;

function keyBehavior(event) {
  const regNumbers = /[0-9]/g;
  if (this.id != "keyEqual" && ifRepeated == 1) {
    ifRepeated = 0;
    current = "";
    stored = "";
    result = "";
  }

  //regular numbers
  if (regNumbers.test(this.id)) {
    if ((current == 0 && current.length == 1) | (oneshot == true)) {
      current = this.id;
      oneshot = false;
      displayValueResult.textContent = "result: " + result;
    } else {
      current += this.id;
      displayValueResult.textContent = "result: " + result;
    }
  } else {
    // special keys (no second value stored)
    switch (this.id) {
      case "keyInvert":
        current *= -1;
        break;
      case "keyPower":
        current = Math.pow(current, 2);
        break;
      case "keyBackspace":
        current = current.substring(0, current.length - 1);
        break;
      case "keyDot":
        current += ".";
        break;
      case "keyClear":
        current = "";
        stored = "";
        result = "";
        break;
      //special keys (additional value stored)
      case "keyPlus":
        if (!stored.includes("+")) {
          symbol = "+";
          stored = current + symbol;
          oneshot = true;
          break;
        }
        break;
      case "keyMinus":
        if (!stored.includes("-")) {
          symbol = "-";
          stored = current + symbol;
          oneshot = true;
          break;
        }
      case "keyTimes":
        if (!stored.includes("*")) {
          symbol = "*";
          stored = current + symbol;
          oneshot = true;
          break;
        }
      case "keyDivide":
        if (!stored.includes("/")) {
          symbol = "/";
          stored = current + symbol;
          oneshot = true;
          break;
        }
        break;
      case "keyEqual":
        if (stored != "") {
          switch (symbol) {
            case "+":
              if (ifRepeated === 0) {
                result = parseFloat(stored) + parseFloat(current);
                ifRepeated = 1;
                break;
              } else {
                stored = result + symbol;
                result += parseFloat(current);
                break;
              }
            case "-":
              if (ifRepeated === 0) {
                result = parseFloat(stored) - parseFloat(current);
                ifRepeated = 1;
                break;
              } else {
                stored = result + symbol;

                result -= parseFloat(current);
                break;
              }
            case "*":
              if (ifRepeated === 0) {
                result = parseFloat(stored) * parseFloat(current);
                ifRepeated = 1;
                break;
              } else {
                stored = result + symbol;
                result *= parseFloat(current);
                break;
              }
            case "/":
              if (ifRepeated === 0) {
                result = parseFloat(stored) / parseFloat(current);
                ifRepeated = 1;
                break;
              } else {
                stored = result + symbol;
                result /= parseFloat(current);
                break;
              }
          }
        }
    }
  }
  if (current == "") {
    current = "0";
  }

  displayValueCurrent.textContent = current;
  displayValueStored.textContent = stored;
  displayValueResult.textContent = "result: " + result;
}

const keys = document.querySelectorAll(".key");

keys.forEach((a) => {
  a.addEventListener("click", keyBehavior);
});
