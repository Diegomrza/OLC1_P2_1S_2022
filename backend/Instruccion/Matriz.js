"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matriz = void 0;
const Error_1 = require("../Error/Error");
const Literal_1 = require("../Expresion/Literal");
const Instruccion_1 = require("./Instruccion");
const Retorno_1 = require("../Expresion/Retorno");
const Singleton_1 = require("../Patrones/Singleton");
class Matriz extends Instruccion_1.Instruccion {
    constructor(tipo, id, arreglo, tam1, tam2, tipoEs, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.id = id;
        this.arreglo = arreglo;
        this.tam1 = tam1;
        this.tam2 = tam2;
        this.tipoEs = tipoEs;
    }
    execute(ambito) {
        let tamFilas = this.tam1.execute(ambito);
        let tamColumnas = this.tam2.execute(ambito);
        if (tamFilas.tipoDato != Retorno_1.TipoDato.ENTERO)
            throw new Error_1.Error_(this.line, this.column, "Semántico", `El valor ${tamFilas.value} no es int`);
        if (tamColumnas.tipoDato != Retorno_1.TipoDato.ENTERO)
            throw new Error_1.Error_(this.line, this.column, "Semántico", `El valor ${tamColumnas.value} no es int`);
        if (this.arreglo.length == 0) {
            let filas = [];
            for (let i = 0; i < tamFilas.value; i++) {
                let columnas = [];
                for (let j = 0; j < tamColumnas.value; j++) {
                    columnas.push(this.defecto(this.tipo));
                }
                filas.push(columnas);
            }
            new Singleton_1.Singleton().insertarSimbolo(this.id, (0, Literal_1.nombreTipos)(this.tipo), (0, Literal_1.nombreTipos)(this.tipoEs), ambito.nombre, filas, this.line.toString(), this.column.toString());
            ambito.setVal(this.id, filas, this.tipo, this.line, this.column, 0, this.tipoEs);
        }
        else {
            let auxFilas = [];
            for (let i = 0; i < tamFilas.value; i++) {
                let auxColumnas = [];
                let fila = this.arreglo[i];
                for (let j = 0; j < tamColumnas.value; j++) {
                    let columna = fila[j];
                    let valor;
                    if (columna != undefined) {
                        valor = columna.execute(ambito);
                    }
                    else {
                        valor = undefined;
                    }
                    if (valor != undefined) {
                        if (valor.type == this.tipo) {
                            auxColumnas.push(valor.value);
                        }
                        else {
                            throw new Error_1.Error_(this.line, this.column, "Semántico", `El valor ${valor.value} no coincide con el tipo ${(0, Literal_1.nombreTipos)(this.tipo)}`);
                        }
                    }
                    else {
                        auxColumnas.push(this.defecto(this.tipo));
                    }
                }
                auxFilas.push(auxColumnas);
            }
            new Singleton_1.Singleton().insertarSimbolo(this.id, (0, Literal_1.nombreTipos)(this.tipo), (0, Literal_1.nombreTipos)(this.tipoEs), ambito.nombre, auxFilas, this.line.toString(), this.column.toString());
            ambito.setVal(this.id, auxFilas, this.tipo, this.line, this.column, 0, this.tipoEs);
        }
    }
    grafo() {
        return "";
    }
    defecto(tipo) {
        switch (tipo) {
            case 0:
                return 0;
            case 1:
                return Number(0).toFixed(1);
            case 2:
                return true;
            case 3:
                return "\u0000";
            case 4:
                return "";
        }
    }
}
exports.Matriz = Matriz;
