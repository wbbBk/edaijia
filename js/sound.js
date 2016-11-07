function play(path,callback,msec){
    var audio = document.createElement('audio');
    audio.src = path;
    audio.play();
    audio.addEventListener("ended",function(){
        if(callback && msec){
            setTimeout(callback,msec);
        }
    });
    return audio;
}
