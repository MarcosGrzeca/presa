function Animal() {
	this.fitness;
	this.sequencia;
	this.movimentosPossiveis = ["00", "01", "10", "11"];
	this.posicao = {};
	
	this.calcularFitness = function() {
//		this.fitness = gerarRandomico(1000, 0);
//		return;
		this.lab.posicao = 0;
		this.fitness = this.lab.calcularFitness(this.sequencia);
	};
	
	this.mutacao = function() {
		var pontoMutacao = gerarRandomico((this.sequencia.length - 1), 0);
		this.sequencia = this.sequencia.substr(0, pontoMutacao -1) + gerarRandomico(1, 0) + this.sequencia.substr(pontoMutacao);
		this.calcularFitness();
	};

	this.gerar = function() {
		this.sequencia = "";
		for (var i = 0; i < 8; i++) {
			this.sequencia = this.sequencia + this.movimentosPossiveis[gerarRandomico(4, 0)];
		};
		this.calcularFitness();
	}
	
	this.setar = function(sequencia) {
		this.sequencia = sequencia;
		this.calcularFitness();
	}

	this.gerarPosicaoAleatoria = function() {
		var posicaoInvalida = true;
		while (posicaoInvalida) {
			var linha = gerarRandomico((Ambiente.nroLinhas - 1), 0);
			var coluna = gerarRandomico((Ambiente.nroColunas - 1), 0);
			var objeto = Ambiente.getPosicao(linha, coluna);
			if (objeto == 0) {
				posicaoInvalida = false;
				this.posicao = {"linha" : linha, "coluna" : coluna};
				return {"linha" : linha, "coluna" : coluna};
			}
		}
	}

	this.setPosicao = function(linha, coluna) {
		this.posicao = {"linha" : linha, "coluna" : coluna};
	}

	this.moverParaDireita = function() {
		if (this.posicao.coluna == (Ambiente.nroColunas - 1)) {
			return {"linha" : this.posicao.linha, "coluna" : 0};
		} else {
			return {"linha" : this.posicao.linha, "coluna" : this.posicao.coluna + 1};
		}
	}

	this.moverParaEsquerda = function() {
		if (this.posicao.coluna == 0) {
			return {"linha" : this.posicao.linha, "coluna" : Ambiente.nroColunas - 1};
		} else {
			return {"linha" : this.posicao.linha, "coluna" : this.posicao.coluna - 1};
		}
	}

	this.moverParaBaixo = function() {
		if (this.posicao.linha == (Ambiente.nroLinhas - 1)) {
			return {"linha" : 0, "coluna" : this.posicao.coluna};
		} else {
			return {"linha" : this.posicao.linha + 1, "coluna" : this.posicao.coluna};
		}
	}

	this.moverParaCima = function() {
		if (this.posicao.linha == 0) {
			return {"linha" : (Ambiente.nroLinhas - 1), "coluna" : this.posicao.coluna};
		} else {
			return {"linha" : this.posicao.linha - 1, "coluna" : this.posicao.coluna};
		}
	}
}