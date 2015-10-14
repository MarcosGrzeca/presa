function Algoritmo() {
	this.numeroMaximoInteracoes = 5000;
	this.interacoes = 0;
    this.populacao;
    this.simulacaoInterrompida = false;
    this.velocidade = 1000;
    this.presasIteracoes = [];
    this.predadoresIteracoes = [];

    this.getPopulacao = function() {
        return this.populacao;
    }


	this.simular = function() {
		Ambiente.inicializar($("#nroLinhas").val(), $("#nroColunas").val(), $("#duracaoRastro").val());
        Ambiente.desenhar("espacoAmbiente");

        this.populacao = new Populacao($("#nroPredadores").val(), $("#nroPresas").val());
        this.populacao.gerarPopulacao();
        //this.populacao.gerarPopulacaoTeste();

        Ambiente.setPopulacao(this.populacao);
        Ambiente.atualizar();
        Ambiente.clonarMapa();
        setTimeout("release()", this.velocidade);
	}


    this.release = function() {
        if (this.interacoes < this.numeroMaximoInteracoes && !(this.simulacaoInterrompida)) {
            Ambiente.atualizarRastros();
            this.populacao.movimentar();
            Ambiente.atualizar();
            Ambiente.clonarMapa();
            this.interacoes++;
            $('#iteracoes_qdte').val(this.interacoes);
            var nro = this.populacao.getNroAnimais();
            this.predadoresIteracoes.push(nro.predadores);
            $('#predadores_qdte').val(nro.predadores);
            this.presasIteracoes.push(nro.presas);
            $('#presas_qdte').val(nro.presas);
            setTimeout("release()", this.velocidade);
        } else if (!this.simulacaoInterrompida) {
            abrirPopupGrafico();
            alert("O limite de iterações foi atingido.");
        }
    }

    this.continuarSimulacao = function() {
        this.simulacaoInterrompida = false;
        this.release();
    }

    this.pararSimulacao = function() {
        this.simulacaoInterrompida = true;
    }

    this.setVelocidade = function(velocidade) {
        this.velocidade = velocidade;
    }
}