var modoSimulacao = false;
var timeVerificar;
var simulacao;
var iteracoesPresasCapturadas = [];

$(document).ready(function() {
	timeVerificar = setInterval(
     				function() {
     					verificarSimulacao()
     				}, 3000);
});


function iniciarSimulacao() {
	modoSimulacao = true;
	simulacao = new Simulacao();
	simulacao.configurar();
	simulacao.iniciar();
}
function verificarSimulacao() {
	if (modoSimulacao) {
		simulacao.verificarSeAcabou();
	}
}

function Simulacao() {
	this.numeroTestes = 100;
	this.testesRealizados = 0;
	this.resultado = [];

	this.verificarSeAcabou = function() {
	    if ((algoritmo.iteracoes >= algoritmo.numeroMaximoIteracoes) || algoritmo.simulacaoInterrompida) {

	    	if (algoritmo.getNumeroPresas() != 0) {
		    	var i;
		    	for (i = (parseInt($("#nroPresas").val()) - algoritmo.getNumeroPresas()); i < $("#nroPresas").val(); i++) {
		    		iteracoesPresasCapturadas.push("");		
		    	}
		    }
	    	var res = (this.resultado.length  + 1) + "," + (algoritmo.getNumeroPresas() == 0) + "," + $("#nroPredadores").val() + "," + $("#nroPresas").val() + "," +  ($("#motivacaoPresas").val() == "C") + "," + iteracoesPresasCapturadas.join() + ";";
	    	this.resultado.push(res);
	    	if (this.testesRealizados < this.numeroTestes) {
	    		this.iniciar();
	    	} else {
	    		alert("SimulacaoFinalizada");
	    		console.log(JSON.stringify(this.resultado));
	    		clearTimeout(timeVerificar);
	    	}
	    }
	}

	this.configurar = function() {
		$("#nroLinhas").val(15);
		$("#nroColunas").val(15);
		$("#nroPredadores").val(10);
		$("#nroPresas").val(10);
	}

	this.iniciar = function() {
		iniciar();
		$("#velocidadeIteracoes").val(100);
		algoritmo.setVelocidade(16);
		this.testesRealizados++;
	}
}