function Populacao(nroPredadores, nroPresas) {
	this.nroPredadores = nroPredadores;
	this.nroPresas = nroPresas;
	this.animais = [];
	this.contAnimais = 1;
	
	this.gerarPopulacao = function() {
		for (var i = 0; i < nroPredadores; i++) {
			var predador = new Predador(this.contAnimais);
			predador.gerarPosicaoAleatoria();
			this.animais.push(predador);
			this.contAnimais++;
		}
		for (var i = 0; i < nroPresas; i++) {
			var presa = new Presa(this.contAnimais);
			presa.gerarPosicaoAleatoria();
			this.animais.push(presa);
			this.contAnimais++;
		}
	};

	this.gerarPopulacaoTeste = function() {
		this.createPredador(1, 1);
		this.createPredador(1, 2);
		this.createPredador(1, 3);
		this.createPredador(4, 3);
		this.createPresa(2, 2);
	};

	this.movimentar = function() {
		$.each(this.animais, function(key, animal) {
			animal.move();
		});
	};

	this.createPredador = function(linha, coluna) {
		var predador = new Predador(this.contAnimais);
		predador.setPosicao(linha, coluna);
		this.animais.push(predador);
		this.contAnimais++;		
	};

	this.createPresa = function(linha, coluna) {
		var presa = new Presa(this.contAnimais);
		presa.setPosicao(linha, coluna);
		this.animais.push(presa);
		this.contAnimais++;		
	};
}