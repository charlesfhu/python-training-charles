//玩家控制
class PlayerController extends Trait {
    constructor() {
        super('playerController');
        this.checkpoint = new Vec2(0,0);
        this.player = null;
        this.score = 0;
        this.time = 300;
    }

    setPlayer(entity){
        this.player = entity;

        this.player.stomper.events.listen('stomp', () =>{
            this.score += 100;
        });
    }

    update(entity,{deltaTime},level){
        if(!level.entities.has(this.player)){
            this.player.killable.revive();
            this.player.pos.set(this.checkpoint.x,this.checkpoint.y);
            level.entities.add(this.player);
        } else {
            this.time -= deltaTime * 2;
        }
    }
}