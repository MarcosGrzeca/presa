function Populacao(nroPredadores, nroPresas) {
	this.nroPredadores = nroPredadores;
	this.nroPresas = nroPresas;
	this.animais = [];
	this.contAnimais = 1;
	
	this.gerarPopulacao = function() {
		for (var i = 0; i < nroPresas; i++) {
			var presa = new Presa(this.contAnimais);
			presa.gerarPosicaoAleatoria();
			this.animais.push(presa);
			this.contAnimais++;
		}
		for (var i = 0; i < nroPredadores; i++) {
			var predador = new Predador(this.contAnimais);
			predador.gerarPosicaoAleatoria();
			this.animais.push(predador);
			this.contAnimais++;
		}
	};

	this.gerarPopulacaoTeste = function() {
		this.createPresa(2, 2);
		this.createPredador(1, 1);
		//this.createPredador(1, 2);
		//this.createPredador(1, 3);
		//this.createPredador(3, 3);
	};

	this.movimentar = function() {
		var mortos = [], status = 0;
		$.each(this.animais, function(key, animal) {
			status = animal.move();
			if (animal instanceof Presa) {
				if (animal.modoFuga) {
					status = animal.move();
					if (status == -1) { //morre
						mortos.push(animal);
					}
				}
			}
			if (status == -1) { //morre
				mortos.push(animal);
			}
		});
		$.each(mortos, function(key, animal) {
			animal.morre();
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