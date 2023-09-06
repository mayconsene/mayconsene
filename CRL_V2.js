/**
 * arquivo:              CRL_V2.js
 * processo:             CRL Novo v.2
 * Tabela do Processo:   f_crl_v3
 *
 *
 * Dependências
 *   - apiJSPadrao_v1.0.2.js
 *   - Retiradas as regras de tela e incluídas no JS.
 *   - Campos auxiliares para usuário finalizador (Tarefa Automática + User)
 *
 * 
 * @author       Maycon Moraes Sene - Atualização Maio 2023
 * @since        05/2023
 * @lastModif    01-09-2023
 * 
 * @roboHomologacao
 * @aprovacoesFN 84@1;84@2;84@6;
 * @aprovacoesFNUC 84@1;
 *  
 * 
 * @roboProducao
 * @aprovacoesFN 66@1;66@2;66@6;
 * @aprovacoesFNUC 66@1;
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

var SOLICITAR_CRL = 1;
var FINALIZAR_APROVADO = 2;
var DECISAO = 3;
var CONFECCIONAR_CRL = 4;
var AGUARDAR_APROVACAO = 5;
var FINALIZAR_REJEITADO = 6;



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
/*function setEventos() {

    if(codigoEtapa == SOLICITAR_CRL) {
        Form.fields('CRL_TIPO_PESSOA').subscribe('CHANGE', function(itemId, data, response){
            alteraMascara();
            alteraModalidade();			
        });	
    }

}*/



function setEventos() {
    debugger;
    //Valida CPF 
    if (codigoEtapa === SOLICITAR_CRL) {

        Form.fields("CRL_TIPO_PESSOA").subscribe("CHANGE", function (itemId, data, response) {

            verificaTipoPessoa();
            regraPfPj();


        });

        Form.fields("CRL_TIPO_PESSOA").subscribe("BLUR", function (itemId, data, response) {

            verificaTipoPessoa();
            regraPfPj();

        });

        Form.fields("CRL_CPF_CNPJ").subscribe("CHANGE", function (itemId, data, response) {

            validadorcpfCnpj();

        });

        Form.fields("CRL_CPF_CNPJ").subscribe("BLUR", function (itemId, data, response) {

            validadorcpfCnpj();

        });

        Form.fields("CRL_EQUIPE").subscribe("CHANGE", function (itemId, data, response) {

            regraAlcada();

        });


    }

    if (codigoEtapa === CONFECCIONAR_CRL) {

        Form.fields('CRL_MAJORACAO').subscribe("CHANGE", function (itemId, data, response) {
            majoracaoCRL();
        });

        Form.fields('CRL_MAJORACAO').subscribe("CHANGE", function (itemId, data, response) {
            botoesConfeccionarCrl();
        });
    }

    if (codigoEtapa === AGUARDAR_APROVACAO) {

        Form.fields('CRL_APROV_SISBR').subscribe("CHANGE", function (itemId, data, response) {
            regraAprovacao();
        });


    }

    Form.apply();
}

/*
 * Define novas regras de validação dos campos
 */
function setValidators() {


    if (codigoEtapa == CONFECCIONAR_CRL) {
        Form.actions("aprovar").subscribe("SUBMIT", function (itemId, action, reject) {
            debugger;

            if (Form.fields("CRL_MAJORACAO").value() == "Com Majoração/Alteração Portfólio") {

                if (!JSPadrao.validaPreenchimentoMinimoItensGRIDSobDemanda({ "grid": "GRID_MAJORACAO", "quantidade": "1", "mensagem": "Favor Inserir ao menos um documento." })) {
                    reject();
                }
                if (!JSPadrao.validaPreenchimentoMinimoItensGRIDSobDemanda({ "grid": "GRID_ALT_PORT", "quantidade": "1", "mensagem": "Favor Inserir ao menos um documento." })) {
                    reject();
                }

            }

            if (Form.fields("CRL_MAJORACAO").value() == "Com Majoração") {

                if (!JSPadrao.validaPreenchimentoMinimoItensGRIDSobDemanda({ "grid": "GRID_MAJORACAO", "quantidade": "1", "mensagem": "Favor Inserir todos os documentos obrigatórios na Grid terceiros." })) {
                    reject();
                }

            }
            if (Form.fields("CRL_MAJORACAO").value() == "Alteração de Portfólio") {

                if (!JSPadrao.validaPreenchimentoMinimoItensGRIDSobDemanda({ "grid": "GRID_ALT_PORT", "quantidade": "1", "mensagem": "Favor Inserir todos os documentos obrigatórios na Grid terceiros." })) {
                    reject();
                }

            }
        });
    }

    Form.apply();
}

/*
 * Formata o formulário
 */
function setForm() {

    if (codigoEtapa === SOLICITAR_CRL) {

        Form.groups('GR_CONFECCIONAR').visible(false).apply();
        regraAlcada();
        regraPfPj();
    }


    if (codigoEtapa === CONFECCIONAR_CRL) {

        Form.grids('GRID_ALT_PORT').visible(false).apply();
        majoracaoCRL();
        botoesConfeccionarCrl();
        regraAlcada();

        setTimeout(() => {
            Form.apply().then(() => {
                limparCampoDaGrid();
            });
        }, 1000);


        Form.apply().then(() => {
            preencherUsuarioFinalizador();
        });



    }

    if (codigoEtapa === AGUARDAR_APROVACAO) {

        setTimeout(() => {
            Form.apply().then(() => {
                gridsSomenteLeitura();
            });
        }, 1000);


        Form.apply().then(() => {
            regraAprovacao();
        });

    }

    if (codigoEtapa === FINALIZAR_APROVADO) {

        setTimeout(() => {
            Form.apply().then(() => {
                gridsSomenteLeitura();
            });
        }, 1000);

        Form.apply().then(() => {
            regraAprovacoesFinalizar();
        });



    }

    if (codigoEtapa === FINALIZAR_REJEITADO) {

        setTimeout(() => {
            Form.apply().then(() => {
                gridsSomenteLeitura();
            });
        }, 1000);

        Form.apply().then(() => {
            regraAprovacoesFinalizar();
        });

    }
}

/*
function alteraMascara(){
    var pessoa = Form.fields("CRL_TIPO_PESSOA").value();
    var tpPessoa = pessoa[0];

    if(tpPessoa == "Pessoa física"){
        Form.fields("CRL_CPF_CNPJ").mask("cpf").apply();
    } else if(tpPessoa == "Pessoa jurídica"){
        Form.fields("CRL_CPF_CNPJ").mask("cnpj").apply();
    }
}

function alteraModalidade(){

    var pessoa = Form.fields("CRL_TIPO_PESSOA").value();
    var tpPessoa = pessoa[0];
    if(tpPessoa == "Pessoa física"){
        //GRID PF
        Form.grids("MODALIDADE_PF").visible(true).apply();
        //GRID PJ
        Form.grids("MODALIDADE_PJ").visible(false).apply();

    } else if(tpPessoa == "Pessoa jurídica"){
        //GRID PF
        Form.grids("MODALIDADE_PF").visible(false).apply();
        //GRID PJ
        Form.grids("MODALIDADE_PJ").visible(true).apply();
    }
}

function verificaParecer(){
    var ciclo = Form.fields("CRL_CICLO").value();
    if(ciclo != 1){
        Form.fields("CRL_PARECER").visible(true).apply();
        //Form.fields("CRL_PARECER_LABEL").visible(true).apply();
    } else {
        Form.fields("CRL_PARECER").visible(false).apply();
        //Form.fields("CRL_PARECER_LABEL").visible(false).apply();
    }
}*/

function majoracaoCRL() {
    debugger

    let tipoPessoa = Form.fields('CRL_TIPO_PESSOA').value();
    let valorMajoracao = Form.fields('CRL_MAJORACAO').value();

    if (tipoPessoa == "Pessoa Física" && (valorMajoracao === undefined || valorMajoracao === "")) {

        Form.fields('CRL_LBL_COM_MAJORACAO').visible(false);
        Form.grids('GRID_MAJORACAO').visible(false);

        Form.fields('CRL_LBL_ALT_PORTIFOLIO').visible(false);
        Form.grids('GRID_ALT_PORT').visible(false);

    }

    else if (tipoPessoa == "Pessoa Física" && valorMajoracao == "Com Majoração/Alteração Portfólio") {

        Form.fields('CRL_LBL_COM_MAJORACAO').visible(true);
        Form.fields('CRL_LBL_ALT_PORTIFOLIO').visible(true);

        Form.grids('GRID_MAJORACAO').visible(true);
        Form.grids('GRID_ALT_PORT').visible(true);

        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO').visible(true);
        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO').required(true);

        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO2').visible(false);
        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO2').required(false);

        Form.grids('GRID_MAJORACAO').fields('CRL_VALOR_MAJORADO').visible(true);
        Form.grids('GRID_MAJORACAO').fields('CRL_VALOR_MAJORADO').required(true);

        Form.grids('GRID_ALT_PORT').fields('CRL_DE').required(true);
        Form.grids('GRID_ALT_PORT').fields('CRL_PARA').required(true);
        Form.grids('GRID_ALT_PORT').fields('CRL_ALT_PORT_VALOR').required(true);

    }

    else if (tipoPessoa == "Pessoa Física" && valorMajoracao == "CRL Automático") {

        Form.fields('CRL_LBL_COM_MAJORACAO').visible(false);

        Form.grids('GRID_MAJORACAO').visible(false);

        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO').visible(false);
        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO').required(false);

        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO2').visible(false);
        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO2').required(false);

        Form.grids('GRID_MAJORACAO').fields('CRL_VALOR_MAJORADO').visible(false);
        Form.grids('GRID_MAJORACAO').fields('CRL_VALOR_MAJORADO').required(false);

    }


    else if (tipoPessoa == "Pessoa Jurídica" && (valorMajoracao === undefined || valorMajoracao === "")) {

        Form.fields('CRL_LBL_COM_MAJORACAO').visible(false);
        Form.grids('GRID_MAJORACAO').visible(false);

        Form.fields('CRL_LBL_ALT_PORTIFOLIO').visible(false);
        Form.grids('GRID_ALT_PORT').visible(false);

    }


    else if (tipoPessoa == "Pessoa Jurídica" && valorMajoracao == "Com Majoração/Alteração Portfólio") {

        Form.fields('CRL_LBL_COM_MAJORACAO').visible(true);
        Form.fields('CRL_LBL_ALT_PORTIFOLIO').visible(true);

        Form.grids('GRID_MAJORACAO').visible(true);
        Form.grids('GRID_ALT_PORT').visible(true);

        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO').visible(false);
        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO').required(false);

        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO2').visible(true);
        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO2').required(true);

        Form.grids('GRID_MAJORACAO').fields('CRL_VALOR_MAJORADO').visible(true);
        Form.grids('GRID_MAJORACAO').fields('CRL_VALOR_MAJORADO').required(true);

        Form.grids('GRID_ALT_PORT').fields('CRL_DE').required(true);
        Form.grids('GRID_ALT_PORT').fields('CRL_PARA').required(true);
        Form.grids('GRID_ALT_PORT').fields('CRL_ALT_PORT_VALOR').required(true);

    }

    else if (tipoPessoa == "Pessoa Física" && valorMajoracao == "Com Majoração") {

        Form.fields('CRL_LBL_COM_MAJORACAO').visible(true);
        Form.fields('CRL_LBL_ALT_PORTIFOLIO').visible(false);

        Form.grids('GRID_MAJORACAO').visible(true);
        Form.grids('GRID_ALT_PORT').visible(false);

        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO').visible(true);
        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO').required(true);

        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO2').visible(false);
        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO2').required(false);

        Form.grids('GRID_MAJORACAO').fields('CRL_VALOR_MAJORADO').visible(true);
        Form.grids('GRID_MAJORACAO').fields('CRL_VALOR_MAJORADO').required(true);

        Form.grids('GRID_ALT_PORT').fields('CRL_DE').required(false);
        Form.grids('GRID_ALT_PORT').fields('CRL_PARA').required(false);
        Form.grids('GRID_ALT_PORT').fields('CRL_ALT_PORT_VALOR').required(false);

    }

    else if (tipoPessoa == "Pessoa Física" && valorMajoracao == "Alteração de Portfólio") {

        Form.fields('CRL_LBL_COM_MAJORACAO').visible(false);
        Form.fields('CRL_LBL_ALT_PORTIFOLIO').visible(true);

        Form.grids('GRID_MAJORACAO').visible(false);
        Form.grids('GRID_ALT_PORT').visible(true);

        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO').visible(false);
        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO').required(false);

        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO2').visible(false);
        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO2').required(false);

        Form.grids('GRID_MAJORACAO').fields('CRL_VALOR_MAJORADO').visible(false);
        Form.grids('GRID_MAJORACAO').fields('CRL_VALOR_MAJORADO').required(false);

        Form.grids('GRID_ALT_PORT').fields('CRL_DE').required(true);
        Form.grids('GRID_ALT_PORT').fields('CRL_PARA').required(true);
        Form.grids('GRID_ALT_PORT').fields('CRL_ALT_PORT_VALOR').required(true);


    }

    else if (tipoPessoa == "Pessoa Jurídica" && valorMajoracao == "Com Majoração") {

        Form.fields('CRL_LBL_COM_MAJORACAO').visible(true);
        Form.fields('CRL_LBL_ALT_PORTIFOLIO').visible(false);

        Form.grids('GRID_MAJORACAO').visible(true);
        Form.grids('GRID_ALT_PORT').visible(false);

        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO').visible(false);
        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO').required(false);

        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO2').visible(true);
        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO2').required(true);

        Form.grids('GRID_MAJORACAO').fields('CRL_VALOR_MAJORADO').visible(true);
        Form.grids('GRID_MAJORACAO').fields('CRL_VALOR_MAJORADO').required(true);

        Form.grids('GRID_ALT_PORT').fields('CRL_DE').required(false);
        Form.grids('GRID_ALT_PORT').fields('CRL_PARA').required(false);
        Form.grids('GRID_ALT_PORT').fields('CRL_ALT_PORT_VALOR').required(false);

    }

    else if (tipoPessoa == "Pessoa Jurídica" && valorMajoracao == "Alteração de Portfólio") {

        Form.fields('CRL_LBL_COM_MAJORACAO').visible(false);
        Form.fields('CRL_LBL_ALT_PORTIFOLIO').visible(true);

        Form.grids('GRID_MAJORACAO').visible(false);
        Form.grids('GRID_ALT_PORT').visible(true);

        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO').visible(false);
        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO').required(false);

        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO2').visible(true);
        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO2').required(true);

        Form.grids('GRID_MAJORACAO').fields('CRL_VALOR_MAJORADO').visible(false);
        Form.grids('GRID_MAJORACAO').fields('CRL_VALOR_MAJORADO').required(false);

        Form.grids('GRID_ALT_PORT').fields('CRL_DE').required(true);
        Form.grids('GRID_ALT_PORT').fields('CRL_PARA').required(true);
        Form.grids('GRID_ALT_PORT').fields('CRL_ALT_PORT_VALOR').required(true);


    }

    else {

        Form.fields('CRL_LBL_COM_MAJORACAO').visible(false);
        Form.fields('CRL_LBL_ALT_PORTIFOLIO').visible(false);

        Form.grids('GRID_MAJORACAO').visible(false);
        Form.grids('GRID_ALT_PORT').visible(false);

        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO').visible(false);
        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO').required(false);

        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO2').visible(false);
        Form.grids('GRID_MAJORACAO').fields('CRL_LISTA_MAJORACAO2').required(false);

        Form.grids('GRID_MAJORACAO').fields('CRL_VALOR_MAJORADO').visible(false);
        Form.grids('GRID_MAJORACAO').fields('CRL_VALOR_MAJORADO').required(false);

        Form.grids('GRID_ALT_PORT').fields('CRL_DE').required(false);
        Form.grids('GRID_ALT_PORT').fields('CRL_PARA').required(false);
        Form.grids('GRID_ALT_PORT').fields('CRL_ALT_PORT_VALOR').required(false);

    }

    Form.apply();
}


//Máscara para pessoa Física ou Jurídica -- maycon
function verificaTipoPessoa() {
    var pessoa = Form.fields('CRL_TIPO_PESSOA').value();
    var tipoPessoa = pessoa;

    if (tipoPessoa == "Pessoa Física") {
        Form.fields('CRL_CPF_CNPJ').mask('cpf').apply();
    } else if (tipoPessoa == "Pessoa Jurídica") {
        Form.fields('CRL_CPF_CNPJ').mask('cnpj').apply();
    }
}


//VALIDA SE O CPF É VÁLIDO -- maycon
function validadorcpfCnpj() {

    var cpf_cnpj = Form.fields('CRL_TIPO_PESSOA').value();

    if (cpf_cnpj == "Pessoa Física") {
        Form.apply().then(function () {
            var retorno = JSPadrao.validaCPF({ "campo": "CRL_CPF_CNPJ" });
            console.log("CRL_CPF_CNPJ: " + retorno);
        });

    } else {

        Form.apply().then(function () {
            var retorno = JSPadrao.validaCNPJ({ "campo": "CRL_CPF_CNPJ" });
            console.log("CRL_CPF_CNPJ: " + retorno);
        });
    }

}

function regraAlcada() {

    let equipe = Form.fields('CRL_EQUIPE').value();

    if (equipe == "Crédito Rural") {
        Form.fields('AUX_ROTA').value('rural_nivel_3');
    }

    else if (equipe == "Empréstimo") {
        Form.fields('AUX_ROTA').value('emp_nivel_2');
    }

    else {
        Form.fields('AUX_ROTA').value('emp_nivel_1');
    }

    Form.apply();

}

function regraPfPj() {

    let tipoPessoa = Form.fields('CRL_TIPO_PESSOA').value();

    if (tipoPessoa == "Pessoa Física") {
        Form.grids('GRID_MODALIDADE').fields('CRL_MODAL1').visible(true);
        Form.grids('GRID_MODALIDADE').fields('CRL_MODAL2').visible(false);
    }

    else if (tipoPessoa == "Pessoa Jurídica") {
        Form.grids('GRID_MODALIDADE').fields('CRL_MODAL1').visible(false);
        Form.grids('GRID_MODALIDADE').fields('CRL_MODAL2').visible(true);
    }
    else {
        Form.grids('GRID_MODALIDADE').fields('CRL_MODAL1').visible(false);
        Form.grids('GRID_MODALIDADE').fields('CRL_MODAL2').visible(false);
    }

    Form.apply();

}

function botoesConfeccionarCrl() {

    let majoracaoCRL = Form.fields('CRL_MAJORACAO').value();

    if (majoracaoCRL == "CRL Automático" ||
        majoracaoCRL == "Sem Majoração" ||
        majoracaoCRL == "Com Majoração" ||
        majoracaoCRL == "Alteração de Portfólio" ||
        majoracaoCRL == "Com Majoração/Alteração Portfólio") {

        Form.actions('aprovar').hidden(false).label('Finalizar Aprovado');
        

    }

    else if (majoracaoCRL == "Ajustar") {
        Form.actions('aprovar').hidden(false).label('Ajustar');       
    }

    else if (majoracaoCRL == "Rejeitar") {
        Form.actions('aprovar').hidden(false).label('Finalizar Rejeitado');
       
    }

    else {
        Form.actions('aprovar').hidden(false).label('Prosseguir');
        
    }
    Form.apply();
}


function regraAprovacao() {
    debugger

    let checkAprovacao = Form.fields('CRL_APROV_SISBR').value();

    if (checkAprovacao == undefined || checkAprovacao == "" || checkAprovacao == " ") {
        Form.actions('aprovar').hidden(true);
    }

    else {
        Form.actions('aprovar').hidden(false).label('Finalizar');
    }

    Form.apply();

}

function gridsSomenteLeitura() {
    debugger

    let gridMajoracao = Form.grids('GRID_MAJORACAO');
    let gridPortfolio = Form.grids('GRID_ALT_PORT');

    if (gridMajoracao.dataRows().length <= 0) {

        Form.fields('CRL_LBL_COM_MAJORACAO').visible(false);
        Form.grids('GRID_MAJORACAO').visible(false);
    }

    else {

        Form.fields('CRL_LBL_COM_MAJORACAO').visible(true);

        Form.grids('GRID_MAJORACAO').visible(true);
        Form.grids('GRID_MAJORACAO').readOnly(true);

    }

    if (gridPortfolio.dataRows().length <= 0) {

        Form.fields('CRL_LBL_ALT_PORTIFOLIO').visible(false);
        Form.grids('GRID_ALT_PORT').visible(false);

    }

    else {

        Form.fields('CRL_LBL_ALT_PORTIFOLIO').visible(true);

        Form.grids('GRID_ALT_PORT').visible(true);
        Form.grids('GRID_ALT_PORT').readOnly(true);

    }

    Form.apply();

}

function regraAprovacoesFinalizar() {
    debugger

    let checkSisbr = Form.fields('CRL_APROV_SISBR').value();
    let checkSupervisao = Form.fields('CRL_APROV_SUPERVISAO').value();
    let checkDiretoria = Form.fields('CRL_APROV_DIRETORIA').value();

    if (checkSisbr) {
        Form.fields('CRL_LBL_AGUARDANDO_AP').visible(true);
        Form.fields('CRL_APROV_SISBR').visible(true);
        Form.fields('CRL_APROV_SISBR').readOnly(true);
    }
    else {
        Form.fields('CRL_LBL_AGUARDANDO_AP').visible(false);
        Form.fields('CRL_APROV_SISBR').visible(false);
    }

    if (checkSupervisao) {
        Form.fields('CRL_APROV_SUPERVISAO').visible(true);
        Form.fields('CRL_APROV_SUPERVISAO').readOnly(true);
    }
    else {
        Form.fields('CRL_APROV_SUPERVISAO').visible(false);
    }

    if (checkDiretoria) {
        Form.fields('CRL_APROV_DIRETORIA').visible(true);
        Form.fields('CRL_APROV_DIRETORIA').readOnly(true);
    }

    else {
        Form.fields('CRL_APROV_DIRETORIA').visible(false);
    }

    Form.apply();

}


function limparCampoDaGrid() {
    debugger

    var tipoPessoa = Form.fields('CRL_TIPO_PESSOA').value();

    if (tipoPessoa == "Pessoa Física") {

        Form.grids('GRID_MODALIDADE').fields('CRL_MODAL1').value();
        Form.grids('GRID_MODALIDADE').fields('CRL_MODAL1').visible(true);
        Form.grids('GRID_MODALIDADE').fields('CRL_MODAL1').readOnly(true);

        Form.grids('GRID_MODALIDADE').fields('CRL_VALORM').visible(true);
        Form.grids('GRID_MODALIDADE').fields('CRL_VALORM').readOnly(true);

        Form.grids('GRID_MODALIDADE').fields('CRL_MODAL2').value('');
        Form.grids('GRID_MODALIDADE').fields('CRL_MODAL2').visible(false);


    }

    else {

        Form.grids('GRID_MODALIDADE').fields('CRL_MODAL1').value('');
        Form.grids('GRID_MODALIDADE').fields('CRL_MODAL1').visible(false);

        Form.grids('GRID_MODALIDADE').fields('CRL_MODAL2').value();
        Form.grids('GRID_MODALIDADE').fields('CRL_MODAL2').visible(true);
        Form.grids('GRID_MODALIDADE').fields('CRL_MODAL2').readOnly(true);

        Form.grids('GRID_MODALIDADE').fields('CRL_VALORM').visible(true);
        Form.grids('GRID_MODALIDADE').fields('CRL_VALORM').readOnly(true);

    }

    Form.apply();

}

function preencherUsuarioFinalizador() {

    let iniciadorSub = Form.fields('CRL_COD_INICIADOR').value();
    let iniciadorNativo = Form.fields('COD_INICIADOR_NATIVO').value();
    let nativo = iniciadorNativo;
    let sub = iniciadorSub;

    if (iniciadorSub == undefined) {
        Form.fields('COD_USUARIO_FINAL').value([nativo]);
    }
    else {
        Form.fields('COD_USUARIO_FINAL').value([sub, '107']);
    }
    Form.apply();
}
