function Presa() {
	this.agente = new Agente();
	this.posicao = {};

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
		this.posicao = this.agente.gerarPosicaoAleatoria();
		Ambiente.setPosicao(this.posicao.linha, this.posicao.coluna, 2);
	}
}