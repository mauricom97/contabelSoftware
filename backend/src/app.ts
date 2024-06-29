import "express-async-errors";
import express from "express";
import http from "http";
// import { Server } from "socket.io";
// import cors from "cors";
// import morgan from "morgan";
// import helmet from "helmet";
// import routes from "./routes";
import dotenv from "dotenv";
dotenv.config();
const PORT = parseInt(`${process.env.PORT || 4356}`);

const app = express();

const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: [
//       "http://localhost:3000",
//       "https://app-frontend-qrcodebar.onrender.com",
//       "https://contabel-software.vercel.app",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization, token"],
//   },
// });

// app.use(morgan("tiny"));
// app.use(cors());
// app.use(helmet());
// app.use(express.json());
// app.use(routes);

// io.on("connection", (socket) => {
//   console.log("A new user connected");
//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// export { io };
