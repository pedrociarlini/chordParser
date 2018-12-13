/**
 * 
 */
function ChordsParser () {
	this.dados = {
		// lista de uma sequencia que contém uma sequencia de notas
		// [0] = ["<nota1>", "<nota2>", "<nota3>"]...
		linhasOriginais : []
	};
	this.notasExistentes = {"C" : 1, "C#": 2, "D": 3, "D#": 4, "E": 5, "F": 6,
			"F#" : 7, "G" : 8, "G#" : 9, "A" : 10, "A#" : 11, "B" : 12 };

	/*
	Transpõe uma nota. O itervalo precisa ser >=-11 <=11.
	Retorna a nota desejada.
	*/
	this.transporNota = function(nota, intervalo) {
		if(intervalo < -11 || intervalo > 11) {
			throw "Intervalo fora do permitido";
		}
		if(!this.notasExistentes[nota]) {
			throw "A nota informada não existe";
		}
		const grauInicial = this.notasExistentes[nota];

		let grauFinal = grauInicial + intervalo;
		if (grauFinal > 12) {
			grauFinal -= 12;
		} else if (grauFinal < 1) {
			grauFinal += 12;
		}
		
		const result = Object.keys(this.notasExistentes)[grauFinal - 1];
		// console.log("Nota " + nota + ", transpondo " + intervalo + " fica " + result);
		return result;
	}

	this.tratar = function(texto) {
		// TODO Reconhecer acordes em texto e fazero parse dos mesmos.
		// Guardar todos os acordes em sequencia, para cada linha
		const linhas = texto.split("\n");
		for (let numLinha in linhas) {
			const linha = linhas[numLinha];
			const palavras = linha.split("\n");
			let temNota = false;
			let acordes = [];
			console.log("Tratando linha: " + linha);
			for (let numPal in palavras) {
				const palavra = palavras[numPal].replace(/\|/g, " ");
				let ehNota = false;
				for(let nota in this.notasExistentes) {
					if (palavra.startsWith(nota)) {
						ehNota = true;
						temNota = true;
						break;
					}
				}
				if (ehNota) {
					acordes.push(palavra);
				}
			}
			if (temNota) {
				this.dados.linhasOriginais.push(acordes);
			}
		}

		console.log ("Linhas com acordes: " + this.dados.linhasOriginais.length);
		return this.dados;
	}

	this.transpor = function(elementSelector) {
		this.transporNota("E", -5);

		const resultPanel = $(elementSelector);
		for (let linha in this.dados.linhasOriginais) {
			resultPanel.append(linha.toString());
		}
	}

};