import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
dotenv.config();
import express from "express";


const PORT = parseInt(`${process.env.PORT || 6577}`);

const app = express();

const server = http.createServer(app);



const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:3000",
        "https://app-frontend-qrcodebar.onrender.com",
        "https://contabel-software.vercel.app",
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization, token"],
    },
  });

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  export { io }