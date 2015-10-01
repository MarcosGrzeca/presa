function Algoritmo() {
	this.numeroMaximoInteracoes = 2000;
	this.interacoes = 0;

	this.simular = function() {
		var ambiente = new Ambiente($("#nroLinhas").val(), $("#nroColunas").val());
        ambiente.desenharAmbiente("espacoAmbiente");

        var populacao = new Populacao($("#nroPredadores").val(), $("#nroPresas").val());
        populacao.gerarPopulacao();

        while (this.interacoes < this.numeroMaximoInteracoes) {

            this.interacoes++;
        }
	}
}
