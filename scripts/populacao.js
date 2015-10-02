function Populacao(nroPredadores, nroPresas) {
	this.nroPredadores = nroPredadores;
	this.nroPresas = nroPresas;
	this.agentes = [];
	
	this.gerarPopulacao = function() {
		for (var i = 0; i < nroPredadores; i++) {
			var predador = new Predador();
			predador.gerarPosicaoAleatoria();
			this.agentes.push(predador);
		}
		for (var i = 0; i < nroPresas; i++) {
			var presa = new Presa();
			presa.gerarPosicaoAleatoria();
			this.agentes.push(presa);
		}
	};

	this.ordenar = function() {
		this.individuos.sort(this.compare);
	}

	this.ordenarFilhos = function() {
		this.filhos.sort(this.compare);
	}

	this.compare = function(a, b) {
	  if (a["fitness"] < b["fitness"])
	    return -1;
	  if (a["fitness"] > b["fitness"])
	    return 1;
	  return 0;
	}

	this.calcularNovosCromossomos = function() {
		this.individuosCrossOver = [];
		var countIndividuos = 0;
		for (var i = 0; i < (this.tamanhoPopulacao * taxaCrossOver); i++) {
			this.individuosCrossOver.push(this.individuos[i]); 
		}
		
		this.individuosCopiaParaElitismo = [];
		for (var i = 0; i < this.tamanhoPopulacao; i++) {
			this.individuosCopiaParaElitismo.push(this.individuos[i]); 
		}

		var limiteSuperior = this.tamanhoPopulacao * taxaCrossOver;
		for (var i = 0; i < (this.tamanhoPopulacao / 2); i++) {
			var pos = gerarRandomico(limiteSuperior, 0);	
			var igual = true;
			while (igual) {
				var pos2 = gerarRandomico(limiteSuperior, 0);
				if (pos2 != pos) {
					igual = false;
				}
			}
			igual = true;
			while (igual) {
				var pos3 = gerarRandomico(limiteSuperior, 0);
				if (pos3 != pos && pos3 != pos2) {
					igual = false;
				}
			}

			//Seleção por torneio
			if (this.individuosCrossOver[pos].fitness > this.individuosCrossOver[pos2].fitness) {
				if (this.individuosCrossOver[pos3].fitness > this.individuosCrossOver[pos2].fitness) {
					pos2 = pos3;
				} 
			} else {
				if (this.individuosCrossOver[pos3].fitness > this.individuosCrossOver[pos].fitness) {
					pos = pos3;
				}
			}
			
			if(this.pontosCorte == 1) {
				var pontoCorte = gerarRandomico(( this.individuosCrossOver[pos].sequencia.length -1), 1);
				var novoFilho1 = this.individuosCrossOver[pos].sequencia.substr(0, pontoCorte)  +  this.individuosCrossOver[pos2].sequencia.substr(pontoCorte);
				var novoFilho2 = this.individuosCrossOver[pos2].sequencia.substr(0, pontoCorte) +  this.individuosCrossOver[pos].sequencia.substr(pontoCorte);
			} else {
				var filho1 = this.individuosCrossOver[pos].sequencia;
				var filho2 = this.individuosCrossOver[pos2].sequencia;
				var valido = false;
				while (!valido) {
					pontoCorte = gerarRandomico(( filho1.length -1), 1);
					pontoCorte1 = gerarRandomico(( filho1.length -1), 1);
					if (pontoCorte < pontoCorte1) {
						valido = true;
					}
				}
				
				var novoFilho1 = filho1.substr(0, pontoCorte) + filho2.substr(pontoCorte, (pontoCorte1 - pontoCorte)) + 
					filho1.substr(pontoCorte1);
				var novoFilho2 = filho2.substr(0, pontoCorte) + filho1.substr(pontoCorte, (pontoCorte1 - pontoCorte)) + 
					filho2.substr(pontoCorte1);
				
			}

			var individuo1 = new Individuo();
			individuo1.setar(novoFilho1);
			this.mutacao(i, individuo1);
			this.individuos[countIndividuos] = individuo1;
			countIndividuos++;
			
			var individuo2 = new Individuo();
			individuo2.setar(novoFilho2);
			this.mutacao(i, individuo2);
			this.individuos[countIndividuos] = individuo2;
			countIndividuos++;
		}
		this.ordenar();
	}
	
	this.mutacao = function(indice, individuo) {
		var taxa = ((this.tamanhoPopulacao * this.taxaMutacao) - this.totalMutados) /  (this.tamanhoPopulacao - indice * 2);
		var numero = gerarRandomico(10, 0);
		if (taxa > 0) {
			taxa = Math.round(taxa*10);	
			if (numero <= taxa) {
				individuo.mutacao();
				this.totalMutados++;
			}
		}
	}
	
	this.elitismo = function() {
		var count = 0;
		for (i = (this.tamanhoPopulacao * this.taxaElitismo); i < this.tamanhoPopulacao; i++) {
    		this.individuos[i] = this.individuosCopiaParaElitismo[count];
    		count++;
    	}
	}
	
	this.objetivo = function() {
		var atingiuObjetivo = false;
		for (var i = 0; i < this.tamanhoPopulacao; i++) {
			if (this.individuos[i].fitness == 0) {
				atingiuObjetivo = true;
				return {"achou" : true, "individuo" : this.individuos[i]};
			}
		}
		if (!atingiuObjetivo) {
			return {"achou" : false};
		}
	}
}