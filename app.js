let sortNumbers = [];
let numberLimit = 10;
let secretNumber = toGenerateNumber();
let attemptCount = 1;

function showTextOnScreen(tag, text) {
    let area = document.querySelector(tag);
    area.innerHTML = text;
    responsiveVoice.speak(text, 'US English Male', {rate:1.2});
}

function initialText() {
    showTextOnScreen('h1', 'Secret Number Game');
    showTextOnScreen('p', 'Choose a number between 1 and 10');
}

initialText()

function verifyAttempt() {
    let attempt = document.querySelector('input').value;

    if (attempt == secretNumber) {
        showTextOnScreen('h1', `You're right!`)
        let attemptWord = attempt > 1 ? 'attempts' : 'attempt';
        let attemptMessage = ` You discovered the secret number with ${attemptCount} ${attemptWord}!`
        showTextOnScreen('p', attemptMessage);
        document.getElementById('restart').removeAttribute('disabled');
        } else {
                if (attempt > secretNumber) {
                    showTextOnScreen('p', `the secret number is smaller than ${attempt}`)
                } else {
                    showTextOnScreen('p', `The secret number is greater than ${attempt}`)
                }
                attemptCount++
                cleanText();
        }
};

function toGenerateNumber() {
    let chooseNumber = parseInt(Math.random() * numberLimit + 1);
    let listLength = sortNumbers.length;

    if (listLength == numberLimit) {
        sortNumbers = []
    }
    if (sortNumbers.includes(chooseNumber)) {  //verify if the number is in the list
    return toGenerateNumber(); //recursion 
    } else {
        sortNumbers.push(chooseNumber);
        return chooseNumber; 
    }
}

function cleanText() {
    attempt = document.querySelector('input');
    attempt.value='';
}

function restartGame() {
    secretNumber = toGenerateNumber();
    cleanText();
    attemptCount = 1;
    initialText();
    document.getElementById('restart').setAttribute('disabled', true);
}
