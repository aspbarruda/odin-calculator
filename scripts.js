const operators = ['+', '-', 'x', '/'];
let memory = [];
let display = document.getElementById('screen');
let calculatedNumber = 0;
let equalSign = false;
display.textContent = memory;

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
    memory = [];
    display.textContent = memory;
}

function truncate(number) {
    if (number < 1000000000) {        
        let string = number.toString();
        if (string.length > 9) return +string.slice(0, 9);
        else return string;
    }
    else {
        let string = number.toExponential().toString().split('e');
        string[0] = string[0].slice(0, 9 - string[1].length - 1);
        string = string.join('e');
        return (+string).toExponential();
    }
}

function addDisplay(buttonSelected) {
    if (operators.includes(buttonSelected)) {
        equalSign = false;
        if (operators.includes(memory[memory.length - 1])) {
            memory[memory.length - 1] = buttonSelected;
        }
        else {
            if (memory.length > 2) {
                calculatedNumber = operate(+memory[memory.length - 3], memory[memory.length - 2], +memory[memory.length - 1]);
                memory.push(calculatedNumber);
                memory.push(buttonSelected);
                calculatedNumber = truncate(calculatedNumber);
                display.textContent = calculatedNumber;
            }
            else {
                memory.push(buttonSelected);
            }
        }
    }
    else {
        if (operators.includes(memory[memory.length - 1]) || memory.length === 0) {
            memory.push(buttonSelected); 
            display.textContent = memory[memory.length - 1];
        }
        else {
            if (!equalSign) {
                if (display.textContent.length < 9) {
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
}

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.id === 'clear') {
            clearDisplay();
        }
        else if (e.target.id === '=') {
            if (operators.includes(memory[memory.length - 1])) {
                calculatedNumber = operate(+memory[memory.length - 2], memory[memory.length - 1], +memory[memory.length - 2]);
                memory = [];
                memory.push(calculatedNumber);
                calculatedNumber = truncate(calculatedNumber);
                display.textContent = calculatedNumber;
                equalSign = true;
            }
            else if (memory.length > 2) {
                calculatedNumber = operate(+memory[memory.length - 3], memory[memory.length - 2], +memory[memory.length - 1]);
                memory = [];
                memory.push(calculatedNumber);
                calculatedNumber = truncate(calculatedNumber);
                display.textContent = calculatedNumber;
                equalSign = true;
            }
        }
        else {
            addDisplay(e.target.id);
        }
    });
});