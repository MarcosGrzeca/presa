/*function Ambiente(nroLinhas, nroColunas) {
	this.nroLinhas = nroLinhas;
	this.nroColunas = nroColunas;
	this.mapa = [];

	this.inicializarMatriz = function() {
		for (i = 0; i < nroLinhas; i++) {
			this.mapa[i] = [];
			for (j = 0; j < nroColunas; j++) {
				this.mapa[i][j] = 0;
			}
		}
	}

	this.desenharAmbiente = function(idCampo) {
		this.inicializarMatriz();
		var html = "<table class='ambiente'>";
		for (i = 0; i < nroLinhas; i++) {
			html += "<tr>";
			for (j = 0; j < nroColunas; j++) {
				html += "<td id='field_" + i + "_" + j + "'></td>"; 
			}
			html += "</tr>";
		}
		html += "</table>";
		console.info(html);
		$("#" + idCampo).html(html);
	}

	this.atualizarAmbiente = function() {
		$.each(this.mapa, function(key, linha) {
			$.each(linha, function(key, coluna) {
				console.info(linha + " .. " + coluna);
			});
		});
	}
	
}*/

var Ambiente = {
	nroLinhas: 0,
	nroColunas: 0,
	mapa: [],
	idCampoTela: "",

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
	},

	atualizar: function() {
		for (i = 0; i < this.nroLinhas; i++) {
			for (j = 0; j < this.nroColunas; j++) {
				if (this.mapa[i][j] instanceof Predador) {
					$("#field_" + i + "_" + j).html(this.getHtmlPredador());
					$("#field_" + i + "_" + j).addClass("predador predador_" + this.mapa[i][j].getNumero());
				} else if (this.mapa[i][j] instanceof Presa) {
					$("#field_" + i + "_" + j).html(this.getHtmlPresa());
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

	limparPosicao: function(linha, coluna) {
		if (this.mapa[linha][coluna] != 0) {
			$("#field_" + linha + "_" + coluna).removeClass("presa_" + this.mapa[linha][coluna].getNumero());
			$("#field_" + linha + "_" + coluna).removeClass("predador_" + this.mapa[linha][coluna].getNumero());
		}
		this.mapa[linha][coluna] = 0;
		console.info(linha + "_" + coluna);
		$("#field_" + linha + "_" + coluna).html("");
		$("#field_" + linha + "_" + coluna).removeClass("presa predador");
	},

	getHtmlPredador: function() {
		return "<img src='imagens/predador/House Lannister-26.png' />";
	},

	getHtmlPresa: function() {
		return "<img src='imagens/presa/1443719659_zebra.png' />";
	}
}