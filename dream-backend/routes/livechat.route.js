const express = require('express');
const router = express.Router();
const WebSocket = require('ws');

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(parsedMessage));
            }
        });
    });
});

router.get('/', (req, res) => {
    res.status(200).json({ message: "LiveChat API is under construction" });
});

module.exports = { router, wss };
