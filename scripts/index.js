var algoritmo;

function release() {
	algoritmo.release();
}

function iniciar() {
	var ambientet = parseInt($("#nroLinhas").val()) * parseInt($("#nroColunas").val());
	var somapp = parseInt($("#nroPredadores").val()) + parseInt($("#nroPresas").val());
	if (ambientet <= somapp) {
        alert('Número de presas e predadores maior que tamnho do ambiente');
        return;
    }

	$("#slider-velocidade").slider({
		range: "min",
		min: 0,
		max: 100,
		value: 30,
		slide: function( event, ui ) {
			$( "#velocidadeIteracoes" ).val( ui.value );
      var v = 0;
      if (ui.value >= 60) {
        v = Math.sqrt(40, 2)*10 - Math.sqrt((ui.value - 60), 2)*10;
      } else if (ui.value >= 40) {
        v = Math.sqrt(60, 2)*40 - Math.sqrt((ui.value - 40), 2)*45;
      } else {
        v = 3000 - (ui.value * 66);
      }
			algoritmo.setVelocidade(Math.round(v));
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

function abrirPopupGrafico() {
	$('#modalGrafico').modal("show");
	var numIteracoes = [];
	for (i = 0; i < algoritmo.interacoes; i++) {
		numIteracoes.push(i+1);
	}
	$('#grafico').highcharts({
        title: {
            text: 'Resultado',
            x: -20 //center
        },
        subtitle: {
            text: '',
            x: -20
        },
        xAxis: {
            categories: numIteracoes
        },
        yAxis: {
            title: {
                text: 'Quantidade de animais'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Presas',
            data: algoritmo.presasIteracoes
        },{
            name: 'Predadores',
            data: algoritmo.predadoresIteracoes
        }]
    });

}
