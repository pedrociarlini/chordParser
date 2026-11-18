/**
 *
 */
export default class ChordsParser {
    dados = {
        // lista de uma sequencia que contém uma sequencia de notas
        // [0] = ["<nota1>", "<nota2>", "<nota3>"]...
        linhasOriginais: [] as string[][],
        textoOriginal: "",
        textoParsed: "",
    };
    notasExistentes: { [key: string]: number } = {
        C: 1,
        Db: 2,
        "C#": 2,
        D: 3,
        "D#": 4,
        Eb: 4,
        E: 5,
        F: 6,
        Gb: 7,
        "F#": 7,
        G: 8,
        Ab: 9,
        "G#": 9,
        A: 10,
        "A#": 11,
        Bb: 11,
        B: 12,
    };

    grausExistentes: { [key: number]: string } = {};

    constructor() {
        for (const nota in this.notasExistentes) {
            this.grausExistentes[this.notasExistentes[nota]] = nota;
        }
    }

    /**
     * 	Transpõe uma nota.
     * @param notaOriginal Nota original
     * @param intervalo precisa ser >=-11 <=11.
     * @returns Retorna a nota desejada.
     */
    transporNota(notaOriginal: string, intervalo: number) {
        if (intervalo < -11 || intervalo > 11) {
            throw new Error("Intervalo fora do permitido");
        }
        const partes: string[] = [];
        for (const notaParcial of notaOriginal.split("/")) {
            // Acorde só com baixo (ex.: "/E"): a parte antes da barra é vazia
            if (notaParcial === "") {
                partes.push("");
                continue;
            }

            let nota = notaParcial.substring(0, 2);
            if (nota.substring(1, 2) != "#" && nota.substring(1, 2) != "b") {
                nota = notaParcial.substring(0, 1);
            }

            if (!this.notasExistentes[nota]) {
                throw new Error("A nota informada não existe: " + nota);
            }

            const grauInicial = this.notasExistentes[nota];

            let grauFinal = grauInicial + intervalo;
            if (grauFinal > 12) {
                grauFinal -= 12;
            } else if (grauFinal < 1) {
                grauFinal += 12;
            }

            let resultParcial = this.grausExistentes[grauFinal];
            resultParcial = resultParcial + notaParcial.substring(nota.length);
            partes.push(resultParcial);
        }

        return partes.join("/");
    }

    tratar(texto: string) {
        this.dados.textoOriginal = texto;
        this.dados.textoParsed = this.dados.textoOriginal;
        this.dados.linhasOriginais = [];

        // Guardar todos os acordes em sequencia, para cada linha
        const linhas = texto.split("\n");
        let numAcorde = 0;
        const linhasParsed: string[] = [];
        for (const linha of linhas) {
            const acordes: string[] = [];

            // Substitui cada palavra que é acorde (inclusive com baixo, ex.: C/E) pela máscara, mantendo o restante da linha intacto
            linhasParsed.push(
                linha.replace(/[^\s|]+/g, (palavra) => {
                    if (!this.verificaSeEhNota(palavra)) return palavra;
                    numAcorde++;
                    acordes.push(palavra);
                    return this.mascaraNumAcorde(numAcorde);
                })
            );
            if (acordes.length > 0) {
                this.dados.linhasOriginais.push(acordes);
            }
        }
        this.dados.textoParsed = linhasParsed.join("\n");

        return this.dados;
    }

    verificaSeEhNota(palavra: string) {
        let ehNota = false;
        // Verificando caracteres impossívels em acordes
        for (const letra of ["i", "z", "n", "t", "x", "h", "s"]) {
            if (palavra.includes(letra)) return false;
        }

        // Acorde só com baixo (ex.: "/E")
        const semBarra = palavra.startsWith("/") ? palavra.substring(1) : palavra;

        for (const nota in this.notasExistentes) {
            if (semBarra.startsWith(nota)) {
                ehNota = true;
                break;
            }
        }
        return ehNota;
    }

    mascaraNumAcorde(numAcorde: number) {
        return "[[##!" + numAcorde + "]]";
    }

    transpor(originalText: string, semitons: number): string {
        this.tratar(originalText);

        let result = this.dados.textoParsed;
        const acordesTranspostos: string[] = [];
        let numAcorde = 0;
        for (const numLinha in this.dados.linhasOriginais) {
            const linha = this.dados.linhasOriginais[numLinha];
            for (const indAcorde in linha) {
                const acorde = linha[indAcorde];
                numAcorde++;

                const acordeTransposto = this.transporNota(acorde, semitons);
                result = result.replace(this.mascaraNumAcorde(numAcorde), acordeTransposto);
                acordesTranspostos.push(acorde);
            }
        }
        return result;
    }
}
