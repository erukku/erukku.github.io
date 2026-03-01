class TextInfo{
    constructor(){
        var textArray = new Array();
    }

    getTextInfo(index){
        var textArray = new Array();
        switch(index){
            case 0:
                var text = "どっちを選ぶ？"
                textArray.push(text);
                break

            case 1:
                var text = "アビリティガチャを引く？"
                textArray.push(text);
                break
        }

        var array = new Array(textArray.length);

        textArray = array.concat(textArray);
        return textArray
    }

}


export default TextInfo