const express = require("express");
const socket = require("socket.io");

const app = express();
const server = app.listen(8000, () => {
    console.log("Listening on 3000");
});

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server);
io.on("connection", (socket) => {
    console.log('Socket runing by ' + socket.id);

    socket.on("isTyping", (data) => {
        socket.broadcast.emit("isTyping", data);
    });
    
    socket.on("chat", (data) => {
        io.sockets.emit("chat", data);
    });

    socket.on('disconnect', () => { console.log(socket.id + ' disconnected'); });

});