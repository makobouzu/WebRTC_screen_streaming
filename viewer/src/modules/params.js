import { io } from 'socket.io-client';

export default class Params {
    constructor() {
		this.socket = io();
		
        this.human = document.getElementById('human-button');
        this.car   = document.getElementById('car-button');
        this.trigger = document.getElementById("change-time");
        this.human.addEventListener('click', () =>{
            this.socket.emit('params', {
                param: 0
            });
            this.trigger.click();
        });
        this.car.addEventListener('click', () =>{
            this.socket.emit('params', {
                param: 1
            });
            this.trigger.click();
        })
        // this.elem.forEach(res => res.addEventListener("change", () => {
		// 	this.socket.emit('params', {
        //         param: res.value
        //                     });
        // }));
    }
};