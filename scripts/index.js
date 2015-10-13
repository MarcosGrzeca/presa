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

function abrirPopupAdicionarAgente() {
	$('#modalAdicionarAgente').modal("show").on('shown.bs.modal', function (e) {
  		var html = "";
  		for (i = 1; i <= $("#nroLinhas").val(); i++) {
  			html += "<option value='" + (i -1) + "'>" + i + "</option>";
  		}
  		$("#novaLinha").html(html);
  		$("#novaLinha").val(0);

  		var html = "";
  		for (i = 1; i <= $("#nroColunas").val(); i++) {
  			html += "<option value='" + (i -1) + "'>" + i + "</option>";
  		}
  		$("#novaColuna").html(html);
  		$("#novaColuna").val(0);
	})
}

function adicionarAgente()  {
	var elemento = Ambiente.getPosicao($("#novaLinha").val(), $("#novaColuna").val());
	if (elemento == 0) {
		console.log($("#novaLinha").val() + ' -- ' + $("#novaColuna").val());
		if ($("#novoAgente").val() == "presa") {
			algoritmo.populacao.createPresa(parseInt($("#novaLinha").val()), parseInt($("#novaColuna").val()));
		} else {
			algoritmo.populacao.createPredador(parseInt($("#novaLinha").val()), parseInt($("#novaColuna").val()));
		}
		Ambiente.atualizar();
		Ambiente.clonarMapa();
		$('#modalAdicionarAgente').modal("hide");
	} else {
		alert('A posição indicada já possui um animal');
	}
}