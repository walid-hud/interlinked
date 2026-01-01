function play_sound(audio:string|HTMLAudioElement){
    if(typeof audio === "string"){
        const sfx = new Audio(audio)
        sfx.currentTime = 0
        sfx.play()
    }else{
        audio.currentTime = 0
        audio.play()
    }
}

export {play_sound}