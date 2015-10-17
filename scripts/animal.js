function Animal() {
	this.posicao = {};
	this.velocidade = 1;
	this.duracaoVelocidade = 1;
	this.movimentosAnteriores = [];
	
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

	this.getVelocidade = function() {
		return this.velocidade;
	}

	this.setVelocidade = function(velocidade) {
		this.velocidade = velocidade;
	}

	this.getDuracaoVelocidade = function() {
		return this.duracaoVelocidade;
	}

	this.setDuracaoVelocidade = function(duracaoVelocidade) {
		this.duracaoVelocidade = duracaoVelocidade;
	}

	this.setPosicao = function(linha, coluna, movimento) {
		if (!movimento) {
			movimento = "";
		}
		this.addMovimentoAnterior(this.posicao, movimento);
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

	/*	INSTRUÇÕES
		Os quatro movimentos abaixo não podem ser executados em apenas uma iteração, visto que o animal não se move nas diagonais. 
		Mas as funções são utilizadas para obter a percepção do animal nas diagonais
	*/

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
		percepcoes.cima = {"objeto" : Ambiente.getPosicaoObjetoNoMapaAnterior(this.moverParaCima()), "posicao" : this.moverParaCima()};
		percepcoes.baixo = {"objeto" : Ambiente.getPosicaoObjetoNoMapaAnterior(this.moverParaBaixo()), "posicao" : this.moverParaBaixo()};
		percepcoes.direita = {"objeto" : Ambiente.getPosicaoObjetoNoMapaAnterior(this.moverParaDireita()), "posicao" : this.moverParaDireita()};
		percepcoes.esquerda = {"objeto" : Ambiente.getPosicaoObjetoNoMapaAnterior(this.moverParaEsquerda()), "posicao" : this.moverParaEsquerda()};
		percepcoes.direitaSuperior = {"objeto" : Ambiente.getPosicaoObjetoNoMapaAnterior(this.moverParaDireitaSuperior()), "posicao" : this.moverParaDireitaSuperior()};
		percepcoes.direitaInferior = {"objeto" : Ambiente.getPosicaoObjetoNoMapaAnterior(this.moverParaDireitaInferior()), "posicao" : this.moverParaDireitaInferior()};
		percepcoes.esquerdaSuperior = {"objeto" : Ambiente.getPosicaoObjetoNoMapaAnterior(this.moverParaEsquerdaSuperior()), "posicao" : this.moverParaEsquerdaSuperior()};
		percepcoes.esquerdaInferior = {"objeto" : Ambiente.getPosicaoObjetoNoMapaAnterior(this.moverParaEsquerdaInferior()), "posicao" : this.moverParaEsquerdaInferior()};
		return percepcoes;
	}

	this.addMovimentoAnterior = function(posicao, movimento) {
		if (this.movimentosAnteriores.length > 19) {
			this.movimentosAnteriores.shift();
		}
		this.movimentosAnteriores.push({"posicao" : posicao, "movimento" : movimento});
	}

	this.getPosicaoAnterior = function() {
		return this.movimentosAnteriores[this.movimentosAnteriores.length-1].posicao;
	}

	this.isMovimentoValido = function(posicao, numero_casas) { //verificar se andar mais de uma casa
		if (this.movimentosAnteriores.length > 0) {
			var posicaoAnterior = this.movimentosAnteriores[this.movimentosAnteriores.length-1].posicao;
			if (posicao.linha == posicaoAnterior.linha && posicao.coluna == posicaoAnterior.coluna) {
				return false;
			}
		}
		return true;
	}

	this.getMovimentos = function() {
		return this.movimentosAnteriores;
	}
}