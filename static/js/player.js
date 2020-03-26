function createPlayerEnv(playerEntity){
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkpoint.set(64,64);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv;
}

function createPlayer(entity) {
    entity.addTrait(new Player());
    return entity;
}

function* findPlayers(level) {
    for(const entity of level.entities) {
        if(entity.player) {
            yield entity;
        }
    }
}