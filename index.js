const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

io.on("connection", (socket) => {
  console.log('User connected:', socket.id); // Log when a user connects
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    console.log('User disconnected:', socket.id); // Log when a user disconnects
    socket.broadcast.emit("call ended");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    console.log('Calling user:', userToCall, 'with signal data:', signalData); // Log call details
    io.to(userToCall).emit("calluser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    console.log('Answering call with signal data:', data.signal); // Log answer details
    io.to(data.to).emit("callaccepted", data.signal);
  });
});


server.listen(PORT, (err) => {
  if (err) {
    console.log("Error in listening to port", PORT);
  } else {
    console.log("Connected to port successfully\n", PORT, "is being used");
  }
});
