function Labirinto() {
	this.tamanho = 5;
	this.labirinto = [['00', '11'],
	                  ['10', '11'],
	                  ['00', '11'],
	                  ['00'],
	                  ['00'],
	                  ['00', '01'],
	                  ['00', '10'],
	                  ['11', '01'],
	                  ['01', '10'],
	                  ['00', '01', '11'],
	                  ['01', '10'],
	                  ['00', '01', '10', '11'],
	                  ['00', '10', '11'],
	                  ['00', '10', '11'],
	                  ['11', '01'],
	                  ['00', '10'],
	                  ['01', '11'],
	                  ['00', '01'],
	                  ['01', '10'],
	                  ['00', '11'],
	                  ['01', '10'],
	                  ['10', '11'],
	                  ['10', '11', '01'],
	                  ['10', '11'],
	                  ['01', '11']];
	this.posicao = 0;
	this.baixo = '00';
	this.cima = '01';
	this.direita = '10';
	this.esquerda = '11';
	
	this.validaMovimento = function(posicao, movimento) {
		var valido = 0;
		if(posicao % this.tamanho == 0) { //coluna esquerda
			if(movimento == this.esquerda) {
				valido = 10;
			}
		} else if(posicao % this.tamanho == this.tamanho-1) { //coluna direita
			if(movimento == this.direita) {
				valido = 10;
			}
		} else if(parseInt(posicao / this.tamanho) == 0) { //linha 1
			if(movimento == this.cima) {
				valido = 10;
			}
		} else if(parseInt(posicao / this.tamanho) == this.tamanho-1) { //ultima linha
			if(movimento == this.baixo) {
				valido = 10;
			}
		}
		if(valido > 0) {
			return valido;
		}
		var pos = this.labirinto[posicao];
		if (typeof pos == "undefined") {
			return 15;
		}
		if($.inArray(movimento, pos) == -1){
			valido = 5;
		}
		return valido;
	};
	
	this.calculaDistanciaFinal = function(ultimaPosicao) {
		if (ultimaPosicao > (this.tamanho * this.tamanho)) {
			return 50;
		}
		var linha = this.tamanho - 1 - parseInt(ultimaPosicao / this.tamanho);
		var coluna = this.tamanho - 1 - (ultimaPosicao % this.tamanho);
		return linha + coluna;
	};
	
	this.move = function(movimento) {
		if(movimento == this.esquerda) {
			this.posicao -= 1;
		} else if(movimento == this.direita) {
			this.posicao += 1;
		} else if(movimento == this.cima) {
			this.posicao -= this.tamanho;
		} else if(movimento == this.baixo) {
			this.posicao += this.tamanho;
		}
		return this.posicao;
	};
	
	this.calcularFitness = function(movimentos) {
		var fitness = 0;
		var f;
		var pos = 0;
		for(var i = 0; i < movimentos.length; i=i+2){
			var mv = movimentos.substring(i, i+2);
			f = this.validaMovimento(pos, mv);
			if (f == 0) {
				pos = this.move(mv);
			}
			
			fitness += f;
		}
		f = this.calculaDistanciaFinal(pos);
		fitness += f;
		if(f == 0) {
			return f;
		}
		return fitness;
	};
}
