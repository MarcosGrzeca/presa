function Predador(numero) {
	this.animal = new Animal();
	this.numero = numero;

	this.gerarPosicaoAleatoria = function() {
		this.animal.gerarPosicaoAleatoria();
		Ambiente.setPosicao(this);
		
	}

	this.getPosicao = function() {
		return this.animal.posicao;
	}

	this.getNumero = function() {
		return this.numero;
	}

	this.move = function() {
		var random = gerarRandomico(4, 1);
		if (random == 4) {
			var posicoes = this.animal.moverParaDireita();
		} else if (random == 1) {
			var posicoes = this.animal.moverParaEsquerda();
		} else if (random == 2) {
			var posicoes = this.animal.moverParaCima();
		} else if (random == 3) {
			var posicoes = this.animal.moverParaBaixo();
		}
		this.setPosicao(posicoes.linha, posicoes.coluna);
	}

	this.setPosicao = function(linha, coluna) {
		Ambiente.limparPosicao(this.getPosicao().linha, this.getPosicao().coluna);
		this.animal.setPosicao(linha, coluna);
		Ambiente.setPosicao(this);
	}
}