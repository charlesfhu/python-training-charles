class Level{
    constructor() {
        this.gravity = 1500;
        this.totalTime = 0;

        this.music = new MusicController();

        this.comp = new Compositor();
        this.entities = new Set();

        this.entityCollider = new EntityCollider(this.entities);
        this.tileCollider = null;
    }

    setCollisionGrid(matrix){
        this.tileCollider = new TileCollider(matrix);
    }

    update(gameContext) {
        this.entities.forEach(entity => {
            entity.update(gameContext , this);
        });

        this.entities.forEach(entity => {
            this.entityCollider.check(entity);
        });

        this.entities.forEach(entity => {
            entity.finalize();
        });
        
        this.totalTime += gameContext.deltaTime;
    }
}