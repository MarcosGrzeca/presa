var Ambiente = {
	nroLinhas: 0,
	nroColunas: 0,
	mapa: [],
	mapaAnterior: [],
	idCampoTela: "",
	populacao: "",

	inicializar: function(nroLinhas, nroColunas) {
		this.nroLinhas = nroLinhas;
		this.nroColunas = nroColunas;
	},

	inicializarMatriz: function() {
		for (i = 0; i < this.nroLinhas; i++) {
			this.mapa[i] = [];
			for (j = 0; j < this.nroColunas; j++) {
				this.mapa[i][j] = 0;
			}
		}
	},

	desenhar: function(idCampo) {
		this.idCampoTela = idCampo;		
		this.inicializarMatriz();
		var html = "<table class='ambiente'>";
		for (i = 0; i < this.nroLinhas; i++) {
			html += "<tr>";
			for (j = 0; j < this.nroColunas; j++) {
				html += "<td id='field_" + i + "_" + j + "'></td>"; 
			}
			html += "</tr>";
		}
		html += "</table>";
		$("#" + this.idCampoTela).html(html);
		this.clonarMapa();
	},

	atualizar: function() {
		for (i = 0; i < this.nroLinhas; i++) {
			for (j = 0; j < this.nroColunas; j++) {
				if (this.mapa[i][j] instanceof Predador) {
					$("#field_" + i + "_" + j).html(this.getHtmlPredador());
					$("#field_" + i + "_" + j).addClass("predador predador_" + this.mapa[i][j].getNumero());
				} else if (this.mapa[i][j] instanceof Presa) {
					$("#field_" + i + "_" + j).html(this.getHtmlPresa(this.mapa[i][j].isModoFuga()));
					$("#field_" + i + "_" + j).addClass("presa presa_" + this.mapa[i][j].getNumero());
				}
			}
		}	
	},

	getPosicao: function(linha, coluna) {
		return this.mapa[linha][coluna];
	},

	getPosicaoObjeto: function(objeto) {
		return this.mapa[objeto.linha][objeto.coluna];
	},

	getPosicaoObjetoAnterior: function(objeto) {
		return this.mapaAnterior[objeto.linha][objeto.coluna];
	},

	getAttrAnterior: function(objeto, nomeAttr) {
		return $("#field_" + objeto.linha + "_" + objeto.coluna).attr(nomeAttr);
	},

	setPosicao: function(animal) {
		var posicoes = animal.getPosicao();
		/*if (animal instanceof Predador) {
			this.setRastro(posicoes.linha, posicoes.coluna, 10);
		}*/
		this.mapa[posicoes.linha][posicoes.coluna] = animal;
	},

	limparPosicao: function(linha, coluna) {
		if ($.isNumeric(linha)) {
			if (this.mapa[linha][coluna] != 0) {
				$("#field_" + linha + "_" + coluna).removeClass("presa_" + this.mapa[linha][coluna].getNumero());
				$("#field_" + linha + "_" + coluna).removeClass("predador_" + this.mapa[linha][coluna].getNumero());
			}
			this.mapa[linha][coluna] = 0;
			$("#field_" + linha + "_" + coluna).html("");
			$("#field_" + linha + "_" + coluna).removeClass("presa predador");
		}
	},

	getHtmlPredador: function() {
		return "<img src='imagens/predador/House Lannister-26.png' />";
	},

	getHtmlPresa: function(trocaCor) {
		var cor = "";
		if (trocaCor) {
			cor = "_vermelha";
		}
		return "<img src='imagens/presa/1443719659_zebra" + cor + ".png' />";
	},

	setRastro: function(linha, coluna, intensidade) {
		$("#field_" + linha + "_" + coluna).attr("rastro_intensidade", intensidade);
		$("#field_" + linha + "_" + coluna).addClass("rastro rastro_" + intensidade);
	},

	atualizarRastros: function() {
		$(".rastro").each(function(key, value) {
			var rastro_intensidade = $(this).attr("rastro_intensidade");
			$(this).removeClass("rastro_" + rastro_intensidade);
			if ((rastro_intensidade - 1) == 0) {
				$(this).removeClass("rastro");
				$(this).removeAttr("rastro_intensidade");
			} else {
				$(this).addClass("rastro_" + (rastro_intensidade - 1));
				$(this).attr("rastro_intensidade", (rastro_intensidade - 1));
			}
		});
	},

	clonarMapa: function() {
		this.mapaAnterior = $.extend(true, [], this.mapa);
	},

	setPopulacao: function(populacao) {
		this.populacao = populacao;
	},

	getPopulacao: function() {
		return this.populacao;
	},

	removerAnimal: function(animal) {
		this.limparPosicao(animal.getPosicao().linha, animal.getPosicao().coluna);

		var index = this.populacao.animais.indexOf(animal);
		if (index > -1) {
			this.populacao.animais.splice(index, 1);
		}
	},
}