
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
import DefaultDict from "../util/DefaultDict.js"

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
        this.ticker.maxFPS = 60;

        this.keyFn = null;

        this.fieldCard = new FieldCard();

        this.onWay = onWay;

        this.arriveEnemy = new Array();
        this.deadEnemy = new Array();

        this.cardAnimationTicker = null;
        this.flame = 0;
        this.keepFlame = -100;

        this.targetFlag = false;
        this.targetIndex = null;
        this.targetLockFlame = 0;

        this.audioDict = new DefaultDict(null);
        this.audioDict["sword"] = new Audio("MCoM/resource/se/sword.mp3");
        this.audioDict["fire"] = new Audio("MCoM/resource/se/fire.mp3");

        this.wasteFlame = -1;

        this.attackBoxArray = new Array();
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
        this.flame += 1;
        //console.log("flame",this.flame)
        if(this.enemyList.length == 0){
            this.battleEnd();
        }
        
        this.enemyThink();
        if(this.flame >= this.targetLockFlame){
            this.target();
        }
        


        this.move();
        this.card();
        this.useCard();
        this.action();
        this.afterTreat();

        this.targetActivate();

    }

    enemyThink(){
        for(var i = 0;i < this.enemyList.length;i++){
            this.enemyList[i].think();
        }
    }

    target(){
        if(this.keyPressing("1")){
            if(this.targetFlag){
                this.targetFlag = false;
                this.enemyList[this.targetIndex].hpBar.maxHpBars.visible = false;
                this.enemyList[this.targetIndex].targetGraphic.visible = false;
                this.targetIndex = null;

                this.targetLockFlame = this.flame + 10;
            }
            else{
                this.targetFlag = true;
                this.targetInit();

                this.enemyList[this.targetIndex].targetGraphic.visible = true;
                this.targetLockFlame = this.flame + 10;
            }
        }
        if(this.keyPressing("2") && this.targetFlag){
            this.enemyList[this.targetIndex].hpBar.maxHpBars.visible = false;
            this.enemyList[this.targetIndex].targetGraphic.visible = false;
            for(var i = 1; i <= this.enemyList.length;i++){
                var ii = (this.targetIndex + i) % this.enemyList.length;
                var enemy = this.enemyList[ii];
                if(enemy.status.hp == 0){
                    continue
                }
                this.targetIndex = ii;
                break;
            }
            this.targetLockFlame = this.flame + 10;
        }
        if(this.keyPressing("3")&& this.targetFlag){
            this.enemyList[this.targetIndex].hpBar.maxHpBars.visible = false;
            this.enemyList[this.targetIndex].targetGraphic.visible = false;
            for(var i = 1; i < this.enemyList.length*2;i++){
                var ii = (this.targetIndex - i) % this.enemyList.length;
                ii = ii + this.enemyList.length;
                ii = (ii) % this.enemyList.length;
                var enemy = this.enemyList[ii];
                if(enemy.status.hp == 0){
                    continue
                }
                this.targetIndex = ii;
                break;
            }

            this.targetLockFlame = this.flame + 10;
        }
    }

    targetInit(){
        for(var i = 0; i < this.enemyList.length;i++){
            var enemy = this.enemyList[i];
            if(enemy.status.hp == 0){
                continue
            }
            this.targetIndex = i;
            break;
        }
    }

    targetActivate(){
        if(this.targetFlag == false || this.enemyList.length == 0){
            return 0;
        }

        this.enemyList[this.targetIndex].hpBar.maxHpBars.visible = true;
        this.enemyList[this.targetIndex].targetGraphic.visible = true;
    }

    move(){
        //player     
        console.log(this.player.animation.status)
        if(this.player.animation.status != "attack" && this.player.animation.status != "breaked"){            
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
            if(! this.keyPressing("j") && ! this.keyPressing("k") && ! this.keyPressing("i") && ! this.keyPressing("l")){
                if(this.player.animation.status == "walk"){
                    this.player.animation.setStatus("wait");
                }
            }
            if(this.keyPressing("u")) { // ③
                this.player.jump();
            }
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

                var x = this.player.position.x - enemy.position.x;
                var y = this.player.position.y - enemy.position.y;
                //var z = this.player.position.z - enemy.position.z;
                var dist = Math.sqrt(x*x + y*y);

                enemy.addPos(x/dist * enemy.speed,y/dist * enemy.speed,0);
                if(x > 0){
                    enemy.direction = "R";
                }
                else if(x < 0){
                    enemy.direction = "L";
                }

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
          if(this.keyPressing("z") && (this.keepFlame < this.flame)) { // ③
              this.player.deckset.keep();
              this.keepFlame = this.flame + 10;
          }

    }
    

    useCard(){
        //enemy
        var animate = null
        for(var i = 0; i < this.enemyList.length;i++){
            if(i == 0){
                //console.log(this.enemyList[i].selectCard(0),this.enemyList[i].action);
                0
            }
            if(this.enemyList[i].deckset.rolling == true){
                console.log(i,this.enemyList[i].deckset.rolling);
            }
            
            if(this.enemyList[i].action == "attack" && this.enemyList[i].deckset.rolling == false){
                
                var card = this.enemyList[i].selectCard(0);

                if(card.cardClass == "reload" && this.fieldCard.cardHolder != this.enemyList[i]){
                    this.enemyList[i].deckset.use();
                    continue;
                }

                if(this.enemyList[i].actionFlame % 30 != 1){
                    continue;
                }

                if(this.fieldCard.isExist(card,"enemy",this.enemyList[i])){
                    this.enemyList[i].attack();
                    animate = this.enemyList[i].deckset.use();
                    
                    this.fieldCard.cardFn = animate;

                    if(this.enemyList[i].position.x < this.player.position.x){
                        this.enemyList[i].direction = "R";
                    }
                    else{
                        this.enemyList[i].direction = "L";
                    }

                    //console.log(this.fieldCard.cardSide,this.fieldCard.fieldCard,i);
                    continue;
                }

                if(this.fieldCard.cardSide == "enemy"){
                    continue;
                }


                if(this.fieldCard.checkCard(card,"enemy",this.enemyList[i])){
                    //this.cardAnimationTicker.breaked = true;
                    if(this.fieldCard.cardFn != 0){
                        this.fieldCard.cardFn.breaked = true;

                        this.player.animation.setStatus("breaked");
                    }
                    this.enemyList[i].attack();
                    animate = this.enemyList[i].deckset.use();
                    this.fieldCard.cardFn = animate;

                    if(this.enemyList[i].position.x < this.player.position.x){
                        this.enemyList[i].direction = "R";
                    }
                    else{
                        this.enemyList[i].direction = "L";
                    }

                }else{
                    this.enemyList[i].deckset.waste();
                }

                
            }
            0;
        }
        
        
        //player
        if(this.keyPressing("a")) { // ③
            var cardIndex = this.player.deckset.getCardIndex();
            var card = this.player.deck.deck[cardIndex];
            //console.log(this.player.deck.deck);

            if(this.player.animation.status == "breaked"){
                return 0;
            }

            //仮
            if(this.player.deckset.keepCardNum == 3){
                card = new CardBase("attack");
                card.cost = this.player.deckset.cost;
            }
            
            if(card.cardClass == 'reload'){
                this.player.deckset.use();

                return 0;
            }

            if(this.fieldCard.isExist(card,"player",this.player)){
                this.player.attack();
                animate = this.player.deckset.use();// Aが押された時に実行したい処理を記述
                
                this.fieldCard.cardFn = animate;
                return 0;   
            }
            
            if(this.fieldCard.cardSide == "player"){
                return 0;
            }
            
            if(this.fieldCard.checkCard(card,"player",this.player)){
                //this.cardAnimationTicker.breaked = true;
                console.log(this.fieldCard.cardFn);

                if(this.fieldCard.cardFn != 0){
                    this.fieldCard.cardFn.breaked = true;

                    //仮 need enemy breaked
                    this.fieldCard.cardHolder.animation.setStatus("breaked");
                }
                this.player.attack();
                animate = this.player.deckset.use();// Aが押された時に実行したい処理を記述
                this.fieldCard.cardFn = animate;
            }
            else{
                if( this.wasteFlame < this.flame){
                    this.player.deckset.waste();
                    this.wasteFlame = this.flame + 20;
                }
            }
        }
    }

    action(){

        for(var i = 0;i < this.enemyList.length;i++){
            var enemy = this.enemyList[i];
            if(enemy.attacking){
                if(enemy.actionNow == null && enemy.attackData.length == 0){
                   
                    enemy.attackFlame = 0;
                    enemy.attacking = false;
                    enemy.attackedE = new Array();

                    this.fieldCard.reset();

                    continue;
                    return 0
                }

                else if(enemy.actionNow == null){
                    enemy.actionNow = enemy.attackData.shift();
                    
                }

                if(enemy.attackFlame == enemy.actionNow[1]){
                    enemy.attackFlame = 0;
                    enemy.actionNow = null;
                    continue;
                    return 0
                }

                enemy.attackFlame += 1;

                var aC = new AttackCollider();

                var data = enemy.actionNow[3];
                if(data[0] == "move"){
                    //仮
                    data[2][0][1].addPos(data[1],0,0);
                }
                var hit = aC.isHitted(enemy,data[2],new Array(this.player));
    
                for(var ii = 0;ii < hit.length;ii++){
                    var e = hit[ii];
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

                    console.log(e);
                    e.damage(enemy.actionNow[2]);
                    //this.player.damage(enemy.attackData[1]);
                    enemy.attackedE.push(e);
                    
                    
                }


            }
        }


        if(this.player.attacking){
            if(this.player.actionNow == null && this.player.attackData.length == 0){
                this.player.attackFlame = 0;
                this.player.attacking = false;
                this.player.attackedE = new Array();

                this.fieldCard.reset();
                return 0
            }
            else if(this.player.actionNow == null){
                //console.log(this.player.attackData);
                this.player.actionNow = this.player.attackData.shift();
                //console.log(this.player.actionNow);
            }

            if(this.player.attackFlame == this.player.actionNow[1]){
                this.player.attackFlame = 0;
                this.player.actionNow = null;
                return 0
            }

            this.player.attackFlame += 1;
            if(this.attackBoxArray.length > 0){
                for(var j = 0; j < this.attackBoxArray.length;j++){
                    
                    var data = this.attackBoxArray[j];
                    //[sprite,power,speed,body,hittedArray,allflame,flame]
                    
                    var power = data[1];
                    var speed = data[2];
                    var body = data[3][0];
                    var hittedArray = data[4];
                    data[0].x += speed;
                    body.position.addPos(speed,0,0);

                    var aC = new AttackCollider();
                    var hit = aC.isHitted(this.player,[body],this.enemyList);


                    for(var i = 0;i < hit.length;i++){
                        var e = hit[i];
                        var f = false;
                        for(var j = 0;j < hittedArray.length;j++){
                            if(e == hittedArray[j]){
                                f = true;
                                break;
                            }

                        }
                        if(f){
                            break;
                        }

                        this.audioDict["fire"].currentTime = 0;
                        this.audioDict["fire"].play();
                        
                        e.damage(power);
                        hittedArray.push(e);
                    }

                    data[6] += 1;
                    console.log(data[5],data[6]);
                    if(data[6] >= data[5]){
                        this.stage.removeChild(data[0]);
                        this.attackBoxArray.splice(j,1);
                        j -= 1;
                    }
                }
            }


            if(this.player.actionNow[0] == "wait"){
                return 0
            }
            else if(this.player.actionNow[0] == "heal"){
                this.player.heal(this.player.actionNow[2]);
                return 0;
            }
            else if(this.player.actionNow[0] == "fire"){
                var power = this.player.actionNow[2];
                var allFlame = this.player.actionNow[3][0];
                var flame = 0;
                var speed = this.player.actionNow[3][1];
                var body = this.player.actionNow[3][2];

                var hittedArray = new Array();
                var sprite = PIXI.Sprite.from("fire");
                sprite.scale.set(0.1,0.1);
                if(this.player.direction == "R"){
                    
                    sprite.scale.x *= -1;
                    sprite.x += body[0].position.x;
                    sprite.rotation = -(1/13) * Math.PI ;   
                }
                else{
                    speed *= -1;
                    sprite.x -= body[0].position.x;
                    sprite.rotation = (1/13) * Math.PI ;
                }
                this.stage.addChild(sprite);
                sprite.anchor.set(0.5,0.5);
                
                console.log(111111111111111,this.player.direction);
                
                var fire = new Array(sprite,power,speed,body,hittedArray,allFlame,flame);
                var stagePos = this.stage.getGlobalPosition();
                var pos = this.player.graphicMain.getGlobalPosition();
                sprite.x += pos.x - stagePos.x;
                
                sprite.y += pos.y - stagePos.y;
                console.log("push");
                this.attackBoxArray.push(fire);
                

            }
            else{//現時点ではattack
                var aC = new AttackCollider();

                var data = this.player.actionNow[3];
                //console.log(data);

                if(data[0] == "move"){
                    //仮
                    data[2][0][1].addPos(data[1],0,0);
                }

                var hit = aC.isHitted(this.player,data[2],this.enemyList);

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

                    this.audioDict["sword"].currentTime = 0;
                    this.audioDict["sword"].play();
                     
                    e.damage(this.player.actionNow[2]);
                    this.player.attackedE.push(e);
                    
                }
            
            }
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

    /*
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
      */

    }


export default BattleScene;