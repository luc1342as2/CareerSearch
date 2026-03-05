import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] },
});

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
  socket.on('chat:message', (data) => {
    io.emit('chat:message', data);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`CareerSearch server running on http://localhost:${PORT}`);
});
