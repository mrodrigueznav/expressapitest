require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http'); // Required to create an HTTP server
const { Server } = require('socket.io'); // Import socket.io
const logger = require('./config/logger');

const userRoutes = require('./routes/userRoutes');

const app = express();
const server = http.createServer(app); // Wrap Express app with HTTP server
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust to your frontend's URL in production
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/usuarios', userRoutes);

// WebSocket setup
io.on('connection', (socket) => {
  logger.info(`Nuevo cliente conectado: ${socket.id}`);

  // Listen for incoming messages
  socket.on('sendMessage', (message) => {
    logger.info(`Mensaje recibido: ${message.text} de ${message.sender}`);

    // Broadcast the message to all connected clients
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    logger.info(`Cliente desconectado: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;

// Start the server with WebSocket support
server.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
