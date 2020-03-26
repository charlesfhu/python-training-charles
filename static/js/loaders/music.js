function  loadMusicSheet(name) {
    return loadJSON(`/static/json/${name}.json`)
        .then(musicSheet => {
            const musicPlayer = new MusicPlayer();
            for(const [name,track] of Object.entries(musicSheet)){
                musicPlayer.addTrack(name , track.url);
            }
            return musicPlayer;
        });
}