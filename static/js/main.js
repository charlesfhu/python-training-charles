updateJson('level1-1');
updateJson('overWorld');
updateJson('underWorld');
updateJson('goomba');
updateJson('koopa');
updateJson('mario');

async function main(canvas) {
    const context = canvas.getContext('2d');
    const audioContext = new AudioContext();

    const [entityFactory,font] = await Promise.all([
        loadEntities(audioContext),
        loadFont(),
    ]);

    const loadLevel = await createLevelLoader(entityFactory);

    const level = await loadLevel('level1-1');

    const camera = new Camera();

    const mario = createPlayer(entityFactory.mario());

    const playerEnv = createPlayerEnv(mario);
    level.entities.add(playerEnv);

    //碰撞示意框
    level.comp.layers.push(createCollisionLayer(level));
    level.comp.layers.push(createDashboardLayer(font , playerEnv));
    
    const input = setupKeyboard(mario);
    input.listenTo(window);

    const gameContext = {
        audioContext,
        deltaTime: null,
    };

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        gameContext.deltaTime = deltaTime;
        level.update(gameContext);

        camera.pos.x = Math.max(0,mario.pos.x - 100);

        level.comp.draw(context , camera);
    }

    timer.start();
    level.music.player.playTrack('main');
}

const canvas = document.getElementById('screen');

//const start = () => {
   // window.removeEventListener('click' , start);
   // main(canvas);
//}

//window.addEventListener('click', start);

main(canvas);