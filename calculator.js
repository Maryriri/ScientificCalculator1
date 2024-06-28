const enOperationType = {
    Add: 1,
    Sub: 2,
    Mult: 3,
    Div: 4,
    Exp: 5,
    Sqrt: 6,
    Sin: 7,
    Cos: 8,
    Tan: 9,
    Log10: 10,
    Ln: 11,
    ExpFunc: 12,
    Fact: 13
  };
  
  class ScientificCalculatorData {
    constructor() {
      this.Number1 = 0;
      this.Number2 = 0;
      this.OperationType = 0;
      this.Result = 0;
    }
  }
  
  function GetOpTypeSymbol(OpType) {
    switch (OpType) {
      case enOperationType.Add: return "+";
      case enOperationType.Sub: return "-";
      case enOperationType.Mult: return "x";
      case enOperationType.Div: return "/";
      case enOperationType.Exp: return "^";
      case enOperationType.Sqrt: return "√";
      case enOperationType.Sin: return "sin";
      case enOperationType.Cos: return "cos";
      case enOperationType.Tan: return "tan";
      case enOperationType.Log10: return "log10";
      case enOperationType.Ln: return "ln";
      case enOperationType.ExpFunc: return "e^x";
      case enOperationType.Fact: return "!";
      default: return "Unknown";
    }
  }
  
  function ReadOpType() {
    const OpType = parseInt(document.getElementById("operationType").value);
    return OpType;
  }
  
  function ReadNumber(elementId) {
    return parseFloat(document.getElementById(elementId).value);
  }
  
  function performCalculation() {
    const OperationType = ReadOpType();
    let scientificCalculatorData = new ScientificCalculatorData();
    scientificCalculatorData.OperationType = OperationType;
  
    switch (OperationType) {
      case enOperationType.Add:
      case enOperationType.Sub:
      case enOperationType.Mult:
      case enOperationType.Div:
      case enOperationType.Exp:
        scientificCalculatorData.Number1 = ReadNumber("number1");
        scientificCalculatorData.Number2 = ReadNumber("number2");
        break;
      case enOperationType.Sqrt:
      case enOperationType.Sin:
      case enOperationType.Cos:
      case enOperationType.Tan:
      case enOperationType.Log10:
      case enOperationType.Ln:
      case enOperationType.ExpFunc:
        scientificCalculatorData.Number1 = ReadNumber("number1");
        break;
      case enOperationType.Fact:
        scientificCalculatorData.Number1 = parseInt(ReadNumber("number1"));
        break;
      default:
        console.error("Unknown operation type");
        return;
    }
  
    switch (OperationType) {
      case enOperationType.Add:
        scientificCalculatorData.Result = scientificCalculatorData.Number1 + scientificCalculatorData.Number2;
        break;
      case enOperationType.Sub:
        scientificCalculatorData.Result = scientificCalculatorData.Number1 - scientificCalculatorData.Number2;
        break;
      case enOperationType.Mult:
        scientificCalculatorData.Result = scientificCalculatorData.Number1 * scientificCalculatorData.Number2;
        break;
      case enOperationType.Div:
        if (scientificCalculatorData.Number2 !== 0) {
          scientificCalculatorData.Result = scientificCalculatorData.Number1 / scientificCalculatorData.Number2;
        } else {
          console.error("Error: Division by zero");
          scientificCalculatorData.Result = 0;
        }
        break;
      case enOperationType.Exp:
        scientificCalculatorData.Result = Math.pow(scientificCalculatorData.Number1, scientificCalculatorData.Number2);
        break;
      case enOperationType.Sqrt:
        scientificCalculatorData.Result = Math.sqrt(scientificCalculatorData.Number1);
        break;
      case enOperationType.Sin:
        scientificCalculatorData.Result = Math.sin(scientificCalculatorData.Number1);
        break;
      case enOperationType.Cos:
        scientificCalculatorData.Result = Math.cos(scientificCalculatorData.Number1);
        break;
      case enOperationType.Tan:
        scientificCalculatorData.Result = Math.tan(scientificCalculatorData.Number1);
        break;
      case enOperationType.Log10:
        scientificCalculatorData.Result = Math.log10(scientificCalculatorData.Number1);
        break;
      case enOperationType.Ln:
        scientificCalculatorData.Result = Math.log(scientificCalculatorData.Number1);
        break;
      case enOperationType.ExpFunc:
        scientificCalculatorData.Result = Math.exp(scientificCalculatorData.Number1);
        break;
      case enOperationType.Fact:
        if (scientificCalculatorData.Number1 < 0 || !Number.isInteger(scientificCalculatorData.Number1)) {
          console.error("Error: Factorial of a negative or non-integer number doesn't exist");
          scientificCalculatorData.Result = 0;
        } else {
          let factorial = 1;
          for (let i = 1; i <= scientificCalculatorData.Number1; ++i) {
            factorial *= i;
          }
          scientificCalculatorData.Result = factorial;
        }
        break;
      default:
        console.error("Unknown operation type");
        scientificCalculatorData.Result = 0;
        break;
    }
  
    PrintResult(scientificCalculatorData);
  }
  
  function PrintResult(scientificCalculatorData) {
    let resultText = `${scientificCalculatorData.Number1}`;
    if (scientificCalculatorData.OperationType !== enOperationType.Sqrt &&
      scientificCalculatorData.OperationType !== enOperationType.Sin &&
      scientificCalculatorData.OperationType !== enOperationType.Cos &&
      scientificCalculatorData.OperationType !== enOperationType.Tan &&
      scientificCalculatorData.OperationType !== enOperationType.Log10 &&
      scientificCalculatorData.OperationType !== enOperationType.Ln &&
      scientificCalculatorData.OperationType !== enOperationType.ExpFunc &&
      scientificCalculatorData.OperationType !== enOperationType.Fact) {
      resultText += ` ${GetOpTypeSymbol(scientificCalculatorData.OperationType)} ${scientificCalculatorData.Number2}`;
    } else {
      resultText += ` ${GetOpTypeSymbol(scientificCalculatorData.OperationType)}`;
    }
    resultText += ` = ${scientificCalculatorData.Result}`;
    document.getElementById("result").innerText = resultText;
  }
  
  document.getElementById("operationType").addEventListener("change", function () {
    const OperationType = ReadOpType();
    const number2Field = document.getElementById("number2");
    if (
      OperationType === enOperationType.Sqrt ||
      OperationType === enOperationType.Sin ||
      OperationType === enOperationType.Cos ||
      OperationType === enOperationType.Tan ||
      OperationType === enOperationType.Log10 ||
      OperationType === enOperationType.Ln ||
      OperationType === enOperationType.ExpFunc ||
      OperationType === enOperationType.Fact
    ) {
      number2Field.style.display = "none";
    } else {
      number2Field.style.display = "inline";
    }
  });
  
  