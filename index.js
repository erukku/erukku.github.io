import {Application, Sprite} from 'pixi.js';

const SCREEN_WIRDH = "480";
const SCREEN_HEIGHT = "360";

let app = new Application(SCREEN_WIRDH,SCREEN_HEIGHT,{backgroundColor : 0x1099bb})

document.body.appendChild(app.view);

