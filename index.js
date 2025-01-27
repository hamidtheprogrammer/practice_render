const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

app.use(express.static("client"));

const users = new Set();

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("join", (username) => {
    users.add(username);

    io.emit("userJoined", username);

    io.emit("userList", Array.from(users));
  });
  socket.on("send-message", (message) => {
    console.log(message);
  });

  socket.on("typing", () => {
    io.emit("typing", "someone is typing..");
    console.log("typing");
  });
});

server.listen(3000, () => {
  console.log("server up");
});
