import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

const onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({
      username,
      socketId,
    });
};

const removeUser = (socketId) => {
  onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  console.log("someone has connected!");
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
    // console.log(onlineUsers);
  });
  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    // console.log("receiver", receiver);
    socket.to(receiver.socketId).emit("getNotification", {
      senderName,
      type,
    });
  });

  socket.on("disconnect", () => {
    console.log("someone has left");
    removeUser(socket.id);
  });
});

io.listen(5000);
