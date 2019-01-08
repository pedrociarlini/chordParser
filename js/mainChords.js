/**
 * 
 */
function ChordsParser () {
	this.dados = {
		// lista de uma sequencia que contém uma sequencia de notas
		// [0] = ["<nota1>", "<nota2>", "<nota3>"]...
		linhasOriginais : [],
		textoOriginal : "",
		textoParsed : ""
	};
	this.notasExistentes = {"C" : 1, "C#": 2, "Db": 2, "D": 3, "D#": 4, "Eb": 4, "E": 5, "F": 6,
			"F#" : 7, "Gb" : 7, "G" : 8, "G#" : 9, "Ab" : 9, "A" : 10, "A#" : 11, "Bb" : 11, "B" : 12 };
	this.grausExistentes = {};

	for (let nota in this.notasExistentes) {
		this.grausExistentes[this.notasExistentes[nota]] = nota;
	}
	

	/*
	Transpõe uma nota. O itervalo precisa ser >=-11 <=11.
	Retorna a nota desejada.
	*/
	this.transporNota = function(notaOriginal, intervalo) {
		if(intervalo < -11 || intervalo > 11) {
			throw "Intervalo fora do permitido";
		}
		let nota = notaOriginal.substring(0, 2);
		if (nota.substring(1, 2) != "#" && nota.substring(1, 2) != "b") {
			nota = notaOriginal.substring(0, 1)
		}

		if(!this.notasExistentes[nota]) {
			throw "A nota informada não existe: " + nota;
		}
		// TODO substituições de sustenido (Melhorar isso)

		const grauInicial = this.notasExistentes[nota];

		let grauFinal = grauInicial + intervalo;
		if (grauFinal > 12) {
			grauFinal -= 12;
		} else if (grauFinal < 1) {
			grauFinal += 12;
		}
		
		let result = this.grausExistentes[grauFinal];
		// console.log(grauInicial + " = grauInicial | grauFinal = " + (grauFinal - 1) + " " + result);

		result = notaOriginal.replace(nota, result);
		console.log("Nota " + nota + ", transpondo " + intervalo + " fica " + result);
		return result;
	}

	this.tratar = function(texto) {
		this.dados.textoOriginal = texto;
		this.dados.textoParsed = this.dados.textoOriginal;
		// TODO Reconhecer acordes em texto e fazero parse dos mesmos.
		// Guardar todos os acordes em sequencia, para cada linha
		const linhas = texto.split("\n");
		let numAcorde = 0;
		for (let numLinha in linhas) {
			let linha = linhas[numLinha];
			let temNota = false;
			let acordes = [];
			// console.log("Tratando linha: " + linha);
			linha = linha.replace(/\|/g, " ").trim();
			const palavras = linha.split(" ");
			for (let numPal in palavras) {
				const palavra = palavras[numPal];
				if (palavra.trim().length > 0) {
					// console.log("\t> Tratando palavra: [[" + palavra + "]]");
					// TODO considerar casos de baixo alterado: A/E (Láá com baixo em Mi)

					let ehNota = this.verificaSeEhNota(palavra);
					if (ehNota) temNota = true;

					if (ehNota) {
						numAcorde++;
						acordes.push(palavra);
						// Numero do acorde em questão
						this.dados.textoParsed = this.dados.textoParsed.replace(palavra, this.mascaraNumAcorde(numAcorde))
					}
				}
			}
			if (temNota) {
				this.dados.linhasOriginais.push(acordes);
			}
		}

		// console.log ("Linhas com acordes: " + this.dados.linhasOriginais.length);
		return this.dados;
	}

	this.verificaSeEhNota = function(palavra) {
		var ehNota = false;
		// Verificando caracteres impossívels em acordes
		if (palavra && palavra.includes("i")) return false;
		
		for(let nota in this.notasExistentes) {
			if (palavra.startsWith(nota)) {
				ehNota = true;
				break;
			}
		}
		return ehNota;
	}

	this.mascaraNumAcorde = function(numAcorde) {
		return "[[##!" + numAcorde + "]]";
	}

	this.transpor = function(origenSelector, resultSelector, semitonsSelector) {
		this.tratar($(origenSelector).val());

		const semitons = parseInt($(semitonsSelector).val());
		console.log(semitons + " semitons")
		const resultPanel = $(resultSelector);
		
		let result = this.dados.textoParsed;
		let acordesTranspostos = [];
		let numAcorde = 0;
		for (let numLinha in this.dados.linhasOriginais) {
			const linha = this.dados.linhasOriginais[numLinha];
			for (let indAcorde in linha) {
				const acorde = linha[indAcorde];
				numAcorde++;
				// if (!acordesTranspostos.includes(acorde)) {
					const acordeTransposto = this.transporNota(acorde, semitons);
					result = result.replace(this.mascaraNumAcorde(numAcorde), acordeTransposto);
					acordesTranspostos.push(acorde);
				//}
			}
		}
		resultPanel.val(result);
	}
};