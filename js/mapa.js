//Aqui se encontra a definição do tamanho dos blocos, o mapa, painel e nivel do jogo

const Width = 100;
const Height = 81;
const AjusteFigura = 2;

class Mapa {
    constructor(linhas, colunas) {
        this.Linhas = linhas;
        this.Colunas = colunas;
        this.BlocoW = Width;
        this.BlocoH = Height;

        this.MargemButtonTOp = 47;

        this.Level = 1;
    }

    CanvasH() {
        return this.Linhas * this.BlocoH ;
    }

    CanvasW() {
        return this.Colunas * this.BlocoW;
    }

    DesenharMapa(Quadros) {
        let l = 0;
        let c = 0;

        Quadros.forEach(linha => {
            linha.forEach(coluna => {
                coluna.forEach(figura => {
                    ctx.drawImage(Resources.get(figura.sprite), l * this.BlocoW, c * this.BlocoH - this.MargemButtonTOp);
                    c++;
                });
                l++;
                c = 0;
            });
        })
    }

    Reiniciar() {
        this.Level = 1;
    }
}

class Nivel {
    constructor(level, inimigos) {
        this.Level = level;
        this.Inimigos = inimigos;
    }
}

class Painel {
    constructor() {
        this.VidaElement = document.getElementById('vidas');
        this.ScoreElement = document.getElementById('score');
        this.LevelElement = document.getElementById('level');
    }

    AtualizaVida(vidas) {
        this.VidaElement.innerHTML = `VIDAS: ${vidas}`;
    }

    AtualizaScore(score) {
        this.ScoreElement.innerHTML = `SCORE: ${score}`;
    }

    AtualizaLevel(level) {
        this.LevelElement.innerHTML = `LEVEL: ${level}`;
    }
}

const NiveisDoJogo = []

//#region Instacia de cada nivel do jogo 
let nivel1 = new Nivel(1, 5);
let nivel2 = new Nivel(2, 6);
let nivel3 = new Nivel(3, 7);
let nivel4 = new Nivel(4, 8);
let nivel5 = new Nivel(5, 9);
let nivel6 = new Nivel(6, 12);
let nivel7 = new Nivel(7, 14);
let nivel8 = new Nivel(8, 16);
let nivel9 = new Nivel(9, 18);
let nivel10 = new Nivel(10, 20);
//#endregion

//#region Adiciona os niveis ao jogo
NiveisDoJogo.push(nivel1);
NiveisDoJogo.push(nivel2);
NiveisDoJogo.push(nivel3);
NiveisDoJogo.push(nivel4);
NiveisDoJogo.push(nivel5);
NiveisDoJogo.push(nivel6);
NiveisDoJogo.push(nivel7);
NiveisDoJogo.push(nivel8);
NiveisDoJogo.push(nivel9);
NiveisDoJogo.push(nivel10);
//#endregion


