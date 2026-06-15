import { Container, Application, Graphics, Sprite, TextStyle, Text, Point } from "pixi.js";
import ManageScene from "../base/ManageScene";
import type Player from "../base/Player";



class GameScene {

    private app: Application;
    private stage: Container;
    private player: Player;
    private manager: ManageScene;
    private sceneList: Container[];
    private sceneIndex: number;
    private scene: Container;

    constructor(stage: Container, app: Application, player: Player, manager: ManageScene) {
        this.app = app;
        this.stage = stage;
        this.player = player;
        this.manager = manager;

        this.manager;

        this.sceneList = [];
        this.sceneIndex = 0;

        this.scene = new Container();
        this.stage.addChild(this.scene);


    }


    test() {
        this.setHome();
        this.setEquip();
        this.setSkill();
        this.setDungeon();
        this.setGacha();

        this.setUnderBar();

    }

    setHome() {
        const scene: Container = new Container();
        this.sceneList.push(scene);
    }

    setEquip() {
        const scene: Container = new Container();


        const select: Container = new Container();

        for (var i = 0; i < 3; i++) {
            var container = new Container();
            var button = new Graphics().roundRect(0, 0, this.app.screen.width / 2, this.app.screen.height / 9, 10).fill(0xffffff);
            var text = new Text();
            switch (i) {
                case 0:
                    text = new Text('weapon', new TextStyle({ fontFamily: 'DenkiChipFont', fontSize: this.app.screen.height / 18 }));
                    break;
                case 1:
                    text = new Text('armor', new TextStyle({ fontFamily: 'DenkiChipFont', fontSize: this.app.screen.height / 18 }));
                    break;
                case 2:
                    text = new Text('acce', new TextStyle({ fontFamily: 'DenkiChipFont', fontSize: this.app.screen.height / 18 }));
                    break;
            }
            text.anchor.x = text.anchor.y = 0.5;

            button.x = - button.width / 2;
            button.y = - button.height / 2;

            container.addChild(button);
            container.addChild(text);

            button.interactive = true;
            (button as any).buttonMode = true;

            button.on('pointerdown', () => 1);



            container.x = this.app.screen.width / 2;
            container.y = this.app.screen.height / 2 + i * this.app.screen.height / 6;

            select.addChild(container);
            console.log("baa");

        }

        //scene.addChild(select);
        scene.addChild(select);
        scene.visible = false;

        this.scene.addChild(scene)

        this.sceneList.push(scene);
    }

    setSkill() {
        //const scene: Container = new Container();
        //this.sceneList.push(scene);

        const scene = new Container();
        // 変数定義（マス目のサイズなど）
        const cellSize = 60; // 1マスのサイズ
        const offsetX = this.app.screen.width / 2 - (3 * cellSize) / 2; // グリッドを中央に寄せるためのX座標
        const offsetY = this.app.screen.height / 3;
        // 1. 砂時計のマス目（仮のPlayer.glassデータ）を描画する
        const glassData = [
            [-1, 0, -1],  // 0が配置可能なマス（実際のコードでは null などを想定）
            [0, 0, 0],
            [0, 0, 0]
        ];
        const gridContainer = new Container();
        gridContainer.x = offsetX;
        gridContainer.y = offsetY;
        scene.addChild(gridContainer);
        for (let row = 0; row < glassData.length; row++) {
            for (let col = 0; col < glassData[row].length; col++) {
                // 配置できないマス（-1）はスキップ
                if (glassData[row][col] === -1) continue;
                // 配置可能なマスを四角形で描画
                const cell = new Graphics()
                    .rect(0, 0, cellSize, cellSize)
                    .stroke({ color: 0x888888, width: 2 })
                    .fill({ color: 0xffffff, alpha: 0.1 });

                cell.x = col * cellSize;
                cell.y = row * cellSize;
                gridContainer.addChild(cell);
            }
        }
        // 2. ドラッグ＆ドロップできる「スキル」を作成する
        // ※実際は Player.bag (インベントリ) の配列を回して作ります
        //var skillIcon = new Graphics()
        //    .roundRect(0, 0, cellSize - 4, cellSize - 4, 8)
        //    .fill(0xff0000); // わかりやすく赤色

        const skillIcons = [];

        const posList: any[] = [];

        for (const orb of this.player.orbBag) {
            skillIcons.push(orb.graphic)

            //orbのサイズ次第
            posList.push([[1,1],[-1,-1]])
        }

        

        

        for (let i = 0; i < skillIcons.length; i++) {
            let skillIcon = skillIcons[i];
            //skillIcon.pivot.set((cellSize - 4) / 2, (cellSize - 4) / 2);

            skillIcon.x = this.app.screen.width * (i + 1) / 4;
            skillIcon.y = this.app.screen.height * 0.7;
            scene.addChild(skillIcon);

            skillIcon.eventMode = 'dynamic';
            skillIcon.cursor = 'pointer';

            let isDragging = false;
            let dragOffset = new Point(0, 0);

            skillIcon.on('pointerdown', (e) => {
                isDragging = true;
                // つかんだ場所とアイコンの中心とのズレを記録
                const localPos = e.data.getLocalPosition(scene);
                dragOffset.x = skillIcon.x - localPos.x;
                dragOffset.y = skillIcon.y - localPos.y;

                // つかんだオブジェクトを最前面に出す
                scene.setChildIndex(skillIcon, scene.children.length - 1);
            });

            scene.eventMode = 'dynamic'; // シーン全体で動きを検知する
            scene.on('pointermove', (e) => {
                if (isDragging) {
                    const newPos = e.data.getLocalPosition(scene);
                    skillIcon.x = newPos.x + dragOffset.x;
                    skillIcon.y = newPos.y + dragOffset.y;
                }
            });
            // 指/マウスを離した時（スナップ処理）
            const onDragEnd = () => {
                if (!isDragging) return;
                isDragging = false;
                // スキルの中心座標が、グリッドのどのマス目（行列）の上にあるか計算する
                // gridContainerの座標に対する相対的な位置を求める
                const relativeX = skillIcon.x - gridContainer.x;
                const relativeY = skillIcon.y - gridContainer.y;
                // マス目のインデックス（行・列）を割り出す
                const col = Math.floor(relativeX / cellSize);
                const row = Math.floor(relativeY / cellSize);
                // そのマス目が有効な範囲で、かつ配置可能(-1じゃない)かをチェック
                if (
                    row >= 0 && row < glassData.length &&
                    col >= 0 && col < glassData[row].length &&
                    glassData[row][col] !== -1 &&
                    glassData[row][col] == 0
                ) {
                    // スナップ処理：マスの中心にピタッと移動させる
                    // (Graphicsのpivotを中心に設定しているため、セルの中心座標を代入します)
                    skillIcon.x = gridContainer.x + (col * cellSize) + (cellSize / 2);
                    skillIcon.y = gridContainer.y + (row * cellSize) + (cellSize / 2);

                    // TODO: ここで Player.ts のクラス内のデータを更新する処理を書く
                    // 例: player.glass[row][col] = このスキルオブジェクト;
                    glassData[row][col] = 1;
                    
                    if(posList[i][1][0] != -1 && posList[i][1][1] != -1){
                        glassData[posList[i][1][0]][posList[i][1][1]] = 0;
                        this.player.glass[posList[i][1][0]][posList[i][1][1]] = 0;
                    }
                    posList[i][1] = [row,col];
                    this.player.glass[row][col] = i+1;

                    console.log(`インデックス [${row}][${col}] に配置されました`);
                } else {
                    // 枠外や配置不可マスの場合は元のインベントリの場所に戻す

                    if(row >= 0 && row < glassData.length &&
                    col >= 0 && col < glassData[row].length &&
                    glassData[row][col] !== -1 &&
                    posList[i][1][0] != -1 && posList[i][1][1] != -1){
                        skillIcon.x = gridContainer.x + (posList[i][1][1] * cellSize) + (cellSize / 2);
                        skillIcon.y = gridContainer.y + (posList[i][1][0] * cellSize) + (cellSize / 2);
                    }
                    else{
                        skillIcon.x = this.app.screen.width * (i + 1) / 4;
                        skillIcon.y = this.app.screen.height * 0.7;

                        if(posList[i][1][0] != -1 && posList[i][1][1] != -1){
                             glassData[posList[i][1][0]][posList[i][1][1]] = 0;
                             this.player.glass[posList[i][1][0]][posList[i][1][1]] = 0;
                        }
                        //glassData[posList[i][1][0]][posList[i][1][1]] = 0;
                        posList[i][1] = [-1,-1];
                        

                    }
                    
                }


            };
            skillIcon.on('pointerup', onDragEnd);
            skillIcon.on('pointerupoutside', onDragEnd);

        }

        // ------------------------------------------
        scene.visible = false;
        this.scene.addChild(scene);
        this.sceneList.push(scene);
    }

    setDungeon() {
        const scene: Container = new Container();

        //test
        const dungeon = Sprite.from('dungeon1');

        dungeon.eventMode = 'static';
        dungeon.cursor = 'pointer';

        dungeon.anchor.x = dungeon.anchor.y = 0.5;
        dungeon.x = this.app.screen.width / 2;
        dungeon.y = this.app.screen.height / 2;

        //dungeon.width = this.app.screen.width / 3;
        //dungeon.height = this.app.screen.height / 6;

        dungeon.scale = 1/3;

        dungeon.interactive = true;
        (dungeon as any).buttonMode = true;

        dungeon.on('pointerover', () => dungeon.scale = 1.5/3);
        dungeon.on('pointerout', () => dungeon.scale = 1/3);


        //バトルシーンに移動
        dungeon.on('pointerdown', () => {
            //シーン遷移
            this.scene.visible = false;
            this.manager.startDungeon(this.player);
        });

        scene.addChild(dungeon);
        this.scene.addChild(scene);


        scene.visible = false;

        this.sceneList.push(scene);

    }

    setGacha() {
        const scene: Container = new Container();
        this.sceneList.push(scene);
    }
    setUnderBar() {

        for (var i = 0; i < 5; i++) {
            const button: Container = new Container();

            button.interactive = true;
            (button as any).buttonMode = true;

            const box: Graphics = new Graphics().rect(0, 0, this.app.screen.width / 5, this.app.screen.height / 12).stroke({ color: 0x000000, width: 4 }).fill(0xffffff);


            let icon: Sprite = new Sprite();

            switch (i) {
                case 0:
                    icon = Sprite.from('home');
                    button.on('pointerdown', () => {
                        this.sceneList[this.sceneIndex].visible = false;
                        this.sceneIndex = 0;
                        this.sceneList[this.sceneIndex].visible = true;
                        console.log(this.sceneIndex);
                    });
                    break;
                case 1:
                    icon = Sprite.from('sword');
                    button.on('pointerdown', () => {
                        this.sceneList[this.sceneIndex].visible = false;
                        this.sceneIndex = 1;
                        this.sceneList[this.sceneIndex].visible = true;
                        console.log(this.sceneIndex);
                    });
                    break;
                case 2:
                    icon = Sprite.from('skill');
                    button.on('pointerdown', () => {
                        this.sceneList[this.sceneIndex].visible = false;
                        this.sceneIndex = 2;
                        this.sceneList[this.sceneIndex].visible = true;
                        console.log(this.sceneIndex);
                    });
                    break;
                case 3:
                    icon = Sprite.from('dungeon');
                    button.on('pointerdown', () => {
                        this.sceneList[this.sceneIndex].visible = false;
                        this.sceneIndex = 3;
                        this.sceneList[this.sceneIndex].visible = true;
                        console.log(this.sceneIndex);
                    });
                    break;
                case 4:
                    icon = Sprite.from('gacha');
                    button.on('pointerdown', () => {
                        this.sceneList[this.sceneIndex].visible = false;
                        this.sceneIndex = 4;
                        this.sceneList[this.sceneIndex].visible = true;
                        console.log(this.sceneIndex);
                    });
                    break;
            }


            // 位置・サイズを調整（例）
            icon.width = icon.height = Math.min(this.app.screen.width / 8, this.app.screen.height / 16);
            icon.anchor.x = icon.anchor.y = 0.5;
            icon.x = this.app.screen.width / 10;
            icon.y = this.app.screen.width / 12;

            button.x += this.app.screen.width / 5 * i;
            button.y += this.app.screen.height * 11 / 12;

            // ボタンに追加してステージへ
            button.addChild(box);
            button.addChild(icon);
            this.scene.addChild(button);

        }


    }






}

export default GameScene;


