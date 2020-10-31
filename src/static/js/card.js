
const click = (elem, func) => {
    func(elem);
}

const guess = (elem) => {
    if(guessOptions[elem.id] && guessing){
        actions.answerCharacter(socket, elem.id);
        guessCard();
        guesses -= 1;
        adjustGuesses(guesses);
        return;
    }
}

const discard = (elem) => {
    document.getElementById(elem.id).classList.add("discard");
    guessOptions[elem.id] = false;
}

const addCard = (elem) => {
    document.getElementById(elem.id).classList.remove("discard");
    guessOptions[elem.id] = true;
}