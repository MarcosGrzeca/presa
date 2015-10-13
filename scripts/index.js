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
	$(".algoritmoParado").addClass("hide");
}

function pararSimulacao() {
	algoritmo.pararSimulacao();	
	$("#botaoParar").addClass("hide");
	$(".algoritmoParado").removeClass("hide");				
}

function voltarParaTelaInicial() {
	algoritmo.pararSimulacao();
	$("#telaConfiguracao").show();
	$("#telaSimulacao").hide();
}

function teste() {
	var teste = [1, 2, 3, 4, 5];
	var indice = 0;
	while (teste.length > 0 && indice < 10) {
		var random = gerarRandomico(teste.length, 0);
		console.log(random);
		console.log(teste);
		teste.splice(random, 1);
		console.info(teste);	
		console.log("TAMANHO " + teste.length);
		indice++;
	}
}