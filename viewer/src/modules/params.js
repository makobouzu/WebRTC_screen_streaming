import { io } from 'socket.io-client';

export default class Params {
    constructor() {
		this.socket = io();
		
        this.ui       = document.getElementById("js-ui");
        this.buffer   = document.getElementById("change-buffer");
        this.targetUi = document.getElementById("target-ui").radio;
        for(var i = 0; i < this.targetUi.length; ++i){
            this.targetUi[i].addEventListener('click', () =>{
                this.socket.emit('params', {
                            param: this.targetUi.value
                });
                this.buffer.click();
            });
        }
    }
};