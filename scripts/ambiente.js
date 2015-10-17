var Ambiente = {
	nroLinhas: 0,
	nroColunas: 0,
	mapa: [],
	mapaAnterior: [],
	idCampoTela: "",
	populacao: "",
	tempoDuracaoRastroPredadores: 5,

	inicializar: function(nroLinhas, nroColunas, tempoDuracaoRastroPredadores) {
		this.nroLinhas = nroLinhas;
		this.nroColunas = nroColunas;
		this.tempoDuracaoRastroPredadores = tempoDuracaoRastroPredadores;
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

	setPosicao: function(animal) {
		var posicoes = animal.getPosicao();
		this.mapa[posicoes.linha][posicoes.coluna] = animal;
	},

	getPosicaoObjeto: function(objeto) {
		//Esta função é semelhante a getPosicao, porém recebe como parâmetro um objeto contendo um atributo linha e outro coluna
		return getPosicao([objeto.linha][objeto.coluna]);
	},

	getPosicaoObjetoNoMapaAnterior: function(objeto) {
		return this.mapaAnterior[objeto.linha][objeto.coluna];
	},

	getAtributoDaPosicao: function(objeto, nomeAttr) {
		return $("#field_" + objeto.linha + "_" + objeto.coluna).attr(nomeAttr);
	},

	setAtributoDaPosicao: function(linha, coluna, atributo, valorAtributo) {
		$("#field_" + linha + "_" + coluna).attr(atributo, valorAtributo);
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
		return "<img src='imagens/predador/leao.png' />";
	},

	getHtmlPresa: function(trocaCor) {
		var cor = "";
		if (trocaCor) {
			cor = "_vermelha";
		}
		return "<img src='imagens/presa/1443719659_zebra" + cor + ".png' />";
	},

	setRastro: function(linha, coluna, intensidade, numeroPredador) {
		if (!numeroPredador) {
			numeroPredador = "";
		} else {
			this.setAtributoDaPosicao(linha, coluna, "numero_predador", numeroPredador);
		}
		this.setAtributoDaPosicao(linha, coluna, "rastro_intensidade", intensidade);
		$("#field_" + linha + "_" + coluna).addClass("rastro rastro_" + intensidade);
	},

	atualizarRastros: function() {
		$(".rastro").each(function(key, value) {
			var rastro_intensidade = $(this).attr("rastro_intensidade");
			$(this).removeClass("rastro_" + rastro_intensidade);
			if ((rastro_intensidade - 1) == 0) {
				$(this).removeClass("rastro");
				$(this).removeAttr("rastro_intensidade");
				$(this).removeAttr("numero_predador");
			} else {
				$(this).addClass("rastro_" + (rastro_intensidade - 1));
				$(this).attr("rastro_intensidade", (rastro_intensidade - 1));
			}
		});
	},

	clonarMapa: function() {
		this.mapaAnterior = $.extend(true, [], this.mapa);
	},

	getPopulacao: function() {
		return this.populacao;
	},
	
	setPopulacao: function(populacao) {
		this.populacao = populacao;
	},

	removerAnimal: function(animal) {
		this.limparPosicao(animal.getPosicao().linha, animal.getPosicao().coluna);

		var index = this.populacao.animais.indexOf(animal);
		if (index > -1) {
			this.populacao.animais.splice(index, 1);
		}
	},
}