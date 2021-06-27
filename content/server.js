const express = require('express');
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http);
const osc = require("osc");

require('dotenv').config();

app.use(express.static('public'));
app.use(express.json());

// setup osc
const udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 56000,
    metadata: true
});

udpPort.open();

io.on('connection', (socket) => {
    console.log('user connected');
    udpPort.on("message", function (oscMsg, timeTag, info) {
        if(oscMsg.address === "/param"){
            let index = oscMsg.args[0].value;
            socket.emit('param', { value : index } );
        }
    });
});


http.listen(process.env.PORT || 7000, "0.0.0.0", () => {
    console.log('http://localhost:' + process.env.PORT + ' or 7000')
});
