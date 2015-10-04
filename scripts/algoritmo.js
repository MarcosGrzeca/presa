function Algoritmo() {
	this.numeroMaximoInteracoes = 100;
	this.interacoes = 0;
    this.ambiente;
    this.populacao;

	this.simular = function() {
		//this.ambiente = new Ambiente($("#nroLinhas").val(), $("#nroColunas").val());
        //this.ambiente.desenharAmbiente("espacoAmbiente");

        Ambiente.inicializar($("#nroLinhas").val(), $("#nroColunas").val());
        Ambiente.desenhar("espacoAmbiente");

        this.populacao = new Populacao($("#nroPredadores").val(), $("#nroPresas").val());
        this.populacao.gerarPopulacao();
        Ambiente.atualizar();

        setTimeout("release()", 500);
	}

    this.release = function() {
        if (this.interacoes < this.numeroMaximoInteracoes) {
            this.populacao.movimentar();
            console.log("Atualizando ");
            Ambiente.atualizar();
            this.interacoes++;
            setTimeout("release()", 500);
        }
    }
}
