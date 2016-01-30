function Algoritmo() {
	this.numeroMaximoIteracoes = 5000;
	this.iteracoes = 0;
    this.populacao;
    this.simulacaoInterrompida = false;
    this.velocidadeSimulacao = 1000;
    this.presasIteracoes = [];
    this.predadoresIteracoes = [];

    this.getPopulacao = function() {
        return this.populacao;
    }

    this.setVelocidade = function(velocidade) {
        this.velocidadeSimulacao = velocidade;
    }

	this.simular = function() {
        delete iteracoesPresasCapturadas;
        iteracoesPresasCapturadas = [];
		Ambiente.inicializar($("#nroLinhas").val(), $("#nroColunas").val(), $("#duracaoRastro").val());
        Ambiente.desenhar("espacoAmbiente");

        this.populacao = new Populacao($("#nroPredadores").val(), $("#nroPresas").val());
        this.populacao.gerarPopulacao();
        Ambiente.setPopulacao(this.populacao);

        Ambiente.atualizar();
        Ambiente.clonarMapa();
        setTimeout("algoritmo.atualizar()", this.velocidadeSimulacao);
	}

    this.atualizar = function() {
        if (this.iteracoes < this.numeroMaximoIteracoes && !(this.simulacaoInterrompida)) {
            Ambiente.atualizarRastros();
            this.populacao.movimentar();
            Ambiente.atualizar();
            Ambiente.clonarMapa();
            this.iteracoes++;
            this.atualizarNumerosTela();
            setTimeout("algoritmo.atualizar()", this.velocidadeSimulacao);
        } else if (!this.simulacaoInterrompida) {
            abrirPopupGrafico();
            $('#tituloGrafico').html("O limite de iterações foi atingido.");
        }
    }

    this.atualizarNumerosTela = function() {
        $('#iteracoes_qdte').val(this.iteracoes);
        var nro = this.populacao.getNroAnimais();
        this.predadoresIteracoes.push(nro.predadores);
        $('#predadores_qdte').val(nro.predadores);
        this.presasIteracoes.push(nro.presas);
        $('#presas_qdte').val(nro.presas);
    }

    this.continuarSimulacao = function() {
        this.simulacaoInterrompida = false;
        this.atualizar();
    }

    this.pararSimulacao = function() {
        this.simulacaoInterrompida = true;
    }

    this.getNumeroPresas = function() {
        var nro = this.populacao.getNroAnimais();
        return nro.presas;
    }
}