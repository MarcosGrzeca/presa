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

	this.movimentar = function() {
		$.each(this.animais, function(key, animal)	 {
			console.log(animal);
			animal.move();
		});
	}
}