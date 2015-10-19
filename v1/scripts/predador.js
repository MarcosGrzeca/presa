function Predador(numero) {
	this.animal = new Animal();
	this.numero = numero;
	this.modoCaca = false;
	this.iteracoesCaca = 0;
	this.passosRealizados = 0;

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
		return this.animal.getVelocidade();
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

	this.verificarExistenciaPresas = function(campoPercepcao) {
		var movimentoRealizado = false;
		(function(Predador) {
			var posicoes = null;
			var movimento;
			$.each(campoPercepcao, function(key, presa){
				if (presa.objeto instanceof Presa && posicoes == null) {
					Predador.setVelocidade(presa.objeto.getVelocidade());
					movimentoRealizado = true;
					movimento = key;
					if (key == "baixo") {
						posicoes = Predador.animal.moverParaBaixo();
					} else if (key == "cima") {
						posicoes = Predador.animal.moverParaCima();
					} else if (key == "esquerda") {
						posicoes = Predador.animal.moverParaEsquerda();
					} else if (key == "direita") {
						posicoes = Predador.animal.moverParaDireita();
					} else if (key == "direitaInferior") {
						if (gerarRandomico(2, 1) == 2) {
							posicoes = Predador.animal.moverParaDireita();
							movimento = "direita";
						} else {
							posicoes = Predador.animal.moverParaBaixo();
							movimento = "baixo";
						}
					} else if (key == "esquerdaInferior") {
						if (gerarRandomico(2, 1) == 2) {
							posicoes = Predador.animal.moverParaEsquerda();
							movimento = "esquerda";
						} else {
							posicoes = Predador.animal.moverParaBaixo();
							movimento = "baixo";
						}
					} else if (key == "direitaSuperior") {
						if (gerarRandomico(2, 1) == 2) {
							posicoes = Predador.animal.moverParaDireita();
							movimento = "direita";
						} else {
							posicoes = Predador.animal.moverParaCima();
							movimento = "cima";
						}
					} else if (key == "esquerdaSuperior") {
						if (gerarRandomico(2, 1) == 2) {
							posicoes = Predador.animal.moverParaEsquerda();
							movimento = "esquerda";
						} else {
							posicoes = Predador.animal.moverParaCima();
							movimento = "cima";
						}
					}
					if (!Predador.modoCaca) {
						Predador.iteracoesCaca = 0;
					}
				}
			});
			
			if (Predador.iteracoesCaca > 4) {
				Predador.setVelocidade(1);
				Predador.modoCaca = false;
				Predador.iteracoesCaca = 0;
			}
			
			if (posicoes != null) {
				var posicaoValida = Predador.setPosicao(posicoes.linha, posicoes.coluna, movimento);
				Predador.modoCaca = true;
				if (posicaoValida) {
					Ambiente.setRastro(posicoes.linha, posicoes.coluna, Ambiente.tempoDuracaoRastroPredadores, Predador.getNumero());
				} else {
					Ambiente.setRastro(Predador.getPosicao().linha, Predador.getPosicao().coluna, Ambiente.tempoDuracaoRastroPredadores, Predador.getNumero());
				}
			}
		})(this);
		return movimentoRealizado;
	}

	this.verificarExistenciaRastros = function(campoPercepcao) {
		var movimentoRealizado = false;
		(function(Predador) {
			var maiorRastro = 0;
			var keyRastroMaior = null;
			var numeroPredador = -1;
				
			$.each(campoPercepcao, function(key, value){
				var attrRastro = Ambiente.getAttrAnterior(value.posicao, "rastro_intensidade");
				var numeroPredador = Ambiente.getAttrAnterior(value.posicao, "numero_predador");
				if (attrRastro > maiorRastro && (numeroPredador != Predador.numero)) {
					maiorRastro = attrRastro;
					keyRastroMaior = key;
				}
			});

			if (maiorRastro > 0) {
				movimentoRealizado = true;
				var posicoes = null;
				var movimento = keyRastroMaior;
				if (keyRastroMaior == "baixo") {
					posicoes = Predador.animal.moverParaBaixo();
				} else if (keyRastroMaior == "cima") {
					posicoes = Predador.animal.moverParaCima();
				} else if (keyRastroMaior == "esquerda") {
					posicoes = Predador.animal.moverParaEsquerda();
				} else if (keyRastroMaior == "direita") {
					posicoes = Predador.animal.moverParaDireita();
				} else if (keyRastroMaior == "direitaInferior") {
					if (gerarRandomico(2, 1) == 2) {
						posicoes = Predador.animal.moverParaDireita();
						movimento = "direita";
					} else {
						posicoes = Predador.animal.moverParaBaixo();
						movimento = "baixo";
					}
				} else if (keyRastroMaior == "esquerdaInferior") {
					if (gerarRandomico(2, 1) == 2) {
						posicoes = Predador.animal.moverParaEsquerda();
						movimento = "esquerda";
					} else {
						posicoes = Predador.animal.moverParaBaixo();
						movimento = "baixo";
					}
				} else if (keyRastroMaior == "direitaSuperior") {
					if (gerarRandomico(2, 1) == 2) {
						posicoes = Predador.animal.moverParaDireita();
						movimento = "direita";
					} else {
						posicoes = Predador.animal.moverParaCima();
						movimento = "cima";
					}
				} else if (keyRastroMaior == "esquerdaSuperior") {
					if (gerarRandomico(2, 1) == 2) {
						posicoes = Predador.animal.moverParaEsquerda();
						movimento = "esquerda";
					} else {
						posicoes = Predador.animal.moverParaCima();
						movimento = "cima";
					}
				}
				movimentoRealizado = Predador.setPosicao(posicoes.linha, posicoes.coluna, movimento);
				if (movimentoRealizado) {
					algoritmo.getPopulacao().getAnimais().forEach(function(animal) {
						if (animal.numero == numeroPredador) {
							Predador.setVelocidade(animal.getVelocidade());
						}
					});
				}
			}
		})(this);
		return movimentoRealizado;
	}

	this.movimentarAleatoriamente = function() {
		while(true) {
			var random = gerarRandomico(4, 1);
			var movimento;
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
			if (this.animal.isMovimentoValido(posicoes)) {
				break;
			}
		}
		return this.setPosicao(posicoes.linha, posicoes.coluna, movimento);
	}

	this.move = function(indice) {
		if (this.modoCaca && indice == 0) {
			this.iteracoesCaca++;
		}

		var movimentoRealizado = false;
		var todosMovimentosIguais = true;
		if (this.animal.getMovimentos().length == 20) {
			var movimentoAnterior = this.animal.getMovimentos()[0].movimento;
			this.animal.getMovimentos().forEach(function(movimento) {
				if (movimento.movimento != movimentoAnterior) {
					todosMovimentosIguais = false;
				}
			});

			if (todosMovimentosIguais) {
				movimentoRealizado = this.movimentarAleatoriamente();
			}
		}

		var campoPercepcao = this.animal.getCampoPercepcao();
		if (!movimentoRealizado) {
			movimentoRealizado = this.verificarExistenciaPresas(campoPercepcao);
		}
		if (!movimentoRealizado) {
			if (this.modoCaca && this.iteracoesCaca > 4) {
				this.modoCaca = false;
				this.iteracoesCaca = 0;
			}
			movimentoRealizado = this.verificarExistenciaRastros(campoPercepcao);
		}
		if (!movimentoRealizado) {
			movimentoRealizado = this.movimentarAleatoriamente();
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
}