import { Server } from "socket.io";
const io = new Server(7000, {
  cors: {
    origin: "http://localhost:5173",
  },
});
let users = [];
const addUser = (userData, socketId) => {
  !users.some((user) => user.sub === userData.sub) &&
    users.push({ ...userData, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.sub === userId);
};
io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("addUser", (userData) => {
    addUser(userData, socket.id);
    io.emit("getUsers", users);
  });
  //send message
  socket.on("sendMessage", (data) => {
    const user = getUser(data.receiverId);
    if (user && user.socketId) {
      io.to(user.socketId).emit("getMessage", data);
    } else {
      console.log("User not found or missing socketId");
      // Handle the error or log it appropriately
    }
  });
  //disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
