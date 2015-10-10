var algoritmo;

function release() {
	algoritmo.release();
}

function iniciar() {
	$("#telaConfiguracao").hide();
	$("#telaSimulacao").show();

	algoritmo = new Algoritmo();
	algoritmo.simular();
}

function continuarSimulacao() {
	algoritmo.continuarSimulacao();
	$("#botaoParar").removeClass("hide");
	$("#botaoContinuar").addClass("hide");
}

function pararSimulacao() {
	algoritmo.pararSimulacao();	
	$("#botaoParar").addClass("hide");
	$("#botaoContinuar").removeClass("hide");				
}

function voltarParaTelaInicial() {
	algoritmo.pararSimulacao();
	$("#telaConfiguracao").show();
	$("#telaSimulacao").hide();
}