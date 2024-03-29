"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Round = void 0;
const Error_1 = require("../Error/Error");
const Literal_1 = require("../Expresion/Literal");
const Retorno_1 = require("../Expresion/Retorno");
const Instruccion_1 = require("../Instruccion/Instruccion");
class Round extends Instruccion_1.Instruccion {
    constructor(expresion, line, column) {
        super(line, column);
        this.expresion = expresion;
        this.tipo = 1;
    }
    execute(ambito) {
        let valor = this.expresion.execute(ambito);
        if (valor.tipoDato != Retorno_1.TipoDato.DOBLE)
            throw new Error_1.Error_(this.line, this.column, "Semántico", `No se puede redondear un tipo: ${(0, Literal_1.nombreTipos)(valor.tipoDato)}`);
        let redondeado = Math.round(valor.value).toFixed(1);
        return {
            value: redondeado,
            type: Retorno_1.Type.DOBLE,
            tipoDato: Retorno_1.TipoDato.DOBLE
        };
    }
    grafo() {
        return "";
    }
}
exports.Round = Round;
