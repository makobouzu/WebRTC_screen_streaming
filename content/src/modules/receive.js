import { io } from 'socket.io-client';

export default class Receive {
    constructor() {
		this.socket = io();
		
        this.elem = document.getElementById( "target" );
        this.socket.connect().on("param", (data) => {
            let index = data.value;
            this.elem[index].click();
        });
    }
};