class HpBar{
    maxHp;
    hp;
    scene;

    maxHpCon;
    maxHpArc;
    maxHpBar;
    maxHpTop;
    maxHpBottom;

    hpCon;
    hpArc;
    hpBar;


    constructor(maxHp,scene){
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.scene = scene;
        this.assets = PIXI.Assets;

        this.ticker = PIXI.Ticker.shared;

        this.func = null;
        this.timer = 0;
    }

    setGraphic(){
        (async () =>{
        this.maxHpArc = new PIXI.Graphics().arc(0,0,30,(50/180)*Math.PI,(50/180)*Math.PI + (150/180)*Math.PI).stroke({width:20,color:0xaaaaaa});
        this.maxHpBar = new PIXI.Graphics();
        this.maxHpTop = new PIXI.Graphics().beginFill(0xaaaaaa).drawRect(0,0,20,6).endFill();
        
        this.maxHpTop.rotation = Math.PI * (50/180);
        this.maxHpTop.x = 20*Math.cos(Math.PI * (50/180));
        this.maxHpTop.y = 20*Math.sin(Math.PI * (50/180));

        this.maxHpTop.x += 3*Math.cos(Math.PI * ((-90+50)/180));
        this.maxHpTop.y += 3*Math.sin(Math.PI * ((-90+50)/180));

        this.maxHpBottom = new PIXI.Graphics().beginFill(0xaaaaaa).drawRect(0,0,20,4).endFill();
        this.maxHpBottom.rotation = Math.PI * (200/180);
        this.maxHpBottom.x = 20*Math.cos(Math.PI * (200/180));
        this.maxHpBottom.y = 20*Math.sin(Math.PI * (200/180));

        this.maxHpBottom.x -= 1*Math.cos(Math.PI * ((+90+200)/180));
        this.maxHpBottom.y -= 1*Math.sin(Math.PI * ((+90 + 200)/180));

        this.maxHpCon = new PIXI.Container();
    
        this.maxHpCon.addChild(this.maxHpArc);
        this.maxHpCon.addChild(this.maxHpBar);
        this.maxHpCon.addChild(this.maxHpTop);
        this.maxHpCon.addChild(this.maxHpBottom);
        
        
        this.hpArc = new PIXI.Graphics().arc(0,0,30,(50/180)*Math.PI,(50/180)*Math.PI + (150/180)*Math.PI).stroke({width:14,color:0x00ff00});
        this.hpBar = new PIXI.Graphics();
        this.hpCon = new PIXI.Container();
        this.hpDamageCon = new PIXI.Container();

        this.hpCon.addChild(this.hpArc);
        this.hpCon.addChild(this.hpBar);
        
        
        
        //var image = await PIXI.Assets.load("MCoM/resource/img/sword.png");
        
        
        
        var playerIcon = PIXI.Sprite.from('cardAttack1');
        playerIcon.scale.x = playerIcon.scale.y = 0.04;
        playerIcon.x -= 16;
        playerIcon.y -= 24;
        console.log(playerIcon.width);
        this.hpCon.addChild(playerIcon);

        this.scene.addChild(this.maxHpCon);
        this.scene.addChild(this.hpCon);
        this.scene.addChild(this.hpDamageCon);
    })();
    }

    damage(num){
        var preHp = this.hp;
        this.hp = this.hp - num;

        if(this.hp < 0){
            this.hp = 0;
        }
        
        if(this.maxHp >= 150){
            console.log(this.hp,this.maxHp)
            this.hpArc.clear().arc(0,0,30,(50/180)*Math.PI,(50/180)*Math.PI + ((Math.min(1,this.hp/150)) * (150 + 75)/180)*Math.PI).stroke({width:14,color:0x00ff00});
            this.hpBar.clear().beginFill(0x00ff00).drawRect(0,-40 + 3,(( Math.max(150,this.hp)-150)/100)*150,20 - 6).endFill();

            if(this.func == null){
                var damageArc = new PIXI.Graphics().arc(0,0,30,(50/180)*Math.PI + ((this.hp/this.maxHp) * (150 + 75*((this.maxHp-100)/50))/180)*Math.PI,(50/180)*Math.PI + ((preHp/this.maxHp) * (150 + 75*((this.maxHp-100)/50))/180)*Math.PI).stroke({width:14,color:0xff0000});
                var damageBar = new PIXI.Graphics().beginFill(0xff0000).drawRect((( Math.max(150,this.hp)-150)/100)*150,-40 + 3,(( Math.max(150,preHp)-150)/100)*150,20 - 6).endFill();
                this.hpDamageCon.addChild(damageArc);
                this.hpDamageCon.addChild(damageBar);
                var This = this;

                this.func = function(){
                    if(This.timer == 30){
                        This.hpDamageCon.removeChildren();
                        This.ticker.remove(This.func);
                        This.func = null;
                        This.timer = 0;
                    }
                    This.timer = This.timer + 1;
                    
                }

                console.log("damage------------");
                
                
                this.ticker.add(This.func);
            }
            else{
                this.func = null;
                var This = this;

                this.timer = 0;
                this.hpDamageCon.removeChildren();

                console.log("damage----");
                var damageArc = new PIXI.Graphics().arc(0,0,30,(50/180)*Math.PI + ((this.hp/this.maxHp) * (150 + 75*((this.maxHp-100)/50))/180)*Math.PI,(50/180)*Math.PI + ((preHp/this.maxHp) * (150 + 75*((this.maxHp-100)/50))/180)*Math.PI).stroke({width:14,color:0xff0000});
                var damageBar = new PIXI.Graphics().beginFill(0xff0000).drawRect((( Math.max(150,this.hp)-150)/100)*150,-40 + 3,(( Math.max(150,preHp)-150)/100)*150,20 - 6).endFill();
                this.hpDamageCon.addChild(damageArc);
                this.hpDamageCon.addChild(damageBar);
                
                this.func = function(){
                    if(This.timer == 30){
                        This.hpDamageCon.removeChildren();
                        This.ticker.remove(This.func);
                        This.func = null;
                        This.timer = 0;
                    }
                    This.timer = This.timer + 1;
                }

                
                this.ticker.add(This.func);
                
            }
        }
        else{
            this.hpArc.clear().arc(0,0,30,(50/180)*Math.PI,(50/180)*Math.PI + ((this.hp/this.maxHp) * (150 + 75*((this.maxHp-100)/50))/180)*Math.PI).stroke({width:14,color:0x00ff00});

            if(this.func == null){
                var damage = new PIXI.Graphics().arc(0,0,30,(50/180)*Math.PI + ((this.hp/this.maxHp) * (150 + 75*((this.maxHp-100)/50))/180)*Math.PI,(50/180)*Math.PI + ((preHp/this.maxHp) * (150 + 75*((this.maxHp-100)/50))/180)*Math.PI).stroke({width:14,color:0xff0000});
                this.hpDamageCon.addChild(damage);
                var This = this;

                this.func = function(){
                    if(This.timer == 30){
                        This.hpDamageCon.removeChildren();
                        This.ticker.remove(This.func);
                        This.func = null;
                        This.timer = 0;
                    }
                    This.timer = This.timer + 1;
                    
                }

                console.log("damage------------");
                
                
                this.ticker.add(This.func);
            }
            else{
                this.func = null;
                var This = this;

                this.timer = 0;
                this.hpDamageCon.removeChildren();

                console.log("damage----");
                var damage = new PIXI.Graphics().arc(0,0,30,(50/180)*Math.PI + ((this.hp/this.maxHp) * (150 + 75*((this.maxHp-100)/50))/180)*Math.PI,(50/180)*Math.PI + ((preHp/this.maxHp) * (150 + 75*((this.maxHp-100)/50))/180)*Math.PI).stroke({width:14,color:0xff0000});
                this.hpDamageCon.addChild(damage);
                this.func = function(){
                    if(This.timer == 30){
                        This.hpDamageCon.removeChildren();
                        This.ticker.remove(This.func);
                        This.func = null;
                        This.timer = 0;
                    }
                    This.timer = This.timer + 1;
                }

                
                this.ticker.add(This.func);
                
            }
        }


    }

    heal(num){
        this.hp = this.hp + num
        
        if(this.hp > this.maxHp){
            this.hp = this.maxHp;
        }
        
        if(this.hp >= 150){
            this.hpArc.clear().arc(0,0,30,(50/180)*Math.PI,(50/180)*Math.PI + ((1) * (150 + 75)/180)*Math.PI).stroke({width:14,color:0x00ff00});
            this.hpBar.clear().beginFill(0x00ff00).drawRect(0,-40 + 3,((this.hp-150)/100)*150,20 - 6).endFill();
        }
        else{
            this.hpArc.clear().arc(0,0,30,(50/180)*Math.PI,(50/180)*Math.PI + ((this.hp/this.maxHp) * (150 + 75*((this.maxHp-100)/50))/180)*Math.PI).stroke({width:14,color:0x00ff00});
        }
        
    }

    extendHp(num){
        this.maxHp = this.maxHp + num;
        
        //test
        if(this.maxHp >= 250){
            this.maxHp = 250;
        }
        

        console.log(this.maxHp);
        if(this.maxHp > 150){
            this.maxHpArc.clear().arc(0,0,30,(50/180)*Math.PI,(50/180)*Math.PI + ((1) * (150 + 75)/180)*Math.PI).stroke({width:20,color:0xaaaaaa});
            this.maxHpBar.clear().beginFill(0xaaaaaa).drawRect(0,-40,((this.maxHp-150)/100)*150,20).endFill();

            this.maxHpBottom.rotation = (270/180)*Math.PI;
            this.maxHpBottom.x = ((this.maxHp-150)/100)*150;
            this.maxHpBottom.y = -20;
        }
        else{
            this.maxHpArc.clear().arc(0,0,30,(50/180)*Math.PI,(50/180)*Math.PI + ((1) * (150 + 75*((this.maxHp-100)/50))/180)*Math.PI).stroke({width:20,color:0xaaaaaa});
            
            this.maxHpBottom.rotation = ((200 + 75*((this.maxHp-100)/50))/180)*Math.PI;
            this.maxHpBottom.x = 20*Math.cos( ((200 + 75*((this.maxHp-100)/50))/180)*Math.PI);
            this.maxHpBottom.y = 20*Math.sin( ((200 + 75*((this.maxHp-100)/50))/180)*Math.PI);

            this.maxHpBottom.x -= 1*Math.cos( ((+90 + 200 + 75*((this.maxHp-100)/50))/180)*Math.PI);
            this.maxHpBottom.y -= 1*Math.sin( ((+90 + 200 + 75*((this.maxHp-100)/50))/180)*Math.PI);
        }


    }



}

export default HpBar;