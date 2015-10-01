function Algoritmo() {
	this.numeroMaximoInteracoes = 100;
	this.interacoes = 0;
    this.ambiente;

	this.simular = function() {
		this.ambiente = new Ambiente($("#nroLinhas").val(), $("#nroColunas").val());
        this.ambiente.desenharAmbiente("espacoAmbiente");

        var populacao = new Populacao($("#nroPredadores").val(), $("#nroPresas").val());
        populacao.gerarPopulacao();
	}

    this.release = function () {
        // while (this.interacoes < this.numeroMaximoInteracoes) {

        //     this.interacoes++;
        // }

        this.ambiente.atualizarAmbiente();
        setTimeOut("this.simular()", 1000);
    }
}
