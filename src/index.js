const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/static'));

const http = require('http').createServer(app);
const io = require('socket.io')(http);

let roomName = "room1";

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/static/index.html")
});

io.on('connection', (socket) => {
    startGame(socket)
    sendRightCharacter();

    socket.on('guess', (id) => {
        guess(socket, id);
    });

    socket.on('restart', (id) => {
        startGame(socket, id);
        sendRightCharacter();
    });

    socket.on('disconnect', () => {
        socket.broadcast.to(socket.roomName).emit('game', {
            msg: `PLAYER ${socket.id} DISCONNECTED. YOU WIN`,
            type: "sucess"
        });
    });

    socket.on('chat message', (msg) => {
        socket.broadcast.to(socket.roomName).emit('chat message', msg);
    });

    socket.emit('connection', socket.id);
});

const startGame = (socket) => {
    
    socket.join(roomName);
    socket.roomName = roomName;
    
    socket.rightAnswer = Math.floor(Math.random() * 15);
    socket.lifes = 3;
}

const sendRightCharacter = () => {

    const clients = io.sockets.adapter.rooms[roomName].sockets;
    const ids = Object.keys(clients);
    const sockets = io.sockets.sockets;

    if(ids.length >= 2){
        roomName = uuidv4();
        const player1 = sockets[ids[0]];
        const player2 = sockets[ids[1]];

        player1.emit('char', player2.rightAnswer);
        player2.emit('char', player1.rightAnswer);
    }
}

const guess = (socket, id) => {
    if(socket.rightAnswer == id) return io.to(socket.roomName).emit('game', {
        msg: `PLAYER ${socket.id} GUESSED THE RIGHT CHARACTER`,
        type: "sucess"
    });
        
    socket.lifes -= 1;
    if(socket.lifes <= 0) return io.to(socket.roomName).emit('game', {
        msg: `PLAYER ${socket.id} WENT OUT OF GUESSES. PLAYER ${socket.id} LOST`,
        type: "error"
    });

    return io.to(socket.roomName).emit('game', {
        msg: `PLAYER ${socket.id} TRIED TO GUESS`,
        type: "warning"
    });
}

http.listen(process.env.PORT || 2089, process.env.YOUR_HOST || '0.0.0.0', () => {
    console.log("listening on localhost:2089");
});
