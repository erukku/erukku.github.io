
import CardBase from "../card/CardBase.js"
import HpBar from "../ui/normal/player/HpBar.js"
import Deck from "../card/Deck.js"
import DeckShow from "../ui/battle/DeckShow.js"
import StageShow from "../ui/battle/StageShow.js"
import Player from "../system/battle/player/Player.js"
import Enemy from "../system/battle/enemy/Enemy.js"
import Collider from "../system/base/Collider.js"
import AttackCollider from "../system/battle/base/AttackCollider.js"

class BattleScene{
    constructor(player,info,key){
        this.player = player;
        this.scene = new PIXI.Container();
        this.ticker = PIXI.Ticker.shared;
        this.ticker.start();
        
        this.keys = key;
    }

    setTestBattle(){
        /*
        var stage = new StageShow(this.scene);
        stage.show();

        this.collider = new Collider();
        
        this.e1 = new Enemy();
        this.e1.setTest();
        this.e1.setPos(600,50,0);

        var pPos = new PIXI.Container();
        pPos.x = 0;
        pPos.y = 250;

        pPos.addChild(this.e1.graphic);
        pPos.addChild(this.player.graphic);
        this.scene.addChild(pPos);
        //this.scene.addChild(this.player.graphic);
        //this.scene.addChild(this.e1.graphic);
        */
        var ui = new PIXI.Container();
                
        var hpdata = new PIXI.Container();
        this.scene.addChild(ui);
        ui.addChild(hpdata);
        this.hpBar = new HpBar(100, hpdata);

        hpdata.x = 50;
        hpdata.y = 50;
        this.hpBar.setGraphic();

        

        var deck = new Deck();

        deck.setBase();
        
        
        this.deckset = new DeckShow(ui);
        this.deckset.deckSet(deck);
        var This = this;
        var a = function(time){This.keydownEvent()};

        this.ticker.add(a);
        
    }
    
    keyPressing(key){
        return this.keys[key]
    }

    keydownEvent(){ // ②
        if(this.keyPressing("a")) { // ③
          this.deckset.use();// Aが押された時に実行したい処理を記述
          this.player.attack();
        }
        if(this.keyPressing("q")) { // ③
            this.deckset.move("R");// Aが押された時に実行したい処理を記述
        }
        if(this.keyPressing("w")) { // ③
            this.deckset.move("L");// Aが押された時に実行したい処理を記述
        }
        if(this.keyPressing("s")) { // ③
            this.hpBar.extendHp(10);// sが押された時に実行したい処理を記述
            this.hpBar.heal(10)
        }

        if(this.keyPressing("d")) { // ③
            this.hpBar.damege(10);
        }
        if(this.keyPressing("z")) { // ③
            this.deckset.keep();
        }
        if(this.keyPressing("x")) { // ③
            this.deckset.alluse();
        }
        if(this.keyPressing("c")) { // ③
            this.deckset.reload();
        }

        if(this.keyPressing("j")) { // ③
            this.player.moveX(-5);
            if(this.collider.isCrossed(this.player,[this.e1])){
                this.player.moveX(5);
            }
        }
        if(this.keyPressing("l")) { // ③
            this.player.moveX(5);
            if(this.collider.isCrossed(this.player,[this.e1])){
                this.player.moveX(-5);
            }
        }
        if(this.keyPressing("i")) { // ③
            this.player.moveY(5);
            if(this.collider.isCrossed(this.player,[this.e1])){
                this.player.moveY(-5);
            }
        }
        if(this.keyPressing("k")) { // ③
            this.player.moveY(-5);
            if(this.collider.isCrossed(this.player,[this.e1])){
                this.player.moveY(5);
            }
        }
        if(this.keyPressing("u")) { // ③
            this.player.jump();
        }

        if(this.player.attacking){
            if(this.player.attackFlame == this.player.attackData[0]){
                this.player.attackFlame = 0;
                this.player.attacking = false;
                this.player.attackedE = new Array();
                return 0
            }
            var aC = new AttackCollider();
            var hit = aC.isHitted(this.player,this.player.attackData[2],[this.e1]);

            for(var i = 0;i < hit.length;i++){
                var e = hit[i];
                var f = false;
                for(var j = 0;j < this.player.attackedE.length;j++){
                    if(e == this.player.attackedE[j]){
                        f = true;
                        break;
                    }

                }
                if(f){
                    break;
                }
                e.damage(this.player.attackData[1]);
                this.player.attackedE.push(e);

            }
            if(this.e1.status.hp <= 0){
                this.e1.graphic.visible = false;
            }


            this.player.attackFlame += 1;
        }
        
      }
      

}

export default BattleScene;