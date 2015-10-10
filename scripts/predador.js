function Predador(numero) {
	this.animal = new Animal();
	this.numero = numero;
	this.modoCaca = false;

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

	this.verificarExistenciaPresas = function(campoPercepcao) {
		var movimentoRealizado = false;
		(function(Predador) {
			$.each(campoPercepcao, function(key, value){
				if (value.objeto instanceof Presa) {
					movimentoRealizado = true;
					var posicoes = null;
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
							posicoes = Predador.animal.moverParaDireita()
						} else {
							posicoes = Predador.animal.moverParaBaixo();
						}
					} else if (key == "esquerdaInferior") {
						if (gerarRandomico(2, 1) == 2) {
							posicoes = Predador.animal.moverParaEsquerda();
						} else {
							posicoes = Predador.animal.moverParaBaixo();
						}
					} else if (key == "direitaSuperior") {
						if (gerarRandomico(2, 1) == 2) {
							posicoes = Predador.animal.moverParaDireita();
						} else {
							posicoes = Predador.animal.moverParaCima();
						}
					} else if (key == "esquerdaSuperior") {
						if (gerarRandomico(2, 1) == 2) {
							posicoes = Predador.animal.moverParaEsquerda();
						} else {
							posicoes = Predador.animal.moverParaCima();
						}
					}
					if (posicoes != null) {
						var posicaoValida = Predador.setPosicao(posicoes.linha, posicoes.coluna);
						Predador.modoCaca = true;
						if (posicaoValida) {
							Ambiente.setRastro(posicoes.linha, posicoes.coluna, Ambiente.tempoDuracaoRastroPredadores);
						} else {
							Ambiente.setRastro(Predador.getPosicao().linha, Predador.getPosicao().coluna, Ambiente.tempoDuracaoRastroPredadores);
						}
					}
				}
			});
		})(this);
		return movimentoRealizado;
	}

	this.verificarExistenciaRastros = function(campoPercepcao) {
		var movimentoRealizado = false;
		(function(Predador) {
			var maiorRastro = 0;
			var keyRastroMaior = null;
			$.each(campoPercepcao, function(key, value){
				var attrRastro = Ambiente.getAttrAnterior(value.posicao, "rastro_intensidade");
				if (attrRastro > maiorRastro) {
					maiorRastro = attrRastro;
					keyRastroMaior = key;
				}
			});

			if (maiorRastro > 0) {
				movimentoRealizado = true;
				var posicoes = null;
				if (keyRastroMaior == "baixo" || keyRastroMaior == "direitaInferior" || keyRastroMaior == "esquerdaInferior") {
					posicoes = Predador.animal.moverParaBaixo();
				} else if (keyRastroMaior == "cima" || keyRastroMaior == "direitaSuperior" || keyRastroMaior == "esquerdaSuperior") {
					posicoes = Predador.animal.moverParaCima();
				} else if (keyRastroMaior == "esquerda") {
					posicoes = Predador.animal.moverParaEsquerda();
				} else if (keyRastroMaior == "direita") {
					posicoes = Predador.animal.moverParaDireita();
				} else if (key == "direitaInferior") {
					if (gerarRandomico(2, 1) == 2) {
						posicoes = Predador.animal.moverParaDireita()
					} else {
						posicoes = Predador.animal.moverParaBaixo();
					}
				} else if (key == "esquerdaInferior") {
					if (gerarRandomico(2, 1) == 2) {
						posicoes = Predador.animal.moverParaEsquerda();
					} else {
						posicoes = Predador.animal.moverParaBaixo();
					}
				} else if (key == "direitaSuperior") {
					if (gerarRandomico(2, 1) == 2) {
						posicoes = Predador.animal.moverParaDireita();
					} else {
						posicoes = Predador.animal.moverParaCima();
					}
				} else if (key == "esquerdaSuperior") {
					if (gerarRandomico(2, 1) == 2) {
						posicoes = Predador.animal.moverParaEsquerda();
					} else {
						posicoes = Predador.animal.moverParaCima();
					}
				}
				Predador.setPosicao(posicoes.linha, posicoes.coluna);
			}
		})(this);
		return movimentoRealizado;
	}

	this.movimentarAleatoriamente = function() {
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

	this.move = function() {
		var campoPercepcao = this.animal.getCampoPercepcao();
		var movimentoRealizado = this.verificarExistenciaPresas(campoPercepcao);
		if (!movimentoRealizado) {
			movimentoRealizado = this.verificarExistenciaRastros(campoPercepcao);
		}
		if (!movimentoRealizado) {
			this.movimentarAleatoriamente();
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
}