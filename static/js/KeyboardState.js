const PRESSED = 1;
const RELEASED = 0;

class KeyboardState{
    constructor(){
        this.KeyStates = new Map();

        this.keyMap = new Map();
    }

    addMapping(code, callback){

        this.keyMap.set(code,callback);
    }
    //處理事件
    handleEvent(event) {
        const {keyCode} = event;

        if(!this.keyMap.has(keyCode)){
            return;
        }

        event.preventDefault();
        const KeyState = event.type === 'keydown' ? PRESSED : RELEASED;

        if(this.KeyStates.get(keyCode) === KeyState){
            return;
        }
        
        this.KeyStates.set(keyCode, KeyState);
        this.keyMap.get(keyCode)(KeyState);
    }
    //監聽事件
    listenTo(window) {
        ['keydown','keyup'].forEach(eventName => {
            window.addEventListener(eventName ,event => {
                this.handleEvent(event);
            });
        });
    }
}

//指令
function  setupKeyboard(entity) {
    const SPACE = 32; 
    const input = new KeyboardState(); 

    input.addMapping(SPACE, keyState => {
        if(keyState){
            entity.jump.start();
        }
        else
        {
            entity.jump.cancel();
        }
    });
    input.addMapping(17, keyState => {
        entity.go.dragFactor = keyState ? 1/5000 : 1/2000;
    });
    input.addMapping(68, keyState => {
        entity.go.dir += keyState ? 1 : -1;
    });
    input.addMapping(65, keyState => {
        entity.go.dir += -keyState ? -1 : 1;
    });
    //K
    input.addMapping(75, keyState => {
        if(keyState){
            Get_Data();
        }
    });
    //L
    input.addMapping(76, keyState => {
        if(keyState){
            Send_Data();
        }
    });

    return input;
}
