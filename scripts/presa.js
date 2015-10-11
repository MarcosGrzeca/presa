function Presa(numero) {
	this.animal = new Animal();
	this.numero = numero;
	this.modoFuga = false;
	this.qualidade = 1; //-3 a 3
	this.intensidade = 1; //0 a 3
	this.iteracoesLivre = 2; //quantidade de iteracoes ate comecar alterar emocoes
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

	this.presaMorre = function() {
		document.getElementById('player').play();
		var posicao = this.getPosicao();
		$("#field_" + posicao.linha + "_" + posicao.coluna).addClass("zebra-morrendo");
		setTimeout(function() {
			$("#field_" + posicao.linha + "_" + posicao.coluna).removeClass("zebra-morrendo");
			document.getElementById('player').stop();
		}, 1000);
	}

	this.move = function() {
		var campoPercepcao = this.animal.getCampoPercepcao();
		var predadores = 0, presas = 0, presasEmFuga = 0;
		var predador1 = false;
		(function(PresaObj) {
			$.each(campoPercepcao, function(key, value){
				if (value.objeto instanceof Predador) {
					predadores++;
					predador1 = value.objeto;
				} else if (value.objeto instanceof Presa && value.objeto != PresaObj) {
					presas++;
					if (value.objeto.modoFuga) {
						presasEmFuga++;
					}
				}
			});
		})(this);
		
		if (predadores >= 4) {
			this.presaMorre();
			return -1;
		} else {
			var livre = false;
			if (this.modoFuga == false) {
				if (predadores == 0 && presas > 0) {
					if (presasEmFuga > 0) {
						this.decQualidade(presasEmFuga);
						this.incIntensidade(presasEmFuga);
					} else {
						this.incQualidade(presas-presasEmFuga);
						livre = true;
					}
				} else if (predadores == 1) {
					this.decQualidade(2);
					this.incIntensidade(2);
				} else if (predadores > 1) {
					this.decQualidade(3);
					this.incIntensidade(3);
				} else if (presas == 0) {
					livre = true;
				}
			} else {
				if (predadores == 0 && presas == 0) {
					livre = true;
				} else if (presas > 0) {
					if (presasEmFuga == 0) {
						livre = true;
					}
				} else if (predadores == 1) { // se estiver em modoFuga deve decrementar qualidade senao fica sempre em -2????
					this.decQualidade(2);
					this.incIntensidade(2);
				} else if (predadores > 1) {
					this.decQualidade(3);
					this.incIntensidade(3);
				}
			}
			if (livre) {
				this.iteracoesLivreCount++;
			} else {
				this.iteracoesLivreCount = 0;
			}
			if (this.iteracoesLivreCount > this.iteracoesLivre) {
				if (this.getQualidade() < 1) {
					this.incQualidade(1);
				}
				this.decIntensidade(1);
			}

			if (this.qualidade < 0) {
				this.modoFuga = true;
			} else {
				this.modoFuga = false;
			}
			
			var movimentoRealizado = false;
			if (predadores > 0) {
				(function(Presa) {
					$.each(campoPercepcao, function(key, value){
						if (!movimentoRealizado) {		
							if (value.objeto instanceof Predador) {
								if (key == "cima") {
									posicoes = Presa.animal.moverParaBaixo();
								} else if (key == "baixo") {
									posicoes = Presa.animal.moverParaCima();
								} else if (key == "direita") {
									posicoes = Presa.animal.moverParaEsquerda();
								} else if (key == "esquerda") {
									posicoes = Presa.animal.moverParaDireita();
								} else if (key == "esquerdaInferior") {
									if (gerarRandomico(2, 1) == 2) {
										posicoes = Presa.animal.moverParaDireita()
									} else {
										posicoes = Presa.animal.moverParaCima();
									}
								} else if (key == "direitaInferior") {
									if (gerarRandomico(2, 1) == 2) {
										posicoes = Presa.animal.moverParaEsquerda();
									} else {
										posicoes = Presa.animal.moverParaCima();
									}
								} else if (key == "direitaSuperior") {
									if (gerarRandomico(2, 1) == 2) {
										posicoes = Presa.animal.moverParaEsquerda();
									} else {
										posicoes = Presa.animal.moverParaBaixo();
									}
								} else if (key == "esquerdaSuperior") {
									if (gerarRandomico(2, 1) == 2) {
										posicoes = Presa.animal.moverParaDireita();
									} else {
										posicoes = Presa.animal.moverParaBaixo();
									}
								}
								movimentoRealizado = Presa.setPosicao(posicoes.linha, posicoes.coluna);
							}
						}
					});
					if (!movimentoRealizado) {
						posicoes = Presa.animal.moverParaBaixo();
						movimentoRealizado = Presa.setPosicao(posicoes.linha, posicoes.coluna);
					}
					if (!movimentoRealizado) {
						posicoes = Presa.animal.moverParaCima();
						movimentoRealizado = Presa.setPosicao(posicoes.linha, posicoes.coluna);
					}
					if (!movimentoRealizado) {
						posicoes = Presa.animal.moverParaDireita();
						movimentoRealizado = Presa.setPosicao(posicoes.linha, posicoes.coluna);
					}
					if (!movimentoRealizado) {
						posicoes = Presa.animal.moverParaEsquerda();
						movimentoRealizado = Presa.setPosicao(posicoes.linha, posicoes.coluna);
					}
				})(this);
			} else {
				var movimenta = gerarRandomico(3, 1);
				if (movimenta > 1 || this.modoFuga) {
					var posicoes;
					while(true) {
						posicoes = this.getRandomPosicao();
						if (this.animal.isMovimentoValido(posicoes)) {
							break;
						}
					}
					movimentoRealizado = this.setPosicao(posicoes.linha, posicoes.coluna);
				}
			}
		}
	}

	this.setPosicao = function(linha, coluna) {
		if (Ambiente.getPosicao(linha, coluna) == 0) {
			Ambiente.limparPosicao(this.getPosicao().linha, this.getPosicao().coluna);
			this.animal.setPosicao(linha, coluna);
			Ambiente.setPosicao(this);
			return true;
		} else {
			return false;
		}
	}

	this.getRandomPosicao = function() {
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
		return posicoes;
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

	this.getVelocidadeFromEmocao = function() {
		return this.qualidade - this.intensidade; //ver calculo da emocao para gerar velocidade
	}

	this.isModoFuga = function() {
		return this.modoFuga;
	}
}