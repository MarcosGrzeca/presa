function Presa(numero) {
	this.animal = new Animal();
	this.numero = numero;
	this.modoFuga = false;
	this.qualidade = 1; //-3 a 3
	this.intensidade = 1; //0 a 3
	this.numIteracoesLivre = 5; //quantidade de iteracoes ate comecar alterar emocoes
	this.iteracoesLivreCount = 0;

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
		var campoPercepcao = this.animal.getCampoPercepcao();
		var predadores = 0, presas = 0, presa1 = false;
		$.each(campoPercepcao, function(key, value){
			if (value.objeto instanceof Predador) {
				predadores++;
			} else if (value.objeto instanceof Presa) {
				presas++;
				presa1 = value.objeto;
			}
		});
		
		if (predadores >= 4) {
			this.morre();
		} else {
			var livre = false;
			if (this.modoFuga == false) {
				if (predadores == 0 && presas > 0) {
					if (presa1.modoFuga == false) { //se tiver mais de uma presa???
						this.incQualidade(1);
						livre = true;
					} else {
						this.decQualidade(1);
						this.incIntensidade(1);
					}
				} else if (predadores == 1) {
					this.decQualidade(2);
					this.incIntensidade(2);
				} else if (predadores > 1) {
					this.decQualidade(3);
					this.incIntensidade(3);
				}
			}
			if (livre) {
				this.iteracoesLivreCount--;
			} else {
				this.iteracoesLivreCount = 0;
			}
			if (this.iteracoesLivreCount > this.numIteracoesLivre) {
				if (this.getQualidade() < 1) {
					this.incQualidade(1);
				}
				this.decIntensidade(1);
			}

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
				//var posicoes = this.animal.moverParaBaixo();
				this.setPosicao(posicoes.linha, posicoes.coluna);
			//}
		}
	}

	this.setPosicao = function(linha, coluna) {
		if (Ambiente.getPosicao(linha, coluna) == 0) {
			Ambiente.limparPosicao(this.getPosicao().linha, this.getPosicao().coluna);
			this.animal.setPosicao(linha, coluna);
			Ambiente.setPosicao(this);
		}
	}

	this.morre = function() {
		Ambiente.removerAnimal(this);
	}

	this.getQualidade = function() {
		return this.qualidade;
	}

	this.getIntensidade = function() {
		return this.intensidade;
	}

	this.incQualidade = function(n) {
		this.qualidade += n;
		if (this.qualidade > 3) {
			this.qualidade = 3;
		}
	}

	this.decQualidade = function(n) {
		this.qualidade -= n;
		if (this.qualidade < -3) {
			this.qualidade = -3;
		}
	}

	this.incIntensidade = function(n) {
		this.intensidade += n;
		if (this.intensidade > 3) {
			this.intensidade = 3;
		}
	}

	this.decIntensidade = function(n) {
		this.intensidade -= n;
		if (this.intensidade < 0) {
			this.intensidade = 0;
		}
	}
}