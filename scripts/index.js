function iniciar() {
	$("#aguarde").removeClass("hide");
	$("#resultado").addClass("hide");
	
	setTimeout(function() {
		var d = new Date();
		var inicio = d.getTime();
		$(".casa_percorrida").removeClass("casa_percorrida");
		var algoritmo = new Algoritmo();
		var resultado = algoritmo.calcular();
		var d = new Date();
		var fim = d.getTime();
		
//		console.log(fim + " --- " + inicio);
		
		if (resultado.achou == true) {
			var html = "O caminho mais curto até o final do labirinto possui como movimentos " + resultado.individuo.sequencia + ":<ol>";
			
			var lab = new Labirinto();
			var casas = [0];
			for(var i = 0; i < resultado.individuo.sequencia.length; i=i+2){
				var mv = resultado.individuo.sequencia.substring(i, i+2);
				if (mv == "00") {
					html += "<li>Para baixo (" + mv + ")";
				} else if (mv == "01") {
					html += "<li>Para cima (" + mv + ")";
				} else if (mv == "10") {
					html += "<li>Para direita (" + mv + ")";
				} else if (mv == "11") {
					html += "<li>Para esquerda (" + mv + ")";
				}
				var posicao = lab.move(mv);
				casas.push(posicao);
			}
			html += "</ol>";
			html += "<b>Nº passos: " + (resultado.passos+1) + "</b>";
			html += "<br/><b>Tempo: " + ((fim - inicio)/1000) + " (s)</b>";
			$("#textoResultado").html(html);
			
			$(".table-res td").each(function(){
				if($.inArray(parseInt($(this).html()), casas) != -1){
					$(this).addClass("casa_percorrida");
				}
			});

		} else {
			$("#resultado").html("O algoritmo execedeu o limite de passos");
		}
		$("#aguarde").addClass("hide");
		$("#resultado").removeClass("hide");
	}, 100);
}
