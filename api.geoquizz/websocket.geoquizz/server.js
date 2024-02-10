import { WebSocketServer } from "ws";
import {notifyGameCreation} from "./services/notifyService.js";

const wss = new WebSocketServer({ port: 3000 });
const clients = new Set();

wss.on('connection', (socket) => {
    clients.add(socket);
    console.log('Nouvelle connexion WebSocket');

    socket.on('close', () => {
        clients.delete(socket);
        console.log('Connexion WebSocket fermée');
    });
});

