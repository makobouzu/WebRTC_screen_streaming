import { io } from 'socket.io-client';

export default class Room {
    constructor() {
		this.socket = io();

        this.trigger = document.getElementById("change-time");
        this.trigger.addEventListener('click', () => {
            this.socket.emit('trigger', {
                trigger: "load"
            });
        });
    }
};