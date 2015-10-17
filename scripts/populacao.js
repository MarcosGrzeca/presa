function Populacao(nroPredadores, nroPresas) {
	this.nroPredadores = nroPredadores;
	this.nroPresas = nroPresas;
	this.animais = [];
	this.contAnimais = 1;

	this.getAnimais = function() {
		return this.animais;
	}
	
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

	this.gerarPopulacao = function() {
		for (var i = 0; i < this.nroPresas; i++) {
			var presa = new Presa(this.contAnimais);
			presa.gerarPosicaoAleatoria();
			this.animais.push(presa);
			this.contAnimais++;
		}
		for (var i = 0; i < this.nroPredadores; i++) {
			var predador = new Predador(this.contAnimais);
			predador.gerarPosicaoAleatoria();
			this.animais.push(predador);
			this.contAnimais++;
		}
	};

	/* 	Instruções
		Método utilizado apenas para testes durante o desenvolvimento
	*/
	this.gerarPopulacaoTeste = function() {
		this.createPresa(2, 1);
		this.createPredador(1, 1);
		this.createPredador(1, 2);
		this.createPredador(3, 2);
		this.createPredador(0, 0);
		this.createPredador(1, 3);
		this.createPredador(3, 3);
	};

	this.movimentar = function() {
		var zebrasMortas = [], status = 0;
		var animaisNaFila = this.animais;
		var indice = 0;
		var temPresa = false;

		/*	Instruções
			Os animais com velocidade superior a 1, executam 1 movimento e são armazenados em uma lista para 
			que possam ser executados novamente na mesma iteração.
		*/

		while (animaisNaFila.length > 0) {
			var animais = $.extend(true, [], animaisNaFila);
			var animaisNaFila = [];
			$.each(animais, function(key, animal) {
				if (animal instanceof Presa) {
					temPresa = true;
				}
				/*
					Status
					-1 - Animal morreu
					0 - Não tem outra movimento dentro desta iteração
					1 - Possui movimentos que devem ser realizados nesta iteração
				*/
				status = animal.move(indice);
				if (status == 1) {
					animaisNaFila.push(animal);
				} else if (status == -1) { //morre
					zebrasMortas.push(animal);
				} else {
					animal.setPassosRealizados(0);
				}
			});
			
			$.each(zebrasMortas, function(key, animal) {
				animal.morre();
			});
			Ambiente.atualizar();
        	Ambiente.clonarMapa();
        	indice++;
		}
		if (!temPresa) {
			algoritmo.pararSimulacao();
            abrirPopupGrafico();
		}
	};

	this.getNroAnimais = function() {
		var presas = 0, predadores = 0;
		$.each(this.animais, function(key, animal) {
			if (animal instanceof Presa) {
				presas++;
			} else if (animal instanceof Predador) {
				predadores++;
			}
		});
		return {"presas" : presas, "predadores" : predadores};
	};
}