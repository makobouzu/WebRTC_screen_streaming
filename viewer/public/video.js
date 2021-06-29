const Peer = window.Peer;

window.addEventListener('load', (event) => {
    console.log('ページが完全に読み込まれました');
    const changeTiming = document.getElementById('change-time');
    const ui = document.getElementById('ui');

    changeTiming.click();
    ui.style.display = "none";
});

(async function main() {
    const remoteVideos  = document.getElementById('js-remote-streams');
    const selectButton  = document.getElementById('select');
    const ui = document.getElementById('ui');

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