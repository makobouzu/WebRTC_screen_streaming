const Peer = window.Peer;

(async function main() {
    const localVideo = document.getElementById('js-local-stream');
    const joinTrigger = document.getElementById('js-join-trigger');
    const leaveTrigger = document.getElementById('js-leave-trigger');
    const roomId = document.getElementById('js-room-id');
    const roomMembers   = document.getElementById('js-room-members');
    const changeTiming  = document.getElementById('change-time');

    const localStream = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: true,
    }).catch(console.error);

  // Screen sharing render
    localVideo.muted = true;
    localVideo.srcObject = localStream;
    localVideo.playsInline = true;
    localVideo.style.width = '100%';
    localVideo.style.height = 'auto';
    await localVideo.play().catch(console.error);

  // peer
    const peer = (window.peer = new Peer({
        key: "f58f7416-420e-434a-8c09-c68dcd4fe84e"
    }));

  // Register join Room
    joinTrigger.addEventListener('click', () => {
        console.log("ENTER: " + roomId.value);
        if (!peer.open) {
            return;
        }

        const room = peer.joinRoom(roomId.value, {
            mode: 'sfu',
            stream: localStream,
        });

        room.on('peerJoin', peerId => {
            console.log(`=== ${peerId} joined ===\n`);
            console.log("PEER_NUM : " + String(room.members.length) + "人");
            console.log(room.members);
            roomMembers.innerHTML = room.name + " " + room.members.length;
            changeTiming.click();
        });

        room.on('peerLeave', peerId => {
            console.log(`=== ${peerId} left ===\n`);
            console.log("PEER_NUM : " + String(room.members.length) + "人");
            console.log(room.members);
            roomMembers.innerHTML = room.name + " " + room.members.length;
            changeTiming.click();
        });

        leaveTrigger.addEventListener('click', () => {
            console.log("LEAVE: " + roomId.value);
            room.close();
        }, { once: true });
    });

    peer.on('error', console.error);
})();