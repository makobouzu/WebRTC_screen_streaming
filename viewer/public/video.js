const Peer = window.Peer;

window.addEventListener('load', (event) => {
    console.log('ページが完全に読み込まれました');
    const changeTiming = document.getElementById('change-time');
    const modalButton  = document.getElementById('modal-button');
    const ui = document.getElementById('ui');

    changeTiming.click();
    ui.style.display = "none";
    modalButton.click();
});

(async function main() {
    const remoteVideos  = document.getElementById('js-remote-streams');
    const selectNum = document.getElementById('js-select-num');
    const container  = document.getElementById('human-num');
    const selectButton  = document.getElementById('select-button');
    const ui = document.getElementById('ui');
    const humanTag = document.getElementById('human-button');
    const carTag = document.getElementById('car-button');
    const changeNum = document.getElementById('change-num');

    humanTag.addEventListener('click', () => {
        console.log("humantag click!!")
        carTag.style.background = "";
        carTag.style.color = "";
        carTag.style.pointerEvents = "";
        humanTag.style.background  = "white";
        humanTag.style.color = "#cd8484";
        humanTag.style.pointerEvents = "none";
    });
    carTag.addEventListener('click', () => {
        console.log("cartag click!!")
        humanTag.style.background = "";
        humanTag.style.color = "";
        humanTag.style.pointerEvents = "";
        carTag.style.background  = "white";
        carTag.style.color = "#cd8484";
        carTag.style.pointerEvents = "none";
    });

    // document.body.addEventListener('click', ()=>{
    //     console.log('click!')
    // });

    changeNum.addEventListener('click', () =>{
        let index = selectNum.innerHTML;
        while(container.firstChild){
            container.removeChild(container.firstChild);
        }
        for(let i = 0; i < index; ++i){
            const child = document.createElement("i");
            child.id = "human-button";
            child.className = "material-icons human-tag";
            const child_icon = document.createElement("i");
            child_icon.className = "fas fa-male";
            child.appendChild(child_icon);
            container.appendChild(child);
        }
    });

  // peer
    const peer = (window.peer = new Peer({
        key: "f58f7416-420e-434a-8c09-c68dcd4fe84e"
    }));

    selectButton.addEventListener('click', () => {
        ui.style.display = "block";

        if (!peer.open) {
            return;
        }

        const room = peer.joinRoom('select', {
            mode: 'sfu'
        });

        room.once('open', () => {
            console.log('=== You joined "SELECTION" ===\n');
        });
        room.on('peerJoin', peerId => {
            console.log(`=== ${peerId} joined "SELECTION" ===\n`);
        });

    // Render remote stream for new peer join in the room
        room.on('stream', async stream => {
            const newVideo = document.createElement('video');
            newVideo.style.width = '100%';
            newVideo.style.height = 'auto';
            newVideo.srcObject = stream;
            newVideo.playsInline = true;
            newVideo.setAttribute('data-peer-id', stream.peerId);
            if(remoteVideos.childElementCount = 1){
                remoteVideos.innerHTML = '';
            }
            remoteVideos.append(newVideo);
            await newVideo.play().catch(console.error);
        });

    // for closing room members
        room.on('peerLeave', peerId => {
            console.log(`=== ${peerId} left "SELECTION" ===\n`);
        });

        room.on('close', () => {
            console.log(`=== You left "SELECTION" ===`);
        });
    });

  peer.on('error', console.error);
})();