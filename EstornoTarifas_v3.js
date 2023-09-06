/**
 * arquivo:              EstornoTarifas_v3.js
 * processo:             Controle Estorno de Tarifas v.3
 * Tabela do Processo:   f_estorno_tarif
 *
 *
 * Dependências
 *   - apiJSPadrao_v1.0.2.js
 *   - Versionado para V3 em 20-06-2023
 *   - Última alteração 29/08/2023
 * 
 * @author       Maycon Moraes Sene
 * @since        04/2023
 * @lastModif    11-07-2023
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
var codigoProcesso = ProcessData.processInstanceId;
var codigoEtapa = ProcessData.activityInstanceId;
var codigoCiclo = ProcessData.cycle;


//Atividades do processo
var SOLICITAR_ESTORNO_DE_TARIFA = 1;
var AJUSTAR_ESTORNO_TARIFA = 8;
var APROVAR_ESTORNO = 2;
var APROVAR_ESTORNO_C_LIMITEEXCEDIDO = 3;
var CONFERENCIA_E_LANCAMENTO_NO_SISBR = 5;
var ENCERRAR_ESTORNO_TARIFAPROVISIONADA = 7;
//var EMITIR_AVISO = 4;
//var CONTABILIZACAO = 6;


/*
 * Inicializa layout geral
 */
function initLayout() {

}


/*
 * Define Labels com mais de 50 caracteres
 */
function defineLabels() {
}


/*
 * Define ações / listeners
 */
function setEventos() {

    if (codigoEtapa === SOLICITAR_ESTORNO_DE_TARIFA || codigoEtapa === AJUSTAR_ESTORNO_TARIFA) {

        Form.grids('GRID_AVISO').fields('AVISO_VALOR').subscribe('CHANGE', function (itemId, data, response) {
            preencherValor();
        });
        Form.grids('GRID_AVISO').fields('AVISO_VALOR').subscribe('SET_FIELD_VALUE', function (itemId, data, response) {
            preencherValor();
        });

        Form.grids('GRID_AVISO').fields('AVISO_VALOR').subscribe('KEY_PRESS', function (itemId, data, response) {
            preencherValor();
        });

        Form.grids('GRID_AVISO').fields('AVISO_HISTORICO_PADRAO').subscribe('CHANGE', function (itemId, data, response) {
            preencherREF();
        });

        Form.grids("GRID_AVISO").subscribe("GRID_SUBMIT", function (formId, gridId, item) {
            Form.apply().then(function () {
                verificaValor();
            });
        });

        Form.grids("GRID_AVISO").subscribe("GRID_SUBMIT", function (formId, gridId, item) {
            Form.apply().then(function () {
                Form.grids('GRID_AVISO').fields('AUX_LISTA_CREDITO').value('Aviso de crédito');
            });
        });

        Form.fields('AVISO_TOTAL').subscribe('SET_FIELD_VALUE', function (itemId, data, response) {
            totalRecurso();
        });

        Form.fields('AVISO_TOTAL').subscribe('CHANGE', function (itemId, data, response) {
            totalRecurso();
        });
    }

    if (codigoEtapa === APROVAR_ESTORNO) {

        Form.fields('RADIO_DELIBERA_GERENTE').subscribe('CHANGE', function (itemId, data, response) {
            botoesEtapaAprovarExtorno();
        });


    }

    if (codigoEtapa === APROVAR_ESTORNO_C_LIMITEEXCEDIDO) {

        Form.fields('RADIO_DELIBERA_REGIONAL').subscribe('CHANGE', function (itemId, data, response) {
            botoesEtapaGerenteRegional();
        });

    }

    if (codigoEtapa === AJUSTAR_ESTORNO_TARIFA) {


    }

}


/*
 * Formata o formulário
 */
function setForm() {

    //Encaminhar para aprovação Gerente ou Supervisor
    if (codigoEtapa === SOLICITAR_ESTORNO_DE_TARIFA || codigoEtapa === AJUSTAR_ESTORNO_TARIFA) {

        totalRecurso();
        verificaValor();
        limiteAnual();

        ////Preenche Função de Destino (funcao_nivel_1) através da apiJSPadrao
        Form.apply().then(() => {

            var destino = Form.fields('TARIFA_DEPTO').value();
            getFuncaoDestino(destino, 'TARIFA_APROVACAO');

        });

        //Preenche Local de Destino (cidade) através da apiJSPadrao
        Form.apply().then(() => {

            var pa = Form.fields('TARIFA_DEPTO').value();
            getLocalDestino(pa, 'LIMITE_LOCAL');

        });

        //Preenche Local de Destino (cidade) através da apiJSPadrao
        Form.apply().then(() => {

            var pa = Form.fields('TARIFA_DEPTO').value();
            getLocalDestino(pa, 'AVISO_LISTA_LOCAL');

        });

        Form.apply().then(() => {
            Form.grids('GRID_AVISO').fields('AUX_LISTA_CREDITO').value('Aviso de crédito');
        });

        //Soma do total de tarifas
        Form.grids("GRID_AVISO").subscribe("GRID_SUBMIT", function (formId, gridId, item) {
            Form.apply().then(function () {
                var total = Form.grids("GRID_AVISO").columns("AUX_AVISO_VALOR").sum();
                Form.fields("AVISO_TOTAL").value(total);
                procurarCentavos();

            });
        });

        Form.grids("GRID_AVISO").subscribe("GRID_DESTROY", function (formId, gridId, item) {
            Form.apply().then(function () {
                var total = Form.grids("GRID_AVISO").columns("AUX_AVISO_VALOR").sum();
                Form.fields("AVISO_TOTAL").value(total);
                procurarCentavos();
            });
        });


        /*Form.apply().then(function () {
            var valores = Form.grids('GRID_AVISO').dataRows();

            for (var i = 0; i < valores.length; i++) {
                if (valores[i].AVISO_VALOR != 0.01) {
                    var total = Form.grids("GRID_AVISO").columns("AVISO_VALOR").sum(valores);
                }
                else {
                    if (i + 1 == valores.length) {
                        Form.fields("AVISO_TOTAL").value(total);
                    }
                }
                Form.fields("AVISO_TOTAL").value(total);
            }
        });*/


        Form.apply().then(() => {
            preencherREF();
        });

        Form.apply().then(() => {
            procurarXX();
        });

    }

    if (codigoEtapa === AJUSTAR_ESTORNO_TARIFA) {

        Form.apply().then(() => {
            somenteLeituraReprovacao();
        });

        Form.apply().then(() => {
            botoesEtapaAjuste();
        });

        Form.apply().then(() => {
            camposEtapaAjuste();
        });

        somenteLeituraObservacao();
        limiteAnual();
    }

    if (codigoEtapa === APROVAR_ESTORNO) {

        Form.apply().then(() => {

            var local = Form.fields('TARIFA_DEPTO').value();
            getLocalDestino(local, 'AVISO_LISTA_LOCAL');

        });

        Form.apply().then(() => {

            var local = Form.fields('TARIFA_DEPTO').value();
            getFuncaoDestino(local, 'ESTORNO_FUNCAO');

        });


        Form.apply().then(() => {
            botoesEtapaAprovarExtorno();
        });

        Form.apply().then(() => {
            somenteLeituraObservacao();
        });

        limiteAnual();

    }

    if (codigoEtapa === APROVAR_ESTORNO_C_LIMITEEXCEDIDO) {

        visulizaEtapa();

        Form.apply().then(() => {

            var local = Form.fields('TARIFA_DEPTO').value();
            getLocalDestino(local, 'AVISO_LISTA_LOCAL');

        });

        Form.apply().then(() => {
            botoesEtapaGerenteRegional();
        });


        Form.apply().then(() => {
            somenteLeituraObservacao();
        });

        limiteAnual();
    }



    if (codigoEtapa === ENCERRAR_ESTORNO_TARIFAPROVISIONADA) {

        Form.apply().then(() => {
            somenteLeituraObservacao();
        });
        limiteAnual();

    }

    if (codigoEtapa === CONFERENCIA_E_LANCAMENTO_NO_SISBR) {

        Form.apply().then(() => {
            somenteLeituraObservacao();
        });
        limiteAnual();

    }

}

/*
* Define novas regras de validação dos campos
*/
function setValidators() {

    //Validação se existe ao menos uma tarifa na GRID   
    if (codigoEtapa === SOLICITAR_ESTORNO_DE_TARIFA || codigoEtapa === AJUSTAR_ESTORNO_TARIFA) {

        Form.actions("aprovar").subscribe("SUBMIT", function (itemId, action, reject) {

            var qtdTarifas = Form.grids("GRID_AVISO").dataRows().length;

            if (qtdTarifas < 1) {
                Form.addCustomModal({
                    title: "Atenção",
                    description: "É necessário ao menos uma tarifa para prosseguir",
                    //false para não aparecer o botão “fechar” padrão da modal
                    showButtonClose: false,
                    buttons: [{
                        name: "Fechar",
                        icon: "close",
                        // true: para fechar a modal após a ação ser realizada e false: para não fechar a modal
                        closeOnClick: true,
                        action: function () {
                            //ação a ser realizada
                        }
                    }]
                });
                reject();
            }

            if (procurarXX(false)) {

                Form.addCustomModal({
                    title: "ATENÇÃO",
                    description:
                        "Preencher corretamente o campo REF. Contém letras XX/XX/XXXX",
                    //false para não aparecer o botão “fechar” padrão da modal
                    showButtonClose: false,
                    buttons: [
                        {
                            name: "Ciente",
                            icon: "close",
                            // true: para fechar a modal após a ação ser realizada e false: para não fechar a modal
                            closeOnClick: true,
                            action: function () {
                                //ação a ser realizada
                            },
                        },
                    ],

                });
                reject();
            }
            Form.apply();
        });
    }
}

function preencherREF() {

    let historicoPadrao = Form.grids('GRID_AVISO').fields('AVISO_HISTORICO_PADRAO').value();

    if (historicoPadrao == undefined || historicoPadrao == '' || historicoPadrao == ' ') {
        Form.grids('GRID_AVISO').fields('AVISO_REFERENCIA_SOLIC').value('');
    }
    else {
        Form.grids('GRID_AVISO').fields('AVISO_REFERENCIA_SOLIC').value('Ref. ' + historicoPadrao + ' debitado em xx/xx/xxxx');
    }
    Form.apply();
}

//Procura duas letras X em sequência na caixa de texto. Se tiver, retorna true, caso contrário, retorna false.
function procurarXX() {
    debugger
    var dados = Form.grids('GRID_AVISO').dataRows();

    for (var i = 0; i < dados.length; i++) {
        if (dados[i].AVISO_REFERENCIA_SOLIC.indexOf('xx') != -1) {

            return true;

        }


        else {

            if (i + 1 == dados.length) {

                return false;

            }

        }

    }
}


function botoesEtapaAprovarExtorno() {

    let radioGerente = Form.fields('RADIO_DELIBERA_GERENTE').value();

    if (radioGerente == undefined || radioGerente == '') {

        Form.actions('aprovar').hidden(true);
        Form.actions('rejeitar').hidden(true);
        Form.fields('AVISO_PARECER_GERENTE').required(false);

    }

    else if (radioGerente == "Ajustar") {

        Form.actions('aprovar').hidden(true);
        Form.actions('rejeitar').hidden(false).label('Ajustar');
        Form.fields('AVISO_PARECER_GERENTE').required(true);

    }

    else if (radioGerente == "Reprovar") {

        Form.actions('aprovar').hidden(true);
        Form.actions('rejeitar').hidden(false).label('Reprovar');
        Form.fields('AVISO_PARECER_GERENTE').required(true);

    }

    else {

        Form.actions('aprovar').hidden(false).label('Aprovar');
        Form.actions('rejeitar').hidden(true);
        Form.fields('AVISO_PARECER_GERENTE').required(false);

    }

    Form.apply();

}

function botoesEtapaGerenteRegional() {

    let radioRegional = Form.fields('RADIO_DELIBERA_REGIONAL').value();

    if (radioRegional == undefined || radioRegional == '') {

        Form.actions('aprovar').hidden(true);
        Form.actions('rejeitar').hidden(true);
        Form.fields('AVISO_PARECER_REGIONAL').required(false);

    }

    else if (radioRegional == "Ajustar") {

        Form.actions('aprovar').hidden(true);
        Form.actions('rejeitar').hidden(false).label('Ajustar');
        Form.fields('AVISO_PARECER_REGIONAL').required(true);

    }

    else if (radioRegional == "Reprovar") {

        Form.actions('aprovar').hidden(true);
        Form.actions('rejeitar').hidden(false).label('Reprovar');
        Form.fields('AVISO_PARECER_REGIONAL').required(true);

    }

    else {

        Form.actions('aprovar').hidden(false).label('Aprovar');
        Form.actions('rejeitar').hidden(true);
        Form.fields('AVISO_PARECER_REGIONAL').required(false);

    }

    Form.apply();

}

function botoesEtapaAjuste() {
    debugger

    let radioGerente = Form.fields('RADIO_DELIBERA_GERENTE').value();
    let radioRegional = Form.fields('RADIO_DELIBERA_REGIONAL').value();

    if (radioGerente == "Reprovar" || radioRegional == "Reprovar") {

        Form.actions('aprovar').hidden(true);
        Form.actions('rejeitar').hidden(false).label('Finalizar');

    }

    else if (radioGerente == "Ajustar" || radioRegional == "Ajustar") {

        Form.actions('aprovar').hidden(false).label('Aprovar');
        Form.actions('rejeitar').hidden(true);

    }

    else {

        Form.actions('aprovar').hidden(true);
        Form.actions('rejeitar').hidden(true);

    }

    Form.apply();

}

function camposEtapaAjuste() {

    let auxRegional = Form.fields('AUX_PASSAGEM_REGIONAL').value();

    if (auxRegional == "SIM") {

        //Campos Gerente Regional

        Form.fields('LBL_APROVAR_REGIONAL').visible(true);

        Form.fields('RADIO_DELIBERA_REGIONAL').visible(true);
        Form.fields('RADIO_DELIBERA_REGIONAL').readOnly(true);

        Form.fields('AVISO_PARECER_REGIONAL').visible(true);
        Form.fields('AVISO_PARECER_REGIONAL').readOnly(true);

        //Campos Financeiro

        Form.fields('LBL_APROVAR_GERENTE').visible(false);
        Form.fields('RADIO_DELIBERA_GERENTE').visible(false);
        Form.fields('AVISO_PARECER_GERENTE').visible(false);

    }

    else {

        //Campos Gerente Regional

        Form.fields('LBL_APROVAR_REGIONAL').visible(false);
        Form.fields('RADIO_DELIBERA_REGIONAL').visible(false);
        Form.fields('AVISO_PARECER_REGIONAL').visible(false);


        //Campos Financeiro

        Form.fields('LBL_APROVAR_GERENTE').visible(true);

        Form.fields('RADIO_DELIBERA_GERENTE').visible(true);
        Form.fields('RADIO_DELIBERA_GERENTE').readOnly(true);

        Form.fields('AVISO_PARECER_GERENTE').visible(true);
        Form.fields('AVISO_PARECER_GERENTE').readOnly(true);

    }

    Form.apply();

}

//Somente leitura da etapa Ajuste Estorno Tarifas no caso de reprovação

function somenteLeituraReprovacao() {

    debugger
    var radioGerente = Form.fields('RADIO_DELIBERA_REGIONAL').value();
    let observacoes = Form.fields('AVISO_OBSERVACOES').value();

    if (radioGerente == "Reprovar") {
        Form.fields('TARIFA_COBR_PROV').visible(true);
        Form.fields('TARIFA_COBR_PROV').readOnly(true);

        Form.grids('GRID_AVISO').visible(true);
        Form.grids('GRID_AVISO').readOnly(true);

        Form.fields('RADIO_DELIBERA_REGIONAL').visible(true);
        Form.fields('RADIO_DELIBERA_REGIONAL').readOnly(true);

        Form.fields('AVISO_PARECER_GERENTE').visible(true);
        Form.fields('AVISO_PARECER_GERENTE').readOnly(true);

        if (observacoes == undefined || observacoes == "" || observacoes == " ") {
            Form.fields('AVISO_OBSERVACOES').visible(false);
        }
        else {
            Form.fields('AVISO_OBSERVACOES').visible(true);
            Form.fields('AVISO_OBSERVACOES').readOnly(true);
        }

    }

    else {
        Form.grids('GRID_AVISO').visible(true);

        Form.fields('TARIFA_COBR_PROV').visible(true);

        Form.fields('RADIO_DELIBERA_REGIONAL').visible(true);
        Form.fields('RADIO_DELIBERA_REGIONAL').readOnly(true);

        Form.fields('AVISO_PARECER_GERENTE').visible(true);
        Form.fields('AVISO_PARECER_GERENTE').readOnly(true);

        if (observacoes == undefined || observacoes == "" || observacoes == " ") {
            Form.fields('AVISO_OBSERVACOES').visible(false);
        }
        else {
            Form.fields('AVISO_OBSERVACOES').visible(true);
            Form.fields('AVISO_OBSERVACOES').readOnly(true);
        }

    }

    Form.apply();

}

function somenteLeituraObservacao() {

    let observacoes = Form.fields('AVISO_OBSERVACOES').value();

    if (observacoes == undefined || observacoes == "" || observacoes == " ") {
        Form.fields('AVISO_OBSERVACOES').visible(false);
    }
    else {
        Form.fields('AVISO_OBSERVACOES').visible(true);
        Form.fields('AVISO_OBSERVACOES').readOnly(true);
    }
    Form.apply();
}

//soma o total do recurso
function totalRecurso() {

    debugger

    var valorAno = Form.fields('TARIFA_ACUMULADO_MES').value();
    var valorNumber = parseInt(valorAno);
    var valorAplicar = Form.fields('AVISO_TOTAL').value();
    var result = valorNumber + valorAplicar;
    var total = result;


    if (valorAno != undefined || valorAno != '' || valorAno != ' ') {
        Form.fields('AVISO_VALOR_GRID').value(total);
    }

    else {
        Form.fields('AVISO_VALOR_GRID').value(total);
    }
    Form.apply();
}


//define visualização de campos referente ao usuário que está logado
function visulizaEtapa() {
    let codigoUsuario = Form.fields('COD_USUARIO').value();

    if (codigoUsuario == '24') {

        Form.fields('LBL_APROVAR_REGIONAL').visible(false);
        Form.fields('RADIO_DELIBERA_REGIONAL').visible(false);
        Form.fields('AVISO_PARECER_REGIONAL').visible(false);
    }
    else {
        Form.fields('RADIO_DELIBERA_REGIONAL').visible(true);
    }
    Form.apply();
}

function verificaValor() {
    //Verifica qual Local e faz a comparação com o valor acumulado para preencher a rota.
    debugger
    var acumuladoMes = Form.fields("AVISO_VALOR_GRID").value();
    var deptoSolicitante = Form.fields("TARIFA_DEPTO").value();

    if (acumuladoMes >= 1200 && deptoSolicitante == 'PA 01') {
        Form.fields('LIMITE_ROTA').value('Aprovação Financeiro').apply();
    }

    else if (acumuladoMes >= 1200 && deptoSolicitante == 'PA 02') {
        Form.fields('LIMITE_ROTA').value('Aprovação Financeiro').apply();
    }

    else if (acumuladoMes >= 1200 && deptoSolicitante == 'PA 03') {
        Form.fields('LIMITE_ROTA').value('Aprovação Financeiro').apply();
    }

    else if (acumuladoMes >= 1200 && deptoSolicitante == 'PA 04') {
        Form.fields('LIMITE_ROTA').value('Aprovação Financeiro').apply();
    }

    else if (acumuladoMes >= 2400 && deptoSolicitante == 'PA 05') {
        Form.fields('LIMITE_ROTA').value('Aprovação Financeiro').apply();
    }

    else if (acumuladoMes >= 4320 && deptoSolicitante == 'PA 06') {
        Form.fields('LIMITE_ROTA').value('Aprovação Financeiro').apply();
    }

    else if (acumuladoMes >= 2400 && deptoSolicitante == 'PA 07') {
        Form.fields('LIMITE_ROTA').value('Aprovação Financeiro').apply();
    }

    else if (acumuladoMes >= 2400 && deptoSolicitante == 'PA 08') {
        Form.fields('LIMITE_ROTA').value('Aprovação Financeiro').apply();
    }

    else if (acumuladoMes >= 2400 && deptoSolicitante == 'PA 09') {
        Form.fields('LIMITE_ROTA').value('Aprovação Financeiro').apply();
    }

    else if (acumuladoMes >= 1200 && deptoSolicitante == 'PA 10') {
        Form.fields('LIMITE_ROTA').value('Aprovação Financeiro').apply();
    }

    else {
        Form.fields('TARIFA_APROVACAO').value('fin_nivel_1').apply();
        Form.fields('LIMITE_ROTA').value('Aprovação Gerente').apply();
    }

    Form.apply();
}

function preencherValor() {
    debugger

    var valor = Form.grids("GRID_AVISO").fields("AVISO_VALOR").value();

    if (valor != 0.01) {
        Form.grids("GRID_AVISO").fields("AUX_AVISO_VALOR").value(valor);
    }
    else {
        Form.grids("GRID_AVISO").fields("AUX_AVISO_VALOR").value('');
    }

    Form.apply();
}



//Verifica se todas as linhas da grid possuem o valor 0.01. Se for verdadeiro, preenche campo auxiliar com TRUE. Caso Contrário False.
function procurarCentavos() {
    debugger
    var dados = Form.grids('GRID_AVISO').dataRows();

    for (var i = 0; i < dados.length; i++) {
        if (dados[i].AVISO_VALOR > 0.01) {

            Form.fields('AUX_CENTAVO').value('TRUE');

        }


        else {

            if (i + 1 == dados.length) {

                Form.fields('AUX_CENTAVO').value('FALSE');

            }

        }
        Form.apply();

    }
}

function limiteAnual() {
    debugger
    var deptoSolicitante = Form.fields("TARIFA_DEPTO").value();

    if (deptoSolicitante == 'PA 01') {
        Form.fields('TARIFA_ANUAL').value(1200).apply();
    }

    else if (deptoSolicitante == 'PA 02') {
        Form.fields('TARIFA_ANUAL').value(1200).apply();
    }

    else if (deptoSolicitante == 'PA 03') {
        Form.fields('TARIFA_ANUAL').value(1200).apply();
    }

    else if (deptoSolicitante == 'PA 04') {
        Form.fields('TARIFA_ANUAL').value(1200).apply();
    }

    else if (deptoSolicitante == 'PA 05') {
        Form.fields('TARIFA_ANUAL').value(2400).apply();
    }

    else if (deptoSolicitante == 'PA 06') {
        Form.fields('TARIFA_ANUAL').value(4320).apply();
    }

    else if (deptoSolicitante == 'PA 07') {
        Form.fields('TARIFA_ANUAL').value(2400).apply();
    }

    else if (deptoSolicitante == 'PA 08') {
        Form.fields('TARIFA_ANUAL').value(2400).apply();
    }

    else if (deptoSolicitante == 'PA 09') {
        Form.fields('TARIFA_ANUAL').value(2400).apply();
    }

    else  {
        Form.fields('TARIFA_ANUAL').value(1200).apply();
    }

    Form.apply();
}


/*

COMO ESTAVA
$LIMITE_ROTA == 'Aprovação Financeiro'      ---------> Aprovar Estorno c/ limite excedido

$TARIFA_COBR_PROV == 'Tarifa cobrada' && ($CODIGO_USUARIO == $CODIGO_GERENTE_PA)  --------------> Aviso de  Lançamento - s/ assinatura

$TARIFA_COBR_PROV == 'Tarifa provisionada' && ($CODIGO_USUARIO == $CODIGO_GERENTE_PA) -----------------> Conferência e Lançamento  no Sisbr

$LIMITE_ROTA == 'Aprovação Gerente' && ($CODIGO_USUARIO != $CODIGO_GERENTE_PA) -------------------> Aprovar Estorno



COMO FICOU
($LIMITE_ROTA == 'Aprovação Financeiro') && ($AUX_CENTAVO == 'TRUE')      ---------> Aprovar Estorno c/ limite excedido

($AUX_CENTAVO == 'FALSE') && ($TARIFA_COBR_PROV == 'Tarifa cobrada')  --------------> Aviso de  Lançamento - s/ assinatura

($AUX_CENTAVO == 'FALSE') && ($TARIFA_COBR_PROV == 'Tarifa provisionada') -----------------> Conferência e Lançamento  no Sisbr

($LIMITE_ROTA == 'Aprovação Gerente') && ($CODIGO_USUARIO != $CODIGO_GERENTE_PA) && ($AUX_CENTAVO == 'TRUE') -------------------> Aprovar Estorno

*/


