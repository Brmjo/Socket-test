const express = require('express');
const path = require('path');
const app = express();
const { Server } = require('socket.io');
const http = require('http');

const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));

const lobbyServer = io.of("/lobby");

let onlineCount = 0;
let rooms = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'home.html'));
});

app.get('/lobby/:username', (req, res) => {
    const data = { username: req.params.username };
    res.render('lobby', data);
});

app.post('/room/create', (req, res) => {
    
});

lobbyServer.on('connection', (socket) => {
    console.log("A user connected to lobby server: " + socket.id)
    onlineCount++;
    lobbyServer.emit('someoneConnected', { onlineCount: onlineCount });
    
    socket.on("message", (data) => {
        console.log("A user sent a global message: " + data.message);
        lobbyServer.emit("globalMessage", { message: data.message });
    })
    
    socket.on('disconnect', () => {
        onlineCount--;
        console.log("A user disconnected from lobby server.");
        lobbyServer.emit('someoneDisconnected', { onlineCount: onlineCount });
    })
});

httpServer.listen('3000', () => {
    console.log("Server is running...");
})