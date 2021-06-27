import { io } from 'socket.io-client';

export default class Receive {
    constructor() {
		this.socket = io();
		
        this.select_num = document.getElementById('js-select-num');
        this.reject_num = document.getElementById('js-reject-num');
        this.socket.connect().on("selectNum", (data) => {
            let index = data.value;
            this.select_num.innerHTML = String(index) + "人";
        });
        this.socket.connect().on("rejectNum", (data) => {
            let index = data.value;
            this.reject_num.innerHTML = String(index) + "人";
        });
    }
};