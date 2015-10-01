function Algoritmo() {
	this.achou = false;
	this.numeroMaximoInteracoes = 2000;
	this.interacoes = 0;

	this.calcular = function() {
		var populacao = new Populacao($("#populacao").val(), $("#taxaMutacao").val(), $("#taxaCrossOver").val(), $("#taxaElitismo").val(), $("#pontosCorte").val());
    	populacao.gerarPopulacao();
    	populacao.ordenar();

    	this.interacoes = 1;
    	while (!this.achou) {
    		populacao.ordenar();
    		populacao.calcularNovosCromossomos();
    		populacao.ordenar();
    		populacao.elitismo();
    		populacao.ordenar();
    		var objetivo = populacao.objetivo();
    		if (objetivo.achou) {
    			return {"achou" : true, "individuo" :objetivo.individuo, "passos" : this.interacoes};
    		}
    		if (this.interacoes > this.numeroMaximoInteracoes) {
    			return {"achou" : false};
    		}
    		this.interacoes++;
    	}
	}
}
