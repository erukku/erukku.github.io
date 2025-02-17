
(async () =>
{
    const app = new PIXI.Application({antialias: true,
        autoDensity: true,});

    await app.init({ width: 375, height: 667 ,backgroundColor: 0xffffff});

    document.body.appendChild(app.canvas);

    var flame = new PIXI.Graphics().roundRect(0,0,app.canvas.width,app.canvas.height,20).fill(0xaaaaaa);

    var display = new PIXI.Graphics().roundRect(10,10,app.canvas.width-20,app.canvas.height-20,20).fill(0x000000);

    var container = new PIXI.Container();

    container.addChild(flame);
    container.addChild(display);
    app.stage.addChild(container);

})();