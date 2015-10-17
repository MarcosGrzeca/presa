var algoritmo;

function iniciar() {
  //Validação para verificar se número de presas e predadores não é maior que o ambiente
  var ambientet = parseInt($("#nroLinhas").val()) * parseInt($("#nroColunas").val());
  var somapp = parseInt($("#nroPredadores").val()) + parseInt($("#nroPresas").val());
  if (ambientet <= somapp) {
    alert('Número de presas e predadores maior que tamnho do ambiente');
    return;
  }
  
  //Botão de controle de velocidade de execução
  $("#slider-velocidade").slider({
    range: "min",
    min: 0,
    max: 100,
    value: 30,
    slide: function( event, ui ) {
      $("#velocidadeIteracoes").val(ui.value);
      calcularVelocidadeSimulacao(ui.value);
    } 
  });
  $("#velocidadeIteracoes").val($("#slider-velocidade").slider("value"));

  ocultarTelaConfiguracoes();

  //Início da simulação
  algoritmo = new Algoritmo();
  algoritmo.simular();
}

function ocultarTelaConfiguracoes() {
  $("#telaConfiguracao").hide();
  $("#telaSimulacao").show();
}

function exibirTelaConfiguracoes() {
  algoritmo.pararSimulacao();
  $("#telaConfiguracao").show();
  $("#telaSimulacao").hide();
}

function calcularVelocidadeSimulacao(velocidade) {
  var v = 0;
  if (velocidade >= 60) {
    v = Math.sqrt(40, 2)*10 - Math.sqrt((velocidade - 60), 2)*10;
  } else if (velocidade >= 40) {
    v = Math.sqrt(60, 2)*40 - Math.sqrt((velocidade - 40), 2)*45;
  } else {
    v = 3000 - (velocidade * 66);
  }
  algoritmo.setVelocidade(Math.round(v));
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
	for (i = 0; i < algoritmo.iteracoes; i++) {
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

function gerarRandomico(limiteSuperior, limiteInferior) {
  return Math.floor((Math.random() * limiteSuperior) + limiteInferior);
}