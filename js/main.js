var i=0;
var track = [];
var title = [];
var playlist = [];
var background = [];
var song_menu = "";

var body = document.getElementById('container');
var vol = document.getElementById('vol-bar');
var music = document.getElementById("music");
var aud_title = document.getElementById("aud-title");
var opt_container = document.getElementById("opt-container");
var option = document.getElementById("option");
var error = document.getElementById("error");

for(var i=0;i<tracks.length; i++){
    track[i]=tracks[i]["url"];
    title[i]=tracks[i]["name"];
    background[i]=tracks[i]["img"];
}

for(var i=0;i<tracks.length; i++){
    playlist[i]=i;
}

playlist=shuffle(playlist);

music.setAttribute("src", track[playlist[0]]);
aud_title.innerHTML=title[playlist[0]];
body.style.background="url('"+background[playlist[0]]+"') no-repeat";

music.onended = function(){
    playNext();
};

setInterval(
    function(){
        var curTime = music.currentTime;
        var bufTime = music.buffered;
        if(bufTime.length>0){
            console.log(curTime+" | "+bufTime.end(0))
            if((bufTime.end(0)-curTime)>=3){
                loader.style.display="none";
            }else{
                loader.style.display="block";
            }
        }else{
            loader.style.display="block";
        }
    }, 1000
);



for(var i=0;i<track.length; i++){
    song_menu +="<li><a href=\"javascript:addTrack("+i+")\">"+tracks[i]["name"]+"</a></li>";
}
document.getElementById("song-list").innerHTML=song_menu;
document.body.onkeyup = function player(e){    
    if(e.keyCode == 32){
        if(i==0){
            playSound();
            i=1;
       }
        else{
            pauseSound();
            i=0;
        }
    }

    if(e.keyCode == 38){
        if(music.volume<=0.9){
            music.volume+=0.1;
            setBar();
        }else if(music.volume > 0.9){
            music.volume=1;
            setBar();
        }
    }

    if(e.keyCode == 40){
        if(music.volume>=0.1){
            music.volume-=0.1;
            setBar();
        }else if(music.volume<0.1){
            music.volume=0;
            setBar();
        }
    }

    if(e.keyCode == 77){
        if(music.muted == true){
            music.muted = false;
        }else{
            music.muted = true;
        }
    }
    
    if(e.keyCode == 78){
        playNext();
    }
    
    if(e.keyCode == 66){
        playPrev();
    }
    
    if(e.keyCode == 27){
        hideOption();
        closeList();
        hideError();
    }
}

function playSound(){
    console.log("playSound init");
    var playPromise = music.play();
    if (playPromise !== undefined) {
        console.log("inside playSound 'if'");
        playPromise.then(function() {
            console.log("inside playSound promise-then");
        }).catch(function(err) {
            console.log("inside playSound promise-catch | error - "+err.name);        
            showError(err);
            setTimeout(hideError, 5000);
            if(err.name!="AbortError")
                playNext();
        });
    }
    console.log("after playSound if");
    document.getElementById("play").style.display="none";
    document.getElementById("pause").style.display="inline";
}

function playNext(){
    console.log("playNext init");
    var f = playlist.shift();
    playlist[playlist.length] = f;
    console.log("Next: "+playlist);
    addTrack(playlist[0]);
}

function playPrev(){
    console.log("playPrev init");
    var f = playlist.pop();
    playlist.unshift(f);
    console.log("Prev: "+playlist);
    addTrack(playlist[0]);
}

function addTrack(n){
    console.log("addTrack init");
    body.style.background="url('"+background[n]+"') no-repeat";
    music.src=track[n];
    aud_title.innerHTML=title[n];
    playSound();
}

function setVolume(){
    music.volume = vol.value;
}

function setBar(){
    vol.value = music.volume;
}

function pauseSound(){
    console.log("pauseSound init");
    music.pause();
    document.getElementById("play").style.display="inline";
    document.getElementById("pause").style.display="none";
}

function showList(){
    document.getElementById("aud-list").style.left="0%";
    document.getElementById("show-list").style.display="none";
}

function closeList(){
    document.getElementById("aud-list").style.left="-20%";
    document.getElementById("show-list").style.display="block";
}

function showOption(){
    opt_container.style.display="block";
    option.style.top="50%";
}

function hideOption(){
    opt_container.style.display="none";
    option.style.top="1000%";
}

function showError(err){
    console.log("showError init");
    if(err.name!="AbortError"){
        error.innerHTML=err;
        opt_container.style.display="block";
        error.style.top="50%";
    }
}

function hideError(){
    console.log("hideError init");
    opt_container.style.display="none";
    error.style.top="1000%";
}

/*

Shuffle algo source & credit: https://stackoverflow.com/a/12646864/
Using Durstenfeld shuffle algorithm

*/

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
