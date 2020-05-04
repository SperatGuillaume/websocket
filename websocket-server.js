const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: process.env.WS_PORT });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
      wss.broadcast(message);
    });
    console.log('connection established');
    ws.send(JSON.stringify(
        {
            user: 'server',
            message: 'Welcome'
        }
    ));

    ws.on('close', function close() {
        console.log('cient disconnected');
        ws.send('stopped');
    });
    ws.on('error', (error) => {
        console.log(error);
    });
});

wss.broadcast = function broadcast(msg) {
    wss.clients.forEach(function each(client) {
        client.send(msg);
     });
 };

wss.on('close', () => {
    console.log('server disconnected');
});

wss.on('error', (error) => {
    console.log(error);
});