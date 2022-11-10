
const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  //   console.log("connected");
  const id = socket.handshake.query.id;
  socket.join(id);
  console.log(id);
  socket.on("send-message", ({ recepients, text }) => {
    recepients.forEach((recepient) => {
      const newRecepients = recepients.filter((r) => r !== recepient);
      newRecepients.push(id);
      socket.broadcast.to(recepient).emit("receive-message", {
        recepients: newRecepients,
        sender: id,
        text,
      });
    });
  });
});
