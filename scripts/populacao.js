function Populacao(nroPredadores, nroPresas) {
	this.nroPredadores = nroPredadores;
	this.nroPresas = nroPresas;
	this.animais = [];
	this.contAnimais = 1;

	this.getAnimais = function() {
		return this.animais;
	}
	
	this.gerarPopulacao = function() {
		/*for (var i = 0; i < nroPresas; i++) {
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
		}*/
		this.gerarPopulacaoTeste();
	};

	this.gerarPopulacaoTeste = function() {
		this.createPresa(2, 1);
		this.createPredador(1, 1);
		this.createPredador(1, 2);
		this.createPredador(3, 2);
		this.createPredador(0, 0);
		//this.createPredador(1, 3);
		//this.createPredador(3, 3);
	};

	this.movimentar = function() {
		var mortos = [], status = 0;
		var animaisNaFila = this.animais;
		var indice = 0;
		while (animaisNaFila.length > 0) {
			var animais = $.extend(true, [], animaisNaFila);
			var animaisNaFila = [];
			/*$.each(animais, function(key, animal) {
				status = animal.move(indice);
				if (status == 1) {
					animaisNaFila.push(animal);
				} else if (status == -1) { //morre
					mortos.push(animal);
				} else {
					//animal.incrementarIteracao();
					animal.setPassosRealizados(0);
				}
			});*/
			
			while (animais.length > 0) {
				var random = gerarRandomico(animais.length, 0);
				console.log(random);
				var animal = animais[random];
				console.log(animal);
				status = animal.move(indice);
				if (status == 1) {
					animaisNaFila.push(animal);
				} else if (status == -1) { //morre
					mortos.push(animal);
				} else {
					//animal.incrementarIteracao();
					animal.setPassosRealizados(0);
				} 
				//delete animais[random];
				console.log(animais);
				
				animais.slice(random, 1);
				console.log(animais);
				console.log(animais.length);
			//	debugger;
			}
			//debugger;

			$.each(mortos, function(key, animal) {
				animal.morre();
			});
			Ambiente.atualizar();
        	Ambiente.clonarMapa();
        	indice++;
		}
		//debugger;
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