function Algoritmo() {
	this.numeroMaximoInteracoes = 100;
	this.interacoes = 0;
    this.ambiente;
    this.populacao;

	this.simular = function() {
		Ambiente.inicializar($("#nroLinhas").val(), $("#nroColunas").val());
        Ambiente.desenhar("espacoAmbiente");

        this.populacao = new Populacao($("#nroPredadores").val(), $("#nroPresas").val());
        //this.populacao.gerarPopulacao();
        this.populacao.gerarPopulacaoTeste();
        Ambiente.atualizar();
        Ambiente.clonarMapa();
        setTimeout("release()", 2000);
	}

    this.release = function() {
        if (this.interacoes < this.numeroMaximoInteracoes) {
            Ambiente.atualizarRastros();
            this.populacao.movimentar();
            Ambiente.atualizar();
            Ambiente.clonarMapa();
            this.interacoes++;
            setTimeout("release()", 2000);
        }
    }
}
