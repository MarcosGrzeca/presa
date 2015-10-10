var algoritmo;

function release() {
	algoritmo.release();
}

function iniciar() {

	$("#slider-velocidade").slider({
		range: "min",
		min: 1,
		max: 100,
		value: 50,
		slide: function( event, ui ) {
			$( "#velocidadeIteracoes" ).val( ui.value );
			algoritmo.setVelocidade(4000 - (ui.value * 40));
		}
	});
	$( "#velocidadeIteracoes" ).val( $( "#slider-velocidade" ).slider( "value" ) );

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