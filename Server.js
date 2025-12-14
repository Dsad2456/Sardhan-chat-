const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

mongoose.connect(process.env.MONGO_URL);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

io.on("connection", socket => {

  socket.on("join", user => {
    socket.user = user;
    socket.broadcast.emit("status", { user, online: true });
  });

  socket.on("typing", user => {
    socket.broadcast.emit("typing", user);
  });

  socket.on("send", async data => {
    const msg = new Message(data);
    await msg.save();
    io.emit("receive", msg);
  });

  socket.on("disconnect", () => {
    if(socket.user)
      socket.broadcast.emit("status", { user: socket.user, online: false });
  });

});

server.listen(process.env.PORT || 3000);
