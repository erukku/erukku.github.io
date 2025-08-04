class Route{
    constructor(scene){
        this.route = null;
        this.now = [0,0];

        this.scene = scene;

        this.count = 0;
    }

    setRoute(length){
        this.length = length;
        this.route = new Array();

        this.route.push(["start"]);

        for(var i = 0;i < this.length;i++){
            var data = new Array();
            var randomNum = Math.random();
            var num = Math.floor(randomNum / 0.334) + 1;
            for(var j = 0; j < num;j++){
                data.push("battle");
            }
            this.route.push(data);
        }

        //this.route.push(["boss"])

        this.route.push(["end"]);
    }

    setGraphic(){
        this.graphicContainer = new PIXI.Container();

        this.underMap = new PIXI.Graphics().beginFill(0xF5D88E).drawRect(20, 20, 20 + 100 * (this.length+1) + 60, 180).endFill();
        this.graphicContainer.addChild(this.underMap);

        this.pointList = new Array();
        this.iconList = new Array();
        this.lineList = new Array();
        this.lineNumList = new Array();

        this.playerIcon = new PIXI.Graphics().circle(0,0,20).fill(0xFFFFFF);


        this.playerIcon.x = 60 + 100*(0);
        this.playerIcon.y = 20 + 160/this.route[0].length * (0+1) - 160/this.route[0].length/2 ;
        this.underMap.addChild(this.playerIcon);
        this.playerIcon.zIndex = 100;

        //console.log(this.route);

        for(var i = 0;i < this.length+2;i++){
            var data = new Array();
            var icons = new Array();
            var lines = new Array();
            var lineNums = new Array();
            for(var j = 0;j < this.route[i].length;j++){
                
                var circle = new PIXI.Graphics().circle(0,0,20);
                var icon = null;
                circle.scale.y = 0.3;
                switch(this.route[i][j]){
                    case "start":
                        circle.fill(0x0030D9);
                        //icon = new PIXI.Graphics().circle(0,0,20).fill(0xFFFFFF);
                        icon = new PIXI.Graphics();
                        break;

                    case "end":
                        circle.fill(0xFEFF00);
                        icon = new PIXI.Graphics().circle(0,0,20).fill(0xFFFFFF);
                        break;
                    
                    case "battle":
                        circle.fill(0xFF002A);
                        icon = new PIXI.Graphics().rect(-20,-20,40,40).fill(0xFFFFFF);
                        break;
                }

                data.push(circle);
                icons.push(icon);

                var lineNext = new Array();
                var nextNum = new Array();
                if(i+1 != this.route.length){
                    for(var k = 0;k<this.route[i+1].length;k++){
                        var boarder = 0;
                        if(j != 0){
                            boarder = 20 + 160/this.route[i].length * (j) - 160/this.route[i].length/2 +20;
                        }
                        var upper = 200;
                        if(j != this.route[i].length-1){
                            upper = 20 + 160/this.route[i].length * (j+2) - 160/this.route[i].length/2 +20;
                        }
                        var next = 20 + 160/this.route[i+1].length * (k+1) - 160/this.route[i+1].length/2 +20
                        if(boarder <= next && next <= upper){
                            var x1 = 60 + 100*(i);
                            var y1 = 20 + 160/this.route[i].length * (j+1) - 160/this.route[i].length/2 +20;

                            var x2 = 60 + 100*(i+1);

                            var line = new PIXI.Graphics().moveTo(x1,y1).lineTo(x2,next).stroke({width:7, color: 0xffffff, pixelLine: true });
                            line.tint = 0x188744;
                            lineNext.push(line);
                            nextNum.push(k);

                            this.underMap.addChild(line);
                        }

                    }
                }
                lines.push(lineNext);
                lineNums.push(nextNum);

                circle.x = 60 + 100*(i);
                circle.y = 20 + 160/this.route[i].length * (j+1) - 160/this.route[i].length/2 +20;

                icon.x = 60 + 100*(i);
                icon.y = 20 + 160/this.route[i].length * (j+1) - 160/this.route[i].length/2 ;

                this.underMap.addChild(circle);
                this.underMap.addChild(icon);
            }
            
            this.pointList.push(data);
            this.iconList.push(icons);
            this.lineList.push(lines);
            this.lineNumList.push(lineNums);
        }

        //console.log("end");
        this.addCount(0);

    }

    addCount(num){
        var before = this.count;
        console.log(this.now);
        this.count += num;
        this.count += this.lineList[this.now[0]][this.now[1]].length;
        this.count %= this.lineList[this.now[0]][this.now[1]].length;
        console.log(this.lineList[this.now[0]+1][this.now[1]]);
        this.enLine(before,this.count);
    }

    enLine(before,after){
        console.log(this.lineList[this.now[0]][this.now[1]][before].strokeStyle);
        //var beforeStyle = new PIXI.StrokesStyle({color:0x188744});
        this.lineList[this.now[0]][this.now[1]][before].tint = 0x188744;

        //var afterStyle = new PIXI.FillStyle({color:0x00ff00});
        this.lineList[this.now[0]][this.now[1]][after].tint = 0x00ff00;
    }

    selectWay(){
        var next = [this.now[0]+1,this.lineNumList[this.now[0]][this.now[1]][this.count]];
        this.now = next;
        return this.route[this.now[0]][this.now[1]];
    }

    setContainer(container){
        container.addChild(this.graphicContainer);
        //console.log("end");
    }

    removeContainer(container){
        container.removeChild(this.graphicContainer);
        //console.log("end");
    }

    movePlayerIcon(){
        var po = this.iconList[this.now[0]][this.now[1]]
        this.playerIcon.x = po.x;
        this.playerIcon.y = po.y;
        this.iconList[this.now[0]][this.now[1]].destroy();
    }
}

export default Route;