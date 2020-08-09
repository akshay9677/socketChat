var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("broadcast message", () => {
    socket.broadcast.emit("broadcast message");
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    socket.emit("private message");
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
