/**
 * arquivo:              geradorTxt.js
 * processo:             Gerador TXT Aviso Lançamento v.1
 * Tabela do Processo:   f_gerar_txt
 *
 *
 * Dependências
 *   - apiJSPadrao_v1.0.2.js
 *  
 * @author       Maycon Moraes Sene - Junho 2023
 * @since        06/2023
 * @lastModif    18-08-2023
 * 
 */

$(document).ready(function () {
    setEventos();
    setForm();
    setValidators();

    Form.apply().then(function () {
        defineLabels();
        initLayout();

    });
});

// Dados da atividade
const codigoProcesso = ProcessData.processInstanceId;
const codigoEtapa = ProcessData.activityInstanceId;
const codigoCiclo = ProcessData.cycle;

//Atividades do processo
const SELECIONAR_DATA_AVISO = 2;
const IMPORTAR = 1;

/*
 * Inicializa layout geral
 */
function initLayout() { }

/*
 * Define Labels com mais de 50 caracteres
 */
function defineLabels() { }

/*
 * Define ações / listeners
 */
function setEventos() {

    if (codigoEtapa === SELECIONAR_DATA_AVISO) {

        Form.fields('AUX_DATA').subscribe("CHANGE", function (itemId, data, response) {
            formatDate();
        });

        Form.fields('AUX_DATA').subscribe("CHANGE", function (itemId, data, response) {
            formatDateString();
        });

        Form.fields('AUX_DATA').subscribe("SET_FIELD_VALUE", function (itemId, data, response) {
            formatDate();
        });

        Form.fields('AUX_DATA').subscribe("SET_FIELD_VALUE", function (itemId, data, response) {
            formatDateString();
        });


        Form.fields('TXT_DATA_LANCAMENTO').subscribe("CHANGE", function (itemId, data, response) {
            carregarDados();
        });

        Form.fields('TXT_DATA_LANCAMENTO').subscribe("SET_FIELD_VALUE", function (itemId, data, response) {
            carregarDados();
        });

    }

    if (codigoEtapa === IMPORTAR) {

        Form.fields('RADIO_IMPORTACAO').subscribe("CHANGE", function (itemId, data, response) {
            observacaoObrigatoria();
        });

    }

}

/*
 * Formata o formulário
 */
function setForm() {

    if (codigoEtapa === SELECIONAR_DATA_AVISO) {

        Form.apply().then(() => {
            formatDate();
        });

        Form.apply().then(() => {
            carregarDados();
        });
    }

    if (codigoEtapa === IMPORTAR) {

        Form.apply().then(() => {
            observacaoObrigatoria();
        });

    }

}

/*
 * Define novas regras de validação dos campos
 */
function setValidators() { }

/*
 * Define novas regras de estilização dos campos. Obs: Tem que manupular direto na DOM
 */
function setStyles() { }


/*
 * Funções a serem usadas no setEventos e no setForms
 */

//Torna observação obrigatória caso seja selecionada a opção "Com Falhas" no radio Importação Sisbr.
function observacaoObrigatoria() {
    debugger

    let importacao = Form.fields('RADIO_IMPORTACAO').value();

    if (importacao == undefined || importacao == "" || importacao == " ") {
        Form.fields('TXT_OBSERVACOES').required(false);
    }

    else if (importacao == "Com Sucesso") {
        Form.fields('TXT_OBSERVACOES').required(false);
    }

    else {
        Form.fields('TXT_OBSERVACOES').required(true);
    }
    Form.apply();
}

//converte data dd-mm-yyyy em yyyy-mm-dd
function formatDate() {
    debugger

    let dataSelecao = Form.fields('AUX_DATA').value();

    if (dataSelecao != undefined && dataSelecao != "" && dataSelecao != " ") {

        var dataNova = JSPadrao.converteDataBrEmDate(dataSelecao);
        var d = new Date(dataNova),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        Form.fields('TXT_DATA_LANCAMENTO').value([year, month, day].join('-'));

    }

    Form.apply();

}

function formatDateString() {
    debugger

    let dataSelecao = Form.fields('AUX_DATA').value();

    if (dataSelecao != undefined && dataSelecao != "" && dataSelecao != " ") {

        var dataNova = JSPadrao.converteDataBrEmDate(dataSelecao);
        var d = new Date(dataNova),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        Form.fields('AUX_DATA_STRING').value([day, month, year].join('/'));

    }

    Form.apply();

}

function carregarDados() {

    let dataConvertida = Form.fields('TXT_DATA_LANCAMENTO').value();

    if (dataConvertida != undefined && dataConvertida != "" && dataConvertida != " ") {
        Form.fields('TXT_DATA_LANCAMENTO').actions('AUX_CAIXA_refresh').execute();
    }

    Form.apply();

}

/**
 *
-- Aviso com assinatura
SELECT *
FROM f_aviso_deb_cre

-- Aviso partidas dobradas
SELECT *
FROM f_aviso_lanc

-- Aviso sem assinatura
SELECT *
FROM f_aviso_s_ass


-- Aviso com assinatura
SELECT
AVISO_PARTIDA, AVISO_CONTA_TITULAR, AVISO_VALOR_DEBITO, AVISO_REFERENCIA_SOLIC, AVISO_NOME_RAZAO_SOCIAL
FROM f_aviso_deb_cre
WHERE AVISO_DATA = '30/06/2023' AND COD_ETAPA_F = '3'

-- Aviso sem assinatura
SELECT
G.AVISO_PARTIDA_SOLIC, G.AVISO_CONTA, G.AVISO_VALOR, G.AVISO_LISTA, G.AVISO_TITULAR
FROM g_aviso_s_assgrid_aviso AS G, f_aviso_s_ass AS H
WHERE (G.COD_ETAPA = 3 AND H.COD_ETAPA_F = 3) AND H.AVISO_DATA = '30/06/2023.' AND G.COD_PROCESSO = H.COD_PROCESSO_F

-- Aviso partidas dobradas
SELECT
DEB_HISTORICO_PADRAO, DEB_CONTA, DEB_VALOR, DEB_NOME_RAZAO_SOCIAL
FROM f_aviso_lanc
WHERE DEB_DATA = '2023-06-30' AND COD_ETAPA_F = '3'

SELECT
DEB_HISTORICO_PADRAO, CREDI_CONTA, CREDI_VALOR, CREDI_NOME_RAZAO_SOCIAL
FROM f_aviso_lanc
WHERE CREDI_DATA = '2023-06-30' AND COD_ETAPA_F = '3'

 */

//https://www.delftstack.com/pt/howto/javascript/convert-string-to-date-in-javascript/


function preeencherGrid() {
    debugger

    const frase = Form.fields('AUX_CAIXA').value();

    // Divide a frase em partes usando "Aviso" como delimitador e remove os ';' de cada parte
    const partes = frase.split("Aviso").map(part => part.replace(/;/g, ''));

    // Filtra as partes vazias resultantes da divisão
    const partesFiltradas = partes.filter(part => part.trim() !== "");

    // Adiciona "Aviso" de volta ao início de cada parte
    const frasesSeparadas = partesFiltradas.map(part => "Aviso" + part);

    // Imprime cada frase em uma linha
    frasesSeparadas.forEach(frase => {
        console.log(frase)
    });


    Form.apply();
}


/**
 * Funcionou em partes
 * var texto = Form.fields('AUX_CAIXA').value();

    // Divida o texto em linhas usando ;
    const linhas = texto.split(';');
    // Filtra as linhas que começam com a palavra "Aviso"
    const avisos = linhas.filter((linha) => linha.trim().startsWith('Aviso'));
    // Imprime cada aviso em uma linha
    avisos.forEach((aviso) => {
        Form.grids('GRID_AVISOS').insertDataRow({ DOB_PART_C: aviso.trim(), DOB_CONTA_C: aviso.trim(), DOB_VALOR_C: aviso.trim(), DOB_HIST_C: aviso.trim(), DOB_NOME_C: aviso.trim()});
    });

 */
/**
 * @testar https://jsfiddle.net/
 * 
 * const texto = "Aviso de débito referência 1; Cleonice de Fátima Ferreira; Aviso de crédito referência 2; Maycon Moraes Sene; Aviso de crédito referência 3; Otávio Oliveira.";

const frases = texto.split('; ');

const arraysDeAvisos = [];
let arrayDeAvisoAtual = [];

for (let i = 0; i < frases.length; i++) {
  const frase = frases[i].trim();

  if (frase.startsWith('Aviso')) {
    if (arrayDeAvisoAtual.length > 0) {
      arraysDeAvisos.push(arrayDeAvisoAtual);
      arrayDeAvisoAtual = [];
    }
  }

  arrayDeAvisoAtual.push(frase);
}

if (arrayDeAvisoAtual.length > 0) {
  arraysDeAvisos.push(arrayDeAvisoAtual);
}

var aviso1 = arraysDeAvisos[i = 0];
console.log(aviso1);
var aviso2 = arraysDeAvisos[i = 1];
console.log(aviso2);
var aviso3 = arraysDeAvisos[i = 2];
console.log(aviso3);

 * 
 * 
 * 
 */



