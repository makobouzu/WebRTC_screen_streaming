import { io } from 'socket.io-client';

export default class Room {
    constructor() {
		this.socket = io();

        this.trigger = document.getElementById("change-time");
        this.elem    = document.getElementById("js-room-members");
        this.trigger.addEventListener('click', () => {
            const room_name = this.elem.textContent.split(' ')[0];
            const room_num  = this.elem.textContent.split(' ')[1];
            this.socket.emit('roomInfo', {
                name: room_name,
                num: room_num
            });

            this.socket.emit('trigger', {
                trigger: "load"
            });
        });
    }
};