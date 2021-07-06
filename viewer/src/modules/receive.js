import { io } from 'socket.io-client';

export default class Receive {
    constructor() {
		this.socket = io();
		
        this.select_num = document.getElementById('js-select-num');
        this.trigger    = document.getElementById('change-num');
        this.socket.connect().on("selectNum", (data) => {
            let index = data.value;
            this.select_num.innerHTML = index;
            this.trigger.click();
        });

        this.view = document.getElementById('view');
        this.human = document.getElementById('human');
        this.bird = document.getElementById('bird');
        this.car   = document.getElementById('car');
        this.socket.connect().on("mode", (data) => {
            let index = data.value;
            if(index === 0){
                this.human.click();
            }else if(index === 1){
                this.car.click();
            }
        });
    }
};