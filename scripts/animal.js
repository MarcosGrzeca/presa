function Animal() {
	this.posicao = {};
	this.velocidade = 1;
	this.duracaoVelocidade = 1;
	
	this.gerarPosicaoAleatoria = function() {
		var posicaoInvalida = true;
		while (posicaoInvalida) {
			var linha = gerarRandomico((Ambiente.nroLinhas - 1), 0);
			var coluna = gerarRandomico((Ambiente.nroColunas - 1), 0);
			var objeto = Ambiente.getPosicao(linha, coluna);
			if (objeto == 0) {
				posicaoInvalida = false;
				this.posicao = {"linha" : linha, "coluna" : coluna};
				return {"linha" : linha, "coluna" : coluna};
			}
		}
	}

	this.getPosicao = function() {
		return this.posicao;
	}

	this.setPosicao = function(linha, coluna) {
		this.posicao = {"linha" : linha, "coluna" : coluna};
	}

	this.moverParaDireita = function() {
		if (this.posicao.coluna == (Ambiente.nroColunas - 1)) {
			return {"linha" : this.posicao.linha, "coluna" : 0};
		} else {
			return {"linha" : this.posicao.linha, "coluna" : this.posicao.coluna + 1};
		}
	}

	this.moverParaEsquerda = function() {
		if (this.posicao.coluna == 0) {
			return {"linha" : this.posicao.linha, "coluna" : Ambiente.nroColunas - 1};
		} else {
			return {"linha" : this.posicao.linha, "coluna" : this.posicao.coluna - 1};
		}
	}

	this.moverParaBaixo = function() {
		if (this.posicao.linha == (Ambiente.nroLinhas - 1)) {
			return {"linha" : 0, "coluna" : this.posicao.coluna};
		} else {
			return {"linha" : this.posicao.linha + 1, "coluna" : this.posicao.coluna};
		}
	}

	this.moverParaCima = function() {
		if (this.posicao.linha == 0) {
			return {"linha" : (Ambiente.nroLinhas - 1), "coluna" : this.posicao.coluna};
		} else {
			return {"linha" : this.posicao.linha - 1, "coluna" : this.posicao.coluna};
		}
	}

	this.moverParaDireitaSuperior = function() {
		var pos = this.moverParaDireita();
		if (pos.linha == 0) {
			return {"linha" : (Ambiente.nroLinhas - 1), "coluna" : pos.coluna};
		} else {
			return {"linha" : pos.linha - 1, "coluna" : pos.coluna};
		}
	}

	this.moverParaDireitaInferior = function() {
		var pos = this.moverParaDireita();
		if (pos.linha == (Ambiente.nroLinhas - 1)) {
			return {"linha" : 0, "coluna" : pos.coluna};
		} else {
			return {"linha" : pos.linha + 1, "coluna" : pos.coluna};
		}
	}

	this.moverParaEsquerdaSuperior = function() {
		var pos = this.moverParaEsquerda();
		if (pos.linha == 0) {
			return {"linha" : (Ambiente.nroLinhas - 1), "coluna" : pos.coluna};
		} else {
			return {"linha" : pos.linha - 1, "coluna" : pos.coluna};
		}
	}

	this.moverParaEsquerdaInferior = function() {
		var pos = this.moverParaEsquerda();
		if (pos.linha == (Ambiente.nroLinhas - 1)) {
			return {"linha" : 0, "coluna" : pos.coluna};
		} else {
			return {"linha" : pos.linha + 1, "coluna" : pos.coluna};
		}
	}

	this.getCampoPercepcao = function() {
		var percepcoes = {};
		percepcoes.cima = {"objeto" : Ambiente.getPosicaoObjetoAnterior(this.moverParaCima()), "posicao" : this.moverParaCima()};
		percepcoes.baixo = {"objeto" : Ambiente.getPosicaoObjetoAnterior(this.moverParaBaixo()), "posicao" : this.moverParaBaixo()};
		percepcoes.direita = {"objeto" : Ambiente.getPosicaoObjetoAnterior(this.moverParaDireita()), "posicao" : this.moverParaDireita()};
		percepcoes.esquerda = {"objeto" : Ambiente.getPosicaoObjetoAnterior(this.moverParaEsquerda()), "posicao" : this.moverParaEsquerda()};
		percepcoes.direitaSuperior = {"objeto" : Ambiente.getPosicaoObjetoAnterior(this.moverParaDireitaSuperior()), "posicao" : this.moverParaDireitaSuperior()};
		percepcoes.direitaInferior = {"objeto" : Ambiente.getPosicaoObjetoAnterior(this.moverParaDireitaInferior()), "posicao" : this.moverParaDireitaInferior()};
		percepcoes.esquerdaSuperior = {"objeto" : Ambiente.getPosicaoObjetoAnterior(this.moverParaEsquerdaSuperior()), "posicao" : this.moverParaEsquerdaSuperior()};
		percepcoes.esquerdaInferior = {"objeto" : Ambiente.getPosicaoObjetoAnterior(this.moverParaEsquerdaInferior()), "posicao" : this.moverParaEsquerdaInferior()};
		return percepcoes;
	}
}