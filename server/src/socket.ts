import { Server,Socket } from "socket.io";
import prisma from "./config/db.config.js";

interface CustomeSocket extends Socket {
    room?:string 
}


export function setupSocket(io:Server){

    io.use((socket:CustomeSocket,next)=>{
        const room = socket.handshake.auth.room || socket.handshake.headers.room
        if(!room){
            return next(new Error("Invalid Room"))
        }
        socket.room = room;
        next();
    })

    io.on("connection",(socket:CustomeSocket)=>{

        //join the room 
        socket.join(socket.room)
        console.log("Socket is connected: "+socket.id)

        socket.on("message",async (data)=>{
            console.log("server side message",data)
            await prisma.chats.create({
                data:data
            })
            socket.to(socket.room).emit("message",data)
        })

        socket.on("disconnect",()=>{
            console.log("User disconnected: "+socket.id)
        })
    })
}