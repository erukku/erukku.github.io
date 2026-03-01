class RandomInt{
    constructor(){

    }

    getRandomInt(min,max){
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // 上限を含み、下限も含む
    }

}

export default RandomInt;