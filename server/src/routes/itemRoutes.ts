import { addItem, readItem } from "../controllers/ItemControllers";
import { Router } from "express";
import { Server } from "socket.io";

const itemRouter = Router();

// Add a socket.io instance variable
let io: Server | null = null;

// Function to set the socket.io instance
export const setSocketIO = (socketIO: Server) => {
  io = socketIO;
};

// Export the io instance getter for the controllers
export const getSocketIO = () => io;

itemRouter.get("/task", readItem);
itemRouter.post("/task/add", addItem);

export default itemRouter;