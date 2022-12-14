const operators = ['+', '-', 'x', '/'];
const equal = ['='];
const decimal = ['.'];
const specialOperators = ['sqrt', '+-', '%'];
const digits = ['0', '1', '2', '3', '4', '5' , '6', '7', '8', '9'];
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
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

function clearDisplay() {
    equalSign = false;
    isDecimal = false;
    memory = [];
    display.textContent = 0;
}

function undoCharacter() {
    if ((memory.length === 1 && memory[0] === '') || memory.length === 0) {
        display.textContent = 0;
    }
    else if (!operators.includes(memory[memory.length - 1]) && !equalSign) {
        let temp = memory[memory.length - 1].toString();
        memory[memory.length - 1] = temp.slice(0, temp.length - 1);
        display.textContent = truncate(memory[memory.length - 1]);
        if (memory.length === 1 && memory[0] === '') {
            display.textContent = 0;
        }
    }
}

function truncate(number) {
    if (Math.abs(number) < 100000000000) {        
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
        document.getElementById(memory[memory.length - 1]).classList.toggle('operator-active');
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
        document.getElementById(memory[memory.length - 2]).classList.toggle('operator-active');
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

function specialButton (buttonSelected) {
    if (buttonSelected === '+-') {
        if (!operators.includes(memory[memory.length - 1])) {
            memory[memory.length - 1] *= -1;
            let temp = truncate(memory[memory.length - 1])
            display.textContent = temp;
        }
        else {
            memory[memory.length - 2] *= -1;
            let temp = truncate(memory[memory.length - 2])
            display.textContent = temp;
        }
    }
    else if (buttonSelected === 'sqrt') {
        if (!operators.includes(memory[memory.length - 1])) {
            memory[memory.length - 1] = Math.sqrt(memory[memory.length - 1]);
            equalSign = true;
            if (memory[memory.length - 1].toString() == 'NaN') {
                display.textContent = 'ERROR';
                memory = [];
            }
            else {
                let temp = truncate(memory[memory.length - 1])
                display.textContent = temp;
            }
        }
        else {
            memory[memory.length - 2] = Math.sqrt(memory[memory.length - 2]);
            equalSign = true;
            if (memory[memory.length - 1].toString() == 'NaN') {
                display.textContent = 'ERROR';
                memory = [];
            }
            else {
            let temp = truncate(memory[memory.length - 2])
            display.textContent = temp;
            }
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
    else if (specialOperators.includes(buttonSelected)) {
        specialButton(buttonSelected);
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
        else if (e.target.id === 'undo') {
            undoCharacter();
        }
        else {
            if (operators.includes(e.target.id)) {
                if (document.getElementById('+').classList[1] === 'operator-active') {
                    document.getElementById('+').classList.toggle('operator-active');
                }
                else if (document.getElementById('-').classList[1] === 'operator-active') {
                    document.getElementById('-').classList.toggle('operator-active');
                }
                else if (document.getElementById('x').classList[1] === 'operator-active') {
                    document.getElementById('x').classList.toggle('operator-active');
                }
                else if (document.getElementById('/').classList[1] === 'operator-active') {
                    document.getElementById('/').classList.toggle('operator-active');
                }
                e.target.classList.toggle('operator-active');
            }
            evaluate(e.target.id);
        }
    });
});


window.addEventListener('keydown', (e) => {
    if (digits.includes(e.key) || decimal.includes(e.key) || specialOperators.includes(e.key) || equal.includes(e.key)) {
        evaluate(e.key);
    }
    else if (operators.includes(e.key)) {
        if (document.getElementById('+').classList[1] === 'operator-active') {
            document.getElementById('+').classList.toggle('operator-active');
        }
        else if (document.getElementById('-').classList[1] === 'operator-active') {
            document.getElementById('-').classList.toggle('operator-active');
        }
        else if (document.getElementById('x').classList[1] === 'operator-active') {
            document.getElementById('x').classList.toggle('operator-active');
        }
        else if (document.getElementById('/').classList[1] === 'operator-active') {
            document.getElementById('/').classList.toggle('operator-active');
        }
        document.getElementById(e.key).classList.toggle('operator-active');
        evaluate(e.key);
    }
    else if (e.key === '*' || e.key === 'X') {
        document.getElementById('x').classList.toggle('operator-active');
        evaluate('x');
    }
    else if (e.key === 'q' || e.key === 'Q') {
        evaluate('sqrt');
    }
    else if (e.key === 'Backspace') {
        undoCharacter();
    }
    else if (e.key === 'c' || e.key === 'C') {
        clearDisplay();
    }
    else if (e.key === 'm' || e.key === 'M') {
        evaluate('+-');
    }
    else if (e.key === 'Enter') {
        evaluate('=');
    }
    console.log(e.key);
})