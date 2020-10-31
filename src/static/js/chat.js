var chatMessages = document.getElementById("messages");

const manageChat = () => {
    console.log("Under construction")
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
    const msg = document.getElementById("text-msg-content").nodeValue;
    addMessage(msg);
    socket.emit('chat message', msg);
}