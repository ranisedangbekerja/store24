import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import itemRouter from "./routes/itemRoutes";

// Initialize the app
const app = express();

// DOTENV CONFIG
require("dotenv").config();

const allowedOrigins = ['http://localhost:3000'];

//adding socket.io configuration
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  }
});


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parse incoming JSON requests and make the data available in req.body

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps or Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'], // Allow only specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow only these headers
  credentials: true // Allow cookies to be sent
}));

// Define routes
app.get("/", (req, res) => {
  res.send("Store24 Backend Service!");
});

app.use("/api", itemRouter);


// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected');

  // Handle joining page
  socket.on('join-task', (itempage) => {
    socket.join(itempage);
    console.log(`Client joined task room: ${itempage}`);
  });

  // Handle leaving page
  socket.on('leave-task', (itempage) => {
    socket.leave(itempage);
    console.log(`Client left task room: ${itempage}`);
  });

  // Handle new items
  socket.on('item', (item) => {
    console.log('New item received:', item);
    // Broadcast the item to all clients in the page
    io.to(item.item_Id).emit('item', item);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
