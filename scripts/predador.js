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

	this.movimentarPredador = function(keyMovimento) {
		var movimento = keyMovimento;
		if (keyMovimento == "baixo") {
			posicoes = this.animal.moverParaBaixo();
		} else if (keyMovimento == "cima") {
			posicoes = this.animal.moverParaCima();
		} else if (keyMovimento == "esquerda") {
			posicoes = this.animal.moverParaEsquerda();
		} else if (keyMovimento == "direita") {
			posicoes = this.animal.moverParaDireita();
		} else if (keyMovimento == "direitaInferior") {
			if (gerarRandomico(2, 1) == 2) {
				posicoes = this.animal.moverParaDireita();
				movimento = "direita";
			} else {
				posicoes = this.animal.moverParaBaixo();
				movimento = "baixo";
			}
		} else if (keyMovimento == "esquerdaInferior") {
			if (gerarRandomico(2, 1) == 2) {
				posicoes = this.animal.moverParaEsquerda();
				movimento = "esquerda";
			} else {
				posicoes = this.animal.moverParaBaixo();
				movimento = "baixo";
			}
		} else if (keyMovimento == "direitaSuperior") {
			if (gerarRandomico(2, 1) == 2) {
				posicoes = this.animal.moverParaDireita();
				movimento = "direita";
			} else {
				posicoes = this.animal.moverParaCima();
				movimento = "cima";
			}
		} else if (keyMovimento == "esquerdaSuperior") {
			if (gerarRandomico(2, 1) == 2) {
				posicoes = this.animal.moverParaEsquerda();
				movimento = "esquerda";
			} else {
				posicoes = this.animal.moverParaCima();
				movimento = "cima";
			}
		}
		return {"posicoes": posicoes, "movimento": movimento}
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
					var posicaoMovimento = Predador.movimentarPredador(key);
					movimento = posicaoMovimento.movimento;
					posicoes = posicaoMovimento.posicoes;
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
				var attrRastro = Ambiente.getAtributoDaPosicao(value.posicao, "rastro_intensidade");
				var numeroPredador = Ambiente.getAtributoDaPosicao(value.posicao, "numero_predador");
				if (attrRastro > maiorRastro && (numeroPredador != Predador.numero)) {
					maiorRastro = attrRastro;
					keyRastroMaior = key;
				}
			});
			if (maiorRastro > 0) {
				movimentoRealizado = true;
				var posicaoMovimento = Predador.movimentarPredador(keyRastroMaior);
				var movimento = posicaoMovimento.movimento;
				var posicoes = posicaoMovimento.posicoes;
				movimentoRealizado = Predador.setPosicao(posicoes.linha, posicoes.coluna, movimento);
				if (movimentoRealizado) {
					algoritmo.getPopulacao().getAnimais().forEach(function(animal) {
						if (animal.numero == numeroPredador) {
							//Predador.setVelocidade(animal.getVelocidade());
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
		/* 
			Impedir que o Predador realize 20 vezes o mesmo movimento, evitando "DeadLocks"
		*/
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
		/*
			Quando o Predador ainda possui movimentos que devem ser realizados dentro da iteração, é retornado o valor 1
		*/
		this.passosRealizados++;
		if (this.passosRealizados < this.getVelocidade()) {
			return 1;
		} else {
			return 0;
		}
	}
}
