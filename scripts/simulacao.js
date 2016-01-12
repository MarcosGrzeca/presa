var modoSimulacao = false;
var timeVerificar;
var simulacao;

$(document).ready(function() {
	simulacao = new Simulacao();
	simulacao.configurar();
	simulacao.iniciar();
	timeVerificar = setInterval(
     				function() {
     					verificarSimulacao()
     				}, 3000);
});

function verificarSimulacao() {
	simulacao.verificarSeAcabou();
}

function Simulacao() {
	this.numeroTestes = 1000;
	this.testesRealizados = 0;
	this.resultado = [];

	this.verificarSeAcabou = function() {
	    if ((algoritmo.iteracoes >= algoritmo.numeroMaximoIteracoes) || algoritmo.simulacaoInterrompida) {
	    	var res = {"todasPresasCapturadas" : (algoritmo.getNumeroPresas() == 0), "iteracoes" : algoritmo.iteracoes};
	    	this.resultado.push(res);
	    	if (this.testesRealizados < this.numeroTestes) {
	    		this.iniciar();
	    	}
	    }
	}

	this.configurar = function() {
		$("#nroLinhas").val(15);
		$("#nroColunas").val(15);
		$("#nroPredadores").val(10);
		$("#nroPresas").val(4);
	}

	this.iniciar = function() {
		iniciar();
		algoritmo.setVelocidade(100);
		$("#velocidadeIteracoes").val(100);
		this.testesRealizados++;
	}
}
