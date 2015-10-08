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

	this.move = function() {
		var campoPercepcao = this.animal.getCampoPercepcao();
		var movimentoRealizado = false;
		(function(Predador) {
			$.each(campoPercepcao, function(key, value){
				if (value.objeto instanceof Presa) {
					movimentoRealizado = true;
					var posicaoPresa = value.objeto.getPosicao();
					var posicaoPredador = Predador.getPosicao();
					if (key == "baixo" || key == "direitaInferior" || key == "esquerdaInferior") {
						var posicoes = Predador.animal.moverParaBaixo();
						Predador.setPosicao(posicoes.linha, posicoes.coluna);
					} else if (key == "cima" || key == "direitaSuperior" || key == "esquerdaSuperior") {
						var posicoes = Predador.animal.moverParaCima();
						Predador.setPosicao(posicoes.linha, posicoes.coluna);
					} else if (key == "esquerda") {
						var posicoes = Predador.animal.moverParaEsquerda();
						Predador.setPosicao(posicoes.linha, posicoes.coluna);
					} else if (key == "direita") {
						var posicoes = Predador.animal.moverParaDireita();
						Predador.setPosicao(posicoes.linha, posicoes.coluna);
					}
					Predador.modoCaca = true;
					Ambiente.setRastro(posicoes.linha, posicoes.coluna, 5);
				}
			});
		})(this);

		if (!movimentoRealizado) {
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
					if (keyRastroMaior == "baixo" || keyRastroMaior == "direitaInferior" || keyRastroMaior == "esquerdaInferior") {
						var posicoes = Predador.animal.moverParaBaixo();
						Predador.setPosicao(posicoes.linha, posicoes.coluna);
					} else if (keyRastroMaior == "cima" || keyRastroMaior == "direitaSuperior" || keyRastroMaior == "esquerdaSuperior") {
						var posicoes = Predador.animal.moverParaCima();
						Predador.setPosicao(posicoes.linha, posicoes.coluna);
					} else if (keyRastroMaior == "esquerda") {
						var posicoes = Predador.animal.moverParaEsquerda();
						Predador.setPosicao(posicoes.linha, posicoes.coluna);
					} else if (keyRastroMaior == "direita") {
						var posicoes = Predador.animal.moverParaDireita();
						Predador.setPosicao(posicoes.linha, posicoes.coluna);
					}
				}
			})(this);
		}

		if (!movimentoRealizado) {
			$.each(campoPercepcao, function(key, value){
				var attrRastro = Ambiente.getAttrAnterior(value.posicao, "rastro_intensidade");
				if (attrRastro > 0) {
					//console.log("TEM RASTRO " + attrRastro);
					movimentoRealizado = true;
				}
			});
		}

		if (!movimentoRealizado) {
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
	}

	this.setPosicao = function(linha, coluna) {
		if (Ambiente.getPosicao(linha, coluna) == 0) {
			Ambiente.limparPosicao(this.getPosicao().linha, this.getPosicao().coluna);
			this.animal.setPosicao(linha, coluna);
			Ambiente.setPosicao(this);
		} else {
			//console.log("DEU COLISAO");
		}
	}
}