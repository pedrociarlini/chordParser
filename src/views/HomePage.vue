<template>
    <div class="card">
        <div class="card-body">
            <div class="card-title">
                <span class="h2">Transposição de acordes :)</span>
            </div>
            <div class="card-text">
                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                            <label>Acordes originais:</label>
                            <textarea class="acordes form-control text-lg" rows="8" v-model="musicaOrigem"></textarea>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8">
                        <div class="form-group">
                            <label>Semitons</label>
                            <select id="semitons" class="form-control" v-model="semitons">
                                <option v-for="intervalo in [-7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7]" :key="intervalo" :value="intervalo">
                                    {{ intervalo }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="col-4">
                        <div class="form-group">
                            <label>&nbsp;</label>
                            <button @click="transpor" class="btn btn-primary form-control">Transpor</button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <label>Acordes transpostos:</label>
                        <textarea class="acordes form-control" rows="8" v-model="musicaReusltado"></textarea>
                    </div>
                </div>
            </div>
            <small class="text-muted">Versão {{ versao }}</small>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ChordsParser from "@/business/ChordsParser";

const chordsParserBuzz = new ChordsParser();
const musicaOrigem = ref(`Tom: A (original E)
Int: | - | A | % |
Pt1: | A | % | % | % | C | D |
     | A | % | D | C | E | % |
Ref: | D | % | A | % | D | % | E | % |
     | D | % | A | % | D | C | E | % |
Pt2: | D | % | A | % | B | D | % |
Fim: | A | D |x5     | D | A |
+IDÉID:
Solo:| B| D | A | % |x2
+música toda sem Int nem Solo.`);
const musicaReusltado = ref("");
const semitons = ref(2);
const versao = __APP_VERSION__;

function transpor() {
    musicaReusltado.value = chordsParserBuzz.transpor(musicaOrigem.value, semitons.value);
}
</script>
<style>
.acordes {
    font-family: "Consolas", "Courier New", Verdana, Courier, monospace;
    font-weight: 600 !important;
}
.direita {
    float: right;
    top: 0px;
    margin-top: -65px;
}
</style>
