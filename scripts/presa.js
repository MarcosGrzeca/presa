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
	this.iteracoesLinear = 0;
	this.movimentoLinear = 0;

	this.gerarPosicaoAleatoria = function() {
		this.animal.gerarPosicaoAleatoria();
		Ambiente.setPosicao(this);
	}

	this.getPosicao = function() {
		return this.animal.posicao;
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

	this.getNumero = function() {
		return this.numero;
	}

	this.getVelocidade = function() {
		if (this.iteracoesFuga > 12) {
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

	this.getQualidade = function() {
		return this.qualidade;
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

	this.getIntensidade = function() {
		return this.intensidade;
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
		//Opção para não considerar as emoções da presa
		if ($("#motivacaoPresas").val() == "S") {
			return 1;
		}
		/*
		1 = 1
		2 = 1.4
		3 = 1.7
		4 = 2
		6 = 2.4
		8 = 2.8
		9 = 3
		*/
		/*var qualid = Math.abs(this.qualidade);
		var intens = Math.abs(this.intensidade);
		if (qualid == 0) {
			qualid = 1;
		}
		if (intens == 0) {
			intens = 1;
		}
		var res = Math.sqrt(qualid * intens);

		(qualidade  * -1) + (intesidade)
		*/
		var res = ((this.qualidade * -1) + this.intensidade) /2;
		if (res < 1) {
			res = 1;
		}
		return Math.round(res);
	}

	this.isModoFuga = function() {
		return this.modoFuga;
	}

	this.setPassosRealizados = function(passosRealizados) {
		this.passosRealizados = passosRealizados;
	}
	
	this.presaMorre = function() {
		if (modoSimulacao) {
			iteracoesPresasCapturadas.push(algoritmo.iteracoes);
		}
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

	this.calcularEmocao = function(predadores, presas, presasEmFuga) {
		var livre = false;
		if (this.modoFuga == false) {
			if (predadores == 0 && presas > 0) {
				this.incQualidade(presas-presasEmFuga);
				if (presasEmFuga > 0) {
					this.decQualidade(presasEmFuga);
					this.incIntensidade(presasEmFuga);
				} else {
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
	}

	this.movimentarPresa = function(key) {
		var movimento = key;
		if (key == "cima") {
			posicoes = this.animal.moverParaBaixo();
		} else if (key == "baixo") {
			posicoes = this.animal.moverParaCima();
		} else if (key == "direita") {
			posicoes = this.animal.moverParaEsquerda();
		} else if (key == "esquerda") {
			posicoes = this.animal.moverParaDireita();
		} else if (key == "esquerdaInferior") {
			if (gerarRandomico(2, 1) == 2) {
				posicoes = this.animal.moverParaDireita();
				movimento = "direita";
			} else {
				posicoes = this.animal.moverParaCima();
				movimento = "cima";
			}
		} else if (key == "direitaInferior") {
			if (gerarRandomico(2, 1) == 2) {
				posicoes = this.animal.moverParaEsquerda();
				movimento = "esquerda";
			} else {
				posicoes = this.animal.moverParaCima();
				movimento = "cima";
			}
		} else if (key == "direitaSuperior") {
			if (gerarRandomico(2, 1) == 2) {
				posicoes = this.animal.moverParaEsquerda();
				movimento = "esquerda";
			} else {
				posicoes = this.animal.moverParaBaixo();
				movimento = "baixo";
			}
		} else if (key == "esquerdaSuperior") {
			if (gerarRandomico(2, 1) == 2) {
				posicoes = this.animal.moverParaDireita();
				movimento = "direita";
			} else {
				posicoes = this.animal.moverParaBaixo();
				movimento = "baixo";
			}
		}
		return {"posicoes": posicoes, "movimento": movimento}
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
			if ($("#motivacaoPresas").val() != "S") {
				this.calcularEmocao(predadores, presas, presasEmFuga);
			}

			var movimentoRealizado = false;
			if (predadores > 0) {
				(function(Presa) {
					$.each(campoPercepcao, function(key, value){
						if (!movimentoRealizado) {		
							if (value.objeto instanceof Predador) {
								var movimentacao = Presa.movimentarPresa(key);
								var posicoes = movimentacao.posicoes;
								var movimento = movimentacao.movimento;
								movimentoRealizado = Presa.setPosicao(posicoes.linha, posicoes.coluna, movimento);
							}
						}
					});
					if (!movimentoRealizado) {
						var indiceE = 0;
						while (indiceE < 10 && !movimentoRealizado) {
							movimentacao = Presa.getRandomPosicao();
							posicoes = movimentacao.posicao;
							movimento = movimentacao.movimento;
							movimentoRealizado = Presa.setPosicao(posicoes.linha, posicoes.coluna, movimento);
							indiceE++;
						}
					}
				})(this);
			} else {
				if ($('#comportamentoPresas').val() == 0) {
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
				} else {
					if (this.iteracoesLinear == 0 || this.iteracoesLinear > 9) {
						var random, movimento;
						while(true) {
							random = gerarRandomico(4, 1);
							if (this.movimentoLinear != random) {
								movimento = this.getMovimento(random);
								if (this.animal.isMovimentoValido(movimento.posicao)) {
									break;
								}
							}
						}
						this.movimentoLinear = random;
						this.iteracoesLinear = 0;
					}
					movimento = this.getMovimento(this.movimentoLinear);
					movimentoRealizado = this.setPosicao(movimento.posicao.linha, movimento.posicao.coluna, movimento.movimento);
					this.iteracoesLinear++;
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

	this.getRandomPosicao = function() {
		var random = gerarRandomico(4, 1);
		return this.getMovimento(random);
	}

	this.getMovimento = function(num) {
		var movimento, posicoes;
		if (num == 4) {
			posicoes = this.animal.moverParaDireita();
			movimento = "direita";
		} else if (num == 1) {
			posicoes = this.animal.moverParaEsquerda();
			movimento = "esquerda";
		} else if (num == 2) {
			posicoes = this.animal.moverParaCima();
			movimento = "cima";
		} else if (num == 3) {
			posicoes = this.animal.moverParaBaixo();
			movimento = "baixo";
		}
		return {"posicao" : posicoes, "movimento" : movimento};
	}

	this.morre = function() {
		Ambiente.removerAnimal(this);
	}
}
