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
    localPort: 54000,
    metadata: true
});

udpPort.open();

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('params', obj => {
        console.log('/param' + ': ' + obj.param);
        udpPort.send({
            address: "/param",
            args: [
                {
                    type: "i",
                    value: obj.param
                }
            ]
            }, "127.0.0.1", 54001);
    });

    socket.on('trigger', obj => {
        udpPort.send({
            address: "/trigger",
            args: [
                {
                    type: "s",
                    value: obj.trigger
                }
            ]
            }, "127.0.0.1", 54001);
    });
    
    udpPort.on("message", function (oscMsg, timeTag, info) {
        if(oscMsg.address === "/select"){
            let index = oscMsg.args[0].value;
            socket.emit('selectNum', { value : index } );
        }
        if(oscMsg.address === "/mode"){
            let index = oscMsg.args[0].value;
            socket.emit('mode', { value : index } );
        }
    });
});


http.listen(process.env.PORT || 9000, "0.0.0.0", () => {
    console.log('http://localhost:' + process.env.PORT + ' or 9000')
});
