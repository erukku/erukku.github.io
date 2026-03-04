import { Assets } from "pixi.js";


class LoadScene {

    constructor() {

    }

    setBundle() {
        Assets.addBundle('titleAssets', {
            bg: '/secondRPG/resource/img/title_bg.png',
            button: '/secondRPG/resource/img/button.png',
        });
    }

    test() {

    }


}

export default LoadScene;