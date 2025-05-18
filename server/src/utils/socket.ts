// utils/socket.ts
import { Server } from "socket.io";

let io: Server | null = null;

export const setSocketIO = (socketIO: Server) => {
  io = socketIO;
};

export const getSocketIO = () => io;
