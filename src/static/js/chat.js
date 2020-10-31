var chatMessages = document.getElementById("messages");

const manageChat = () => {
    const children = chatMessages.children;
    
    if (children.length > 10) {
        children[0].remove();
    }
}

const addReceivedMessage = (msg) => {
    chatMessages.innerHTML += `<p class="msg-send msg-receive">${msg}</p>`;
    manageChat();
}

const addMessage = (msg) => {
    chatMessages.innerHTML += `<p class="msg-send">${msg}</p>`;
    manageChat();
}

const sendMessage = (socket) => {
    const textField = document.getElementById("text-msg-content");
    const msg = textField.value;
    textField.value = "";
    addMessage(msg);
    socket.emit('chat message', msg);
}