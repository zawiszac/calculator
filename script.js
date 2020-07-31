function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(operator, args) {

    let result;
    switch (operator) {

        case '+':
            result = add(x.y);
            break;

        case '-':
            result = subtract(x.y);
            break;

        case '*':
            result = multiply(x.y);
            break;

        case '/':
            result = divide(x.y);
            break;

        case 'DEL':
            break;
        
        case 'C':
            break;
        
        case '%':
            break;

        case '+/-':
            break;

        case '=':
            break;
    }

    return result;
}

function runCalculator() {

    let display = document.getElementById('display');
    let buttons = document.querySelectorAll('.calc-button');
    let displayContent = "";
    if (display.textContent !== undefined) displayContent = display.textContent;

    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            let input = e.textContent;
            displayContent += input;
            e.textContent = displayContent;
            console.log(displayContent);
        });          
    });
}

runCalculator();