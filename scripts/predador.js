function Predador(numero) {
	this.animal = new Animal();
	this.numero = numero;
	this.modoCaca = false;
	this.iteracoesCaca = 0;
	this.presaCacada = false;
	this.presaAlvo = null;
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
			/*if (Predador.presaCacada != false && Predador.iteracoesCaca < 4) {
				movimentoRealizado = true;
				posicoes = Predador.presaCacada.animal.getPosicaoAnterior();
			} else if (Predador.iteracoesCaca >= 4) {
				Predador.presaCacada = false;
			} else {
				if (Predador.modoCaca) {
					Predador.presaAlvo.get
				} else {
					$.each(campoPercepcao, function(key, value){
						if (value.objeto instanceof Presa) {
							Predador.setVelocidade(value.objeto.getVelocidade());
							Predador.presaAlvo = value.objeto;
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
							Predador.iteracoesCaca = 0;
							Predador.presaCacada = value.objeto;
						}
					});
				}
			}*/

			$.each(campoPercepcao, function(key, value){
				if (value.objeto instanceof Presa) {
					Predador.setVelocidade(value.objeto.getVelocidade());
					Predador.presaAlvo = value.objeto;
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
						Predador.presaCacada = value.objeto;
					}
				}
			});
			
			/*if (Predador.modoCaca) {
				Predador.iteracoesCaca++;
			}*/

			if (Predador.iteracoesCaca > 4) {
				Predador.setVelocidade(1);
				Predador.modoCaca = false;
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
				/*if (Predador.animal.isMovimentoValido(posicoes)) {
					Predador.setPosicao(posicoes.linha, posicoes.coluna, movimento);
				} else {
					movimentoRealizado = false;
				}*/
				Predador.setPosicao(posicoes.linha, posicoes.coluna, movimento);
				//Predador.setVelocidade()
				
				//.forEach(function(name){
				//var populacao = algoritmo.getPopulacao();
				algoritmo.getPopulacao().getAnimais().forEach(function(animal) {
					if (animal.numero == numeroPredador) {
						Predador.setVelocidade(animal.getVelocidade());
					}
				});

			}
		})(this);
		return movimentoRealizado;
	}

	this.movimentarAleatoriamente = function() {
		while(true) {
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
			if (this.animal.isMovimentoValido(posicoes)) {
				break;
			}
		}
		this.setPosicao(posicoes.linha, posicoes.coluna);
	}

	this.move = function(indice) {
		if (this.modoCaca && indice == 0) {
			this.iteracoesCaca++;
		}
		var campoPercepcao = this.animal.getCampoPercepcao();
		var movimentoRealizado = this.verificarExistenciaPresas(campoPercepcao);
		if (!movimentoRealizado) {
			if (this.modoCaca && this.iteracoesCaca > 4) {
				this.modoCaca = false;
				this.iteracoesCaca = 0;
			}
			movimentoRealizado = this.verificarExistenciaRastros(campoPercepcao);
		}
		if (!movimentoRealizado) {
			this.movimentarAleatoriamente();
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