function Presa(numero) {
	this.animal = new Animal();
	this.numero = numero;
	this.modoFuga = false;
	this.qualidade = 1; //-3 a 3
	this.intensidade = 1; //0 a 3
	this.iteracoesLivre = 2; //quantidade de iteracoes ate comecar alterar emocoes
	this.iteracoesLivreCount = 0;
	this.passosRealizados = 0;
	this.iteracoesFuga = 0;

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

	this.getVelocidade = function() {
		if (this.iteracoesFuga > 8) {
			return 1;
		}
		return this.getVelocidadeFromEmocao();
	}

	this.setVelocidade = function(velocidade) {
		this.animal.setVelocidade(velocidade);
	}

	this.getDuracaoVelocidade = function() {
		return this.animal.getDuracaoVelocidade();
	}

	this.setDuracaoVelocidade = function(duracaoVelocidade) {
		this.animal.setDuracaoVelocidade(duracaoVelocidade);
	}
	this.setPassosRealizados = function(passosRealizados) {
		this.passosRealizados = passosRealizados;
	}
	
	this.presaMorre = function() {
		document.getElementById('player').play();
		var posicao = this.getPosicao();
		$("#field_" + posicao.linha + "_" + posicao.coluna).addClass("zebra-morrendo");
		setTimeout(function() {
			$("#field_" + posicao.linha + "_" + posicao.coluna).removeClass("zebra-morrendo");
			try {
				document.getElementById('player').stop();
			} catch (err) {
			}
		}, 1000);
	}

	this.move = function(indice) {
		if (this.modoFuga && indice == 0) {
			this.iteracoesFuga++;
		}
		var campoPercepcao = this.animal.getCampoPercepcao();
		var predadores = 0, presas = 0, presasEmFuga = 0;
		(function(PresaObj) {
			$.each(campoPercepcao, function(key, value){
				if (value.objeto instanceof Predador) {
					predadores++;
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
				this.iteracoesFuga = 0;
			}
			
			var movimentoRealizado = false;
			if (predadores > 0) {
				(function(Presa) {
					$.each(campoPercepcao, function(key, value){
						if (!movimentoRealizado) {		
							if (value.objeto instanceof Predador) {
								var movimento = key;
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
										posicoes = Presa.animal.moverParaDireita();
										movimento = "direita";
									} else {
										posicoes = Presa.animal.moverParaCima();
										movimento = "cima";
									}
								} else if (key == "direitaInferior") {
									if (gerarRandomico(2, 1) == 2) {
										posicoes = Presa.animal.moverParaEsquerda();
										movimento = "esquerda";
									} else {
										posicoes = Presa.animal.moverParaCima();
										movimento = "cima";
									}
								} else if (key == "direitaSuperior") {
									if (gerarRandomico(2, 1) == 2) {
										posicoes = Presa.animal.moverParaEsquerda();
										movimento = "esquerda";
									} else {
										posicoes = Presa.animal.moverParaBaixo();
										movimento = "baixo";
									}
								} else if (key == "esquerdaSuperior") {
									if (gerarRandomico(2, 1) == 2) {
										posicoes = Presa.animal.moverParaDireita();
										movimento = "direita";
									} else {
										posicoes = Presa.animal.moverParaBaixo();
										movimento = "baixo";
									}
								}
								movimentoRealizado = Presa.setPosicao(posicoes.linha, posicoes.coluna, movimento);
							}
						}
					});
					if (!movimentoRealizado) {
						posicoes = Presa.animal.moverParaBaixo();
						movimentoRealizado = Presa.setPosicao(posicoes.linha, posicoes.coluna, "baixo");
					}
					if (!movimentoRealizado) {
						posicoes = Presa.animal.moverParaCima();
						movimentoRealizado = Presa.setPosicao(posicoes.linha, posicoes.coluna, "cima");
					}
					if (!movimentoRealizado) {
						posicoes = Presa.animal.moverParaDireita();
						movimentoRealizado = Presa.setPosicao(posicoes.linha, posicoes.coluna, "direita");
					}
					if (!movimentoRealizado) {
						posicoes = Presa.animal.moverParaEsquerda();
						movimentoRealizado = Presa.setPosicao(posicoes.linha, posicoes.coluna, "esquerda");
					}
				})(this);
			} else {
				var movimenta = gerarRandomico(3, 1);
				if (movimenta > 1 || this.modoFuga) {
					var movimento;
					while(true) {
						movimento = this.getRandomPosicao();
						if (this.animal.isMovimentoValido(movimento.posicao)) {
							break;
						}
					}
					movimentoRealizado = this.setPosicao(movimento.posicao.linha, movimento.posicao.coluna, movimento.movimento);
				}
			}
		}
		this.passosRealizados++;
		if (this.passosRealizados < this.getVelocidade()) {
			return 1;
		} else {
			return 0;
		}
	}

	this.setPosicao = function(linha, coluna, movimento) {
		if (!movimento) {
			movimento = "";
		}
		if (Ambiente.getPosicao(linha, coluna) == 0) {
			Ambiente.limparPosicao(this.getPosicao().linha, this.getPosicao().coluna);
			this.animal.setPosicao(linha, coluna, movimento);
			Ambiente.setPosicao(this);
			return true;
		} else {
			return false;
		}
	}

	this.getRandomPosicao = function() {
		var movimento;
		var random = gerarRandomico(4, 1);
		if (random == 4) {
			var posicoes = this.animal.moverParaDireita();
			movimento = "direita";
		} else if (random == 1) {
			var posicoes = this.animal.moverParaEsquerda();
			movimento = "esquerda";
		} else if (random == 2) {
			var posicoes = this.animal.moverParaCima();
			movimento = "cima";
		} else if (random == 3) {
			var posicoes = this.animal.moverParaBaixo();
			movimento = "baixo";
		}
		return {"posicao" : posicoes, "movimento" : movimento};
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
		/*
		1 = 1
		2 = 1.4
		3 = 1.7
		4 = 2
		6 = 2.4
		8 = 2.8
		9 = 3
		*/
		var qualid = Math.abs(this.qualidade);
		var intens = Math.abs(this.intensidade);
		if (qualid == 0) {
			qualid = 1;
		}
		if (intens == 0) {
			intens = 1;
		}
		var res = Math.sqrt(qualid * intens);
		return Math.round(res) - 1;
	}

	this.isModoFuga = function() {
		return this.modoFuga;
	}
}