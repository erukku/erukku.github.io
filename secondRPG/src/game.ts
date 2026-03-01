import { Application } from 'pixi.js';
import ManageScene from './base/ManageScene';

(async () => {
    // 1. インスタンス作成（引数は空でOK）
    const app = new Application();

    // 2. v8では init メソッドにすべての設定を集約します
    await app.init({
        // 固定値（width/height）は書かず、windowを指定
        resizeTo: window,
        antialias: true,
        backgroundColor: 0x1099bb,
        // スマホの綺麗な画面（Retina等）に対応
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
    });

    // 3. DOMへの追加
    // getElementsByClassName は配列（HTMLCollection）を返すので、
    // 確実に存在することを確認してから appendChild します
    const container = document.getElementsByClassName('col')[0];
    if (container) {
        container.appendChild(app.canvas);
    } else {
        console.error('Target container ".col" not found!');
        // 見つからない場合は暫定的にbodyに追加して確認
        document.body.appendChild(app.canvas);
    }


    const scenemanager:ManageScene = new ManageScene(app.stage,app);
    scenemanager.test(); 


})();
