const loadActions = () => {
    return {
        answerCharacter,
        adjustGuesses
    }
}

const answerCharacter = (socket, characterId) => {
    return socket.emit('guess', characterId);
}

const adjustGuesses = (guessesLeft) => {
    document.getElementById("guesses").innerHTML = `${guessesLeft} guesses left`;
}