import { io } from 'socket.io-client';

export default class Receive {
    constructor() {
		this.socket = io();
		
        this.select_num = document.getElementById('js-select-num');
        this.socket.connect().on("selectNum", (data) => {
            let index = data.value;
            this.select_num.innerHTML = String(index) + "人";
        });

        this.target = document.getElementById('target');
        this.elem   = target.label;
        this.socket.connect().on("mode", (data) => {
            let index = data.value;
            this.target.mode[index].checked = true;
        });
    }
};