class Timer{
    constructor(deltaTime = 1/60) {
        let accumulatedTime = 0;
        let lastTime = 0;

        this.updateProxy = (time) => {
            accumulatedTime += (time - lastTime) / 1000;

            if(accumulatedTime > 1){
                accumulatedTime = 1;
            }

            while (accumulatedTime > deltaTime) {
                //comp.draw(context);
                //mario.update(deltaTime);
                //mario.vel.y += gravity;
                this.update(deltaTime);
                accumulatedTime -= deltaTime;
            }

            //setTimeout(update, 1000/5000, performance.now());

            lastTime = time;

            this.enqueue();
        }
    }

    enqueue() {
        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue();
    }
}