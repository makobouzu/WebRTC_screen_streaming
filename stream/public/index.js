const Peer = window.Peer;

(async function main() {
    const localVideo   = document.getElementById('js-local-stream');
    const joinTrigger  = document.getElementById('js-join-trigger');
    const leaveTrigger = document.getElementById('js-leave-trigger');
    const roomCheck    = document.getElementById('js-room-check');
    const roomId       = document.getElementById('js-room-id');
    const roomMembers  = document.getElementById('js-room-members');
    const changeTiming = document.getElementById('change-time');

    let audioSelect = document.getElementById('js-audio-source');
    let videoSelect = document.getElementById('js-video-source');
    const deviceButton = document.getElementById('js-input-device');

    navigator.mediaDevices.enumerateDevices().then(function(deviceInfos) {
        for (var i = 0; i !== deviceInfos.length; ++i) {
            let deviceInfo = deviceInfos[i];
            let option = document.createElement('option');
            option.value = deviceInfo.deviceId;
            if (deviceInfo.kind === 'audioinput') {
                option.text = deviceInfo.label;
                audioSelect.append(option);
            } else if (deviceInfo.kind === 'videoinput') {
                option.text = deviceInfo.label;
                videoSelect.append(option);
            }
        }
    });

    let localStream = null;
    deviceButton.addEventListener('click', ()=> {
        const streamAudio = audioSelect.options[audioSelect.selectedIndex].value;
        const streamVideo = videoSelect.options[videoSelect.selectedIndex].value;
        console.log(streamAudio);
        console.log(streamVideo);
        setupStream(streamAudio, streamVideo);
    });

    async function setupStream(streamAudio, streamVideo){
        localStream = await navigator.mediaDevices.getUserMedia({
            audio: {deviceId: {exact: streamAudio}},
            video: {deviceId: {exact: streamVideo}}
        }).catch(console.error);

        localVideo.muted = true;
        localVideo.srcObject = localStream;
        localVideo.playsInline = true;
        localVideo.style.width = '100%';
        localVideo.style.height = 'auto';
        await localVideo.play().catch(console.error);
    }


    // const localStream = await navigator.mediaDevices.getDisplayMedia({
    //     audio: true,
    //     video: true,
    // }).catch(console.error);

  // Screen sharing render
    // localVideo.muted = true;
    // localVideo.srcObject = localStream;
    // localVideo.playsInline = true;
    // localVideo.style.width = '100%';
    // localVideo.style.height = 'auto';
    // await localVideo.play().catch(console.error);

  // peer
    const peer = (window.peer = new Peer({
        key: "f58f7416-420e-434a-8c09-c68dcd4fe84e"
    }));

  // Register join Room
    joinTrigger.addEventListener('click', () => {
        console.log("ENTER: " + roomId.value + " room!");
        roomCheck.innerHTML = "ENTER: " + roomId.value;
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