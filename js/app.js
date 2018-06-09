
//#region Carrega Mapa e painel


let linha = [];
let coluna = [];
let quadros = [];

var agua = new Agua();
var pedra = new Pedra();
var grama = new Grama();

linha.push(agua);//1
linha.push(pedra);//2
linha.push(pedra);//3
linha.push(pedra);//4
linha.push(pedra);//5
linha.push(grama);//7

coluna.push(linha);

for (let i = 0; i < 10; i++) {
    quadros.push(coluna);
}

let mapa = new Mapa(linha.length, quadros.length);
let painel = new Painel();

//#endregion

//#region Carrega Jogador e Inimigos

var allEnemies = [];
CarregaInimigos();

let player = new Player((mapa.Colunas * Width) / 2, ((mapa.Linhas - AjusteFigura) * Height) + 20);

//#endregion

//#region Funções Auxiliares

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function moviAleatorio(level = 1) {
    let aceleracao = (20 * (level) / 2);
    return Math.floor(Math.random() * (50 - 5) + aceleracao);
}

function PosicaoInicialInimigoH() {
    const random = (Height * Math.floor(Math.random() * 4 + 0));
    return random;
}

function PosicaoInicialInimigoW() {
    const random = (Width * Math.floor(Math.random() * mapa.Colunas + 0));
    return random;
}

function CarregaInimigos() {
    allEnemies = [];
    const level = mapa.Level <= NiveisDoJogo.length ? NiveisDoJogo[mapa.Level-1] : nivel1;

    for (let i = 0; i < level.Inimigos; i++) {
        let enemy = new Enemy(PosicaoInicialInimigoW(), PosicaoInicialInimigoH(), moviAleatorio(level.Level));
        allEnemies.push(enemy);
    }
}

function ColisaoDetectada() {
    player.vidas--;
    player.Score = 0;
    mapa.Level = 1;

    painel.AtualizaVida(player.vidas);
    painel.AtualizaScore(player.Score);
    painel.AtualizaLevel(mapa.Level);
    CarregaInimigos();

    if (player.vidas == 0) {
        alert("Game Over!");

        ReinicarJogo();

        return;
    }

    player.reset();
}

function ReinicarJogo() {

    mapa.Reiniciar();
    player.Reiniciar();
    painel.AtualizaVida(player.vidas);
    painel.AtualizaScore(player.Score);
    painel.AtualizaLevel(mapa.Level);
    CarregaInimigos();
}

//#endregion




