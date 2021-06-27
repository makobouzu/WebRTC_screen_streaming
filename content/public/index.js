const unmuteButton_ = document.getElementById('unmuteButton');
const video_ = document.getElementById('video');
const check_ = document.getElementsByName('mode');
const videoSource_ = document.getElementById('video-source');

unmuteButton_.addEventListener('click', function() {
    unmuteButton_.style = "display: none;";
    video_.muted = false;
});

check_.forEach(function(e) {
    e.addEventListener("click", function() {  
        let   videoTime_ = video_.currentTime; 
        console.log(videoTime_);        
        console.log(e.value);
        if(e.value === "0"){
            videoSource_.src = src=`./movies/yolo.mp4#t=${videoTime_}`;
            video_.load();
            video_.play();
            unmuteButton_.click();
        }else if(e.value === "1"){
            videoSource_.src = src=`./movies/semaseg.mp4#t=${videoTime_}`;
            video_.load();
            video_.play();
            unmuteButton_.click();
        }
    });
});