function Presa(numero) {
	this.animal = new Animal();
	this.numero = numero;

	this.calcularFitness = function() {
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
		var movimenta = gerarRandomico(2, 1);
		if (movimenta == 2) {
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
		Ambiente.limparPosicao(this.getPosicao().linha, this.getPosicao().coluna);
		this.animal.setPosicao(linha, coluna);
		Ambiente.setPosicao(this);
	}	
}