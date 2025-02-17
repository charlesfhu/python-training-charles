const Sides = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom'),
    LEFT:Symbol('left'),
    RIGHT:Symbol('right'),
};

//軌跡
class Trait {
    constructor(name) {
        this.NAME = name;

        this.events = new EventEmitter();
        this.tasks = [];
    }

    finalize() {
        this.tasks.forEach(task => task());
        this.tasks.length = 0;
    }

    queue(task) {
        this.tasks.push(task);
    }

    collides(us,them){

    }

    obstruct() {

    }

    playSounds(audioBoard,audioContext){
        this.sounds.forEach(name => {
            audioBoard.playAudio(name,audioContext);
        });

        this.sounds.clear();
    }

    update() {
        //console.warn('Unhandled update call in Trait');
    }
}

//實體
class Entity {
    //類別內結構
    constructor(){
        this.audio = new AudioBoard();
        this.sounds = new Set();
        this.pos = new Vec2(0,0);
        this.vel = new Vec2(0,0);
        this.size = new Vec2(0,0);
        this.offset = new Vec2(0,0);
        this.bounds = new BoundingBox(this.pos, this.size, this.offset);
        this.lifetime = 0;

        this.traits = [];
    }

    addTrait(trait){
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    collides(candidate){
        this.traits.forEach(trait => {
            trait.collides(this, candidate);
        });
    }

    obstruct(side , match){
        this.traits.forEach(trait => {
            trait.obstruct(this, side ,match);
        });
    }

    draw(){

    }

    finalize() {
        this.traits.forEach(trait => {
            trait.finalize();
        });
    }

    playSounds(audioBoard,audioContext) {
        this.sounds.forEach(name => {
            audioBoard.playAudio(name,audioContext);
        });

        this.sounds.clear();
    }

    update(gameContext,level){
        this.traits.forEach(trait => {
            trait.update(this, gameContext,level);
        });

        this.playSounds(this.audio,gameContext.audioContext);

        this.lifetime += gameContext.deltaTime;
    }
}

