class HpBar{
    maxHp;
    hp;
    scene;

    maxHpCon;
    maxHpArc;
    maxHpBars;
    nowHpBar;
    maxHpTop;
    maxHpBottom;

    hpCon;
    hpArc;
    hpBar;


    constructor(maxHp,scene){
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.scene = scene;

        this.hpBarsNum = 0;
        this.maxHpBars = new PIXI.Container();

        this.maxHpBars.x = 500;
        this.maxHpBars.y = 30;

        this.redBar = null;

        this.ticker = PIXI.Ticker.shared;
    }

    setGraphic(){
        this.hpBarsNum = Math.ceil(this.maxHp/100);
        (async () =>{
        
            for(var i = 0;i < this.hpBarsNum;i++){
                var hpContainer = new PIXI.Container();
                var maxHpFlame = new PIXI.Graphics().rect(0,0,110,30).fill(0xaaaaaa);
                var maxHpBar =  new PIXI.Graphics().rect(0,0,100,20).fill(0x000000);
                var perHp = this.maxHp - i*100;
                if(perHp > 100){
                    perHp = 100;
                }
                var hpBar = new PIXI.Graphics().rect(0,0,100 * (perHp/100),20).fill(0x00ff00);
                hpBar.x = 5;
                hpBar.y = 5;

                maxHpBar.x = 5;
                maxHpBar.y = 5;
        
                hpContainer.addChild(maxHpFlame);
                hpContainer.addChild(maxHpBar);
                hpContainer.addChild(hpBar);

                if(i != this.hpBarsNum-1){
                    hpContainer.visible = false;
                }
                this.maxHpBars.addChild(hpContainer);
            }
        this.scene.addChild(this.maxHpBars);
    })();
        this.maxHpBars.visible = false;
    }

    damage(num){


        if(this.hp - num <= 0){
            num = this.hp;
        }

        for(var i = Math.ceil(this.hp / 100);i >= Math.ceil((this.hp - num) / 100);i--){
            var ii = i - 1;
            if(ii == -1){
                continue;
            }
            var hpBar = this.maxHpBars.getChildAt(ii).getChildAt(2);

            var perHp = (this.hp - num) - ii*100;


            if(perHp > 100){
                perHp = 100;
            }
            else if(perHp <= 0){
                perHp = 0;
                this.maxHpBars.getChildAt(ii).visible = false;
            }
            else{
                this.maxHpBars.getChildAt(ii).visible = true;
            }


            var prePerHp = this.hp - ii*100;

            if(prePerHp > 100){
                prePerHp = 100;
            }
            else if(prePerHp < 0){
                prePerHp = 0;
            }

            /*
            if(this.redBar == null){
                var bar = new PIXI.Graphics().hpBar.clear().rect(100 * (perHp/100),0,100 * (prePerHp/100),20).fill(0xff0000);

                var func = function(bar){


                }

            }
            else{


            }
            */

            hpBar.clear().rect(0,0,100 * (perHp/100),20).fill(0x00ff00);

        }

        this.hp = this.hp - num;

        this.maxHpBars.visible = false;
        
    }

    heal(num){

        if(this.hp + num >= this.maxHp){
            num = this.maxHp - this.hp;
        }

        for(var i = Math.ceil(this.hp / 100);i <= Math.ceil((this.hp + num) / 100);i++){
            var ii = i - 1;
            if(ii == -1){
                continue;
            }
            var hpBar = this.maxHpBars.getChildAt(ii).getChildAt(2);

            var perHp = (this.hp + num) - ii*100;
            if(perHp > 100){
                perHp = 100;
                this.maxHpBars.getChildAt(ii).visible = false;
            }
            else{
                this.maxHpBars.getChildAt(ii).visible = true;
            }

            hpBar.clear().rect(0,0,100 * (perHp/100),20).fill(0x00ff00);

        }

        this.hp = this.hp + num;
        this.maxHpBars.getChildAt(ii).visible = true;

        this.maxHpBars.visible = false;
        
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