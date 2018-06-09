//Aqui contem a definção dos objetos como jogador, inimigos e blocos

class Figura {
    constructor(blocoW = 0, blocoH, sprite) {
        this.BlocoW = blocoW;
        this.BlocoH = blocoH;
        this.sprite = sprite;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.BlocoW, this.BlocoH);
    }
    update(dt) {

    }
};

class Agua extends Figura {
    constructor() {
        super(1, 1, 'images/water-block.png')
    }
}

class Pedra extends Figura {
    constructor() {
        super(1, 1, 'images/stone-block.png')
    }
}

class Grama extends Figura {
    constructor() {
        super(1, 1, 'images/grass-block.png')
    }
}

class Enemy extends Figura {
    constructor(x, y, movimento = 1) {
        super(x, y, 'images/enemy-bug.png')
        this.movimento = movimento;
    }
    update(dt) {
        if (this.BlocoW >= mapa.CanvasW()) {
            this.BlocoW = 0;
            this.movimento = moviAleatorio();
            this.BlocoH = PosicaoInicialInimigoH();
            return;
        }
        this.BlocoW += this.movimento * dt;
        // console.log(this.blocoW);
    }
}

class Player extends Figura {
    constructor(blocoW, blocoH, movimento = 1) {
        super(blocoW, blocoH, 'images/char-boy.png')
        this.direcao = '';
        this.vidas = 7;
        this.Score = 0;
    }
    update() {
        switch (this.direcao) {
            case 'up':
                this.BlocoH = this.BlocoH - Height;
                break;
            case 'down':
                if (this.BlocoH + Height >= (mapa.CanvasH() - (Height + mapa.MargemButtonTOp))) { return; }
                this.BlocoH = this.BlocoH + Height;
                break;
            case 'left':
                if (this.BlocoW == 0) { return; }
                this.BlocoW = this.BlocoW - Width;
                break;
            case 'right':
                if (this.BlocoW >= (mapa.CanvasW() - Width)) { return; }
                this.BlocoW = this.BlocoW + Width;
                break;
            default:
                break;
        }
        this.direcao = '';
    }
    handleInput(e) {
        this.direcao = e;
    }
    reset() {
        this.BlocoW = (mapa.Colunas * Width) / 2;
        this.BlocoH = ((mapa.Linhas - AjusteFigura) * Height) + 20;
        console.log(player);
        console.log(mapa);
    }

    Reiniciar() {
        this.vidas = 7;
        this.Score = 0;
        this.reset();
    }
}