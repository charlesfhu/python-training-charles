function  loadAudioBoard(name,audioContext) {
    const loadAudio = createAudioLoader(audioContext);
    return loadJSON(`/static/json/${name}.json`)
        .then(audioSheet => {
            const audioBoard = new AudioBoard(audioContext);
            const fx = audioSheet.fx;
            const jobs = [];
            Object.keys(fx).forEach(name => {
                const url = fx[name].url;
                const job = loadAudio(url).then(buffer => {
                    audioBoard.addAudio(name,buffer);
                });
                jobs.push(job);
            });
            return Promise.all(jobs).then(() => audioBoard);
        });
}

function createAudioLoader(context) {
    return function loadAudio(url) {
        return fetch(url)
            .then(Response => {
                return Response.arrayBuffer();
            })
            .then(arrayBuffer => {
                return context.decodeAudioData(arrayBuffer);
            });
    };
}