function Presa(numero) {
	this.animal = new Animal();
	this.numero = numero;
	this.modoFuga = false;
	this.qualidade = 1; //-3 a 3
	this.intensidade = 1; //0 a 3

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
		var movimenta = gerarRandomico(2, 1);
		//if (movimenta == 2) {
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
			var posicoes = this.animal.moverParaBaixo();
			this.setPosicao(posicoes.linha, posicoes.coluna);
		//}
	}

	this.setPosicao = function(linha, coluna) {
		if (Ambiente.getPosicao(linha, coluna) == 0) {
			Ambiente.limparPosicao(this.getPosicao().linha, this.getPosicao().coluna);
			this.animal.setPosicao(linha, coluna);
			Ambiente.setPosicao(this);
		}
	}	
}