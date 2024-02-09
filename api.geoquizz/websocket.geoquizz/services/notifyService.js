import WebSocket from 'ws';

const clients = new Set();
let wss;

export function initializeWebSocketServer(server) {
    wss = new WebSocket.Server({ server });

    wss.on('connection', (socket) => {
        clients.add(socket);
        console.log('Nouvelle connexion WebSocket');

        socket.on('close', () => {
            clients.delete(socket);
            console.log('Connexion WebSocket fermée');
        });
    });
}

export function notifyGameCreation(gameData) {
    if (!wss) {
        console.error('Le serveur WebSocket n\'est pas initialisé.');
        return;
    }

    const message = JSON.stringify({ type: 'game_created', data: gameData });
    console.log(message)
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}
