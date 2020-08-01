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
    if (y === 0) {
        console.log('detected');
        return "Error: Division by Zero.";
    }
    return x / y;
}

function operate(operator, x, y) {

    let result = 0;
    switch (operator) {

        case '+':
            result = add(x, y);
            break;

        case '-':
            result = subtract(x, y);
            break;

        case '*':
            result = multiply(x, y);
            break;

        case '/':
            result = divide(x, y);
            break;
    }
    return result;
}

function runCalculator() {

    let storageDisplay = document.getElementById('storage-display');
    let currentDisplay = document.getElementById('current-display');
    let calcButtons = document.querySelectorAll('.calc-button');
    let opButtons = document.querySelectorAll('.op-button');
    let leftOperandPresent = false;
    let operatorPresent = false;
    let resultPresent = false;
    let decimalPresent = false;

    calcButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            
            if (resultPresent) {
                currentDisplay.textContent = "";
                storageDisplay.textContent = "";
                leftOperandPresent = false;
                operatorPresent = false;
                resultPresent = false;
            }
                let input = e.target.textContent;
                if (input === '.') {
                    if (!decimalPresent) {
                        currentDisplay.textContent += input;
                        decimalPresent = true;
                    }
                }
                else {
                    currentDisplay.textContent += input;
                    leftOperandPresent = true;
                }
        });
    });


    // TODO: Evaluate the expression when an operator is pressed while there is already an operator in the display (without having to hit the equals button)
    opButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            if (leftOperandPresent && !operatorPresent) {
                resultPresent = false;
                operatorPresent = true;
                let input = e.target.textContent;
                currentDisplay.textContent += input;
                storageDisplay.textContent = currentDisplay.textContent;
                currentDisplay.textContent = "";
                leftOperandPresent = false;
            }
        });
    });

    let equalsButton = document.getElementById('equals');
    equalsButton.addEventListener('click', () => {
        if (leftOperandPresent && operatorPresent) {
            let operator = storageDisplay.textContent.slice(storageDisplay.textContent.length - 1);
            let leftOperand = Number(storageDisplay.textContent.slice(0, storageDisplay.textContent.length - 1));
            let rightOperand = Number(currentDisplay.textContent);
            let result = operate(operator, leftOperand, rightOperand);
            storageDisplay.textContent += currentDisplay.textContent;
            if (result % 1 != 0 && Number(result) == result) {
                result = result.toFixed(5);
            }
            currentDisplay.textContent = result;
            if (result === "Error: Division by Zero."){
                leftOperandPresent = false;
            }
            else {
                leftOperandPresent = true;
            }
            operatorPresent = false;
            resultPresent = true;
        }
    });

    let clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', () => {
        currentDisplay.textContent = "";
        storageDisplay.textContent = "";
        leftOperandPresent = false;
        operatorPresent = false;
        resultPresent = false;
    })

    let deleteButton = document.getElementById('delete');
    deleteButton.addEventListener('click', () => {
        if (!resultPresent) {
            currentDisplay.textContent = currentDisplay.textContent.slice(0, currentDisplay.textContent.length - 1);
        }
    });

    let percentButton = document.getElementById('percentage');
    percentButton.addEventListener('click', () => {
        if (leftOperandPresent && !operatorPresent) {
            currentDisplay.textContent = (Number(currentDisplay.textContent) * 0.01);
        }
        resultPresent = true;
    });

    let signButton = document.getElementById('sign');
    signButton.addEventListener('click', () => {
        console.log(typeof(currentDisplay.textContent[0]));
        if (!resultPresent && leftOperandPresent && currentDisplay.textContent[0] !== '-') {
            currentDisplay.textContent = '-' + currentDisplay.textContent;
        }
        else if (!resultPresent && leftOperandPresent && currentDisplay.textContent[0] === '-'){
            currentDisplay.textContent = currentDisplay.textContent.slice(1);
        }
    });
}

runCalculator();