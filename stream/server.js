const express = require('express');
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http);
const osc = require("osc");

// require
const Peer = require('skyway-js');

require('dotenv').config();

app.use(express.static('public'));
app.use(express.json());


// setup osc
const udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 55000,
    metadata: true
});

udpPort.open();

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('trigger', obj => {
        udpPort.send({
            address: "/trigger",
            args: [
                {
                    type: "s",
                    value: obj.trigger
                }
            ]
            }, "127.0.0.1", 54002);
    });

    socket.on('roomInfo', obj => {
        console.log('/' + obj.name + ': ' + obj.num);
        udpPort.send({
            address: "/" + obj.name,
            args: [
                {
                    type: "i",
                    value: obj.num
                }
            ]
            }, "127.0.0.1", 54002);
    });
});

http.listen(process.env.PORT || 8000, "0.0.0.0", () => {
    console.log('http://localhost:' + process.env.PORT +  ' or 8000');
});
