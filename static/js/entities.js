function loadEntities(audioContext)
{
    const entityFactories = {};

    function addAs(name) {
        return factory => entityFactories[name] = factory;
    }

    return Promise.all([
        loadMario(audioContext).then(addAs('mario')),
        loadGoomba(audioContext).then(addAs('goomba')),
        loadKoopa(audioContext).then(addAs('koopa')),
        loadBullet(audioContext).then(addAs('bullet')),
        loadCannon(audioContext , entityFactories).then(addAs('cannon')),
    ])
    .then(() => entityFactories);
}