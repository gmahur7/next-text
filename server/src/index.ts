import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
const app: Application = express();
import {Server} from 'socket.io'
import { createServer } from "http";
import { setupSocket } from "./socket.js";
const PORT = process.env.PORT || 7000;

const server = createServer(app)
const io = new Server(server,{
  cors:{
    origin:'*'
  }
})

setupSocket(io);
export {io};


// * Middleware
app.use(cors({
  origin:'*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});

import authRoutes from './route/authRoutes.js'
app.use('/api/auth',authRoutes)

import chatGroupRoutes from './route/ChatGroupRoutes.js'
app.use('/api/chat-group',chatGroupRoutes)


import chatGroupUsersRoutes from './route/GroupChatUsersRoutes.js'
app.use('/api/chat-group-users',chatGroupUsersRoutes)

import chatsRoutes from './route/ChatsRoutes.js'
app.use('/api/chats',chatsRoutes)

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
