import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
const app=express();
const server=http.createServer(app);
const io=new Server(server,{ cors: { origin: "*" } });

io.on("connection",(socket)=>{
console.log(`user connected and having ${socket.id}`);

socket.on("message",(msg)=>{
  console.log(`message received from frontend is : ${msg}`);
  io.emit("sending messsgage to all clients",msg);
})
socket.on("disconnect",()=>{
  console.log(`user dissconnectes having ${socket.id}`);
  socket.broadcast.emit("userLeft", `User ${socket.id} has left.`);
})
socket.on("joinroom",(roomname)=>{
  socket.join(roomname);
  console.log(`user joined room ${roomname} with ${socket.id}`);
  io.to(roomname).emit(`user joined ${roomname} room with ${socket.id}`);
})
socket.on("leaveroom",(roomname)=>{
  socket.join(roomname);
  console.log(`user leave room ${roomname} with ${socket.id}`);
  io.to(roomname).emit(`user leave room ${roomname}  with ${socket.id}`);
})
socket.on("message",({roomname,msg})=>{
  console.log(`user sent message to  ${roomname} with ${socket.id} having ${msg}`);
  io.to(roomname).emit(`user sent message to  ${roomname} with ${socket.id} having ${msg}`);
})
})


server.listen(3000, () => {
  console.log("Server is running on port 3000");
});