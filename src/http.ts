import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { Server } from 'socket.io';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

const httpServer = createServer(app);

const io = new Server(httpServer);

export { httpServer, io };
