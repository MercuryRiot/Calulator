const displayElement = document.querySelector('.display');
let currentValue = '';
let previousValue = '';
let currentOperator = '';

function updateDisplay(value) {
  displayElement.textContent = value;
}

function clearDisplay() {
  currentValue = '';
  previousValue = '';
  currentOperator = '';
  updateDisplay('0');
}

function handleNumberClick(event) {
  const buttonValue = event.target.dataset.value;
  currentValue += buttonValue;
  updateDisplay(currentValue);
}

function handleOperatorClick(event) {
  if (currentValue) {
    previousValue = currentValue;
    currentOperator = event.target.dataset.operator;
    currentValue = '';
  }
}

function handleDecimalClick() {
  if (!currentValue.includes('.')) {
    currentValue += '.';
    updateDisplay(currentValue);
  }
}

function handleEqualClick() {
  if (currentValue && previousValue && currentOperator) {
    const result = operate(previousValue, currentOperator, currentValue);
    updateDisplay(result);
    previousValue = result;
    currentValue = '';
    currentOperator = '';
  }
}

function operate(a, operator, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      return NaN;
  }
}

const buttons = document.querySelectorAll('.buttons button');

buttons.forEach(button => {
  if (button.dataset.value) {
    button.addEventListener('click', handleNumberClick);
  } else if (button.dataset.operator) {
    button.addEventListener('click', handleOperatorClick);
  } else if (button.dataset.action === 'clear') {
    button.addEventListener('click', clearDisplay);
  } else if (button.dataset.action === 'decimal') {
    button.addEventListener('click', handleDecimalClick);
  } else if (button.dataset.action === 'equal') {
    button.addEventListener('click', handleEqualClick);
  }
});

// Enable basic keyboard functionality (optional)

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (key >= '0' && key <= '9') {
    handleNumberClick({ target: { dataset: { value: key } } });
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    handleOperatorClick({ target: { dataset: { operator: key } } });
  } else if (key === '.') {
    handleDecimalClick();
  } else if (key === 'Enter' || key === '=') {
    handleEqualClick();
  } else if (key === 'Backspace') {
    currentValue = currentValue.slice(0, -1);
    updateDisplay(currentValue);
  }
});
