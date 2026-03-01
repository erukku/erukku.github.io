import Position from "./Position.js"

class ConvertPos{
    constructor(){

    }

    convert(chara){
        chara.graphic.x = 60*(chara.position.y/200) + chara.position.x*((630 - 60*(chara.position.y/100))/630);
        
        //chara.graphic.y =  - 80*(chara.position.y/100);
        chara.graphicMain.y =  - 80*(chara.position.y/100) - (chara.position.z);
        chara.graphicShadow.scale.y = 1/(2+chara.position.z/40);
        chara.graphicShadow.scale.x = 2/(2+chara.position.z/40);
        //chara.graphicShadow.x =  (1 - chara.graphicShadow.scale.x)*15 ;
        //chara.graphicShadow.y =  - 80*(chara.position.y/100) + (1 - chara.graphicShadow.scale.y)*30 ;
        chara.graphicShadow.y =  - 80*(chara.position.y/100) + 30
        //chara.graphicShadow.scale.y = 1/(1+chara.position.z/10);
        //console.log(chara.graphicShadow.y,chara.position.z);
        chara.graphic.sortableChildren = true;
        chara.graphic.zIndex = 101 - chara.position.y;
        //chara.graphic.zIndex = chara.position.y;
        //chara.graphicMain.zIndex = chara.position.y;
        //console.log(chara.position.y);
    }   
}

export default ConvertPos;