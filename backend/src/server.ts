import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { connectDB } from "./config/db";
import registerPollSocket from "./sockets/poll.socket";

const PORT = 5000;

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

registerPollSocket(io);

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
