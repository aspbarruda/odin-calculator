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

function operate(string, a, b) {
    switch (string) {
        case '+': case 'addition':
            return add(a, b);
        case '-': case 'subtraction':
            return subtract(a, b);
        case '*': case 'multiplication':
            return multiply(a, b);
        case '/': case 'division':
            return divide(a, b);
    }
}