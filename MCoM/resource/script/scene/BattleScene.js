
import CardBase from "../card/CardBase.js"
import HpBar from "../ui/normal/player/HpBar.js"
import Deck from "../card/Deck.js"
import DeckShow from "../ui/battle/DeckShow.js"
import StageShow from "../ui/battle/StageShow.js"
import Player from "../system/battle/player/Player.js"
import Enemy from "../system/battle/enemy/Enemy.js"
import Collider from "../system/base/Collider.js"
import AttackCollider from "../system/battle/base/AttackCollider.js"
import FieldCard from "../system/battle/base/FieldCard.js"

class BattleScene{
    constructor(player,enemyList,stage,key,onWay,app){
        this.player = player;
        this.enemyList = enemyList;
        //console.log(this.enemyList.length);
        this.stage = stage;
        this.keys = key[0];

        this.keyList = key;

        this.app = app;
        this.collider = new Collider();
        this.ticker = PIXI.Ticker.shared;

        this.keyFn = null;

        this.fieldCard = new FieldCard();

        this.onWay = onWay;

        this.arriveEnemy = new Array();
        this.deadEnemy = new Array();
    }
    setTest(){
        var This = this;
        console.log(this.enemyList);
        this.keyFn = function(time){
            This.turn();
        }
        this.ticker.add(this.keyFn);
    }

    battleEnd(){
        this.ticker.remove(this.keyFn);
        this.onWay.backOnWay();
    }

    turn(){

        if(this.enemyList.length == 0){
            this.battleEnd();
        }
        
        this.enemyThink(); 
        this.move();
        this.card();
        this.useCard();
        this.action();
        this.afterTreat();
    }

    enemyThink(){
        for(var i = 0;i < this.enemyList.length;i++){
            this.enemyList[i].think();
        }
    }

    move(){
        //player     
        if(this.keyPressing("j")) { // ③
            this.player.moveX(-5);
            if(this.collider.isCrossed(this.player,this.enemyList)){
                this.player.moveX(5);
            }
        }
        if(this.keyPressing("l")) { // ③
            this.player.moveX(5);
            if(this.collider.isCrossed(this.player,this.enemyList)){
                this.player.moveX(-5);
            }
        }
        if(this.keyPressing("i")) { // ③
            this.player.moveY(5);
            if(this.collider.isCrossed(this.player,this.enemyList)){
                this.player.moveY(-5);
            }
        }
        if(this.keyPressing("k")) { // ③
            this.player.moveY(-5);
            if(this.collider.isCrossed(this.player,this.enemyList)){
                this.player.moveY(5);
            }
        }
        if(this.keyPressing("u")) { // ③
            this.player.jump();
        }
        //enemy
        var test = [this.player,this.enemyList];
        test = test.flat();

        //console.log(this.enemyList.length);
        for(var i = 0;i < this.enemyList.length;i++){
            var enemy = this.enemyList[i]
            //console.log(enemy.action);
            if(enemy.action == "move"){
                var num = 1;
                if(enemy.actionFlame <= 10){
                    num *= -1;
                }
                enemy.addPos(0,num,0);
                if(this.collider.isCrossed(enemy,test)){
                    enemy.addPos(0,-num,0);
                }

            }
        }
    }

    card(){
        /*
        if(this.keyPressing("a")) { // ③
            this.player.deckset.use();// Aが押された時に実行したい処理を記述
            this.player.attack();
          }
          */
          if(this.keyPressing("q")) { // ③
              this.player.deckset.move("R");// Aが押された時に実行したい処理を記述
          }
          if(this.keyPressing("w")) { // ③
              this.player.deckset.move("L");// Aが押された時に実行したい処理を記述
          }
          if(this.keyPressing("z")) { // ③
              this.player.deckset.keep();
          }
          if(this.keyPressing("x")) { // ③
              this.player.deckset.alluse();
          }
          if(this.keyPressing("c")) { // ③
              this.player.deckset.reload();
          }
    }
    

    useCard(){
        //enemy
        for(var i = 0; i < this.enemyList.length;i++){
            if(this.enemyList[i].action == "attack"){
                this.enemyList[i].selectCard();
                this.enemyList[i].deckset.use();
                this.enemyList[i].attack();
            }
            0;
        }
        
        
        //player
        if(this.keyPressing("a")) { // ③
            this.player.deckset.use();// Aが押された時に実行したい処理を記述
            this.player.attack();
        }
    }

    action(){
        for(var i = 0;i < this.enemyList.length;i++){
            var enemy = this.enemyList[i];
            if(enemy.action == "attack" || enemy.attacking){
                if(enemy.attackFlame == enemy.attackData[0]){
                    enemy.attackFlame = 0;
                    enemy.attacking = false;
                    enemy.attackedE = new Array();
                    return 0
                }
                var aC = new AttackCollider();
                var hit = aC.isHitted(enemy,enemy.attackData[2],new Array(this.player));
    
                for(var i = 0;i < hit.length;i++){
                    var e = hit[i];
                    var f = false;
                    for(var j = 0;j < enemy.attackedE.length;j++){
                        if(e == enemy.attackedE[j]){
                            f = true;
                            break;
                        }
    
                    }
                    if(f){
                        break;
                    }
                    e.damage(enemy.attackData[1]);
                    this.player.hpBar.damage(enemy.attackData[1]);
                    enemy.attackedE.push(e);
                    
                    
                }

                enemy.attackFlame += 1;
            }
        }


        if(this.player.attacking){
            if(this.player.attackFlame == this.player.attackData[0]){
                this.player.attackFlame = 0;
                this.player.attacking = false;
                this.player.attackedE = new Array();
                return 0
            }
            var aC = new AttackCollider();
            var hit = aC.isHitted(this.player,this.player.attackData[2],this.enemyList);

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
            this.player.attackFlame += 1;
        }

    }

    afterTreat(){
        if(this.player.status.hp <= 0){
            return 0;
        }

        for(var i = 0;i < this.enemyList.length;i++){
            var e = this.enemyList[i];
            if(e.status.hp <= 0){
                this.deadEnemy.push(e);
            }
            else{
                this.arriveEnemy.push(e);
            }
        }

        for(var i = 0; i < this.deadEnemy.length;i++){
            var enemy = this.deadEnemy[i];
            if(enemy.status.hp <= 0){
                enemy.destroy();
            }
        }
        
        this.deadEnemy = new Array();
        this.enemyList = this.arriveEnemy.map(data => data);
        this.arriveEnemy = new Array();
    }

    keyPressing(key){
        return this.keyList[1][key]
    }

    keydownEvent(){ // ②
        if(this.keyPressing("a")) { // ③
          this.player.deckset.use();// Aが押された時に実行したい処理を記述
          this.player.attack();
        }
        if(this.keyPressing("q")) { // ③
            this.player.deckset.move("R");// Aが押された時に実行したい処理を記述
        }
        if(this.keyPressing("w")) { // ③
            this.player.deckset.move("L");// Aが押された時に実行したい処理を記述
        }
        if(this.keyPressing("z")) { // ③
            this.player.deckset.keep();
        }
        if(this.keyPressing("x")) { // ③
            this.player.deckset.alluse();
        }
        if(this.keyPressing("c")) { // ③
            this.player.deckset.reload();
        }

        if(this.keyPressing("j")) { // ③
            this.player.moveX(-5);
            if(this.collider.isCrossed(this.player,this.enemyList)){
                this.player.moveX(5);
            }
        }
        if(this.keyPressing("l")) { // ③
            this.player.moveX(5);
            if(this.collider.isCrossed(this.player,this.enemyList)){
                this.player.moveX(-5);
            }
        }
        if(this.keyPressing("i")) { // ③
            this.player.moveY(5);
            if(this.collider.isCrossed(this.player,this.enemyList)){
                this.player.moveY(-5);
            }
        }
        if(this.keyPressing("k")) { // ③
            this.player.moveY(-5);
            if(this.collider.isCrossed(this.player,this.enemyList)){
                this.player.moveY(5);
            }
        }
        if(this.keyPressing("u")) { // ③
            this.player.jump();
        }
        /*
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
        */

        

      }
    






    }


export default BattleScene;