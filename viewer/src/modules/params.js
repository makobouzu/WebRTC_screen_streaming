import { io } from 'socket.io-client';

export default class Params {
    constructor() {
		this.socket = io();
		
        this.elem = document.getElementsByName("mode");
        this.elem.forEach(res => res.addEventListener("change", () => {
			this.socket.emit('params', {
                param: res.value
                            });
        }));
    }
};