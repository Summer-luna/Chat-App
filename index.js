const express = require("express");
const cors = require("cors");
const session = require("express-session");
const authRouter = require("./router/authRouter.js");
const chatRouter = require("./router/chatRouter.js");
const { Server } = require("socket.io");
const http = require("http");
const chatService = require("./services/chatService");
const path = require("path");

const app = express();
const port = 8080;
const server = http.createServer(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));
}

//console.log(process.env.CLIENT_URL);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

// let server process cookies and tokens
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

// routers
app.use(authRouter);
app.use(chatRouter);

app.get("/", (req, res) => {
  res.send("home");
});

io.on("connection", async (socket) => {
  console.log("a user connected.");

  // listen to "sendMessage" event
  socket.on("sendMessage", async (data) => {
    socket.broadcast.emit("receive_message", data);

    try {
      const newMessage = {
        user_id: data.user.id,
        message_content: data.message,
      };
      const res = await chatService.saveMessage(newMessage);
    } catch (err) {
      console.log(err);
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

server.listen(port, () => {
  console.log(`Running on port ${port}`);
});
