import DefaultDict from "./DefaultDict.js";

class LoadDict{
    constructor(){
        this.assets = PIXI.Assets;
        this.loadDict = new DefaultDict(false);

        this.loadPer = 0;
    }


    testLoad(){
        this.setBundle();
        this.load();
    }

    setBundle(){
        
        this.bundle = {
    bundles: [
      {
        name: 'bg',
        assets: [
          {
            alias: 'forest',
            src: 'MCoM/resource/img/bg_forest.png',
          },
          {
            alias: 'forestL',
            src: 'MCoM/resource/img/bg_forestL.png',
        }, 
        {
            alias: 'forestR',
            src: 'MCoM/resource/img/bg_forestR.png',
        }  
        ],
      },
      {
        name: 'stage',
        assets: [
          {
            alias: 'cover',
            src: 'MCoM/resource/img/cover.png',
          },
          {
            alias: 'seat',
            src: 'MCoM/resource/img/seat.png',
          },
        ],
      },
      {
        name: 'player',
        assets: [
          {
            alias: 'player',
            src: 'MCoM/resource/img/player.png',
          },
          {
            alias: 'player2',
            src: 'MCoM/resource/img/player2.png',
          },
          {
            alias: 'player3',
            src: 'MCoM/resource/img/player3.png',
          },
          {
            alias: 'breaked',
            src: 'MCoM/resource/img/p_breaked.png',
          },
          {
            alias: 'walk1',
            src: 'MCoM/resource/img/p_walk1.png',
          },
          {
            alias: 'walk2',
            src: 'MCoM/resource/img/p_walk2.png',
          },
          {
            alias: 'walk3',
            src: 'MCoM/resource/img/p_walk3.png',
          },
          {
            alias: 'walk4',
            src: 'MCoM/resource/img/p_walk4.png',
          },
          {
            alias: 'item1',
            src: 'MCoM/resource/img/p_itemwait.png',
          },
          {
            alias: 'item2',
            src: 'MCoM/resource/img/p_itemuse.png',
          },
          {
            alias: 'magic',
            src: 'MCoM/resource/img/p_magic.png',
          }
        ],
      },
      {
        name: 'enemy',
        assets: [
          {
            alias: 'slime',
            src: 'MCoM/resource/img/slime.png',
          },
          {
            alias: 'slime1',
            src: 'MCoM/resource/img/slime1.png',
          },
          {
            alias: 'slime2',
            src: 'MCoM/resource/img/slime2.png',
          },
        ],  

      },
      {
        name: 'icon',
        assets: [
          {
            alias: 'iconShop',
            src: 'MCoM/resource/img/shop.png',
        },
        {
            alias: 'iconBattle',
            src: 'MCoM/resource/img/battle.png',
        },
        {
            alias: 'iconEvent',
            src: 'MCoM/resource/img/event.png',
        },
        {
            alias: 'iconGoal',
            src: 'MCoM/resource/img/goal.png',
        },
        {
            alias: 'iconBoss',
            src: 'MCoM/resource/img/boss.png',
        }
        ],
    },
    {
        name: 'cardAttack',
        assets: [
          {
            alias: 'cardAttack1',
            src: 'MCoM/resource/img/sword.png',
        },
    ],
    },
    {
        name: 'cardMagic',
        assets: [
            {
            alias: 'cardMagic1',
            src: 'MCoM/resource/img/boushi.png',
        },
    ],
    },
    {
        name: 'magic',
        assets: [
            {
            alias: 'fire',
            src: 'MCoM/resource/img/fire.png',
        },
    ],
    },
    {
        name: 'cardItem',
        assets: [
          {
            alias: 'cardItem1',
            src: 'MCoM/resource/img/medical.png',
        },
    ],
    },
    {
        name: 'shop',
        assets: [
          {
            alias: 'soldout',
            src: 'MCoM/resource/img/soldout.png',
        },
        {
            alias: 'coin',
            src: 'MCoM/resource/img/coin.png',
        }
    ],
    },
    ]
        };
    }

    async load(){
        console.log("load start");

        var bundle = this.bundle;
        console.log({manifest:bundle});
        await this.assets.init({ manifest:bundle });

        
        var alias = [
            'bg',
            'stage',
            'player',
            'enemy',
            'icon',
            'cardAttack',
            'cardMagic',
            'cardItem',
            'magic',
            'shop'
        ]
        var fn = function(err){
            console.log("error",err);
        }
        const This = this;
        console.log("waiting for load...");
        await this.assets.loadBundle(alias, (progress) => {
            console.log(`Loading: ${Math.round(progress * 100)}%`);
            This.loadPer = Math.round(progress * 100);
        }).catch(fn);
        console.log("load end");
    }

}

export default LoadDict;   