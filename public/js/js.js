var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '400',
        width: '400',
        videoId: 'u1zgFlCw8Aw',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    //event.target.playVideo();
    //event.target.seekTo(120, false);
    //console.log(player.getPlayerState())
    //setInterval(updatePlayerInfo, 250);
    //player.seekTo(20);
    player.loadVideoById('xC3Lccd9o_w', 120);
    //updatePlayerInfo();
}

var done = false;
function onPlayerStateChange(event) {
//console.log('aa');
//console.log(event.data);
//if (event.data == YT.PlayerState.PLAYING && !done) {
//setTimeout(stopVideo, 6000);
//done = true;
//}
//player.stopVideo();
}
var state = 0;
function updatePlayerInfo() {
    //console.log(player.getCurrentTime());
    
    if(player.getCurrentTime() > 25 && state == 0){
        state = 1;
        player.loadVideoById('EUrI4M0ISdo', 20);
        return;
    }
    
    if(player.getCurrentTime() > 25 && state == 1){
        state = 2;
        player.loadVideoById('xNHMVcOFH7s', 20);
        //http://www.youtube.com/watch?v=xNHMVcOFH7s&feature=g-vrec
        return;
    }
    
    if(player.getCurrentTime() > 25 && state == 2){
        state = 3;
        player.loadVideoById('8sPj0Ic8KQ8', 20);
        //http://www.youtube.com/watch?v=8sPj0Ic8KQ8&feature=g-vrec
        return;
    }
//$('#data').append(player.getCurrentTime());
//$('#data').text('ASD');
//document.getElementById('data').innerHTML = player.getCurrentTime();
//document.getElementById('data').innerHTML = 'player.getCurrentTime();';
}