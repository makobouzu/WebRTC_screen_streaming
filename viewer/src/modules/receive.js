import { io } from 'socket.io-client';

export default class Receive {
    constructor() {
		this.socket = io();
		
        this.select_num = document.getElementById('js-select-num');
        this.mode_num   = document.getElementById('mode-num');
        this.trigger    = document.getElementById('change-num');
        this.view     = document.getElementById('view');
        this.human    = document.getElementById('human');
        this.car      = document.getElementById('car');
        this.bird     = document.getElementById('bird');
        this.socket.connect().on("selectNum", (data) => {
            let num = data.user;
            this.select_num.innerHTML = num;
            this.trigger.click();
            let index = data.param;
            if(index === 0){
                this.view.checked = true;
            }else if(index === 1){
                this.human.checked = true;
            }else if(index === 2){
                this.car.checked = true;
            }else if(index === 3){
                this.bird.checked = true;
            }
            this.mode_num.innerHTML = index;
        });

        this.ui       = document.getElementById("js-ui");
        this.targetUi = document.getElementById("target-ui").radio;
        this.socket.connect().on("mode", (data) => {
            let index = data.value;
            if(index === 0){
                this.view.checked = true;
            }else if(index === 1){
                this.human.checked = true;
            }else if(index === 2){
                this.car.checked = true;
            }else if(index === 3){
                this.bird.checked = true;
            }

            for(var i = 0; i < this.targetUi.length; ++i){
                if(!this.targetUi[i].checked){
                    const containers = document.getElementsByClassName("input-container");
                    containers[i].style.opacity = "0.2";
                }
            }
            this.ui.style.pointerEvents = "none";
            this.mode_num.innerHTML = index;
        });

        this.socket.connect().on("delay", (data) => {
            for(var i = 0; i < this.targetUi.length; ++i){
                const containers = document.getElementsByClassName("input-container");
                containers[i].style.opacity = "1.0";
                if(this.targetUi[i].checked){
                    const container = document.getElementsByClassName("input-container");
                    container[i].style.transform = "scale(0.9, 0.9)";
                }
            }
            this.ui.style.pointerEvents = "auto";
        });
    }
};