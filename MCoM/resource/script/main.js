import CardBase from "./card/CardBase.js"
import HpBar from "./ui/normal/player/HpBar.js"
import Deck from "./card/Deck.js"
import DeckShow from "./ui/battle/DeckShow.js"
import StageShow from "./ui/battle/StageShow.js"
import Player from "./system/battle/player/Player.js"
import Enemy from "./system/battle/enemy/Enemy.js"
import Collider from "./system/base/Collider.js"

import BattleScene from "./scene/BattleScene.js"
import ManageScene from "./scene/ManageScene.js"
import StartScene from "./scene/StartScene.js"
import DefaultDict from "./util/DefaultDict.js"

(async () =>
{
    const app = new PIXI.Application({antialias: true,
        autoDensity: true,});

    await app.init({ width: 640, height: 360 ,backgroundColor: 0x1099bb});

    document.body.appendChild(app.canvas);

    /*
    let po = new PIXI.Container();

    var stage = new StageShow(po);
    stage.show();

    app.stage.addChild(po);

    var e1 = new Enemy();
    e1.setTest();
    e1.setPos(600,50,0);


    var collider = new Collider();

    var player = new Player();
    player.setTest();


    var pPos = new PIXI.Container();
    pPos.x = 0;
    pPos.y = 250;

    pPos.addChild(e1.graphic);
    pPos.addChild(player.graphic);
    app.stage.addChild(pPos);

  

    var hpdata = new PIXI.Container();
    
    app.stage.addChild(hpdata);
    var hpBar = new HpBar(100, hpdata);

    hpdata.x = 50;
    hpdata.y = 50;
    hpBar.setGraphic();

    let ui = new PIXI.Container();

    

    var deck = new Deck();

    deck.setBase();
    console.log(deck);
    
    var deckset = new DeckShow(ui);
    deckset.deckSet(deck);

    app.stage.addChild(ui);
    */


    var input_key_buffer = new Array();
    var input_key_buffer_time = new DefaultDict(0);
    var input_key_buffer_push = new Array();
    
    //this.ticker = PIXI.Ticker.shared;
    
    function handlekeydown(event){
        //console.log(event.key)
        input_key_buffer_push[event.key] = true;
    }

    document.addEventListener("keyup", handleKeyup);
    function handleKeyup(e) {
        input_key_buffer_push[e.key] = false;
        input_key_buffer_time[e.key] = 0;
        input_key_buffer[e.key] = false;
    }

    var keyList = [input_key_buffer,input_key_buffer_push,input_key_buffer_time];

    document.addEventListener('keydown', handlekeydown);

    var fn = function(time){
        
        for(var [i,flag] of Object.entries(input_key_buffer_push)){
            
            if(flag){
                input_key_buffer_time[i] += 1;
                if(input_key_buffer_time[i] >= 20 || input_key_buffer_time[i] == 1){
                    input_key_buffer[i] = true;
                }
                else{
                    input_key_buffer[i] = false;
                }
            }
        }
    }
    app.ticker.add(fn);


    /*
    var battle = new BattleScene(player,input_key_buffer,input_key_buffer);
    battle.setTestBattle();
    app.stage.addChild(battle.scene);
    */

    /*
    var start = new StartScene(input_key_buffer);
    start.setStart();
    app.stage.addChild(start.scene);
    
    */

    var manager = new ManageScene(app.stage,keyList,app);
    manager.start();
    /*

    function keyPressing(key){
        return input_key_buffer[key]

    }
    
    app.ticker.add(keydownEvent);
    
    function keydownEvent(){ // ②
        if(keyPressing("a")) { // ③
          deckset.use();// Aが押された時に実行したい処理を記述
        }
        if(keyPressing("q")) { // ③
            deckset.move("R");// Aが押された時に実行したい処理を記述
        }
        if(keyPressing("w")) { // ③
            deckset.move("L");// Aが押された時に実行したい処理を記述
        }
        if(keyPressing("s")) { // ③
            hpBar.extendHp(10);// sが押された時に実行したい処理を記述
            hpBar.heal(10)
        }

        if(keyPressing("d")) { // ③
            hpBar.damege(10);
        }
        if(keyPressing("z")) { // ③
            deckset.keep();
        }
        if(keyPressing("x")) { // ③
            deckset.alluse();
        }
        if(keyPressing("c")) { // ③
            deckset.reload();
        }

        if(keyPressing("j")) { // ③
            player.moveX(-5);
            if(collider.isCrossed(player,[e1])){
                player.moveX(5);
            }
        }
        if(keyPressing("l")) { // ③
            player.moveX(5);
            if(collider.isCrossed(player,[e1])){
                player.moveX(-5);
            }
        }
        if(keyPressing("i")) { // ③
            player.moveY(5);
            if(collider.isCrossed(player,[e1])){
                player.moveY(-5);
            }
        }
        if(keyPressing("k")) { // ③
            player.moveY(-5);
            if(collider.isCrossed(player,[e1])){
                player.moveY(5);
            }
        }
        if(keyPressing("u")) { // ③
            player.jump();
        }
      }
      
      */

})();