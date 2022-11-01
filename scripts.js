const operators = ['+', '-', 'x', '/'];
const equal = ['='];
const decimal = ['.'];
let memory = [];
let display = document.getElementById('screen');
let calculatedNumber = 0;
let equalSign = false;
let isDecimal = false;
display.textContent = 0;

function add(a, b) {
    return (a + b);
}

function subtract(a, b) {
    return (a - b);
}

function multiply(a, b) {
    return (a * b);
}

function divide(a, b) {
    return (a / b);
}

function operate(a, string, b) {
    switch (string) {
        case '+': case 'addition':
            return add(a, b);
        case '-': case 'subtraction':
            return subtract(a, b);
        case 'x': case 'multiplication':
            return multiply(a, b);
        case '/': case 'division':
            return divide(a, b);
    }
}

function clearDisplay() {
    equalSign = false;
    isDecimal = false;
    memory = [];
    display.textContent = 0;
}

function truncate(number) {
    if (number < 1000000000) {        
        let string = number.toString();
        if (string.length > 11) return +string.slice(0, 11);
        else return string;
    }
    else {
        let string = number.toExponential().toString().split('e');
        string[0] = string[0].slice(0, 11 - string[1].length - 1);
        string = string.join('e');
        return (+string).toExponential();
    }
}

function operatorButton (buttonSelected) {
    equalSign = false;
    isDecimal = false;
    if (operators.includes(memory[memory.length - 1])) {
        memory[memory.length - 1] = buttonSelected;
    }
    else {
        if (memory.length > 2) {
            calculatedNumber = operate(+memory[memory.length - 3], memory[memory.length - 2], +memory[memory.length - 1]);
            if (calculatedNumber === NaN || calculatedNumber === Infinity || calculatedNumber === -Infinity || calculatedNumber === undefined) {
                display.textContent = 'ERROR';
            }
            else {
                memory.push(calculatedNumber);
                memory.push(buttonSelected);
                calculatedNumber = truncate(calculatedNumber);
                display.textContent = calculatedNumber;
            }
        }
        else {
            memory.push(buttonSelected);
        }
    }
}

function equalButton () {
    if (operators.includes(memory[memory.length - 1])) {
        calculatedNumber = operate(+memory[memory.length - 2], memory[memory.length - 1], +memory[memory.length - 2]);
        if (calculatedNumber === NaN || calculatedNumber === Infinity || calculatedNumber === -Infinity || calculatedNumber === undefined) {
            display.textContent = 'ERROR';
        }
        else {
            memory = [];
            memory.push(calculatedNumber);
            calculatedNumber = truncate(calculatedNumber);
            display.textContent = calculatedNumber;
        }
        equalSign = true;
    }
    else if (memory.length > 2) {
        calculatedNumber = operate(+memory[memory.length - 3], memory[memory.length - 2], +memory[memory.length - 1]);
        if (calculatedNumber == NaN || calculatedNumber == Infinity || calculatedNumber == -Infinity || calculatedNumber == undefined) {
            display.textContent = 'ERROR';
        }
        else {
            memory = [];
            memory.push(calculatedNumber);
            calculatedNumber = truncate(calculatedNumber);
            display.textContent = calculatedNumber;
        }
        equalSign = true;
    }
}

function numberButton (buttonSelected) {
    if (operators.includes(memory[memory.length - 1]) || memory.length === 0) {
        memory.push(buttonSelected); 
        display.textContent = memory[memory.length - 1];
    }
    else {
        if (!equalSign) {
            if (display.textContent.length < 11) {
                memory[memory.length - 1] += buttonSelected; 
                display.textContent = memory[memory.length - 1];
            }
        }
        else {
            equalSign = false;
            memory = [];
            memory.push(buttonSelected);
            display.textContent = memory[memory.length - 1];
        }
    }
}

function decimalButton (buttonSelected) {
    if (!isDecimal && display.textContent.length < 11) {
        if (memory.length === 0 || operators.includes(memory[memory.length - 1])) {
            memory.push('0.');
            display.textContent = memory[memory.length - 1];
            isDecimal = true;
        }
        else {
            memory[memory.length - 1] += buttonSelected; 
            display.textContent = memory[memory.length - 1];
            isDecimal = true;
        }
    }
}

function evaluate(buttonSelected) {
    if (operators.includes(buttonSelected)) {
        operatorButton(buttonSelected);
    }
    else if (equal.includes(buttonSelected)) {
        equalButton();
    }
    else if (decimal.includes(buttonSelected)) {
        decimalButton(buttonSelected);
    }
    else {
        numberButton(buttonSelected)
    }
}

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.id === 'clear') {
            clearDisplay();
        }
        else {
            evaluate(e.target.id);
        }
    });
});