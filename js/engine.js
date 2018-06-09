var Engine = (function (global) {

    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    painel.AtualizaVida(player.vidas);
    painel.AtualizaScore(player.Score);
    painel.AtualizaLevel(mapa.Level);

    canvas.width = mapa.CanvasW();
    canvas.height = mapa.CanvasH() + mapa.MargemButtonTOp;
    doc.body.appendChild(canvas);

    function main() {

        var now = Date.now(),
            dt = (now - lastTime) / 100

        update(dt);
        render();

        lastTime = now;

        win.requestAnimationFrame(main);
    }

    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
        checkCollisions();
        AtualizaNivel();
    }

    function checkCollisions() {
        allEnemies.forEach(function (enemy) {
            if (player.BlocoH + 55 < enemy.BlocoH + 135 &&
                player.BlocoW + 80 > enemy.BlocoW + 30 &&
                player.BlocoH + 100 > enemy.BlocoH + 75 &&
                player.BlocoW + 20 < enemy.BlocoW + 70) {

                ColisaoDetectada();
            }
        });
    }

    function AtualizaNivel() {
        if (player.BlocoH < 0) {
            mapa.Level++;
            player.Score += 100;
            painel.AtualizaScore(player.Score);
            painel.AtualizaLevel(mapa.Level);
            player.reset();

            if (NiveisDoJogo.length < mapa.Level) {
                alert("Você venceu o jogo!");
                ReinicarJogo();
                return;
            }

            CarregaInimigos();
        }
    }

    function updateEntities(dt) {
        allEnemies.forEach(function (enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    function render() {

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        mapa.DesenharMapa(quadros);

        renderEntities();
    }

    function renderEntities() {

        allEnemies.forEach(function (enemy) {
            enemy.render();
        });

        player.render();
    }

    function reset() {

    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);

    Resources.onReady(init);

    global.ctx = ctx;
})(this);
