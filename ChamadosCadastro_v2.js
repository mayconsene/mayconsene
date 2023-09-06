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
const SOLICITAR_CHAMADO_CADASTRO = 1;
const AJUSTAR_DUVIDA_CADASTRO = 8;
const CONFIRMAR_RESOLUCAO_CHAMADO_CADASTRO = 7;
const GERENTE_DE_PA = 5;
const RESOLVER_SITUACAO_CHAMADO  = 6;


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

    if (codigoEtapa == SOLICITAR_CHAMADO_CADASTRO) {

        Form.fields('CAD_TIPO_PESSOA').subscribe('CHANGE', function (itemId, data, response) {
            verificaTipoPessoa();
        });

        Form.fields('CAD_CPF_CNPJ').subscribe('CHANGE', function (itemId, data, response) {
            validadorcpfCnpj();
        });

        Form.grids("GRID_ANEXOS").subscribe(

            'GRID_ADD_SUBMIT', function (dadosInstancia, nomeCampo, valorCampo) {
                setTimeout(() => {

                    Form.grids("GRID_ANEXOS").errors([]).apply();
                    Form.grids("GRID_ANEXOS").visible(true).apply();
                }, 10);
            });
    }

    if (codigoEtapa == GERENTE_DE_PA) {
        Form.fields('CAD_ROTAS').subscribe('CHANGE', function (itemId, data, response) {
            botoesGerente();
        });
    }

    if (codigoEtapa == RESOLVER_SITUACAO_CHAMADO ) {
        Form.grids("GRID_TEMPLATE").subscribe(

            'GRID_ADD_SUBMIT', function (dadosInstancia, nomeCampo, valorCampo) {
                setTimeout(() => {

                    Form.grids("GRID_TEMPLATE").errors([]).apply();
                    Form.grids("GRID_TEMPLATE").visible(true).apply();
                }, 10);
            });

            Form.fields('CAD_ACAO').subscribe('CHANGE', function (itemId, data, response) {
                botoesResolver();
            });
    }

    if (codigoEtapa == AJUSTAR_DUVIDA_CADASTRO) {

    }

    if (codigoEtapa == CONFIRMAR_RESOLUCAO_CHAMADO_CADASTRO) {

    }
}


/*
 * Formata o formulário
 */
function setForm() {

    if (codigoEtapa == SOLICITAR_CHAMADO_CADASTRO) {
        verificaTipoPessoa();
        validadorcpfCnpj();
        obrigatoriedadeGrid();

    }

    if (codigoEtapa == GERENTE_DE_PA) {
        setTimeout(() => {

            Form.grids("GRID_ANEXOS").actions("CREATE").hidden(true);
            Form.grids("GRID_ANEXOS").updatePropsRows(null, {
                visibleDelete: false,
                visibleRow: true,
                visibleEdit: false,
            });
            Form.apply();

        }, 500);

        botoesGerente();
    }

    if (codigoEtapa == RESOLVER_SITUACAO_CHAMADO ) {
        obrigatoriedadeResolver();
        visualizaEtapaGerente();
        botoesResolver();

        setTimeout(() => {

            Form.grids("GRID_ANEXOS").actions("CREATE").hidden(true);
            Form.grids("GRID_ANEXOS").updatePropsRows(null, {
                visibleDelete: false,
                visibleRow: true,
                visibleEdit: false,
            });
            Form.apply();

        }, 500);
    }

    if (codigoEtapa == AJUSTAR_DUVIDA_CADASTRO) {

        visualizaEtapaResolver();


        setTimeout(() => {

            Form.grids("GRID_ANEXOS").actions("CREATE").hidden(true);
            Form.grids("GRID_ANEXOS").updatePropsRows(null, {
                visibleDelete: false,
                visibleRow: true,
                visibleEdit: true,
            });
            Form.apply();

        }, 500);


        setTimeout(() => {

            Form.grids("GRID_TEMPLATE").actions("CREATE").hidden(true);
            Form.grids("GRID_TEMPLATE").updatePropsRows(null, {
                visibleDelete: false,
                visibleRow: true,
                visibleEdit: false,
            });
            Form.apply();

        }, 500);
    }

    if (codigoEtapa == CONFIRMAR_RESOLUCAO_CHAMADO_CADASTRO) {
        visualizaEtapaGerente();
        visualizaEtapaResolver();
        setTimeout(() => {

            Form.grids("GRID_ANEXOS").actions("CREATE").hidden(true);
            Form.grids("GRID_ANEXOS").updatePropsRows(null, {
                visibleDelete: false,
                visibleRow: true,
                visibleEdit: false,
            });
            Form.apply();

        }, 500);


        setTimeout(() => {

            Form.grids("GRID_TEMPLATE").actions("CREATE").hidden(true);
            Form.grids("GRID_TEMPLATE").updatePropsRows(null, {
                visibleDelete: false,
                visibleRow: true,
                visibleEdit: false,
            });
            Form.apply();

        }, 500);

    }


}

/*
 * Define novas regras de validação dos campos
 */
function setValidators() {


    if (codigoEtapa == SOLICITAR_CHAMADO_CADASTRO) {
        Form.actions("aprovar").subscribe(
            "SUBMIT",
            (itemId, action, reject) => {
                const validaGrid = Form.grids("GRID_ANEXOS");

                if (validaGrid.dataRows().length === 0) {
                    validaGrid.errors(
                        "Por favor, preencha ao menos uma informação na Grid."
                    );

                    reject();
                }
            }
        );
    }


    if (codigoEtapa == RESOLVER_SITUACAO_CHAMADO ) {

        Form.actions("aprovar").subscribe(
            "SUBMIT",
            (itemId, action, reject) => {

                const validaGridTemplate = Form.grids("GRID_TEMPLATE");
                if (validaGridTemplate.dataRows().length === 0) {
                    validaGridTemplate.errors(
                        "Por favor, preencha ao menos uma informação na Grid."
                    );

                    reject();
                }

            }
        );

    }


}






/*
*
*
*ETAPA(SOLICITAR_CHAMADO_CADASTRO)
*
*/


//aplica mascára de pessoa física ou juridica.
function verificaTipoPessoa() {
    debugger
    var pessoa = Form.fields('CAD_TIPO_PESSOA').value();
    var tipoPessoa = pessoa;

    if (tipoPessoa == "Pessoa Física") {
        Form.fields('CAD_CPF_CNPJ').mask('cpf').apply();
    } else if (tipoPessoa == "Pessoa Jurídica") {
        Form.fields('CAD_CPF_CNPJ').mask('cnpj').apply();
    }
}

//aplica mascára de CPF e CNPJ.
function validadorcpfCnpj() {
    debugger

    var pessoa = Form.fields('CAD_TIPO_PESSOA').value();

    if (pessoa == "Pessoa Física") {
        Form.apply().then(function () {
            var retorno = JSPadrao.validaCPF({ "campo": "CAD_CPF_CNPJ" });
            console.log("CAD_CPF_CNPJ: " + retorno);
        });

    } else {

        Form.apply().then(function () {
            var retorno = JSPadrao.validaCNPJ({ "campo": "CAD_CPF_CNPJ" });
            console.log("CAD_CPF_CNPJ: " + retorno);
        });
    }

}


//validar documentos ao menos 1 item na grid
function validaSubmitGrid(grid, reject, text) {

    if (Form.grids('GRID_ANEXOS').dataRows().length < 0) {

        return false;
    }
    else {

        return true;
    }
}



function obrigatoriedadeGrid() {

    debugger

    if (validaSubmitGrid) {

        Form.grids("GRID_ANEXOS").required(false);

    }

    else {

        Form.grids("GRID_ANEXOS").required(true);

    }

    Form.apply();
}

//validar documentos ao menos 1 item na grid
function validaSubmitGridResolver(grid, reject, text) {

    if (Form.grids('GRID_TEMPLATE').dataRows().length < 0) {

        return false;
    }
    else {

        return true;
    }
}



function obrigatoriedadeResolver() {

    debugger

    if (validaSubmitGridResolver) {

        Form.grids("GRID_TEMPLATE").required(false);

    }

    else {

        Form.grids("GRID_TEMPLATE").required(true);

    }

    Form.apply();
}


function botoesGerente() {

    let deliberacao = Form.fields('CAD_ROTAS').value();

    if (deliberacao == undefined || deliberacao == "") {

        Form.actions('aprovar').hidden(true);
        Form.actions('rejeitar').hidden(true);

    }

    else if (deliberacao == "Ajustar") {

        Form.actions('aprovar').hidden(true);
        Form.actions('rejeitar').hidden(false).label('Ajustar');

    }

    else if (deliberacao == "Finalizar") {

        Form.actions('aprovar').hidden(false).label('Finalizar');
        Form.actions('rejeitar').hidden(true);

    }

    else {

        Form.actions('aprovar').hidden(false).label('Enviar Cadastro');
        Form.actions('rejeitar').hidden(true);

    }

    Form.apply();

}

function visualizaEtapaGerente() {
    let deliber = Form.fields('CAD_ROTAS').value();

    if (deliber != undefined || deliber != '' || deliber != ' ') {
        Form.fields('CAD_LBL_GERENTE').visible(true);
        Form.fields('CAD_ROTAS').visible(true);
        Form.fields('CAD_ROTAS').readOnly(true);
    }
    else {
        Form.fields('CAD_LBL_GERENTE').visible(false);
        Form.fields('CAD_ROTAS').visible(false);
        Form.fields('CAD_ROTAS').readOnly(false);
    }
    Form.apply();
}




function visualizaEtapaResolver() {
    let deliber = Form.fields('CAD_ACAO').value();

    if (deliber != undefined || deliber != '' || deliber != ' ') {
        Form.fields('CAD_ACAO').visible(true);
        Form.fields('CAD_ACAO').readOnly(true);
        Form.fields('CAD_LBL_RESOLVER').visible(true);
    }
    else {
        Form.fields('CAD_ACAO').visible(false);
        Form.fields('CAD_ACAO').readOnly(false);
        Form.fields('CAD_LBL_RESOLVER').visible(false);
    }
    Form.apply();
}



function botoesResolver() {

    let acao = Form.fields('CAD_ACAO').value();

    if (acao == undefined || acao == "") {

        Form.actions('aprovar').hidden(true);
        Form.actions('rejeitar').hidden(true);

    }

    else if (acao == "Encerrar") {


        Form.actions('aprovar').hidden(false).label('Encerrar');
        Form.actions('rejeitar').hidden(true);


    }

    else if (acao == "Ajustar") {

        Form.actions('aprovar').hidden(true);
        Form.actions('rejeitar').hidden(false).label('Ajustar');

    }

    else {

        Form.actions('aprovar').hidden(false).label('Registrar nova atividade');
        Form.actions('rejeitar').hidden(true);

    }

    Form.apply();

}