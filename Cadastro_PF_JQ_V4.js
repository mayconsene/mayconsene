/**
 * CPF teste: 371.224.840-76
 * CNPJ teste: 22.146.068/0001-16
 * arquivo:              Cadastro_PF_JQ_V4.js
 * processo:             Cadastro Novo / Atualização v.4
 * Tabela do Processo:   f_t_cad_pf
 *
 *
 * Dependências
 *   - apiJSPadrao_v1.0.2.js
 *
 * @author       Maycon Moraes Sene
 * @since        10/2022
 * @lastModif    01-09-2023
 * 
 * @roboHomologacao * 
 * @aprovacoesFN 78@1;78@4;78@12;78@16;
 * @rejeicoesFN 78@16
 * @aprovacoesFNConcentradoraUC 78@12-2,9,10,14;
 * 
 * @roboProducao  
 * @aprovacoesFN 59@1;59@4;59@12;59@16;
 * @rejeicoesFN 59@16;
 * @aprovacoesFNConcentradoraUC 59@12-2,9,10,14;
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
const SOLICITAR_CADASTRO = 1;
const AGUARDAR_APROVACAO_EXTERNA = 9;
const AJUSTAR_INFORMACOES_ANALISTA = 10;
const AJUSTAR_INFORMACOES_PA = 2;
const APROVAR_CADASTRO = 14;
const ASSUMIR_ATIVIDADE = 15;
const CADASTRAR_SISBR = 3;
const CORRIGIR_CADASTRO_OUTRA_COOPERATIVA = 17;
const CENTRALIZADORA_CADASTRADO = 12;
const RETORNO_AJUSTE_PA = 19;
const PROCESSAR_REJEICAO = 16;
const FINALIZAR_APROVADO = 7;
const FINALIZAR_REJEITADO = 4;

//variáveis globais

/*var cadastroAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
var tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
var possuiRenda = Form.fields('CAD_DP_POSSUI_RENDA').value();
var possuiProcurador = Form.fields('CAD_DP_POS_PROCURADOR').value();
var estadoCivil = Form.fields('CAD_DP_ESTADO_CIVIL').value();

var checkDadosPF = Form.fields('CHECK_DADOS_P_PF').value();
var checkAnexosPF = Form.fields('CHECK_ANEXOS_PF').value();
var checkRendaPF = Form.fields('CHECK_RENDA_PF').value();
var checkProcuradoPF = Form.fields('CHECK_PROCURADOR_PF').value();
*/

const listaDocumentos = ["RG/CNH", "Receita", "Serasa", "Bacen"];

const listaSolteiro = ["Documento Identificação", "Comprovante Residência", "Receita", "Serasa", "Bacen"];

const listaCasado = ["Documento Identificação", "Comprovante Residência", "Certidão de Casamento", "Receita", "Serasa", "Bacen"];

const listaDivorciado = ["Documento Identificação", "Comprovante Residência", "Certidão de Casamento com Averbação", "Receita", "Serasa", "Bacen"];

const listaUniaoEstavel = ["Documento Identificação", "Comprovante Residência", "Receita", "Serasa", "Bacen"];

const listaViuvo = ["Documento Identificação", "Comprovante Residência", "Certidão de Óbito", "Receita", "Serasa", "Bacen"];

const listaAtualizacaoCadastral = ["Documento Identificação", "Comprovante Residência", "Comprovante Estado Civil", "Receita", "Serasa", "Bacen"];

const listaDocumentosPJ = [
    "Cartão CNPJ",
    "Documentos de Constituição e Última Alteração",
    "Serasa",
    "Bacen",
];

const listaDadosPFAltObrigatorio = ["CAD_DP_NOME", "CAD_CPF_CNPJ"];

const listaDadosPJAltObrigatorio = ["CAD_RAZAO_SOCIAL", "CAD_CPF_CNPJ"];

const listaDadosPF = [
    "CAD_DP_EMAIL",
    "CAD_DP_TELEFONE",
    "CAD_DP_ESCOLARIDADE",
    "CAD_DP_ESTADO_CIVIL",
];

const listaDadosPJ = [
    "CAD_NOME_FANTASIA",
    "CAD_EMAIL_PJ",
    "CAD_TEL_FIXO_PJ",
    "CAD_CEL_PJ",
];

const listaPessoaFisca = [
    "CAD_DP_NOME",
    "CAD_CPF_CNPJ",
    "CAD_DP_EMAIL",
    "CAD_DP_TELEFONE",
    "CAD_DP_ESCOLARIDADE",
    "CAD_DP_ESTADO_CIVIL",
    "CAD_COMP_RESIDENCIA",
    "CAD_DP_POSSUI_RENDA",
    "CAD_DP_POS_PROCURADOR",
    "CAD_DP_REFERENCIA1",
    "CAD_DP_TEL_REFER1",
    "CAD_DP_REFERENCIA2",
    "CAD_DP_TEL_REFER2",
];

const listaPessoaJuridica = [
    "CAD_RAZAO_SOCIAL",
    "CAD_CNPJ",
    "CAD_NOME_FANTASIA",
    "CAD_EMAIL_PJ",
    "CAD_TEL_FIXO_PJ",
    "CAD_CEL_PJ",
    "CAD_POSSUI_FAT_PJ",
    "CAD_POSSUI_PATRI",
];

const listaDadosReferenciaPF = [
    "CAD_DP_REFERENCIA1",
    "CAD_DP_TEL_REFER1",
    "CAD_DP_REFERENCIA2",
    "CAD_DP_TEL_REFER2",
];

const listaDadosReferenciaPJ = [
];

const listaCampoCadastroPF = [
    "LBL_DADOS_PESSOAIS",
    "LBL_POSSUI_RENDA",
    "LBL_POSSUI_PROCURADOR",
    "LBL_REF_PF",
    "CAD_DP_ANEXOS",
    "CAD_DP_NOME",
    "CAD_CPF_CNPJ",
    "CAD_DP_EMAIL",
    "CAD_DP_TELEFONE",
    "CAD_DP_ESCOLARIDADE",
    "CAD_DP_ESTADO_CIVIL",
    "CAD_COMP_RESIDENCIA",
    "CAD_DP_POSSUI_RENDA",
    "CAD_DP_POS_PROCURADOR",
    "CAD_DP_TEL_REFER1",
    "CAD_DP_TEL_REFER2",
];

const listaCampoCadastroPJ = [
    "LBL_DADOS_PJ",
    "LBL_ANEXOS_PF",
    "LBL_FATURAMENTO_PF",
    "LBL_POSSUI_PATROMONIO",
    "LBL_SOCIOS_PJ",
    "CAD_RAZAO_SOCIAL",
    "CAD_CNPJ",
    "CAD_NOME_FANTASIA",
    "CAD_EMAIL_PJ",
    "CAD_TEL_FIXO_PJ",
    "CAD_CEL_PJ",
    "CAD_POSSUI_FAT_PJ",
    "CAD_POSSUI_PATRI",
];

const listaCamposPropectado = [
    "LBL_PROSPECTADO_POR",
    "CAD_PROSPECTADO_POR",
    "CAD_DEPTO",
];

//Criação do Array com os campos que deseja verificar se algum está OK
let arrayCamposPF = [

    "CHECK_DADOS_P_PF",
    "CHECK_ANEXOS_PF",
    "CHECK_RENDA_PF",
    "CHECK_PROCURADOR_PF",

]

let arrayCamposPJ = [

    "CHECK_DADOS_P_PJ",
    "CHECK_ANEXOS_PJ",
    "CHECK_FATURAMENTO_PJ",
    "CHECK_PATRIMONIO_PJ",
    "CHECK_SOCIOS_PJ",

]


/*
 * Inicializa layout geral
 */
function initLayout() {

}

function setStyleModal() {

}

/*
 * Define Labels com mais de 50 caracteres
 */
function defineLabels() {

    if (codigoEtapa === SOLICITAR_CADASTRO || codigoEtapa === AJUSTAR_INFORMACOES_PA || codigoEtapa === CORRIGIR_CADASTRO_OUTRA_COOPERATIVA) {

        $("#infoProcurador").remove();
        var lblInfoMsg = "";

        lblInfoMsg += "<li> Por favor, abrir um processo para cadastro desse procurador. </li>";

        lblInfoMsg = "<b>Aviso sobre Procuradores:</b></br><ul>" + lblInfoMsg + "</ul>";
        $("#label__LBL_MSG_PROCURADOR").append("<div id='infoProcurador' class='col m16 msgInfoAviso' style='border-top : white 8px solid'>" + lblInfoMsg + "</div>");

    }

    if (codigoEtapa === APROVAR_CADASTRO) {

        $("#infoAssociacao").remove();
        var associacao = Form.fields('ASSOCIACAO_ANTERIOR').value();
        var lblInfoMsg2 = "";

        lblInfoMsg2 = "<b> Foram encontrados os seguintes processos de Associação rejeitados para o CPF/CNPJ: </b></br><ul>" + associacao + "</b>";
        $("#label__LBL_ASSOC_ANTERIOR").append("<div id='infoAssociacao' class='col m16 msgInfoAviso' style='border-top : white 8px solid'>" + lblInfoMsg2 + "</div>");

    }



}

/*
 * Define ações / listeners
 */
function setEventos() {

    if (codigoEtapa === SOLICITAR_CADASTRO || codigoEtapa === AJUSTAR_INFORMACOES_PA || codigoEtapa === CORRIGIR_CADASTRO_OUTRA_COOPERATIVA) {

        //let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();       

        // Verifica tipo de Pessoa -- maycon

        Form.fields('CAD_TIPO_PESSOA').subscribe("CHANGE", function (itemId, data, response) {
            verificaTipoPessoa();
            validadorcpfCnpj();
        });

        // Valida CPF/CNPJ -- maycon
        Form.fields('CAD_CPF_CNPJ').subscribe("CHANGE", function (itemId, data, response) {
            validadorcpfCnpj();
        });

        // Valida CPF CONJUGE -- maycon
        Form.fields('CAD_CPF_CONJUGE').subscribe("CHANGE", function (itemId, data, response) {
            validadorcpfConjuge();
        });

        // Valida CPF PROCURADOR -- maycon
        Form.fields('CAD_CPF_PROCURADOR').subscribe("CHANGE", function (itemId, data, response) {
            validadorcpfProcurador();
        });

        //Habilitar ao menos um checkbox Pessoa Física

        Form.fields("CAD_CADASTRO_ASSOC").subscribe(
            "CHANGE",
            (itemId, data, response) => {
                minimoCheck(arrayCamposPF);
            }
        );

        Form.fields("CAD_TIPO_PESSOA").subscribe(
            "CHANGE",
            (itemId, data, response) => {
                minimoCheck(arrayCamposPF);
            }
        );


        Form.fields("CHECK_DADOS_P_PF").subscribe(
            "CHANGE",
            (itemId, data, response) => {
                minimoCheck(arrayCamposPF);
            }
        );

        Form.fields("CHECK_RENDA_PF").subscribe(
            "CHANGE",
            (itemId, data, response) => {
                minimoCheck(arrayCamposPF);
            }
        );


        Form.fields("CHECK_ANEXOS_PF").subscribe(
            "CHANGE",
            (itemId, data, response) => {
                minimoCheck(arrayCamposPF);
            }
        );

        Form.fields("CHECK_PROCURADOR_PF").subscribe(
            "CHANGE",
            (itemId, data, response) => {
                minimoCheck(arrayCamposPF);
            }
        );

        //Seta valor do CRL -- maycon

        Form.fields('CAD_CADASTRO_ASSOC').subscribe("CHANGE", function (itemId, data, response) {
            bloquearCadastroAssociacao();
        });

        //Habilitar checks caso associação seja Não -- maycon
        Form.fields('CAD_CADASTRO_ASSOC').subscribe("CHANGE", function (itemId, data, response) {
            habilitarChecks();
        });

        //Habilitar checks caso associação seja Não e Pessoa Física -- maycon
        Form.fields('CAD_TIPO_PESSOA').subscribe("CHANGE", function (itemId, data, response) {
            camposCadastroNovo();
            habilitarChecks();
        });

        //Habilitar campos caso associação seja Sim -- maycon
        Form.fields('CAD_CADASTRO_ASSOC').subscribe("CHANGE", function (itemId, data, response) {
            camposCadastroNovo();
        });

        //Abre prospectado por -- maycon
        Form.fields('CAD_CADASTRO_ASSOC').subscribe("CHANGE", function (itemId, data, response) {
            abrirProspectado();
        });

        //Abre prospectado por -- maycon
        Form.fields('CAD_TIPO_PESSOA').subscribe("CHANGE", function (itemId, data, response) {
            abrirProspectado();
        });

        //Esconde prospectado por caso Associação == Não -- maycon
        Form.fields('CAD_CADASTRO_ASSOC').subscribe("CHANGE", function (itemId, data, response) {
            esconderProspectado();
        });

        Form.fields('CAD_CADASTRO_ASSOC').subscribe("CHANGE", function (itemId, data, response) {
            possuiProcurador();
        });

        Form.fields('CAD_CADASTRO_ASSOC').subscribe("CHANGE", function (itemId, data, response) {
            abrirProspectadoDepartamento();
        });

        //Habilita Prospectado e Departamento -- maycon
        Form.fields('CAD_PROSPECTADOR').subscribe("CHANGE", function (itemId, data, response) {
            abrirProspectadoDepartamento();
        });

        Form.fields('CAD_PROSPECTADOR').subscribe("CHANGE", function (itemId, data, response) {
            limparLeanOverlay();
        });


        //Preencher Lista de Documentos da Grid

        Form.fields('CAD_DP_ESTADO_CIVIL').subscribe(
            "CHANGE",
            function (itemId, data, response) {

                Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').removeOptions([]).apply();


                Form.apply().then(function () {

                    preencheListaDocumentos();

                });

            }
        );

        //Abrir grid para anexar comprovante caso possuir renda -- maycon
        Form.fields('CAD_DP_POSSUI_RENDA').subscribe("CHANGE", function (itemId, data, response) {
            possuiRenda();
        });

        Form.fields('CAD_DP_POSSUI_RENDA').subscribe("CHANGE", function (itemId, data, response) {
            zerarValoresGridPorId("GRIDRENDA");
        });

        //Não deixa a Grid Renda sumir ao clicar em adicionar da tabela
        Form.grids("GRIDRENDA").subscribe(
            'GRID_ADD_SUBMIT', function (dadosInstancia, nomeCampo, valorCampo) {
                setTimeout(() => {

                    let possuiRenda = Form.fields('CAD_DP_POSSUI_RENDA').value();

                    if (possuiRenda == "Sim") {

                        Form.grids("GRIDRENDA").errors([]).apply();
                        Form.grids("GRIDRENDA").visible(true).apply();
                    }

                }, 10);
            });

        Form.fields('CAD_DP_POS_PROCURADOR').subscribe("CHANGE", function (itemId, data, response) {
            possuiProcurador();
        });

        Form.fields('CAD_DP_POS_PROCURADOR').subscribe("CHANGE", function (itemId, data, response) {
            limparCpfProcurador();
        });

        Form.fields('CHECK_DADOS_P_PF').subscribe("CHANGE", function (itemId, data, response) {
            checkBoxDados();
        });

        Form.fields('CHECK_DADOS_P_PF').subscribe("CHANGE", function (itemId, data, response) {
            limparCheckDados();
        });

        Form.fields('CHECK_RENDA_PF').subscribe("CHANGE", function (itemId, data, response) {
            camposCheckRenda();
        });

        Form.fields('CHECK_RENDA_PF').subscribe("CHANGE", function (itemId, data, response) {
            zerarValoresGridPorId("GRIDRENDA");
        });

        Form.fields('CHECK_ANEXOS_PF').subscribe("CHANGE", function (itemId, data, response) {
            camposCheckAnexos();
        });

        Form.fields('CHECK_ANEXOS_PF').subscribe("CHANGE", function (itemId, data, response) {
            zerarValoresGridPorId("ANEXODOCS");
        });

        Form.fields('CHECK_PROCURADOR_PF').subscribe("CHANGE", function (itemId, data, response) {
            camposCheckProcurador();
        });

        Form.fields('CHECK_PROCURADOR_PF').subscribe("CHANGE", function (itemId, data, response) {
            limparCheckProcurador();
        });

        Form.fields('CAD_PROSPECTADO_POR').subscribe("CHANGE", function (itemId, data, response) {
            habilitarDepartamento();
        });

        Form.fields('PROCURAR_CPF_CNPJ').subscribe("SET_FIELD_VALUE", function (itemId, data, response) {
            preencherLabelCpfCnpj();
        });

        Form.fields('PROCURAR_CPF_CNPJ').subscribe("CHANGE", function (itemId, data, response) {
            preencherLabelCpfCnpj();
        });

        Form.fields('CAD_ENCONTROU_CNPJ').subscribe("SET_FIELD_VALUE", function (itemId, data, response) {
            preencherLabelCpfCnpj();
        });

        Form.fields('CAD_ENCONTROU_CNPJ').subscribe("CHANGE", function (itemId, data, response) {
            preencherLabelCpfCnpj();
        });

        Form.fields('CAD_CPF_CNPJ').subscribe("CHANGE", function (itemId, data, response) {
            modalAlertaCPF();
            limparLeanOverlay();
        });

        //Incluir no setEvento
        Form.fields('CAD_CPF_CNPJ').subscribe("CHANGE", function (itemId, data, response) {
            Form.fields("CAD_CPF_CNPJ").actions("PROCURAR_CPF_CNPJ_refresh").execute();

            setTimeout(() => {
                preencherLabelCpfCnpj();
            }, 800);

            Form.apply().then(() => {
                limparLeanOverlay();
            });
        });

        //Pessoa Jurídica   

        Form.fields('AUX_CNPJ').subscribe("CHANGE", function (itemId, data, response) {
            Form.fields("AUX_CNPJ").actions("CAD_ENCONTROU_CNPJ_refresh").execute();


            setTimeout(() => {
                preencherLabelCpfCnpj();
            }, 800);

            Form.apply().then(() => {
                limparLeanOverlay();
            });
        });

        Form.fields('AUX_CNPJ').subscribe('CHANGE', function (itemId, data, response) {
            verificaTipoPessoaJuridica();
        });

        Form.fields('AUX_CNPJ').subscribe('BLUR', function (itemId, data, response) {
            verificaTipoPessoaJuridica();
        });

        Form.fields('AUX_CNPJ').subscribe('KEY_PRESS', function (itemId, data, response) {
            verificaTipoPessoaJuridica();
        });

        Form.fields('AUX_CNPJ').subscribe('CHANGE', function (itemId, data, response) {
            validadorCnpjAux();
        });

        Form.fields('AUX_CNPJ').subscribe('CHANGE', function (itemId, data, response) {
            preencherCNPJ();
        });

        Form.fields('AUX_CNPJ').subscribe('KEY_PRESS', function (itemId, data, response) {
            preencherCNPJ();
        });

        Form.fields('AUX_CNPJ').subscribe('SET_FIELD_VALUE', function (itemId, data, response) {
            preencherCNPJ();
        });

        Form.fields('CAD_TIPO_PESSOA').subscribe('KEY_PRESS', function (itemId, data, response) {
            preencherCNPJ();
        });

        Form.fields('AUX_CNPJ').subscribe('SET_FIELD_VALUE', function (itemId, data, response) {
            validadorcpfCnpj();
        });

        //Preencher campo auxiliar de Nome ou Razão Social
        Form.fields('CAD_DP_NOME').subscribe("CHANGE", function (itemId, data, response) {
            preencherNomeRazaoSocial();
        });

        Form.fields('CAD_DP_NOME').subscribe("KEY_PRESS", function (itemId, data, response) {
            preencherNomeRazaoSocial();
        });

        Form.fields('CAD_RAZAO_SOCIAL').subscribe("CHANGE", function (itemId, data, response) {
            preencherNomeRazaoSocial();
        });

        Form.fields('CAD_RAZAO_SOCIAL').subscribe("KEY_PRESS", function (itemId, data, response) {
            preencherNomeRazaoSocial();
        });

        //Fim do Nome / Razão Social   

        //Altera mascara CPF/CNPJ
        Form.grids('GRID_SOCIO_PJ').fields("CAD_CPF_SOCIO").subscribe("KEY_PRESS", function (itemId, data, response) {
            alterarMascaraGrd('GRID_SOCIO_PJ', "CAD_CPF_SOCIO");
        });

        //Altera mascara CPF/CNPJ
        Form.grids('GRID_SOCIO_PJ').fields("CAD_CNPJ_SOCIO").subscribe("KEY_PRESS", function (itemId, data, response) {
            alterarMascaraGrd('GRID_SOCIO_PJ', "CAD_CNPJ_SOCIO");
        });


        Form.grids('GRID_SOCIO_PJ').fields('CAD_TIP_SOCIO').subscribe('CHANGE', function (itemId, data, response) {
            tipoSocio();
        });

        Form.fields('CHECK_DADOS_P_PJ').subscribe('CHANGE', function (itemId, data, response) {
            atualizacaoPJ();
        });

        Form.fields('CHECK_ANEXOS_PJ').subscribe('CHANGE', function (itemId, data, response) {
            atualizacaoPJ();
        });

        Form.fields('CHECK_FATURAMENTO_PJ').subscribe('CHANGE', function (itemId, data, response) {
            atualizacaoPJ();
        });

        Form.fields('CHECK_PATRIMONIO_PJ').subscribe('CHANGE', function (itemId, data, response) {
            atualizacaoPJ();
        });

        Form.fields('CHECK_SOCIOS_PJ').subscribe('CHANGE', function (itemId, data, response) {
            atualizacaoPJ();
        });

        //zerar grid faturamento ao escolher não

        Form.fields('CAD_POSSUI_FAT_PJ').subscribe('CHANGE', function (itemId, data, response) {
            limparGridFaturamento();
        });

        //zerar grid patrimônio ao escolher não
        Form.fields('CAD_POSSUI_PATRI').subscribe('CHANGE', function (itemId, data, response) {
            limparGridPatrimonio();
        });

        //zerar grid PJ Cadastro Associação == Não
        Form.fields('CAD_CADASTRO_ASSOC').subscribe('CHANGE', function (itemId, data, response) {
            limparDocumentosPJ();
        });

        //zerar grid PJ Cadastro Associação == Não
        Form.fields('CAD_TIPO_PESSOA').subscribe('CHANGE', function (itemId, data, response) {
            limparDocumentosPJ();
        });


        //Não deixa a Grid Anexos PJ sumir ao clicar em adicionar da tabela da Grid
        Form.grids("GRID_PJ").subscribe(
            'GRID_ADD_SUBMIT', function (dadosInstancia, nomeCampo, valorCampo) {
                setTimeout(() => {
                    debugger

                    var cadastroAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
                    var checkPatrimonioPJ = Form.fields('CHECK_PATRIMONIO_PJ').value();
                    var checkFaturamentoPJ = Form.fields('CHECK_FATURAMENTO_PJ').value();
                    var checkAnexosPJ = Form.fields('CHECK_ANEXOS_PJ').value();
                    var checkSociosPJ = Form.fields('CHECK_SOCIOS_PJ').value();

                    if (cadastroAssociacao == "Não" && checkPatrimonioPJ == "OK") {

                        Form.grids("GRID_PAT_PJ").errors([]).apply();
                        Form.grids("GRID_PAT_PJ").visible(true).apply();

                    }

                    if (cadastroAssociacao == "Não" && checkFaturamentoPJ == "OK") {

                        Form.grids("GRID_FAT_PJ").errors([]).apply();
                        Form.grids("GRID_FAT_PJ").visible(true).apply();


                    }

                    if (cadastroAssociacao == "Não" && checkAnexosPJ == "OK") {

                        Form.grids("GRID_PJ").errors([]).apply();
                        Form.grids("GRID_PJ").visible(true).apply();

                    }

                    if (cadastroAssociacao == "Não" && checkSociosPJ == "OK") {

                        Form.grids("GRID_SOCIO_PJ").errors([]).apply();
                        Form.grids("GRID_SOCIO_PJ").visible(true).apply();

                    }


                }, 10);

            });


        //Não deixa a Grid Faturamento sumir ao clicar em adicionar da tabela da Grid
        Form.grids("GRID_FAT_PJ").subscribe(
            'GRID_ADD_SUBMIT', function (dadosInstancia, nomeCampo, valorCampo) {
                setTimeout(() => {

                    var cadastroAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
                    var checkPatrimonioPJ = Form.fields('CHECK_PATRIMONIO_PJ').value();
                    var checkFaturamentoPJ = Form.fields('CHECK_FATURAMENTO_PJ').value();
                    var checkAnexosPJ = Form.fields('CHECK_ANEXOS_PJ').value();
                    var checkSociosPJ = Form.fields('CHECK_SOCIOS_PJ').value();

                    if (cadastroAssociacao == "Não" && checkPatrimonioPJ == "OK") {

                        Form.grids("GRID_PAT_PJ").errors([]).apply();
                        Form.grids("GRID_PAT_PJ").visible(true).apply();

                    }

                    if (cadastroAssociacao == "Não" && checkFaturamentoPJ == "OK") {

                        Form.grids("GRID_FAT_PJ").errors([]).apply();
                        Form.grids("GRID_FAT_PJ").visible(true).apply();


                    }

                    if (cadastroAssociacao == "Não" && checkAnexosPJ == "OK") {

                        Form.grids("GRID_PJ").errors([]).apply();
                        Form.grids("GRID_PJ").visible(true).apply();

                    }

                    if (cadastroAssociacao == "Não" && checkSociosPJ == "OK") {

                        Form.grids("GRID_SOCIO_PJ").errors([]).apply();
                        Form.grids("GRID_SOCIO_PJ").visible(true).apply();

                    }


                }, 10);


            });

        //Não deixa a Grid Patrimônio sumir ao clicar em adicionar da tabela da Grid
        Form.grids("GRID_PAT_PJ").subscribe(
            'GRID_ADD_SUBMIT', function (dadosInstancia, nomeCampo, valorCampo) {
                setTimeout(() => {

                    var cadastroAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
                    var checkPatrimonioPJ = Form.fields('CHECK_PATRIMONIO_PJ').value();
                    var checkFaturamentoPJ = Form.fields('CHECK_FATURAMENTO_PJ').value();
                    var checkAnexosPJ = Form.fields('CHECK_ANEXOS_PJ').value();
                    var checkSociosPJ = Form.fields('CHECK_SOCIOS_PJ').value();

                    if (cadastroAssociacao == "Não" && checkPatrimonioPJ == "OK") {

                        Form.grids("GRID_PAT_PJ").errors([]).apply();
                        Form.grids("GRID_PAT_PJ").visible(true).apply();

                    }

                    if (cadastroAssociacao == "Não" && checkFaturamentoPJ == "OK") {

                        Form.grids("GRID_FAT_PJ").errors([]).apply();
                        Form.grids("GRID_FAT_PJ").visible(true).apply();


                    }

                    if (cadastroAssociacao == "Não" && checkAnexosPJ == "OK") {

                        Form.grids("GRID_PJ").errors([]).apply();
                        Form.grids("GRID_PJ").visible(true).apply();

                    }

                    if (cadastroAssociacao == "Não" && checkSociosPJ == "OK") {

                        Form.grids("GRID_SOCIO_PJ").errors([]).apply();
                        Form.grids("GRID_SOCIO_PJ").visible(true).apply();

                    }


                }, 10);

            });

        //Não deixa a Grid Sócios sumir ao clicar em adicionar da tabela da Grid
        Form.grids("GRID_SOCIO_PJ").subscribe(
            'GRID_ADD_SUBMIT', function (dadosInstancia, nomeCampo, valorCampo) {
                setTimeout(() => {

                    var cadastroAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
                    var checkPatrimonioPJ = Form.fields('CHECK_PATRIMONIO_PJ').value();
                    var checkFaturamentoPJ = Form.fields('CHECK_FATURAMENTO_PJ').value();
                    var checkAnexosPJ = Form.fields('CHECK_ANEXOS_PJ').value();
                    var checkSociosPJ = Form.fields('CHECK_SOCIOS_PJ').value();

                    if (cadastroAssociacao == "Não" && checkPatrimonioPJ == "OK") {

                        Form.grids("GRID_PAT_PJ").errors([]).apply();
                        Form.grids("GRID_PAT_PJ").visible(true).apply();

                    }

                    if (cadastroAssociacao == "Não" && checkFaturamentoPJ == "OK") {

                        Form.grids("GRID_FAT_PJ").errors([]).apply();
                        Form.grids("GRID_FAT_PJ").visible(true).apply();


                    }

                    if (cadastroAssociacao == "Não" && checkAnexosPJ == "OK") {

                        Form.grids("GRID_PJ").errors([]).apply();
                        Form.grids("GRID_PJ").visible(true).apply();

                    }

                    if (cadastroAssociacao == "Não" && checkSociosPJ == "OK") {

                        Form.grids("GRID_SOCIO_PJ").errors([]).apply();
                        Form.grids("GRID_SOCIO_PJ").visible(true).apply();

                    }


                }, 10);

            });

        //Grid quando Pessoa Jurídica + Associação Sim

        //Grid Sócios
        Form.grids("GRID_SOCIO_PJ").subscribe(
            'GRID_ADD_SUBMIT', function (dadosInstancia, nomeCampo, valorCampo) {
                setTimeout(() => {

                    var cadastroAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
                    var possuiFaturamentoPJ = Form.fields('CAD_POSSUI_FAT_PJ').value();
                    var possuiPatrimonioPJ = Form.fields('CAD_POSSUI_PATRI').value()


                    if (cadastroAssociacao == "Sim" && possuiPatrimonioPJ == "Sim") {

                        Form.grids("GRID_PAT_PJ").errors([]).apply();
                        Form.grids("GRID_PAT_PJ").visible(true).apply();

                        Form.grids("GRID_PJ").errors([]).apply();
                        Form.grids("GRID_PJ").visible(true).apply();

                        Form.grids("GRID_SOCIO_PJ").errors([]).apply();
                        Form.grids("GRID_SOCIO_PJ").visible(true).apply();

                    }

                    if (cadastroAssociacao == "Sim" && possuiFaturamentoPJ == "Sim") {

                        Form.grids("GRID_FAT_PJ").errors([]).apply();
                        Form.grids("GRID_FAT_PJ").visible(true).apply();

                        Form.grids("GRID_PJ").errors([]).apply();
                        Form.grids("GRID_PJ").visible(true).apply();

                        Form.grids("GRID_SOCIO_PJ").errors([]).apply();
                        Form.grids("GRID_SOCIO_PJ").visible(true).apply();


                    }

                }, 10);

            });

        //Grid Anexos
        Form.grids("GRID_PJ").subscribe(
            'GRID_ADD_SUBMIT', function (dadosInstancia, nomeCampo, valorCampo) {
                setTimeout(() => {

                    var cadastroAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
                    var possuiFaturamentoPJ = Form.fields('CAD_POSSUI_FAT_PJ').value();
                    var possuiPatrimonioPJ = Form.fields('CAD_POSSUI_PATRI').value()


                    if (cadastroAssociacao == "Sim" && possuiPatrimonioPJ == "Sim") {

                        Form.grids("GRID_PAT_PJ").errors([]).apply();
                        Form.grids("GRID_PAT_PJ").visible(true).apply();

                        Form.grids("GRID_PJ").errors([]).apply();
                        Form.grids("GRID_PJ").visible(true).apply();

                        Form.grids("GRID_SOCIO_PJ").errors([]).apply();
                        Form.grids("GRID_SOCIO_PJ").visible(true).apply();

                    }

                    if (cadastroAssociacao == "Sim" && possuiFaturamentoPJ == "Sim") {

                        Form.grids("GRID_FAT_PJ").errors([]).apply();
                        Form.grids("GRID_FAT_PJ").visible(true).apply();

                        Form.grids("GRID_PJ").errors([]).apply();
                        Form.grids("GRID_PJ").visible(true).apply();

                        Form.grids("GRID_SOCIO_PJ").errors([]).apply();
                        Form.grids("GRID_SOCIO_PJ").visible(true).apply();


                    }

                    if (cadastroAssociacao == "Sim") {

                        Form.grids("GRID_PJ").errors([]).apply();
                        Form.grids("GRID_PJ").visible(true).apply();

                        Form.grids("GRID_SOCIO_PJ").errors([]).apply();
                        Form.grids("GRID_SOCIO_PJ").visible(true).apply();

                    }



                }, 10);

            });

        //Grid Faturamento
        Form.grids("GRID_FAT_PJ").subscribe(
            'GRID_ADD_SUBMIT', function (dadosInstancia, nomeCampo, valorCampo) {
                setTimeout(() => {

                    var cadastroAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
                    var possuiFaturamentoPJ = Form.fields('CAD_POSSUI_FAT_PJ').value();
                    var possuiPatrimonioPJ = Form.fields('CAD_POSSUI_PATRI').value()


                    if (cadastroAssociacao == "Sim" && possuiPatrimonioPJ == "Sim") {

                        Form.grids("GRID_PAT_PJ").errors([]).apply();
                        Form.grids("GRID_PAT_PJ").visible(true).apply();

                        Form.grids("GRID_PJ").errors([]).apply();
                        Form.grids("GRID_PJ").visible(true).apply();

                        Form.grids("GRID_SOCIO_PJ").errors([]).apply();
                        Form.grids("GRID_SOCIO_PJ").visible(true).apply();

                    }

                    if (cadastroAssociacao == "Sim" && possuiFaturamentoPJ == "Sim") {

                        Form.grids("GRID_FAT_PJ").errors([]).apply();
                        Form.grids("GRID_FAT_PJ").visible(true).apply();

                        Form.grids("GRID_PJ").errors([]).apply();
                        Form.grids("GRID_PJ").visible(true).apply();

                        Form.grids("GRID_SOCIO_PJ").errors([]).apply();
                        Form.grids("GRID_SOCIO_PJ").visible(true).apply();

                    }

                    if (cadastroAssociacao == "Sim") {

                        Form.grids("GRID_PJ").errors([]).apply();
                        Form.grids("GRID_PJ").visible(true).apply();

                        Form.grids("GRID_SOCIO_PJ").errors([]).apply();
                        Form.grids("GRID_SOCIO_PJ").visible(true).apply();

                    }

                }, 10);

            });

        //Grid Faturamento
        Form.grids("GRID_PAT_PJ").subscribe(
            'GRID_ADD_SUBMIT', function (dadosInstancia, nomeCampo, valorCampo) {
                setTimeout(() => {

                    var cadastroAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
                    var possuiFaturamentoPJ = Form.fields('CAD_POSSUI_FAT_PJ').value();
                    var possuiPatrimonioPJ = Form.fields('CAD_POSSUI_PATRI').value()


                    if (cadastroAssociacao == "Sim" && possuiPatrimonioPJ == "Sim") {

                        Form.grids("GRID_PAT_PJ").errors([]).apply();
                        Form.grids("GRID_PAT_PJ").visible(true).apply();

                        Form.grids("GRID_PJ").errors([]).apply();
                        Form.grids("GRID_PJ").visible(true).apply();

                        Form.grids("GRID_SOCIO_PJ").errors([]).apply();
                        Form.grids("GRID_SOCIO_PJ").visible(true).apply();

                    }

                    if (cadastroAssociacao == "Sim" && possuiFaturamentoPJ == "Sim") {

                        Form.grids("GRID_FAT_PJ").errors([]).apply();
                        Form.grids("GRID_FAT_PJ").visible(true).apply();

                        Form.grids("GRID_PJ").errors([]).apply();
                        Form.grids("GRID_PJ").visible(true).apply();

                        Form.grids("GRID_SOCIO_PJ").errors([]).apply();
                        Form.grids("GRID_SOCIO_PJ").visible(true).apply();

                    }

                    if (cadastroAssociacao == "Sim") {

                        Form.grids("GRID_PJ").errors([]).apply();
                        Form.grids("GRID_PJ").visible(true).apply();

                        Form.grids("GRID_SOCIO_PJ").errors([]).apply();
                        Form.grids("GRID_SOCIO_PJ").visible(true).apply();

                    }

                }, 10);

            });




        //Habilitar ao menos um checkbox Pessoa Jurídica

        Form.fields("CAD_CADASTRO_ASSOC").subscribe(
            "CHANGE",
            (itemId, data, response) => {
                minimoCheckPJ(arrayCamposPJ);
            }
        );

        Form.fields("CAD_TIPO_PESSOA").subscribe(
            "CHANGE",
            (itemId, data, response) => {
                minimoCheckPJ(arrayCamposPJ);
            }
        );

        Form.fields("CHECK_DADOS_P_PJ").subscribe(
            "CHANGE",
            (itemId, data, response) => {
                minimoCheckPJ(arrayCamposPJ);
            }
        );

        Form.fields("CHECK_ANEXOS_PJ").subscribe(
            "CHANGE",
            (itemId, data, response) => {
                minimoCheckPJ(arrayCamposPJ);
            }
        );

        Form.fields("CHECK_FATURAMENTO_PJ").subscribe(
            "CHANGE",
            (itemId, data, response) => {
                minimoCheckPJ(arrayCamposPJ);
            }
        );

        Form.fields("CHECK_PATRIMONIO_PJ").subscribe(
            "CHANGE",
            (itemId, data, response) => {
                minimoCheckPJ(arrayCamposPJ);
            }
        );

        Form.fields("CHECK_SOCIOS_PJ").subscribe(
            "CHANGE",
            (itemId, data, response) => {
                minimoCheckPJ(arrayCamposPJ);
            }
        );


        // Valida CPF SOCIO -- maycon
        Form.grids('GRID_SOCIO_PJ').fields("CAD_CPF_SOCIO").subscribe(
            "CHANGE",
            (itemId, data, response) => {
                Form.apply().then(function () {
                    validadorCpfCnpjSocio();
                });
            }
        );

        // Valida CNPJ SOCIO -- maycon
        Form.grids('GRID_SOCIO_PJ').fields("CAD_CNPJ_SOCIO").subscribe(
            "CHANGE",
            (itemId, data, response) => {
                Form.apply().then(function () {
                    validadorCpfCnpjSocio();
                });
            }
        );


        //Mostra grid Faturamento caso seja escolhida a opção Sim

        Form.fields("CAD_POSSUI_FAT_PJ").subscribe(
            "CHANGE",
            (itemId, data, response) => {
                mostrarFaturamentoPJ();
            }
        );

        //Mostra grid Patrimônio caso seja escolhida a opção Sim

        Form.fields("CAD_POSSUI_PATRI").subscribe(
            "CHANGE",
            (itemId, data, response) => {
                mostrarPatrimonioPJ();
            }
        );

    }


    if (codigoEtapa === APROVAR_CADASTRO) {

        Form.fields('CAD_BUTTON_A_CADASTRO').subscribe("CHANGE", function (itemId, data, response) {
            manipularBotoesAprovarCadastro();
        });

        Form.fields('CAD_BUTTON_AJUSTE_AT').subscribe("CHANGE", function (itemId, data, response) {
            statusAprovar();
        });


    }

    if (codigoEtapa === CADASTRAR_SISBR) {

        Form.fields('CAD_LISTA_DIRECIONAR').subscribe("CHANGE", function (itemId, data, response) {
            roteamentoCadastrarSisbr();
        });

        Form.fields('CAD_LISTA_DIRECIONAR').subscribe("CHANGE", function (itemId, data, response) {
            botoesCadastrarSisbr();
        });

        Form.fields('CAD_CAD_OUTRA_COOP').subscribe("CHANGE", function (itemId, data, response) {
            roteamentoCadastrarSisbr();
        });

    }

    if (codigoEtapa === AJUSTAR_INFORMACOES_ANALISTA) {

        Form.fields('CAD_LISTA_DIRECIONAR').subscribe("CHANGE", function (itemId, data, response) {
            botoesAjustarInformacoesAnalista();
        });

        Form.fields('CAD_LISTA_DIRECIONAR').subscribe("CHANGE", function (itemId, data, response) {
            roteamentoAjustarAnalista();
        });

        Form.fields('CAD_CAD_OUTRA_COOP').subscribe("CHANGE", function (itemId, data, response) {
            roteamentoAjustarAnalista();
        });

    }

    if (codigoEtapa === RETORNO_AJUSTE_PA) {

        Form.fields('CAD_LISTA_DIRECIONAR').subscribe("CHANGE", function (itemId, data, response) {
            roteamentoRetornoAjustePA();
        });

        Form.fields('CAD_CAD_OUTRA_COOP').subscribe("CHANGE", function (itemId, data, response) {
            roteamentoRetornoAjustePA();
        });

    }

    if (codigoEtapa === AGUARDAR_APROVACAO_EXTERNA) {

        Form.fields('CAD_BUTTON_AJUSTE_AT').subscribe("CHANGE", function (itemId, data, response) {
            regraAjustePaAprovacaoExterna();
        });

        Form.fields('CAD_CHECK_OUT_COOP_DIR').subscribe("CHANGE", function (itemId, data, response) {
            botoesAguardarAprovacaoExterna();
        });

    }

}

/*
 * Formata o formulário
 */
function setForm() {

    if (codigoEtapa === SOLICITAR_CADASTRO || codigoEtapa === AJUSTAR_INFORMACOES_PA || codigoEtapa === CORRIGIR_CADASTRO_OUTRA_COOPERATIVA) {

        let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
        let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
        let laudoAvalicao = Form.fields('AUX_PLD_CONTROLE').value();


        if (laudoAvalicao != "Laudo de Avaliação de Imóveis") {

            Form.apply().then(() => {

                var grupo = Form.fields('CAD_PA').value();
                getGrupoDestino(grupo, 'CAD_PA_DESTINO');

            });
        }


        if (tipoPessoa == "Pessoa Física" || tipoPessoa == undefined) {

            Form.fields('PROCURAR_CPF_CNPJ').visible(false).apply();
            Form.fields('CAD_PA').visible(false).apply();

            //Form.fields("CAD_CPF_CNPJ").actions("PROCURAR_CPF_CNPJ_refresh").execute();

            Form.apply().then(function () {
                setTimeout(function () {
                    etapaSolicitarVeioPLD();
                }, 1000);
            });


            modalAlertaAbertura();
            limparLeanOverlay();
            //encontrouCpfCnpj();
            ocultarCamposIniciais();
            habilitarChecks();
            checkBoxDados();
            bloquearCadastroAssociacao();
            habilitarDepartamento();
            abrirProspectado();
            verificaTipoPessoa();
            validadorcpfConjuge();
            validadorcpfProcurador();
            //validadorcpfCnpj();
            //validadorCpfCnpjSocio();
            abrirProspectadoDepartamento();
            esconderProspectado();
            abertoPor();
            laudoCRL();
            preencherNomeRazaoSocial();
            preencherLabelCpfCnpj();
            camposCheckRenda();
            camposCheckAnexos();
            camposCheckProcurador();

            Form.apply().then(function () {
                setTimeout(function () {
                    possuiProcurador();
                    possuiRenda();
                }, 1000);
            });


        }

        if (tipoPessoa == "Pessoa Jurídica" || tipoPessoa == undefined) {

            Form.fields('PROCURAR_CPF_CNPJ').visible(false).apply();
            Form.fields('CAD_PA').visible(false).apply();

            Form.apply().then(function () {
                setTimeout(function () {
                    etapaSolicitarVeioPLD();
                }, 1000);
            });

            Form.apply().then(function () {
                setTimeout(function () {
                    pldControleEspecial();
                }, 1000);
            });




            //Form.fields("CAD_CPF_CNPJ").actions("PROCURAR_CPF_CNPJ_refresh").hidden(true).apply();

            modalAlertaAbertura();
            //encontrouCpfCnpj();
            ocultarCamposIniciais();
            habilitarChecks();
            //checkBoxDados();
            //camposCheckRenda();
            //camposCheckAnexos();
            //camposCheckProcurador();
            //possuiProcurador();
            bloquearCadastroAssociacao();
            habilitarDepartamento();
            preencherCNPJ();
            //validadorcpfConjuge();
            //validadorcpfProcurador();
            //validadorcpfCnpj();
            //validadorCpfCnpjSocio();
            abrirProspectadoDepartamento();
            esconderProspectado();
            abertoPor();
            laudoCRL();
            preencherNomeRazaoSocial();
            preencherLabelCpfCnpj();
            prospectadoEtapaCorrigirCadastroOutraCooperativa();
            abrirProspectado();
            somenteLeituraPldLaudo();
            laudoAvaliacaoImoveis();
        }

        //Limpa tela cinza após abrir modalAlerta
        Form.apply().then(() => {
            limparLeanOverlay();
        });

        if (laudoAvalicao == "Laudo de Avaliação de Imóveis" && codigoEtapa === AJUSTAR_INFORMACOES_PA) {

            setTimeout(() => {
                Form.apply().then(() => {
                    laudoAvaliacaoEtapaAjustar();
                });
            }, 800);


        }

        if (codigoEtapa === SOLICITAR_CADASTRO) {
            limparCheckDados();
            limparCheckProcurador();
            limparCpfProcurador();
            limparLeanOverlay();

        }



        if (tipoAssociacao == "Sim" && (tipoPessoa == "Pessoa Física" || tipoPessoa == "Pessoa Jurídica")) {

            camposCadastroNovo();
        }

        preencheListaDocumentos();
        possuiRenda();

        //Pessoa Jurídica
        tipoSocio();
        setTimeout(() => {
            Form.apply().then(() => {
                atualizacaoPJ();
            });
        }, 200);
        mostrarFaturamentoPJ();
        mostrarPatrimonioPJ();
        preencherLabelCpfCnpj();

    }

    if (codigoEtapa === CORRIGIR_CADASTRO_OUTRA_COOPERATIVA) {

        habilitarChecks();
        prospectadoEtapaCorrigirCadastroOutraCooperativa();
        somenteLeituraPldLaudo();

        setTimeout(() => {
            Form.apply().then(() => {
                laudoAvaliacaoImoveis();
            });
        }, 400);

    }

    if (codigoEtapa === AGUARDAR_APROVACAO_EXTERNA) {

        let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();

        if (tipoPessoa == "Pessoa Física") {

            Form.groups('GR_PJ').visible(false).apply();
            Form.groups('GR_LAUDO').visible(false).apply();
            Form.groups('GAJUSTARPA').visible(false).apply();
            Form.groups('GNCADATU').visible(false).apply();
            Form.groups('GCENTRALIZADORA').visible(false).apply();
            Form.fields('CAD_AUX_ROTEAMENTO').visible(false).apply();
            Form.fields('CAD_AUX_ANALISTA').visible(false).apply();


            regraAjustePaAprovacaoExterna();
            casadoAguardarAprovacaoExterna();
            possuiProcuradorAguardarAprovacaoExterna();
            possuiRendaAguardarAprovacaoExterna();
            botoesAguardarAprovacaoExterna();
            camposAjustarInformacoesAnalista();
            abertoPor();
            possuiRenda();
            somenteLeituraProcurador();


            setTimeout(() => {
                Form.apply().then(() => {
                    camposAguardarAprovacaoExterna();
                });
            }, 1000);

            laudoAvaliacaoImoveis();


            Form.groups('GAJUSTEANALISTA').visible(false).apply();
            Form.fields('CAD_PA').visible(false).apply();

        }

        if (tipoPessoa == "Pessoa Jurídica") {

            Form.groups('GR_PJ').visible(false).apply();
            Form.groups('GR_LAUDO').visible(false).apply();
            Form.groups('GAJUSTARPA').visible(false).apply();
            Form.groups('GNCADATU').visible(false).apply();
            Form.groups('GCENTRALIZADORA').visible(false).apply();
            Form.fields('CAD_AUX_ROTEAMENTO').visible(false).apply();
            Form.fields('CAD_AUX_ANALISTA').visible(false).apply();


            regraAjustePaAprovacaoExterna();
            casadoAguardarAprovacaoExterna();
            possuiProcuradorAguardarAprovacaoExterna();
            possuiRendaAguardarAprovacaoExterna();
            botoesAguardarAprovacaoExterna();
            camposAjustarInformacoesAnalista();
            abertoPor();
            camposAguardarAprovacaoExterna();
            possuiRenda();
            somenteLeituraProcurador();


            laudoAvaliacaoImoveis();
            Form.groups('GAJUSTEANALISTA').visible(false).apply();
            Form.fields('CAD_PA').visible(false).apply();


        }

        somenteLeituraPldLaudo();


        setTimeout(() => {
            Form.apply().then(() => {
                laudoAvaliacaoImoveis();
            });
        }, 1000);



    }

    if (codigoEtapa === AJUSTAR_INFORMACOES_ANALISTA) {

        let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();

        if (tipoPessoa == "Pessoa Física") {

            camposAjustarInformacoesAnalista();
            abertoPor();
            regraAnalista();
            botoesAjustarInformacoesAnalista();
            possuiRenda();
            somenteLeituraProcurador();
            laudoAvaliacaoImoveis();

            setTimeout(() => {
                roteamentoAjustarAnalista();
            }, 500);


            Form.fields('CAD_PA').visible(false).apply();
            Form.fields('AUX_ANALISTA').visible(false).apply();
            Form.fields('AUX_ROTA_PARALELO').visible(false).apply();
            Form.fields('AUX_ROTEAMENTO_AJUSTAR').visible(false).apply();

            Form.fields('CAD_CHECK_CONFIRMACAO').value('').apply();
            Form.fields('CAD_CHECK_CADASTRO').value('').apply();

        }

        if (tipoPessoa == "Pessoa Jurídica") {

            Form.groups('GDADOSPESSOAIS').visible(false).apply();

            camposAjustarInformacoesAnalista();
            abertoPor();
            regraAnalista();
            botoesAjustarInformacoesAnalista();
            //possuiRenda();
            somenteLeituraProcurador();
            laudoAvaliacaoImoveis();

            setTimeout(() => {
                roteamentoAjustarAnalista();
            }, 500);


            Form.fields('CAD_PA').visible(false).apply();
            Form.fields('AUX_ANALISTA').visible(false).apply();
            Form.fields('AUX_ROTA_PARALELO').visible(false).apply();
            Form.fields('AUX_ROTEAMENTO_AJUSTAR').visible(false).apply();

            Form.fields('CAD_CHECK_CONFIRMACAO').value('').apply();
            Form.fields('CAD_CHECK_CADASTRO').value('').apply();
        }

        somenteLeituraPldLaudo();
        laudoAvaliacaoImoveis();


    }

    if (codigoEtapa === RETORNO_AJUSTE_PA) {

        let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();

        if (tipoPessoa == "Pessoa Física") {

            camposAjustarInformacoesAnalista();
            abertoPor();
            regraAnalista();
            //botoesAjustarInformacoesAnalista();
            possuiRenda();
            somenteLeituraProcurador();
            laudoAvaliacaoImoveis();

            setTimeout(() => {
                roteamentoRetornoAjustePA();
            }, 500);


            Form.fields('CAD_PA').visible(false).apply();
            Form.fields('AUX_ANALISTA').visible(false).apply();
            Form.fields('AUX_ROTA_PARALELO').visible(false).apply();
            Form.fields('AUX_ROTEAMENTO_AJUSTAR').visible(false).apply();

            Form.fields('CAD_CHECK_CONFIRMACAO').value('').apply();
            Form.fields('CAD_CHECK_CADASTRO').value('').apply();

        }

        if (tipoPessoa == "Pessoa Jurídica") {

            Form.groups('GDADOSPESSOAIS').visible(false).apply();

            camposAjustarInformacoesAnalista();
            abertoPor();
            regraAnalista();
            //botoesAjustarInformacoesAnalista();
            //possuiRenda();
            somenteLeituraProcurador();
            laudoAvaliacaoImoveis();

            setTimeout(() => {
                roteamentoRetornoAjustePA();
            }, 500);


            Form.fields('CAD_PA').visible(false).apply();
            Form.fields('AUX_ANALISTA').visible(false).apply();
            Form.fields('AUX_ROTA_PARALELO').visible(false).apply();
            Form.fields('AUX_ROTEAMENTO_AJUSTAR').visible(false).apply();

            Form.fields('CAD_CHECK_CONFIRMACAO').value('').apply();
            Form.fields('CAD_CHECK_CADASTRO').value('').apply();
        }

        somenteLeituraPldLaudo();
        laudoAvaliacaoImoveis();


    }

    if (codigoEtapa === APROVAR_CADASTRO) {

        let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();

        if (tipoPessoa == "Pessoa Física") {

            Form.groups('GR_LAUDO').visible(false).apply();
            Form.groups('GCENTRALIZADORA').visible(false).apply();
            Form.groups('GAJUSTEANALISTA').visible(false).apply();

            manipularBotoesAprovarCadastro();
            camposAprovarCadastro();
            statusAprovar();
            abertoPor();
            possuiRenda();
            somenteLeituraProcurador();
            Form.fields('CAD_PA').visible(false).apply();
            mensagemAssociacaoAnterior();
            laudoAvaliacaoImoveis();

        }

        if (tipoPessoa == "Pessoa Jurídica") {

            Form.groups('GDADOSPESSOAIS').visible(false).apply();
            Form.groups('GR_LAUDO').visible(false).apply();
            Form.groups('GCENTRALIZADORA').visible(false).apply();
            Form.groups('GAJUSTEANALISTA').visible(false).apply();

            manipularBotoesAprovarCadastro();
            camposAprovarCadastro();
            statusAprovar();
            abertoPor();
            possuiRenda();
            somenteLeituraProcurador();
            Form.fields('CAD_PA').visible(false).apply();
            mensagemAssociacaoAnterior();
            laudoAvaliacaoImoveis();

        }

        somenteLeituraPldLaudo();
        laudoAvaliacaoImoveis();


    }

    if (codigoEtapa === ASSUMIR_ATIVIDADE) {

        let laudoAvalicao = Form.fields('AUX_PLD_CONTROLE').value();

        if (laudoAvalicao == "Laudo de Avaliação de Imóveis") {

            Form.apply().then(() => {

                var grupo = Form.fields('PA_LAUDO').value();
                getGrupoDestino(grupo, 'CAD_PA_DESTINO');

            });

        }


        let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();

        if (tipoPessoa == "Pessoa Física") {

            Form.groups('GR_PJ').visible(false).apply();
            Form.groups('GR_LAUDO').visible(false).apply();
            Form.groups('GCADASTRARSISBR').visible(false).apply();
            Form.groups('GAJUSTARPA').visible(false).apply();
            Form.groups('GNCADATU').visible(false).apply();
            Form.groups('GCENTRALIZADORA').visible(false).apply();
            Form.groups('GAJUSTEANALISTA').visible(false).apply();

            camposAssumirAtividade();
            abertoPor();
            abrirProspectado();
            laudoAvaliacaoImoveis();

            Form.fields('CAD_PA').visible(false).apply();

        }

        if (tipoPessoa == "Pessoa Jurídica") {

            Form.groups('GDADOSPESSOAIS').visible(false).apply();
            Form.groups('GR_LAUDO').visible(false).apply();
            Form.groups('GCADASTRARSISBR').visible(false).apply();
            Form.groups('GAJUSTARPA').visible(false).apply();
            Form.groups('GNCADATU').visible(false).apply();
            Form.groups('GCENTRALIZADORA').visible(false).apply();
            Form.groups('GAJUSTEANALISTA').visible(false).apply();

            camposAssumirAtividade();
            abertoPor();
            abrirProspectado();
            laudoAvaliacaoImoveis();

            Form.fields('CAD_PA').visible(false).apply();

        }

        somenteLeituraPldLaudo();
        laudoAvaliacaoImoveis();


    }

    if (codigoEtapa === CADASTRAR_SISBR) {

        let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();

        if (tipoPessoa == "Pessoa Física") {

            Form.groups('GR_PJ').visible(false).apply();
            Form.groups('GR_LAUDO').visible(false).apply();
            Form.groups('GCADASTRARSISBR').visible(true).apply();
            Form.groups('GAJUSTARPA').visible(false).apply();
            Form.groups('GNCADATU').visible(false).apply();
            Form.groups('GCENTRALIZADORA').visible(false).apply();
            Form.groups('GAJUSTEANALISTA').visible(false).apply();
            Form.fields('CAD_AUX_ROTEAMENTO').visible(false).apply();
            Form.fields('CAD_AUX_ANALISTA').visible(false).apply();
            Form.fields('CAD_OBSERVACAO').visible(false).apply();
            Form.fields('CAD_CHECK_CONFIRMACAO').value('').apply();
            Form.fields('CAD_CHECK_CADASTRO').value('').apply();

            camposCadastrarSisbr();
            abertoPor();
            roteamentoCadastrarSisbr();
            botoesCadastrarSisbr();
            regraSisbr();
            possuiRenda();
            somenteLeituraProcurador();
            laudoAvaliacaoImoveis();

            Form.fields('CAD_PA').visible(false).apply();

        }

        if (tipoPessoa == "Pessoa Jurídica") {


            Form.groups('GDADOSPESSOAIS').visible(false).apply();
            Form.groups('GR_LAUDO').visible(false).apply();
            Form.groups('GCADASTRARSISBR').visible(true).apply();
            Form.groups('GAJUSTARPA').visible(false).apply();
            Form.groups('GNCADATU').visible(false).apply();
            Form.groups('GCENTRALIZADORA').visible(false).apply();
            Form.groups('GAJUSTEANALISTA').visible(false).apply();
            Form.fields('CAD_AUX_ROTEAMENTO').visible(false).apply();
            Form.fields('CAD_AUX_ANALISTA').visible(false).apply();
            Form.fields('CAD_OBSERVACAO').visible(false).apply();
            Form.fields('CAD_CHECK_CONFIRMACAO').value('').apply();
            Form.fields('CAD_CHECK_CADASTRO').value('').apply();

            camposCadastrarSisbr();
            abertoPor();
            roteamentoCadastrarSisbr();
            botoesCadastrarSisbr();
            regraSisbr();
            possuiRenda();
            somenteLeituraProcurador();
            laudoAvaliacaoImoveis();

            Form.fields('CAD_PA').visible(false).apply();

        }

        somenteLeituraPldLaudo();
        laudoAvaliacaoImoveis();


    }

    if (codigoEtapa === CENTRALIZADORA_CADASTRADO) {


        let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();

        if (tipoPessoa == "Pessoa Física") {

            Form.fields('CAD_PA').visible(false).apply();
            Form.fields('CAD_HISTORICO_GERAL').required(false).apply();
            abertoPor();
            camposCentralizadora();
            possuiRenda();
            somenteLeituraProcurador();
            laudoAvaliacaoImoveis();
        }

        if (tipoPessoa == "Pessoa Jurídica") {

            Form.fields('CAD_PA').visible(false).apply();
            Form.fields('CAD_HISTORICO_GERAL').required(false).apply();
            abertoPor();
            camposCentralizadora();
            possuiRenda();
            somenteLeituraProcurador();
            preencherNomeRazaoSocial();
            laudoAvaliacaoImoveis();
        }

        somenteLeituraPldLaudo();
        laudoAvaliacaoImoveis();

    }

    if (codigoEtapa === PROCESSAR_REJEICAO) {

        Form.fields('CAD_PA').visible(false).apply();
        abertoPor();
        possuiRenda();
        somenteLeituraProcurador();
        laudoAvaliacaoImoveis();
        somenteLeituraPldLaudo();
        laudoAvaliacaoImoveis();

    }

    if (codigoEtapa === FINALIZAR_APROVADO) {

        finalizarAprovado();
        abertoPor();
        possuiRenda();
        somenteLeituraProcurador();
        laudoAvaliacaoImoveis();

        Form.fields('CAD_PA').visible(false).apply();
        somenteLeituraPldLaudo();
        laudoAvaliacaoImoveis();

    }

    if (codigoEtapa === FINALIZAR_REJEITADO) {

        finalizarReprovado();
        abertoPor();
        possuiRenda();
        somenteLeituraProcurador();
        laudoAvaliacaoImoveis();

        Form.fields('CAD_PA').visible(false).apply();
        somenteLeituraPldLaudo();
        laudoAvaliacaoImoveis();

    }

}

/*
 * Define novas regras de validação dos campos
 */
function setValidators() {
    debugger

    if (codigoEtapa === SOLICITAR_CADASTRO || codigoEtapa === AJUSTAR_INFORMACOES_PA || codigoEtapa === CORRIGIR_CADASTRO_OUTRA_COOPERATIVA) {

        Form.actions('aprovar').subscribe('SUBMIT', function (itemId, action, reject) {

            var cadastro = Form.fields('CAD_CADASTRO_ASSOC').value();
            var checkAnexos = Form.fields('CHECK_ANEXOS_PF').value();
            var checkRenda = Form.fields('CHECK_RENDA_PF').value();
            var tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
            var checkAnexosPJ = Form.fields('CHECK_ANEXOS_PJ').value();
            var checkPatrimonioPJ = Form.fields('CHECK_PATRIMONIO_PJ').value();
            var checkFaturamentoPJ = Form.fields('CHECK_FATURAMENTO_PJ').value();
            var checkSociosPJ = Form.fields('CHECK_SOCIOS_PJ').value();
            var possuiFaturamento = Form.fields('CAD_POSSUI_FAT_PJ').value();
            var possuiPatrimonio = Form.fields('CAD_POSSUI_PATRI').value();
            var auxPldControle = Form.fields('AUX_PLD_CONTROLE').value();

            if (tipoPessoa == "Pessoa Física" && cadastro == "Sim" && (checkRenda == undefined || checkRenda == "")) {

                //Exige ao menos um comprovante de Renda caso o rádio Possui renda == Sim
                const possuiRenda = Form.fields("CAD_DP_POSSUI_RENDA").value();

                const renda = Array.isArray(possuiRenda)
                    ? possuiRenda[0]
                    : possuiRenda;


                if (renda === "Sim") {
                    if (!JSPadrao.validaPreenchimentoMinimoItensGRIDSobDemanda({ "grid": "GRIDRENDA", "quantidade": "1" })) {
                        reject();
                    }
                }

            }

            if (tipoPessoa == "Pessoa Física" && (cadastro == "Sim" || (cadastro == "Sim" && checkAnexos == "OK"))) {

                const gridDocumentos = Form.grids("ANEXODOCS");

                const validagridDocumentos = validaSubmitGrid(
                    gridDocumentos,
                    reject,
                    "Por favor, insira todos os documentos necessários."
                );


                if (validagridDocumentos) {
                    const estadoCivil = Form.fields("CAD_DP_ESTADO_CIVIL").value();

                    const estado = Array.isArray(estadoCivil)
                        ? estadoCivil[0]
                        : estadoCivil;

                    const listagrid = [];

                    gridDocumentos.dataRows().forEach((grid) => {
                        if (Array.isArray(grid.CAD_LISTA_TIPO_DOC)) {
                            listagrid.push(grid.CAD_LISTA_TIPO_DOC[0]);
                        } else {
                            listagrid.push(grid.CAD_LISTA_TIPO_DOC);
                        }
                    });

                    let listaItens = [];

                    //validação lista casado
                    if (estado === "Casado(a)") {
                        listaItens = listaCasado.filter(
                            (el) =>
                                listagrid.indexOf(el) === -1
                        );
                    }

                    if (listaItens.length > 0) {
                        gridDocumentos.errors(
                            `Por favor, anexar o(s) seguinte(s) documento(s): ${listaItens.join(
                                ", "
                            )}.`
                        );

                        reject();
                    }

                    //validação lista divorciado
                    if (estado === "Divorciado(a) / Separado(a)") {
                        listaItens = listaDivorciado.filter(
                            (el) =>
                                listagrid.indexOf(el) === -1
                        );
                    }

                    if (listaItens.length > 0) {
                        gridDocumentos.errors(
                            `Por favor, anexar o(s) seguinte(s) documento(s): ${listaItens.join(
                                ", "
                            )}.`
                        );

                        reject();
                    }

                    //validação lista solteiro
                    if (estado === "Solteiro(a)") {
                        listaItens = listaSolteiro.filter(
                            (el) =>
                                listagrid.indexOf(el) === -1
                        );
                    }

                    if (listaItens.length > 0) {
                        gridDocumentos.errors(
                            `Por favor, anexar o(s) seguinte(s) documento(s): ${listaItens.join(
                                ", "
                            )}.`
                        );

                        reject();
                    }

                    //validação lista União Estável
                    if (estado === "União Estável") {
                        listaItens = listaUniaoEstavel.filter(
                            (el) =>
                                listagrid.indexOf(el) === -1
                        );
                    }

                    if (listaItens.length > 0) {
                        gridDocumentos.errors(
                            `Por favor, anexar o(s) seguinte(s) documento(s): ${listaItens.join(
                                ", "
                            )}.`
                        );

                        reject();
                    }

                    //validação lista Viúvo
                    if (estado === "Viúvo(a)") {
                        listaItens = listaViuvo.filter(
                            (el) =>
                                listagrid.indexOf(el) === -1
                        );
                    }

                    if (listaItens.length > 0) {
                        gridDocumentos.errors(
                            `Por favor, anexar o(s) seguinte(s) documento(s): ${listaItens.join(
                                ", "
                            )}.`
                        );

                        reject();
                    }

                    return;

                }

            }

            if (tipoPessoa == "Pessoa Física" && cadastro == "Não" && checkRenda == "OK") {

                if (!JSPadrao.validaPreenchimentoMinimoItensGRIDSobDemanda({ "grid": "GRIDRENDA", "quantidade": "1" })) {
                    reject();
                }
            }

            if (tipoPessoa == "Pessoa Física" && cadastro == "Não" && checkAnexos == "OK" && auxPldControle != "Laudo de Avaliação de Imóveis") {

                if (!JSPadrao.validaPreenchimentoMinimoItensGRIDSobDemanda({ "grid": "ANEXODOCS", "quantidade": "1" })) {
                    reject();
                }
            }

            if (tipoPessoa == "Pessoa Jurídica" && cadastro == "Não" && checkAnexosPJ == "OK") {

                if (!JSPadrao.validaPreenchimentoMinimoItensGRIDSobDemanda({ "grid": "GRID_PJ", "quantidade": "1" })) {
                    reject();
                }
            }

            if (tipoPessoa == "Pessoa Jurídica" && cadastro == "Sim") {

                const anexosDoc = Form.grids("GRID_PJ");

                const validaAnexosDoc = validaSubmitGrid(
                    anexosDoc,
                    reject,
                    "Por favor, insira todos os documentos necessários."
                );

                if (validaAnexosDoc) {
                    // Valida se todas as informações da Lista foram incluidas na Grid
                    const listagrid = [];
                    anexosDoc.dataRows().forEach((grid) => {
                        if (Array.isArray(grid.CAD_LISTA_PJ)) {
                            listagrid.push(grid.CAD_LISTA_PJ[0]);
                        } else {
                            listagrid.push(grid.CAD_LISTA_PJ);
                        }
                    });


                    const listaItens = listaDocumentosPJ.filter(
                        (el) => listagrid.indexOf(el) === -1
                    );

                    if (listaItens.length > 0) {
                        anexosDoc.errors(
                            `Por favor, anexar o(s) seguinte(s) documento(s): ${listaItens.join(
                                ", "
                            )}.`
                        );

                        reject();
                    }

                }

            }

            //Valida ao menos um item para Pessoa Jurídica que possui faturamento == Sim

            if ((tipoPessoa == "Pessoa Jurídica" && cadastro == "Sim") || (tipoPessoa == "Pessoa Jurídica" && checkFaturamentoPJ == "OK" && cadastro == "Não")) {

                //Exige ao menos um documento de faturamento caso o rádio Possui Faturamento == Sim
                const possuiFaturamento = Form.fields("CAD_POSSUI_FAT_PJ").value();

                const faturamento = Array.isArray(possuiFaturamento)
                    ? possuiFaturamento[0]
                    : possuiFaturamento;


                if (faturamento === "Sim") {
                    if (!JSPadrao.validaPreenchimentoMinimoItensGRIDSobDemanda({ "grid": "GRID_FAT_PJ", "quantidade": "1" })) {
                        reject();
                    }

                }

            }

            //Valida ao menos um item para Pessoa Jurídica que possui patrimônio == Sim

            if ((tipoPessoa == "Pessoa Jurídica" && cadastro == "Sim") || (tipoPessoa == "Pessoa Jurídica" && checkPatrimonioPJ == "OK" && cadastro == "Não")) {

                //Exige ao menos um documento de faturamento caso o rádio Possui Faturamento == Sim
                const possuiPatrimonio = Form.fields("CAD_POSSUI_PATRI").value();

                const patrimonio = Array.isArray(possuiPatrimonio)
                    ? possuiPatrimonio[0]
                    : possuiPatrimonio;


                if (patrimonio === "Sim") {
                    if (!JSPadrao.validaPreenchimentoMinimoItensGRIDSobDemanda({ "grid": "GRID_PAT_PJ", "quantidade": "1" })) {
                        reject();
                    }

                }

            }

            //Valida ao menos um item para Pessoa Jurídica que possui sócios == Sim

            if ((tipoPessoa == "Pessoa Jurídica" && cadastro == "Sim") || (tipoPessoa == "Pessoa Jurídica" && checkSociosPJ == "OK" && cadastro == "Não")) {

                if (!JSPadrao.validaPreenchimentoMinimoItensGRIDSobDemanda({ "grid": "GRID_SOCIO_PJ", "quantidade": "1" })) {
                    reject();
                }

            }

        });
    }

}


//Alterando destino quando aberto por PLD-Controle Especial
function validaPADestinoPLD() {
    debugger;
    let abertoPor = Form.fields("AUX_PLD_CONTROLE").value();

    if (abertoPor === "PLD - Controle Especial") {
        const depto = Form.fields("CAD_PA_DESTINO").value();

        switch (depto) {
            case "pa01_nivel_1":
                Form.fields("CAD_PA_DESTINO").value("PA01");
                break;
            case "pa02_nivel_1":
                Form.fields("CAD_PA_DESTINO").value("PA02");
                break;
            case "pa03_nivel_1":
                Form.fields("CAD_PA_DESTINO").value("PA03");
                break;
            case "pa04_nivel_1":
                Form.fields("CAD_PA_DESTINO").value("PA04");
                break;
            case "pa05_nivel_1":
                Form.fields("CAD_PA_DESTINO").value("PA05");
                break;
            case "pa06_nivel_1":
                Form.fields("CAD_PA_DESTINO").value("PA06");
                break;
            case "pa07_nivel_1":
                Form.fields("CAD_PA_DESTINO").value("PA07");
                break;
            case "pa08_nivel_1":
                Form.fields("CAD_PA_DESTINO").value("PA08");
                break;
            case "pa09_nivel_1":
                Form.fields("CAD_PA_DESTINO").value("PA09");
                break;
            case "pa10_nivel_1":
                Form.fields("CAD_PA_DESTINO").value("PA10");
                break;
            case "pa97_nivel_1":
                Form.fields("CAD_PA_DESTINO").value("PA97");
                break;
            case "Comercial":
                Form.fields("CAD_PA_DESTINO").value("comercial");
                break;
            case "Central atendimento":
                Form.fields("CAD_PA_DESTINO").value("central_atendim");
                break;
            ///////
            case "PA 01":
                Form.fields("CAD_PA_DESTINO").value("PA01");
                break;
            case "PA 02":
                Form.fields("CAD_PA_DESTINO").value("PA02");
                break;
            case "PA 03":
                Form.fields("CAD_PA_DESTINO").value("PA03");
                break;
            case "PA 04":
                Form.fields("CAD_PA_DESTINO").value("PA04");
                break;
            case "PA 05":
                Form.fields("CAD_PA_DESTINO").value("PA05");
                break;
            case "PA 06":
                Form.fields("CAD_PA_DESTINO").value("PA06");
                break;
            case "PA 07":
                Form.fields("CAD_PA_DESTINO").value("PA07");
                break;
            case "PA 08":
                Form.fields("CAD_PA_DESTINO").value("PA08");
                break;
            case "PA 09":
                Form.fields("CAD_PA_DESTINO").value("PA09");
                break;
            case "PA 10":
                Form.fields("CAD_PA_DESTINO").value("PA10");
                break;
            case "PA 97":
                Form.fields("CAD_PA_DESTINO").value("PA97");
                break;
            case "Comercial":
                Form.fields("CAD_PA_DESTINO").value("comercial");
                break;
            case "Central atendimento":
                Form.fields("CAD_PA_DESTINO").value("central_atendim");
                break;
            default:
                Form.fields("CAD_PA_DESTINO").value("cadastro");
                break;
        }

        Form.apply();
    }
}

/*function agrupadorLaudo() {
    debugger;

    var laudoAval = Form.fields("CAD_L_TIPO_CADASTRO").value();
    var laudoGrupo = Form.fields("AUX_LAUDO").value();

    if (laudoAval == "Cadastro Novo") {

        Form.groups("GR_LAUDO").visible(false);

    } else {

        if (laudoGrupo == "Sim") {

            Form.groups("GR_LAUDO").visible(true);

        } else {

            Form.groups("GR_LAUDO").visible(false);
        }
    }

    Form.apply();
}*/

//Modal para abertura do Form para evitar travamento -- maycon

function modalAlertaAbertura() {
    debugger

    if (codigoEtapa === SOLICITAR_CADASTRO || codigoEtapa === AJUSTAR_INFORMACOES_PA) {

        Form.addCustomModal({
            title: "ATENÇÃO",
            description:
                "Bem Vindo ao Cadastro / Atualização PF/PJ/Rural! Preencha com atenção todos os campos!",
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
    }

    Form.apply();
}

//Máscara para pessoa Física ou Jurídica -- maycon
function verificaTipoPessoa() {
    var pessoa = Form.fields('CAD_TIPO_PESSOA').value();
    var tipoPessoa = pessoa;

    if (tipoPessoa == "Pessoa Física") {
        Form.fields('CAD_CPF_CNPJ').mask('cpf').apply();
    } else if (tipoPessoa == "Pessoa Jurídica") {
        Form.fields('CAD_CPF_CNPJ').mask('cnpj').apply();
    }
}

//Máscara para Pessoa Jurídica -- maycon
function verificaTipoPessoaJuridica() {
    var pessoa = Form.fields('CAD_TIPO_PESSOA').value();
    var tipoPessoa = pessoa;

    if (tipoPessoa == "Pessoa Jurídica") {
        Form.fields('AUX_CNPJ').mask('cnpj').apply();
    }
}

//VALIDA SE O CPF É VÁLIDO -- maycon
function validadorcpfCnpj() {

    var cpf_cnpj = Form.fields('CAD_TIPO_PESSOA').value();

    if (cpf_cnpj == "Pessoa Física") {
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

//VALIDA CPF DO CONJUGE - MAYCON

function validadorcpfConjuge() {

    var cpf_conjuge = Form.fields('CAD_CPF_CONJUGE').value();

    if (cpf_conjuge != "" || cpf_conjuge != undefined) {
        Form.apply().then(function () {
            var retorno = JSPadrao.validaCPF({ "campo": "CAD_CPF_CONJUGE" });
            console.log("CAD_CPF_CONJUGE: " + retorno);
        });

    }
}

//VALIDA CPF DO PROCURADOR - MAYCON

function validadorcpfProcurador() {

    let cpf_procurador = Form.fields('CAD_CPF_PROCURADOR').value();

    if (cpf_procurador != "" || cpf_procurador != undefined) {
        Form.apply().then(function () {
            var retorno = JSPadrao.validaCPF({ "campo": "CAD_CPF_PROCURADOR" });
            console.log("CAD_CPF_PROCURADOR: " + retorno);
        });

    }
}

//VALIDA CNPJ - MAYCON

function validadorCnpjAux() {

    let cnpj_aux = Form.fields('AUX_CNPJ').value();

    if (cnpj_aux != "" || cnpj_aux != undefined) {
        Form.apply().then(function () {
            var retorno = JSPadrao.validaCNPJ({ "campo": "AUX_CNPJ" });
            console.log("AUX_CNPJ: " + retorno);
        });

    }
}


//VALIDA CPF/CNPJ DO SÓCIO DENTRO DO GRID_SOCIO_PJ - MAYCON

function validadorCpfCnpjSocio() {
    debugger

    var cpf_cnpj = Form.grids('GRID_SOCIO_PJ').fields('CAD_TIP_SOCIO').value();

    if (cpf_cnpj == "Sócio PF") {
        Form.apply().then(function () {
            var retorno = JSPadrao.validaCPF({ "campo": "CAD_CPF_SOCIO", "grid": "GRID_SOCIO_PJ" });
            console.log("GRID_SOCIO_PJ: " + retorno);
        });
        //Form.grids('GRID_SOCIO_PJ').fields('CAD_CPF_SOCIO').mask('cpf').apply();

    } else {

        Form.apply().then(function () {
            var retorno = JSPadrao.validaCNPJ({ "campo": "CAD_CNPJ_SOCIO", "grid": "GRID_SOCIO_PJ" });
            console.log("GRID_SOCIO_PJ: " + retorno);
        });

        // Form.grids('GRID_SOCIO_PJ').fields('CAD_CNPJ_SOCIO').mask('cnpj').apply();
    }
}


//Ocultar campos iniciais
function ocultarCamposIniciais(esconder = false) {
    debugger

    let associacao = Form.fields('CAD_CADASTRO_ASSOC').value();
    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();

    if ((tipoPessoa == "Pessoa Física" || tipoPessoa == undefined) && (associacao == undefined || associacao == "Não")) {

        //prospectado
        Form.fields('CAD_PA').visible(esconder);
        Form.fields('CAD_PROSPECTADOR').visible(esconder);
        Form.fields('LBL_PROSPECTADO_POR').visible(esconder);
        Form.fields('CAD_PROSPECTADO_POR').visible(esconder);
        Form.fields('CAD_DEPTO').visible(esconder);
        Form.fields('CAD_PA_USUARIO_INICIADO').visible(esconder);
        Form.fields('CAD_PA_DESTINO').visible(esconder);


        //dados

        Form.groups('GR_ATUALIZACAO').visible(esconder);
        Form.groups('GDADOSPESSOAIS').visible(esconder);
        Form.groups('GR_PJ').visible(esconder);
        Form.groups('GR_LAUDO').visible(esconder);
        Form.groups('GCADASTRARSISBR').visible(esconder);
        Form.groups('GAJUSTARPA').visible(esconder);
        Form.groups('GNCADATU').visible(esconder);
        Form.groups('GCENTRALIZADORA').visible(esconder);
        Form.groups('GAJUSTEANALISTA').visible(esconder);

    }

    else if ((tipoPessoa == "Pessoa Jurídica" || tipoPessoa == undefined) && (associacao == undefined || associacao == "Não")) {

        //prospectado
        Form.fields('CAD_PA').visible(esconder);
        Form.fields('CAD_PROSPECTADOR').visible(esconder);
        Form.fields('LBL_PROSPECTADO_POR').visible(esconder);
        Form.fields('CAD_PROSPECTADO_POR').visible(esconder);
        Form.fields('CAD_DEPTO').visible(esconder);
        Form.fields('CAD_PA_USUARIO_INICIADO').visible(esconder);
        Form.fields('CAD_PA_DESTINO').visible(esconder);


        //dados

        Form.groups('GR_ATUALIZACAO').visible(esconder);
        Form.groups('GDADOSPESSOAIS').visible(esconder);
        Form.groups('GR_PJ').visible(esconder);
        Form.groups('GR_LAUDO').visible(esconder);
        Form.groups('GCADASTRARSISBR').visible(esconder);
        Form.groups('GAJUSTARPA').visible(esconder);
        Form.groups('GNCADATU').visible(esconder);
        Form.groups('GCENTRALIZADORA').visible(esconder);
        Form.groups('GAJUSTEANALISTA').visible(esconder);

    }

    else if (tipoPessoa == "Pessoa Jurídica" && associacao == "Sim") {

        Form.groups('GR_ATUALIZACAO').visible(esconder);
        Form.groups('GDADOSPESSOAIS').visible(esconder);

        //CPF/CNPJ
        Form.fields('CAD_CPF_CNPJ').visible(false);
        Form.fields('CAD_CPF_CNPJ').required(true);
        Form.fields('AUX_CNPJ').visible(true);
        Form.fields('AUX_CNPJ').required(true);
        //

        Form.groups('GR_LAUDO').visible(esconder);
        Form.groups('GCADASTRARSISBR').visible(esconder);
        Form.groups('GAJUSTARPA').visible(esconder);
        Form.groups('GNCADATU').visible(esconder);
        Form.groups('GCENTRALIZADORA').visible(esconder);
        Form.groups('GAJUSTEANALISTA').visible(esconder);

    }


    Form.apply();

}


//Se for associação Sim – abre o rádio Prospectado por: (Espontâneo e Prospectado)
function abrirProspectado() {
    debugger;

    //let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    let radioAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();

    if (radioAssociacao == undefined || radioAssociacao == "") {

        Form.fields('CAD_PROSPECTADOR').visible(false);
        Form.fields('LBL_PROSPECTADO_POR').visible(false);

    }

    else if (radioAssociacao == "Sim") {

        Form.fields('CAD_PROSPECTADOR').visible(true);
        Form.fields('CAD_PROSPECTADOR').required(true);
        Form.fields('LBL_PROSPECTADO_POR').visible(true);

    }

    else {

        Form.fields('CAD_PROSPECTADOR').visible(false);
        Form.fields('CAD_PROSPECTADOR').value('');
        Form.fields('CAD_PROSPECTADOR').required(false);
        Form.fields('LBL_PROSPECTADO_POR').visible(false);

        Form.fields('CAD_PROSPECTADO_POR').visible(false);
        Form.fields('CAD_PROSPECTADO_POR').value('');
        Form.fields('CAD_PROSPECTADO_POR').required(false);

        Form.fields('CAD_DEPTO').visible(false);
        Form.fields('CAD_DEPTO').value('');
        Form.fields('CAD_DEPTO').required(false);

    }

    Form.apply();

}

//Se for prospectado abre os campos Linha de Texto (Prospectado e Departamento)

function abrirProspectadoDepartamento() {

    let selecaoRadio = Form.fields('CAD_PROSPECTADOR').value();

    if (selecaoRadio == "Prospectado") {

        Form.fields('CAD_PROSPECTADO_POR').visible(true);
        Form.fields('CAD_PROSPECTADO_POR').required(true);

        Form.fields('CAD_DEPTO').visible(true);
        Form.fields('CAD_DEPTO').required(true);

    }

    else {

        Form.fields('CAD_PROSPECTADO_POR').visible(false);
        Form.fields('CAD_PROSPECTADO_POR').required(false);
        Form.fields('CAD_PROSPECTADO_POR').value('');
        Form.fields('CAD_DEPTO').visible(false);
        Form.fields('CAD_DEPTO').value('');
        Form.fields('CAD_DEPTO').required(false);
    }

    Form.apply();
}

/*
//Se casado (cpf do conjugue e certidão de casamento obrigatório)
//Se Divorciado (certidão de casamento com averbação)
//Se viúvo (Certidão de Óbito)

;Casado(a)
;Divorciado(a) / Separado(a) 
;Solteiro(a)
;União Estável
;Viúvo(a)

*/

//validar documentos RG/CNH, Receita, Serasa, Bacen

function validaSubmitGrid(grid, reject, text) {
    if (grid.dataRows().length <= 0) {
        grid.errors(text);

        reject();

        return false;
    }

    return true;
}

//Botão Radio Possui Renda (Sim, Não)

function possuiRenda() {
    debugger

    let radioRenda = Form.fields('CAD_DP_POSSUI_RENDA').value();
    let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    let checkRenda = Form.fields('CHECK_RENDA_PF').value();


    if (checkRenda != "OK" && (tipoPessoa == "Pessoa Física" && tipoAssociacao == "Sim" && radioRenda == "Não")) {

        Form.fields('LBL_POSSUI_RENDA').visible(true);
        Form.fields('CAD_DP_POSSUI_RENDA').visible(true);
        Form.grids('GRIDRENDA').visible(false);
        Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').visible(false);

    }

    else if (checkRenda != "OK" && radioRenda == undefined && (tipoPessoa == "Pessoa Física" && tipoAssociacao == "Sim")) {

        Form.fields('LBL_POSSUI_RENDA').visible(true);
        Form.fields('CAD_DP_POSSUI_RENDA').visible(true);
        Form.grids('GRIDRENDA').visible(false);
        Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').visible(false);
        zerarValoresGridPorId("GRIDRENDA");

    }

    else if (checkRenda != "OK" && (tipoPessoa == "Pessoa Física" && radioRenda == "Sim" && tipoAssociacao == "Sim")) {

        Form.fields('LBL_POSSUI_RENDA').visible(true);
        Form.fields('CAD_DP_POSSUI_RENDA').visible(true);
        Form.grids("GRIDRENDA").visible(true);
        Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').required(true);

    }

    else if (checkRenda == "OK" && (tipoPessoa == "Pessoa Física" && tipoAssociacao == "Não" && radioRenda == "Sim")) {

        Form.fields('LBL_POSSUI_RENDA').visible(true);
        Form.fields('CAD_DP_POSSUI_RENDA').visible(true);
        Form.grids("GRIDRENDA").visible(true);
        Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').required(true);

    }

    else if (checkRenda == "OK" && (tipoPessoa == "Pessoa Física" && tipoAssociacao == "Não" && radioRenda == "Não")) {

        Form.fields('LBL_POSSUI_RENDA').visible(true);
        Form.fields('CAD_DP_POSSUI_RENDA').visible(true);
        Form.grids("GRIDRENDA").visible(false);
        Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').required(false);
        zerarValoresGridPorId("GRIDRENDA");

    }

    else if (checkRenda != "OK" && (tipoPessoa == "Pessoa Física" && tipoAssociacao == "Sim" && (radioRenda == undefined || radioRenda == ""))) {

        Form.fields('LBL_POSSUI_RENDA').visible(true);
        Form.fields('CAD_DP_POSSUI_RENDA').visible(true);
        Form.grids("GRIDRENDA").visible(false);
        Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').visible(false);
        zerarValoresGridPorId("GRIDRENDA");

    }

    else if (checkRenda == "OK" && tipoPessoa == "Pessoa Física" && tipoAssociacao == "Não" && (radioRenda == undefined || radioRenda == "")) {

        Form.fields('LBL_POSSUI_RENDA').visible(true);
        Form.fields('CAD_DP_POSSUI_RENDA').visible(true);
        Form.grids("GRIDRENDA").visible(false);
        Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').required(false);
        zerarValoresGridPorId("GRIDRENDA");

    }

    else {

        Form.fields('LBL_POSSUI_RENDA').visible(false);
        Form.fields('CAD_DP_POSSUI_RENDA').visible(false);
        Form.grids('GRIDRENDA').visible(false);
        Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').required(false);
        zerarValoresGridPorId("GRIDRENDA");

    }

    Form.apply();
}

//Botão Radio Possui Procurador (Sim, Não)

function possuiProcurador() {
    debugger


    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
    let radioProcurador = Form.fields('CAD_DP_POS_PROCURADOR').value();
    let checkProcurador = Form.fields('CHECK_PROCURADOR_PF').value();

    if (tipoPessoa == "Pessoa Física" && tipoAssociacao == "Sim" && radioProcurador == "Sim" && checkProcurador == undefined) {

        Form.fields('LBL_POSSUI_PROCURADOR').visible(true);

        Form.fields('LBL_MSG_PROCURADOR').visible(true);

        Form.fields('CAD_DP_POS_PROCURADOR').visible(true);
        Form.fields('CAD_DP_POS_PROCURADOR').required(true);

        Form.fields('CAD_CPF_PROCURADOR').visible(true);
        Form.fields('CAD_CPF_PROCURADOR').required(true);

    }

    else if (tipoPessoa == "Pessoa Física" && tipoAssociacao == "Não" && checkProcurador == "OK" && radioProcurador == "Sim") {

        Form.fields('LBL_POSSUI_PROCURADOR').visible(true);

        Form.fields('LBL_MSG_PROCURADOR').visible(true);

        Form.fields('CAD_DP_POS_PROCURADOR').visible(true);
        Form.fields('CAD_DP_POS_PROCURADOR').required(true);

        Form.fields('CAD_CPF_PROCURADOR').visible(true);
        Form.fields('CAD_CPF_PROCURADOR').required(true);


    }
    else if (tipoPessoa == "Pessoa Física" && tipoAssociacao == "Sim" && radioProcurador == "Não") {

        Form.fields('LBL_POSSUI_PROCURADOR').visible(true);
        Form.fields('CAD_DP_POS_PROCURADOR').visible(true);
        Form.fields('CAD_DP_POS_PROCURADOR').required(false);
        Form.fields('LBL_MSG_PROCURADOR').visible(false);
        Form.fields('CAD_CPF_PROCURADOR').visible(false);
        Form.fields('CAD_CPF_PROCURADOR').required(false);
        Form.fields('CAD_CPF_PROCURADOR').value("");

    }

    else if (tipoPessoa == "Pessoa Física" && (tipoAssociacao == "Não" && radioProcurador == "Sim") && checkProcurador == "OK") {

        Form.fields('LBL_POSSUI_PROCURADOR').visible(true);
        Form.fields('LBL_MSG_PROCURADOR').visible(true);

        Form.fields('CAD_DP_POS_PROCURADOR').visible(true);
        Form.fields('CAD_DP_POS_PROCURADOR').required(true);

        Form.fields('CAD_CPF_PROCURADOR').visible(true);
        Form.fields('CAD_CPF_PROCURADOR').required(true);

    }

    else if (tipoPessoa == "Pessoa Física" && tipoAssociacao == "Não" && radioProcurador == "Não" && checkProcurador == "OK") {

        Form.fields('CAD_DP_POS_PROCURADOR').visible(true);
        Form.fields('CAD_DP_POS_PROCURADOR').required(true);

        Form.fields('CAD_CPF_PROCURADOR').visible(false);
        Form.fields('CAD_CPF_PROCURADOR').required(false);
        Form.fields('LBL_MSG_PROCURADOR').visible(false);

    }

    else if (tipoAssociacao == "Sim" && tipoPessoa == "Pessoa Física" && (radioProcurador == undefined || radioProcurador == "")) {

        Form.fields('LBL_POSSUI_PROCURADOR').visible(true);
        Form.fields('LBL_MSG_PROCURADOR').visible(false);
        Form.fields('CAD_DP_POS_PROCURADOR').visible(true);
        Form.fields('CAD_DP_POS_PROCURADOR').required(true);

        Form.fields('CAD_CPF_PROCURADOR').visible(false);
        Form.fields('CAD_CPF_PROCURADOR').required(false);
        Form.fields('CAD_CPF_PROCURADOR').value("");
        //Form.fields('CAD_DP_POS_PROCURADOR').value("Sim");

    }


    else {

        Form.fields('CAD_CPF_PROCURADOR').visible(false);
        Form.fields('CAD_CPF_PROCURADOR').required(false);

        Form.fields('LBL_MSG_PROCURADOR').visible(false);

    }

    Form.apply();
}

//Cadastro Novo Física – Associação Não -- Prospectado por não aparece

function esconderProspectado() {
    debugger

    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();

    if (tipoPessoa == "Pessoa Física" && tipoAssociacao == "Não") {

        Form.fields('CAD_PROSPECTADOR').visible(false);
        Form.fields('LBL_PROSPECTADO_POR').visible(false);
        Form.fields('CAD_PROSPECTADO_POR').visible(false);

    }

    Form.apply();

}

//Regra do CRL: Associação Sim --> CRL bloqueado e SIM , senao CRL opcional e para usuario escolher.

function bloquearCadastroAssociacao() {
    debugger

    let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
    let cadastro = Form.fields('CAD_L_CADASTRO_ASSOC').value();

    if (tipoAssociacao == "Sim") {

        Form.fields('CAD_L_CADASTRO_ASSOC').visible(true);
        Form.fields('CAD_L_CADASTRO_ASSOC').disabled(true);
        Form.fields('CAD_L_CADASTRO_ASSOC').value("Sim");

    }

    else if (tipoAssociacao == "Não" && cadastro != undefined || cadastro != "") {

        Form.fields('CAD_L_CADASTRO_ASSOC').visible(true);
        Form.fields('CAD_L_CADASTRO_ASSOC').disabled(false);
        Form.fields('CAD_L_CADASTRO_ASSOC').required(true);

    }

    else if (tipoAssociacao == "Não") {

        Form.fields('CAD_L_CADASTRO_ASSOC').visible(true);
        Form.fields('CAD_L_CADASTRO_ASSOC').disabled(false);
        Form.fields('CAD_L_CADASTRO_ASSOC').required(true);
        Form.fields('CAD_L_CADASTRO_ASSOC').value("");

    }


    else {

        Form.fields('CAD_L_CADASTRO_ASSOC').visible(false);
        Form.fields('CAD_L_CADASTRO_ASSOC').required(false);

    }

    Form.apply();

}

//Habilitar Check-box no caso de Cadastro de Associação Não.

function habilitarChecks() {
    debugger

    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    let tipoCadastro = Form.fields('CAD_CADASTRO_ASSOC').value();

    if (tipoCadastro == "Não" && tipoPessoa == "Pessoa Física") {


        Form.fields('LBL_CADASTRO_NOVO').visible(true);
        Form.fields('CHECK_DADOS_P_PF').visible(true);
        Form.fields('CHECK_ANEXOS_PF').visible(true);
        Form.fields('CHECK_RENDA_PF').visible(true);
        Form.fields('CHECK_PROCURADOR_PF').visible(true);

        Form.fields('LBL_DADOS_PESSOAIS').visible(true);

        Form.fields('CAD_DP_NOME').visible(true);
        Form.fields('CAD_DP_NOME').required(true);

        Form.fields('CAD_CPF_CNPJ').visible(true);
        Form.fields('CAD_CPF_CNPJ').required(true);

        //Pessoa Jurídica

        Form.fields('LBL_ATUALI_PJ').visible(false);
        Form.fields('CHECK_DADOS_P_PJ').visible(false);
        Form.fields('CHECK_ANEXOS_PJ').visible(false);
        Form.fields('CHECK_PATRIMONIO_PJ').visible(false);
        Form.fields('CHECK_FATURAMENTO_PJ').visible(false);
        Form.fields('CHECK_SOCIOS_PJ').visible(false);
        Form.fields('LBL_DADOS_PJ').visible(false);

    }

    else if (tipoCadastro == "Não" && tipoPessoa == "Pessoa Jurídica") {

        Form.fields('LBL_ATUALI_PJ').visible(true);

        Form.fields('CHECK_DADOS_P_PJ').visible(true);
        Form.fields('CHECK_DADOS_P_PJ').required(false);

        Form.fields('CHECK_ANEXOS_PJ').visible(true);
        Form.fields('CHECK_ANEXOS_PJ').required(false);

        Form.fields('CHECK_PATRIMONIO_PJ').visible(true);
        Form.fields('CHECK_PATRIMONIO_PJ').required(false);

        Form.fields('CHECK_FATURAMENTO_PJ').visible(true);
        Form.fields('CHECK_FATURAMENTO_PJ').required(false);

        Form.fields('CHECK_SOCIOS_PJ').visible(true);
        Form.fields('CHECK_SOCIOS_PJ').required(false);

        Form.fields('LBL_DADOS_PJ').visible(true);

        Form.fields('CAD_RAZAO_SOCIAL').visible(true);
        Form.fields('CAD_RAZAO_SOCIAL').required(true);

        Form.fields('CAD_NOME_FANTASIA').visible(true);
        Form.fields('CAD_NOME_FANTASIA').required(true);

        Form.fields('CAD_CPF_CNPJ').visible(false);
        Form.fields('CAD_CPF_CNPJ').required(true);
        Form.fields('AUX_CNPJ').visible(true);
        Form.fields('AUX_CNPJ').required(true);

        //Pessoa Física

        Form.fields('LBL_CADASTRO_NOVO').visible(false);
        Form.fields('CHECK_DADOS_P_PF').visible(false);
        Form.fields('CHECK_ANEXOS_PF').visible(false);
        Form.fields('CHECK_RENDA_PF').visible(false);
        Form.fields('CHECK_PROCURADOR_PF').visible(false);

        Form.fields('LBL_DADOS_PESSOAIS').visible(false);

        Form.fields('CAD_DP_NOME').visible(false);
        Form.fields('CAD_DP_NOME').required(false);


    }

    else if (tipoCadastro == "Sim" && tipoPessoa == "Pessoa Física") {

        Form.fields('LBL_DADOS_PESSOAIS').visible(true);
        Form.fields('LBL_CADASTRO_NOVO').visible(false);
        Form.fields('CHECK_DADOS_P_PF').visible(false);
        Form.fields('CHECK_ANEXOS_PF').visible(false);
        Form.fields('CHECK_RENDA_PF').visible(false);
        Form.fields('CHECK_PROCURADOR_PF').visible(false);

    }

    else {

        ocultarCamposIniciais();

        Form.fields('LBL_CADASTRO_NOVO').visible(false);
        Form.fields('LBL_DADOS_PESSOAIS').visible(false);
        Form.fields('CHECK_DADOS_P_PF').visible(false);
        Form.fields('CHECK_ANEXOS_PF').visible(false);
        Form.fields('CHECK_RENDA_PF').visible(false);
        Form.fields('CHECK_PROCURADOR_PF').visible(false);

    }

    Form.apply();

}

function checkBoxDados() {
    debugger;

    let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
    let checkDados = Form.fields('CHECK_DADOS_P_PF').value();
    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();

    if (checkDados == "OK" && tipoPessoa == "Pessoa Física" && tipoAssociacao == "Não") {

        Form.fields('LBL_CADASTRO_NOVO').visible(true);
        Form.fields('LBL_DADOS_PESSOAIS').visible(true);

        Form.fields('CAD_DP_NOME').visible(true);
        Form.fields('CAD_DP_NOME').required(true);

        Form.fields('CAD_CPF_CNPJ').visible(true);
        Form.fields('CAD_CPF_CNPJ').required(true);

        Form.fields('CAD_DP_EMAIL').visible(true);
        Form.fields('CAD_DP_EMAIL').required(true);

        Form.fields('CAD_DP_TELEFONE').visible(true);
        Form.fields('CAD_DP_TELEFONE').required(true);

        Form.fields('CAD_DP_ESCOLARIDADE').visible(true);
        Form.fields('CAD_DP_ESCOLARIDADE').required(true);

        Form.fields('CAD_DP_ESTADO_CIVIL').visible(true);
        Form.fields('CAD_DP_ESTADO_CIVIL').required(true);


    }

    else if (checkDados == undefined && tipoPessoa == "Pessoa Física" && tipoAssociacao == "Sim") {

        Form.fields('LBL_TIPO_CADASTRO').visible(true);
        Form.fields('LBL_DADOS_PESSOAIS').visible(false);

        Form.fields('CAD_DP_NOME').visible(true);
        Form.fields('CAD_DP_NOME').required(true);

        Form.fields('CAD_CPF_CNPJ').visible(true);
        Form.fields('CAD_CPF_CNPJ').required(true);

        Form.fields('CAD_DP_EMAIL').visible(true);
        Form.fields('CAD_DP_EMAIL').required(true);

        Form.fields('CAD_DP_TELEFONE').visible(true);
        Form.fields('CAD_DP_TELEFONE').required(true);

        Form.fields('CAD_DP_ESCOLARIDADE').visible(true);
        Form.fields('CAD_DP_ESCOLARIDADE').required(true);

        //Form.fields('CAD_DP_ESTADO_CIVIL').visible(true);
        //Form.fields('CAD_DP_ESTADO_CIVIL').required(true);


    }

    else if (checkDados == "" && tipoPessoa == "Pessoa Física" && tipoAssociacao == "Não") {



        Form.fields('LBL_CADASTRO_NOVO').visible(true);
        Form.fields('LBL_DADOS_PESSOAIS').visible(true);

        Form.fields('CAD_DP_NOME').visible(true);
        Form.fields('CAD_DP_NOME').required(true);

        Form.fields('CAD_CPF_CNPJ').visible(true);
        Form.fields('CAD_CPF_CNPJ').required(true);

        Form.fields('CAD_DP_EMAIL').visible(false);
        Form.fields('CAD_DP_EMAIL').required(false);

        Form.fields('CAD_DP_TELEFONE').visible(false);
        Form.fields('CAD_DP_TELEFONE').required(false);

        Form.fields('CAD_DP_ESCOLARIDADE').visible(false);
        Form.fields('CAD_DP_ESCOLARIDADE').required(false);

        //Form.fields('CAD_DP_ESTADO_CIVIL').visible(false);
        //Form.fields('CAD_DP_ESTADO_CIVIL').required(false);

        //Form.fields('CAD_CPF_CONJUGE').visible(false);
        //Form.fields('CAD_CPF_CONJUGE').required(false);

    }

    else if (checkDados == undefined && tipoPessoa == "Pessoa Física" && tipoAssociacao == "Não") {

        Form.fields('LBL_CADASTRO_NOVO').visible(true);
        Form.fields('LBL_DADOS_PESSOAIS').visible(false);

        Form.fields('CAD_DP_NOME').visible(true);
        Form.fields('CAD_DP_NOME').required(true);

        Form.fields('CAD_CPF_CNPJ').visible(false);
        Form.fields('CAD_CPF_CNPJ').required(false);

        Form.fields('CAD_DP_EMAIL').visible(false);
        Form.fields('CAD_DP_EMAIL').required(false);

        Form.fields('CAD_DP_TELEFONE').visible(false);
        Form.fields('CAD_DP_TELEFONE').required(false);

        Form.fields('CAD_DP_ESCOLARIDADE').visible(false);
        Form.fields('CAD_DP_ESCOLARIDADE').required(false);

        //Form.fields('CAD_DP_ESTADO_CIVIL').visible(false);
        //Form.fields('CAD_DP_ESTADO_CIVIL').required(false);

    }

    else {

        Form.fields('LBL_CADASTRO_NOVO').visible(false);
        Form.fields('LBL_DADOS_PESSOAIS').visible(false);

        Form.fields('CAD_DP_NOME').visible(false);
        Form.fields('CAD_DP_NOME').required(false);

        Form.fields('CAD_CPF_CNPJ').visible(false);
        Form.fields('CAD_CPF_CNPJ').required(false);

        Form.fields('CAD_DP_EMAIL').visible(false);
        Form.fields('CAD_DP_EMAIL').required(false);

        Form.fields('CAD_DP_TELEFONE').visible(false);
        Form.fields('CAD_DP_TELEFONE').required(false);

        Form.fields('CAD_DP_ESCOLARIDADE').visible(false);
        Form.fields('CAD_DP_ESCOLARIDADE').required(false);

        //Form.fields('CAD_DP_ESTADO_CIVIL').visible(false);
        //Form.fields('CAD_DP_ESTADO_CIVIL').required(false);

        //Form.groups('GDADOSPESSOAIS').visible(false);
        //Form.groups('GDADOSPESSOAIS').required(false);

    }

    Form.apply();

}

function camposCheckRenda() {
    debugger

    let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    let checkRenda = Form.fields('CHECK_RENDA_PF').value();

    if (checkRenda == "OK" && tipoAssociacao == "Não" && tipoPessoa == "Pessoa Física") {

        Form.fields('LBL_POSSUI_RENDA').visible(true);
        Form.fields('CAD_DP_POSSUI_RENDA').visible(true);
        Form.fields('CAD_DP_POSSUI_RENDA').required(true);
        Form.fields('CAD_DP_POSSUI_RENDA').value("Sim");
        Form.grids('GRIDRENDA').visible(true);
        Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').visible(true);

        Form.fields('CAD_DP_NOME').visible(true);
        Form.fields('CAD_DP_NOME').required(true);

        Form.fields('CAD_CPF_CNPJ').visible(true);
        Form.fields('CAD_CPF_CNPJ').required(true);

        //possuiRenda();

    }

    else if ((checkRenda == "" || checkRenda == undefined) && tipoAssociacao == "Não" && tipoPessoa == "Pessoa Física") {

        Form.fields('LBL_POSSUI_RENDA').visible(false);
        Form.fields('CAD_DP_POSSUI_RENDA').visible(false);
        Form.fields('CAD_DP_POSSUI_RENDA').required(false);
        //Form.fields('CAD_DP_POSSUI_RENDA').value("");
        Form.grids('GRIDRENDA').visible(false);

    }

    else {

        Form.fields('LBL_POSSUI_RENDA').visible(false);
        Form.fields('CAD_DP_POSSUI_RENDA').visible(false);
        Form.fields('CAD_DP_POSSUI_RENDA').required(false);
        //Form.fields('CAD_DP_POSSUI_RENDA').value("");
        Form.grids('GRIDRENDA').visible(false).apply();

    }

    Form.apply();

}


function camposCheckAnexos() {
    debugger

    let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    let estadoCivil = Form.fields('CAD_DP_ESTADO_CIVIL').value();
    let anexos = Form.fields('CHECK_ANEXOS_PF').value();
    let dados = Form.fields('CHECK_DADOS_P_PF').value();

    if (tipoPessoa == "Pessoa Física" && tipoAssociacao == "Não" && (anexos == "OK" && (estadoCivil != "Casado(a)"))) {

        Form.fields('CAD_DP_ANEXOS').visible(true);
        Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').required(true);
        Form.grids('ANEXODOCS').fields('CAD_DP_DOC_IDENT').required(true);
        Form.grids('ANEXODOCS').visible(true);
        //Form.fields('CAD_DP_ESTADO_CIVIL').visible(true);
        //Form.fields('CAD_DP_ESTADO_CIVIL').required(true);

        Form.fields('LBL_DADOS_PESSOAIS').visible(true);

        Form.fields('CAD_DP_NOME').visible(true);
        Form.fields('CAD_DP_NOME').required(true);

        Form.fields('CAD_CPF_CNPJ').visible(true);
        Form.fields('CAD_CPF_CNPJ').required(true);

    }

    else if (tipoPessoa == "Pessoa Física" && tipoAssociacao == "Não" && anexos == "OK" && estadoCivil == "Casado(a)") {

        Form.fields('LBL_DADOS_PESSOAIS').visible(true);
        Form.fields('CAD_DP_ANEXOS').visible(true);
        Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').required(true);
        Form.grids('ANEXODOCS').fields('CAD_DP_DOC_IDENT').required(true);
        Form.grids('ANEXODOCS').visible(true);
        //Form.fields('CAD_DP_ESTADO_CIVIL').visible(true);
        //Form.fields('CAD_DP_ESTADO_CIVIL').required(true);
        //Form.fields('CAD_CPF_CONJUGE').visible(true);
        //Form.fields('CAD_CPF_CONJUGE').required(true);

    }

    else if (tipoPessoa == "Pessoa Física" && tipoAssociacao == "Não" && (anexos == undefined || anexos == "") && dados == "OK") {

        Form.grids('ANEXODOCS').visible(false);
        Form.fields('CAD_DP_ANEXOS').visible(false);
        //Form.fields('CAD_DP_ESTADO_CIVIL').visible(true);

    }

    else if (tipoPessoa == "Pessoa Física" && tipoAssociacao == "Não" && (anexos == undefined || anexos == "")) {

        Form.fields('LBL_DADOS_PESSOAIS').visible(true);
        Form.fields('CAD_DP_NOME').visible(true);
        Form.fields('CAD_CPF_CNPJ').visible(true);
        Form.grids('ANEXODOCS').visible(false);
        Form.fields('CAD_DP_ANEXOS').visible(false);
        //Form.fields('CAD_DP_ESTADO_CIVIL').visible(false);
        //Form.fields('CAD_DP_ESTADO_CIVIL').required(false);
        //Form.fields('CAD_CPF_CONJUGE').visible(false);
        //Form.fields('CAD_CPF_CONJUGE').required(false);

    }

    else if (tipoPessoa == "Pessoa Física" && tipoAssociacao == "Não" && dados == "OK" && (anexos == undefined || anexos == "")) {

        Form.grids('ANEXODOCS').visible(false);
        Form.fields('CAD_DP_ANEXOS').visible(false);
        //Form.fields('CAD_DP_ESTADO_CIVIL').visible(true);

    }

    else if ((tipoPessoa == "Pessoa Física" && tipoAssociacao == "Não") && ((anexos == undefined || anexos == "") && estadoCivil != undefined)) {

        Form.grids('ANEXODOCS').visible(false);
        Form.fields('CAD_DP_ANEXOS').visible(false);
        //Form.fields('CAD_DP_ESTADO_CIVIL').visible(false);

    }

    else if ((tipoPessoa == "Pessoa Física" && tipoAssociacao == "Sim") && ((anexos == undefined || anexos == "") && estadoCivil != undefined)) {

        Form.grids('ANEXODOCS').visible(true);
        Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').required(true);
        Form.grids('ANEXODOCS').fields('CAD_DP_DOC_IDENT').required(true);
        Form.fields('CAD_DP_ANEXOS').visible(true);
        //Form.fields('CAD_DP_ESTADO_CIVIL').visible(true);

    }

    else if ((tipoPessoa == "Pessoa Física" && tipoAssociacao == "Não") && (anexos == "OK" && estadoCivil == "Casado(a)")) {

        Form.grids('ANEXODOCS').visible(true);
        Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').required(true);
        Form.grids('ANEXODOCS').fields('CAD_DP_DOC_IDENT').required(true);
        Form.fields('CAD_DP_ANEXOS').visible(true);
        //Form.fields('CAD_DP_ESTADO_CIVIL').visible(true);
        //Form.fields('CAD_CPF_CONJUGE').visible(true);
        //Form.fields('CAD_CPF_CONJUGE').required(true);

    }

    else if ((tipoPessoa == "Pessoa Física" && tipoAssociacao == "Não") && ((anexos == "" || anexos == undefined) && estadoCivil == "Casado(a)")) {

        Form.grids('ANEXODOCS').visible(true);
        Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').required(true);
        Form.grids('ANEXODOCS').fields('CAD_DP_DOC_IDENT').required(true);
        Form.fields('CAD_DP_ANEXOS').visible(true);
        //Form.fields('CAD_DP_ESTADO_CIVIL').visible(true);
        //Form.fields('CAD_CPF_CONJUGE').visible(false);
        //Form.fields('CAD_CPF_CONJUGE').required(false);

    }

    else {

        Form.grids('ANEXODOCS').visible(false);
        Form.fields('CAD_DP_ANEXOS').visible(false);
        //Form.fields('CAD_DP_ESTADO_CIVIL').visible(false);

    }

    Form.apply();

}

function camposCheckProcurador() {
    debugger

    let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    let procuracao = Form.fields('CHECK_PROCURADOR_PF').value();

    if (tipoAssociacao == "Não" && tipoPessoa == "Pessoa Física" && procuracao == "OK") {

        Form.fields('LBL_POSSUI_PROCURADOR').visible(true);

        Form.fields('CAD_DP_POS_PROCURADOR').visible(true);
        Form.fields('CAD_DP_POS_PROCURADOR').required(true);
        Form.fields('CAD_DP_POS_PROCURADOR').value("Sim");


        Form.fields('CAD_CPF_PROCURADOR').visible(true);
        Form.fields('CAD_CPF_PROCURADOR').required(true);
        Form.fields('LBL_MSG_PROCURADOR').visible(true);

        Form.fields('CAD_DP_NOME').visible(true);
        Form.fields('CAD_DP_NOME').required(true);

        Form.fields('CAD_CPF_CNPJ').visible(true);
        Form.fields('CAD_CPF_CNPJ').required(true);

    }


    else {

        Form.fields('LBL_POSSUI_PROCURADOR').visible(false);
        Form.fields('LBL_MSG_PROCURADOR').visible(false);

        Form.fields('CAD_DP_POS_PROCURADOR').visible(false);
        Form.fields('CAD_DP_POS_PROCURADOR').required(false);

        Form.fields('CAD_CPF_PROCURADOR').visible(false);
        Form.fields('CAD_CPF_PROCURADOR').required(false);

    }

    Form.apply();

}

//Campo “Processo Aberto por:” ficar sempre invisível e aparecer apenas se tiver alguma informação preenchida


function abertoPor() {
    debugger

    let abertoPor = Form.fields('AUX_PLD_CONTROLE').value();

    if (abertoPor == undefined || abertoPor == "" || abertoPor == " ") {

        Form.fields('AUX_PLD_CONTROLE').visible(false);

    }
    else {

        Form.fields('AUX_PLD_CONTROLE').visible(true);
        Form.fields('AUX_PLD_CONTROLE').disabled(true);

    }

    Form.apply();

}

function laudoCRL() {

    let laudoControle = Form.fields('AUX_PLD_CONTROLE').value();

    if (laudoControle == "Laudo de Avaliação de Imóveis") {

        Form.fields('CAD_L_CADASTRO_ASSOC').value("Não");
        Form.fields('CAD_L_CADASTRO_ASSOC').disabled(true);
    }

    Form.apply();
}


// chamar a função passando a variavel que contem os campos como parametro
function minimoCheck(arrayCamposPF) {
    debugger;

    let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    var camposOK = 0;
    if (tipoAssociacao == "Não" && tipoPessoa == "Pessoa Física") {

        for (var i = 0; i < arrayCamposPF.length; i++) {

            campo = arrayCamposPF[i];
            valorCampo = Form.fields(campo).value();

            if (valorCampo == "OK") {
                camposOK++
            }
        }

        if (camposOK == 0) {

            Form.addCustomModal({
                title: "ATENÇÃO",
                description:
                    "Atenção, para Atualização de Cadastro será necessário marcar ao menos 1 Checkbox!",
                //false para não aparecer o botão “fechar” padrão da modal
                showButtonClose: false,
                buttons: [
                    {
                        name: "Fechar",
                        icon: "close",
                        // true: para fechar a modal após a ação ser realizada e false: para não fechar a modal
                        closeOnClick: true,
                        action: function () {
                            //ação a ser realizada
                        },
                    },
                ],
            });

            Form.actions('aprovar').hidden(true).apply();
        }
        else {

            Form.actions('aprovar').hidden(false).apply();

        }

        Form.apply().then(function () {
            limparLeanOverlay();
        });

    }

    else {

        Form.actions('aprovar').hidden(false).apply();

    }
}

// chamar a função passando a variavel que contem os campos como parametro
function minimoCheckPJ(arrayCamposPJ) {
    debugger;

    let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    var camposOK = 0;
    if (tipoAssociacao == "Não" && tipoPessoa == "Pessoa Jurídica") {

        for (var i = 0; i < arrayCamposPJ.length; i++) {

            campo = arrayCamposPJ[i];
            valorCampo = Form.fields(campo).value();

            if (valorCampo == "OK") {
                camposOK++
            }
        }

        if (camposOK == 0) {

            Form.addCustomModal({
                title: "ATENÇÃO",
                description:
                    "Atenção, para Atualização de Cadastro será necessário marcar ao menos 1 Checkbox!",
                //false para não aparecer o botão “fechar” padrão da modal
                showButtonClose: false,
                buttons: [
                    {
                        name: "Fechar",
                        icon: "close",
                        // true: para fechar a modal após a ação ser realizada e false: para não fechar a modal
                        closeOnClick: true,
                        action: function () {
                            //ação a ser realizada
                        },
                    },
                ],
            });

            Form.actions('aprovar').hidden(true).apply();
        }
        else {

            Form.actions('aprovar').hidden(false).apply();

        }

        Form.apply().then(function () {
            limparLeanOverlay();
        });

    }

    else {

        Form.actions('aprovar').hidden(false).apply();

    }
}



function validaSubmitGrid(grid, reject, text) {
    if (grid.dataRows().length <= 0) {
        grid.errors(text);

        reject();

        return false;
    }

    return true;
}


//Limpar tela cinza do Modal
function limparLeanOverlay() {
    const leanOverlay = document.querySelectorAll(".lean-overlay");

    leanOverlay.forEach((item) => (item.style.display = "none"));
}


//Campo Cadastro para Associação? Colocar como primeiro e se estiver Sim obrigar todas as informações

function camposCadastroNovo() {
    debugger

    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    let tipoCadastro = Form.fields('CAD_CADASTRO_ASSOC').value();

    if (tipoCadastro == "Não" && tipoPessoa == "Pessoa Física") {

        Form.groups('GDADOSPESSOAIS').visible(false).apply();

    }

    else if (tipoCadastro == "Não" && (tipoPessoa == undefined || tipoPessoa == "")) {

        Form.groups('GDADOSPESSOAIS').visible(false).apply();
        Form.fields('CAD_DP_ANEXOS').visible(false);
        Form.groups('GR_PJ').visible(false);



    }

    else if ((tipoCadastro == undefined || tipoCadastro == "") && (tipoPessoa == undefined || tipoPessoa == "")) {

        Form.groups('GDADOSPESSOAIS').visible(false).apply();
        Form.fields('CAD_DP_ANEXOS').visible(false);
        Form.groups('GR_PJ').visible(false);

    }

    else if (tipoCadastro == "Sim" && (tipoPessoa == undefined || tipoPessoa == "")) {

        Form.groups('GDADOSPESSOAIS').visible(false).apply();
        Form.fields('CAD_DP_ANEXOS').visible(false);
        Form.groups('GR_PJ').visible(false);

    }

    //Pessoa Jurídica - Não

    else if (tipoCadastro == "Não" && tipoPessoa == "Pessoa Jurídica") {

        Form.groups('GDADOSPESSOAIS').visible(false).apply();
        Form.fields('CAD_DP_ANEXOS').visible(false);
        Form.fields('CAD_ENCONTROU_CNPJ').visible(false).apply();
        //ocultarCamposIniciais();

        //Atualização PJ

        Form.fields('LBL_ATUALI_PJ').visible(true);

        Form.fields('CHECK_DADOS_P_PJ').visible(true);
        Form.fields('CHECK_DADOS_P_PJ').required(true);

        Form.fields('CHECK_DADOS_P_PJ').visible(true);
        Form.fields('CHECK_DADOS_P_PJ').required(true);

        Form.fields('CHECK_ANEXOS_PJ').visible(true);
        Form.fields('CHECK_ANEXOS_PJ').required(true);

        Form.fields('CHECK_FATURAMENTO_PJ').visible(true);
        Form.fields('CHECK_FATURAMENTO_PJ').required(true);

        Form.fields('CHECK_PATRIMONIO_PJ').visible(true);
        Form.fields('CHECK_PATRIMONIO_PJ').required(true);

        Form.fields('CHECK_SOCIOS_PJ').visible(true);
        Form.fields('CHECK_SOCIOS_PJ').required(true);

    }

    //Pessoa Jurídica - Sim

    else if (tipoCadastro == "Sim" && tipoPessoa == "Pessoa Jurídica") {

        Form.groups('GDADOSPESSOAIS').visible(false).apply();
        Form.fields('CAD_DP_ANEXOS').visible(false);
        Form.groups('GR_PJ').visible(true);

        Form.fields('CAD_CPF_CNPJ').visible(false);
        Form.fields('AUX_CNPJ').visible(true);
        Form.fields('CAD_ENCONTROU_CNPJ').visible(false).apply();

        //Atualização PJ

        Form.fields('LBL_ATUALI_PJ').visible(false);
        Form.fields('CHECK_DADOS_P_PJ').visible(false);
        Form.fields('CHECK_ANEXOS_PJ').visible(false);
        Form.fields('CHECK_FATURAMENTO_PJ').visible(false);
        Form.fields('CHECK_PATRIMONIO_PJ').visible(false);
        Form.fields('CHECK_SOCIOS_PJ').visible(false);

        //Dados Pessoa Jurídica

        Form.fields('LBL_DADOS_PJ').visible(true);

        Form.fields('CAD_RAZAO_SOCIAL').visible(true);
        Form.fields('CAD_RAZAO_SOCIAL').required(true);

        Form.fields('CAD_NOME_FANTASIA').visible(true);
        Form.fields('CAD_NOME_FANTASIA').required(true);

        Form.fields('CAD_EMAIL_PJ').visible(true);
        Form.fields('CAD_EMAIL_PJ').required(true);

        Form.fields('CAD_TEL_FIXO_PJ').visible(true);
        Form.fields('CAD_TEL_FIXO_PJ').required(true);

        Form.fields('CAD_CEL_PJ').visible(true);
        Form.fields('CAD_CEL_PJ').required(true);


        //Anexos PJ

        Form.fields('LBL_ANEXOS_PF').visible(true);

        Form.grids('GRID_PJ').fields('CAD_LISTA_PJ').visible(true);
        Form.grids('GRID_PJ').fields('CAD_LISTA_PJ').required(true);

        Form.grids('GRID_PJ').fields('CAD_ANEXO_PJ').visible(true);
        Form.grids('GRID_PJ').fields('CAD_ANEXO_PJ').required(true);


        //Possui Faturamento

        Form.fields('LBL_FATURAMENTO_PF').visible(true);

        Form.fields('CAD_POSSUI_FAT_PJ').visible(true);
        Form.fields('CAD_POSSUI_FAT_PJ').required(true);

        Form.grids('GRID_FAT_PJ').visible(false);
        Form.grids('GRID_FAT_PJ').fields('CAD_TIPO_DOC_PJ').visible(false);

        Form.grids('GRID_FAT_PJ').fields('CAD_ANEXO_FAT_PJ').visible(false);


        //Possui Patrimônio

        Form.fields('LBL_POSSUI_PATROMONIO').visible(true);

        Form.fields('CAD_POSSUI_PATRI').visible(true);
        Form.fields('CAD_POSSUI_PATRI').required(true);

        Form.grids('GRID_PAT_PJ').visible(false);

        Form.grids('GRID_PAT_PJ').fields('CAD_ANEXO_PATRI').visible(false);
        Form.grids('GRID_PAT_PJ').fields('CAD_TIPO_DOC_PATRI').visible(false);



        //Possui sócios

        Form.fields('LBL_SOCIOS_PJ').visible(true);

        Form.grids('GRID_SOCIO_PJ').visible(true);

        Form.grids('GRID_SOCIO_PJ').fields('CAD_TIP_SOCIO').visible(true);
        Form.grids('GRID_SOCIO_PJ').fields('CAD_NOME_SOCIO_PJ').visible(true);
        Form.grids('GRID_SOCIO_PJ').fields('CAD_CPF_SOCIO').visible(true);
        Form.grids('GRID_SOCIO_PJ').fields('CAD_CNPJ_SOCIO').visible(true);

        //Campos pessoa física required = true

        Form.fields('CAD_DP_NOME').required(false);
        Form.fields('CAD_DP_TELEFONE').required(false);
        Form.fields('CAD_DP_EMAIL').required(false);
        Form.fields('CAD_DP_ESCOLARIDADE').required(false);
        Form.fields('CAD_DP_ESTADO_CIVIL').required(false);
        Form.fields('CAD_DP_POSSUI_RENDA').required(false);
        Form.fields('CAD_DP_POS_PROCURADOR').required(false);

    }

    else {

        //prospectado
        Form.fields('CAD_PA').visible(false);
        Form.fields('CAD_PROSPECTADOR').visible(false);
        Form.fields('LBL_PROSPECTADO_POR').visible(false);
        Form.fields('CAD_PROSPECTADO_POR').visible(false);
        Form.fields('CAD_DEPTO').visible(false);
        Form.fields('CAD_PA_USUARIO_INICIADO').visible(false);
        Form.fields('CAD_PA_DESTINO').visible(false);


        //dados

        Form.groups('GR_ATUALIZACAO').visible(false);
        Form.groups('GDADOSPESSOAIS').visible(true);
        Form.groups('GR_PJ').visible(false);
        Form.groups('GR_LAUDO').visible(false);
        Form.groups('GCADASTRARSISBR').visible(false);
        Form.groups('GAJUSTARPA').visible(false);
        Form.groups('GNCADATU').visible(false);
        Form.groups('GCENTRALIZADORA').visible(false);
        Form.groups('GAJUSTEANALISTA').visible(false);

        Form.groups('GDADOSPESSOAIS').visible(true).apply();
        Form.grids('GRIDRENDA').visible(false).apply();
        Form.fields('PROCURAR_CPF_CNPJ').visible(false);
        Form.fields('CAD_CPF_CONJUGE').visible(false);

        abrirProspectado();
        abrirProspectadoDepartamento();
        possuiProcurador();

        Form.fields('CAD_DP_ANEXOS').visible(true);
        //Form.fields('CAD_CPF_CONJUGE').visible(false);
        Form.grids('ANEXODOCS').visible(true);
        Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').required(true);
        Form.grids('ANEXODOCS').fields('CAD_DP_DOC_IDENT').required(true);

        //obrigar campos que devem aparecer no início

        Form.fields('CAD_DP_POS_PROCURADOR').required(true);
        Form.fields('CAD_DP_POSSUI_RENDA').required(true);
        Form.fields('CAD_DP_NOME').required(true);
        Form.fields('CAD_CPF_CNPJ').required(true);
        //Form.fields('AUX_CNPJ').required(true);

        Form.fields('CAD_DP_TELEFONE').required(true);
        Form.fields('CAD_DP_EMAIL').required(true);
        Form.fields('CAD_DP_ESCOLARIDADE').required(true);
        Form.fields('CAD_DP_EMAIL').required(true);
        Form.fields('CAD_DP_ESTADO_CIVIL').required(true);


    }

    Form.apply();

}

function tipoSocio() {

    let tipoSocio = Form.grids('GRID_SOCIO_PJ').fields('CAD_TIP_SOCIO').value();

    if (tipoSocio == undefined || tipoSocio == "") {

        Form.grids('GRID_SOCIO_PJ').fields('CAD_CPF_SOCIO').visible(true);
        Form.grids('GRID_SOCIO_PJ').fields('CAD_CPF_SOCIO').disabled(true);

        Form.grids('GRID_SOCIO_PJ').fields('CAD_CNPJ_SOCIO').visible(true);
        Form.grids('GRID_SOCIO_PJ').fields('CAD_CNPJ_SOCIO').disabled(true);

        Form.grids('GRID_SOCIO_PJ').fields('CAD_NOME_SOCIO_PJ').required(true);
        Form.grids('GRID_SOCIO_PJ').fields('CAD_TIP_SOCIO').required(true);


    }

    else if (tipoSocio == "Sócio PF") {

        Form.grids('GRID_SOCIO_PJ').fields('CAD_CPF_SOCIO').visible(true);
        Form.grids('GRID_SOCIO_PJ').fields('CAD_CPF_SOCIO').disabled(false);
        Form.grids('GRID_SOCIO_PJ').fields('CAD_CPF_SOCIO').required(true);

        Form.grids('GRID_SOCIO_PJ').fields('CAD_NOME_SOCIO_PJ').required(true);

        Form.grids('GRID_SOCIO_PJ').fields('CAD_CNPJ_SOCIO').visible(true);
        Form.grids('GRID_SOCIO_PJ').fields('CAD_CNPJ_SOCIO').disabled(true);
        Form.grids('GRID_SOCIO_PJ').fields('CAD_CNPJ_SOCIO').required(false);
        Form.grids('GRID_SOCIO_PJ').fields('CAD_CNPJ_SOCIO').value('');


    }

    else {

        Form.grids('GRID_SOCIO_PJ').fields('CAD_CPF_SOCIO').visible(true);
        Form.grids('GRID_SOCIO_PJ').fields('CAD_CPF_SOCIO').disabled(true);
        Form.grids('GRID_SOCIO_PJ').fields('CAD_CPF_SOCIO').required(false);
        Form.grids('GRID_SOCIO_PJ').fields('CAD_CPF_SOCIO').value('');

        Form.grids('GRID_SOCIO_PJ').fields('CAD_CNPJ_SOCIO').visible(true);
        Form.grids('GRID_SOCIO_PJ').fields('CAD_CNPJ_SOCIO').disabled(false);
        Form.grids('GRID_SOCIO_PJ').fields('CAD_CNPJ_SOCIO').required(true);

        Form.grids('GRID_SOCIO_PJ').fields('CAD_NOME_SOCIO_PJ').required(true);

    }

    Form.apply();
}

/*;Casado(a)
;Divorciado(a) / Separado(a) 
;Solteiro(a)
;União Estável
;Viúvo(a)

const listaSolteiro = ["Documento Identificação", "Comprovante Residência", "Receita", "Serasa", "Bacen", "Outros"];

const listaCasado = ["Documento Identificação", "Comprovante Residência", "Certidão de Casamento", "Receita", "Serasa", "Bacen", "Outros"];

const listaDivorciado = ["Documento Identificação", "Comprovante Residência", "Certidão de Casamento com Averbação", "Receita", "Serasa", "Bacen", "Outros"];

const listaUniaoEstavel = ["Documento Identificação", "Comprovante Residência", "COMPROVANTE UNIÃO ESTÁVEL", "Receita", "Serasa", "Bacen", "Outros"];

const listaViuvo =  ["Documento Identificação", "Comprovante Residência", "Certidão de Óbito", "Receita", "Serasa", "Bacen", "Outros"];


*/

function preencheListaDocumentos() {
    debugger

    let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    let estadoCivil = Form.fields('CAD_DP_ESTADO_CIVIL').value();

    if (tipoAssociacao == "Sim" && tipoPessoa == "Pessoa Física") {

        if (estadoCivil == undefined || estadoCivil == "") {

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').removeOptions([]).apply();

            Form.fields('CAD_CPF_CONJUGE').visible(false).apply();
            Form.fields('CAD_CPF_CONJUGE').value("").apply();


        }

        else if (estadoCivil == "Casado(a)") {

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').removeOptions([]).apply();

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').
                addOptions([

                    { name: 'Documento Identificação', value: 'Documento Identificação' },
                    { name: 'Comprovante Residência', value: 'Comprovante Residência' },
                    { name: 'Certidão de Casamento', value: 'Certidão de Casamento' },
                    { name: 'Receita', value: 'Receita' },
                    { name: 'Serasa', value: 'Serasa' },
                    { name: 'Bacen', value: 'Bacen' },
                    { name: 'Patrimônio', value: 'Patrimônio' },
                    { name: 'Outros', value: 'Outros' },

                ]);

            Form.fields('CAD_CPF_CONJUGE').visible(true);
            Form.fields('CAD_CPF_CONJUGE').required(true);


        }

        else if (estadoCivil == "Divorciado(a) / Separado(a)") {

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').removeOptions([]).apply();
            Form.fields('CAD_CPF_CONJUGE').value("").apply();

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').
                addOptions([

                    { name: 'Documento Identificação', value: 'Documento Identificação' },
                    { name: 'Comprovante Residência', value: 'Comprovante Residência' },
                    { name: 'Certidão de Casamento com Averbação', value: 'Certidão de Casamento com Averbação' },
                    { name: 'Receita', value: 'Receita' },
                    { name: 'Serasa', value: 'Serasa' },
                    { name: 'Bacen', value: 'Bacen' },
                    { name: 'Patrimônio', value: 'Patrimônio' },
                    { name: 'Outros', value: 'Outros' },

                ]);

            Form.fields('CAD_CPF_CONJUGE').visible(false);
            Form.fields('CAD_CPF_CONJUGE').required(false);

        }

        else if (estadoCivil == "Solteiro(a)") {

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').removeOptions([]).apply();
            Form.fields('CAD_CPF_CONJUGE').value("").apply();

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').
                addOptions([

                    { name: 'Documento Identificação', value: 'Documento Identificação' },
                    { name: 'Comprovante Residência', value: 'Comprovante Residência' },
                    { name: 'Receita', value: 'Receita' },
                    { name: 'Serasa', value: 'Serasa' },
                    { name: 'Bacen', value: 'Bacen' },
                    { name: 'Patrimônio', value: 'Patrimônio' },
                    { name: 'Outros', value: 'Outros' },

                ]);

            Form.fields('CAD_CPF_CONJUGE').visible(false);
            Form.fields('CAD_CPF_CONJUGE').required(false);

        }

        else if (estadoCivil == "União Estável") {

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').removeOptions([]).apply();
            Form.fields('CAD_CPF_CONJUGE').value("").apply();

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').
                addOptions([

                    { name: 'Documento Identificação', value: 'Documento Identificação' },
                    { name: 'Comprovante Residência', value: 'Comprovante Residência' },
                    { name: 'Comprovante União Estável', value: 'Comprovante União Estável' },
                    { name: 'Receita', value: 'Receita' },
                    { name: 'Serasa', value: 'Serasa' },
                    { name: 'Bacen', value: 'Bacen' },
                    { name: 'Patrimônio', value: 'Patrimônio' },
                    { name: 'Outros', value: 'Outros' },

                ]);

            Form.fields('CAD_CPF_CONJUGE').visible(false);
            Form.fields('CAD_CPF_CONJUGE').required(false);

        }

        else if (estadoCivil == "Viúvo(a)") {

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').removeOptions([]).apply();
            Form.fields('CAD_CPF_CONJUGE').value("").apply();

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').
                addOptions([

                    { name: 'Documento Identificação', value: 'Documento Identificação' },
                    { name: 'Comprovante Residência', value: 'Comprovante Residência' },
                    { name: 'Certidão de Óbito', value: 'Certidão de Óbito' },
                    { name: 'Receita', value: 'Receita' },
                    { name: 'Serasa', value: 'Serasa' },
                    { name: 'Bacen', value: 'Bacen' },
                    { name: 'Patrimônio', value: 'Patrimônio' },
                    { name: 'Outros', value: 'Outros' },

                ]);

            Form.fields('CAD_CPF_CONJUGE').visible(false);
            Form.fields('CAD_CPF_CONJUGE').required(false);

            Form.fields('CAD_CPF_CONJUGE').visible(false);
            Form.fields('CAD_CPF_CONJUGE').required(false);


        }

        else {

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').removeOptions([]).apply();
            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').value('');

        }

        Form.apply();

    }

    if (tipoAssociacao == "Não" && tipoPessoa == "Pessoa Física") {

        if (estadoCivil == undefined || estadoCivil == "") {

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').removeOptions([]).apply();

            Form.fields('CAD_CPF_CONJUGE').visible(false).apply();
            Form.fields('CAD_CPF_CONJUGE').value("").apply();


        }

        else if (estadoCivil == "Casado(a)") {

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').removeOptions([]).apply();

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').
                addOptions([

                    { name: 'Documento Identificação', value: 'Documento Identificação' },
                    { name: 'Comprovante Residência', value: 'Comprovante Residência' },
                    { name: 'Certidão de Casamento', value: 'Certidão de Casamento' },
                    { name: 'Receita', value: 'Receita' },
                    { name: 'Serasa', value: 'Serasa' },
                    { name: 'Bacen', value: 'Bacen' },
                    { name: 'Patrimônio', value: 'Patrimônio' },
                    { name: 'Outros', value: 'Outros' },

                ]);

            Form.fields('CAD_CPF_CONJUGE').visible(true);
            Form.fields('CAD_CPF_CONJUGE').required(true);


        }

        else if (estadoCivil == "Divorciado(a) / Separado(a)") {

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').removeOptions([]).apply();
            Form.fields('CAD_CPF_CONJUGE').value("").apply();

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').
                addOptions([

                    { name: 'Documento Identificação', value: 'Documento Identificação' },
                    { name: 'Comprovante Residência', value: 'Comprovante Residência' },
                    { name: 'Certidão de Casamento com Averbação', value: 'Certidão de Casamento com Averbação' },
                    { name: 'Receita', value: 'Receita' },
                    { name: 'Serasa', value: 'Serasa' },
                    { name: 'Bacen', value: 'Bacen' },
                    { name: 'Patrimônio', value: 'Patrimônio' },
                    { name: 'Outros', value: 'Outros' },

                ]);

            Form.fields('CAD_CPF_CONJUGE').visible(false);
            Form.fields('CAD_CPF_CONJUGE').required(false);

        }

        else if (estadoCivil == "Solteiro(a)") {

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').removeOptions([]).apply();
            Form.fields('CAD_CPF_CONJUGE').value("").apply();

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').
                addOptions([

                    { name: 'Documento Identificação', value: 'Documento Identificação' },
                    { name: 'Comprovante Residência', value: 'Comprovante Residência' },
                    { name: 'Receita', value: 'Receita' },
                    { name: 'Serasa', value: 'Serasa' },
                    { name: 'Bacen', value: 'Bacen' },
                    { name: 'Patrimônio', value: 'Patrimônio' },
                    { name: 'Outros', value: 'Outros' },

                ]);

            Form.fields('CAD_CPF_CONJUGE').visible(false);
            Form.fields('CAD_CPF_CONJUGE').required(false);

        }

        else if (estadoCivil == "União Estável") {

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').removeOptions([]).apply();
            Form.fields('CAD_CPF_CONJUGE').value("").apply();

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').
                addOptions([

                    { name: 'Documento Identificação', value: 'Documento Identificação' },
                    { name: 'Comprovante Residência', value: 'Comprovante Residência' },
                    { name: 'Comprovante União Estável', value: 'Comprovante União Estável' },
                    { name: 'Receita', value: 'Receita' },
                    { name: 'Serasa', value: 'Serasa' },
                    { name: 'Bacen', value: 'Bacen' },
                    { name: 'Patrimônio', value: 'Patrimônio' },
                    { name: 'Outros', value: 'Outros' },

                ]);

            Form.fields('CAD_CPF_CONJUGE').visible(false);
            Form.fields('CAD_CPF_CONJUGE').required(false);

        }

        else if (estadoCivil == "Viúvo(a)") {

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').removeOptions([]).apply();
            Form.fields('CAD_CPF_CONJUGE').value("").apply();

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').
                addOptions([

                    { name: 'Documento Identificação', value: 'Documento Identificação' },
                    { name: 'Comprovante Residência', value: 'Comprovante Residência' },
                    { name: 'Certidão de Óbito', value: 'Certidão de Óbito' },
                    { name: 'Receita', value: 'Receita' },
                    { name: 'Serasa', value: 'Serasa' },
                    { name: 'Bacen', value: 'Bacen' },
                    { name: 'Patrimônio', value: 'Patrimônio' },
                    { name: 'Outros', value: 'Outros' },

                ]);

            Form.fields('CAD_CPF_CONJUGE').visible(false);
            Form.fields('CAD_CPF_CONJUGE').required(false);

        }

        else {

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').removeOptions([]).apply();
            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').value('');

        }

        Form.apply();

    }

    Form.apply();

}

//Se quem está abrindo for do departamento comercial (Rafael Rodrigues) possibilitar a escolha do Departamento 06 ou 05 (estudar)
//Código Rafael Rodrigues = 99
//Código Departamento Comercial = 22


function habilitarDepartamento() {
    debugger

    let codUser = Form.fields('CAD_COD_USER').value();
    let codDepto = Form.fields('CAD_COD_DEPARTAMENTO').value();

    //PRODUCAO == 98 || 23
    //HOMOLOGACAO == 99 || 22

    if (codUser == 98 || codDepto == 23) {

        Form.fields('CAD_DEPTO').disabled(false);
        Form.fields('CAD_DEPTO').required(true);
    }

    else {

        Form.fields('CAD_DEPTO').disabled(true);
        Form.fields('CAD_DEPTO').required(true);
    }

    Form.apply();

}

//Campos etapa Assumir Atividade.

function camposAssumirAtividade() {
    debugger

    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();

    if (tipoPessoa == "Pessoa Física") {

        if (tipoAssociacao == "Sim") {

            let estadoCivil = Form.fields('CAD_DP_ESTADO_CIVIL').value();
            let prospectado = Form.fields('CAD_PROSPECTADOR').value();
            let rural = Form.fields('CAD_RURAL').value();

            //Dados Pessoais
            Form.fields('LBL_TIPO_CADASTRO').visible(true);

            Form.fields('LBL_DADOS_PESSOAIS').visible(true);
            Form.fields('LBL_DADOS_PESSOAIS').readOnly(true);

            Form.fields('CAD_DP_NOME').visible(true);
            Form.fields('CAD_DP_NOME').readOnly(true);

            Form.fields('CAD_CPF_CNPJ').visible(true);
            Form.fields('CAD_CPF_CNPJ').readOnly(true);

            Form.fields('CAD_DP_TELEFONE').visible(true);
            Form.fields('CAD_DP_TELEFONE').readOnly(true);

            Form.fields('CAD_DP_EMAIL').visible(true);
            Form.fields('CAD_DP_EMAIL').readOnly(true);

            Form.fields('CAD_DP_ESCOLARIDADE').visible(true);
            Form.fields('CAD_DP_ESCOLARIDADE').readOnly(true);

            Form.fields('CAD_DP_ESTADO_CIVIL').visible(true);
            Form.fields('CAD_DP_ESTADO_CIVIL').readOnly(true);

            if (prospectado == "Espontâneo") {

                Form.fields('LBL_PROSPECTADO_POR').visible(true);
                Form.fields('CAD_PROSPECTADOR').visible(true);

                Form.fields('CAD_PROSPECTADO_POR').visible(false);
                Form.fields('CAD_DEPTO').visible(false);
            }
            else {

                Form.fields('LBL_PROSPECTADO_POR').visible(true);

                Form.fields('CAD_PROSPECTADOR').visible(true);
                Form.fields('CAD_PROSPECTADOR').readOnly(true);

                Form.fields('CAD_PROSPECTADO_POR').visible(true);
                Form.fields('CAD_PROSPECTADO_POR').readOnly(true);

                Form.fields('CAD_DEPTO').visible(true);
                Form.fields('CAD_DEPTO').readOnly(true);

            }


            if (estadoCivil == "Casado(a)") {

                Form.fields('CAD_CPF_CONJUGE').visible(true);
                Form.fields('CAD_CPF_CONJUGE').readOnly(true);
            }

            else {

                Form.fields('CAD_CPF_CONJUGE').visible(false);

            }

            if (rural == "OK") {

                Form.fields('CAD_RURAL').visible(true);
            }

            else {

                Form.fields('CAD_RURAL').visible(false);

            }

            //Anexos PF

            Form.fields('CAD_DP_ANEXOS').visible(false);
            Form.grids('ANEXODOCS').visible(false);

            Form.fields('LBL_POSSUI_RENDA').visible(false);
            Form.fields('CAD_DP_POSSUI_RENDA').visible(false);
            Form.grids('GRIDRENDA').visible(false);

            Form.fields('LBL_POSSUI_PROCURADOR').visible(false);
            Form.fields('CAD_DP_POS_PROCURADOR').visible(false);
            Form.fields('CAD_CPF_PROCURADOR').visible(false);

        }

        Form.apply();

        if (tipoAssociacao == "Não") {

            let checkDados = Form.fields('CHECK_DADOS_P_PF').value();
            let checkRenda = Form.fields('CHECK_RENDA_PF').value();
            let checkProcurador = Form.fields('CHECK_PROCURADOR_PF').value();
            let checkAnexos = Form.fields('CHECK_ANEXOS_PF').value();
            let estadoCivil = Form.fields('CAD_DP_ESTADO_CIVIL').value();
            let rural = Form.fields('CAD_RURAL').value();

            Form.fields('LBL_CADASTRO_NOVO').visible(true);

            Form.fields('CAD_CADASTRO_ASSOC').visible(true);
            Form.fields('CAD_CADASTRO_ASSOC').readOnly(true);

            Form.fields('CAD_TIPO_PESSOA').visible(true);
            Form.fields('CAD_TIPO_PESSOA').readOnly(true);

            Form.fields('CAD_RURAL').visible(true);
            Form.fields('CAD_RURAL').readOnly(true);

            Form.fields('CAD_L_CADASTRO_ASSOC').visible(true);
            Form.fields('CAD_L_CADASTRO_ASSOC').readOnly(true);

            Form.fields('LBL_DADOS_PESSOAIS').visible(true);

            Form.fields('CAD_DP_NOME').visible(true);
            Form.fields('CAD_DP_NOME').readOnly(true);

            Form.fields('CAD_CPF_CNPJ').visible(true);
            Form.fields('CAD_CPF_CNPJ').readOnly(true);

            Form.fields('LBL_PROSPECTADO_POR').visible(false);
            Form.fields('CAD_PROSPECTADOR').visible(false);
            Form.fields('CAD_PROSPECTADO_POR').visible(false);
            Form.fields('CAD_DEPTO').visible(false);

            Form.grids('ANEXODOCS').visible(false);

            Form.fields('LBL_POSSUI_RENDA').visible(false);
            Form.fields('CAD_DP_POSSUI_RENDA').visible(false);
            Form.grids('GRIDRENDA').visible(false);

            Form.fields('LBL_POSSUI_PROCURADOR').visible(false);
            Form.fields('CAD_DP_POS_PROCURADOR').visible(false);
            Form.fields('CAD_CPF_PROCURADOR').visible(false);

            if (rural == "OK") {

                Form.fields('CAD_RURAL').visible(true);
            }

            else {

                Form.fields('CAD_RURAL').visible(false);

            }


            if (checkDados == "OK") {

                Form.fields('CHECK_DADOS_P_PF').visible(true);
                Form.fields('CHECK_DADOS_P_PF').readOnly(true);

                Form.fields('LBL_DADOS_PESSOAIS').visible(true);
                Form.fields('LBL_DADOS_PESSOAIS').readOnly(true);

                Form.fields('CAD_DP_NOME').visible(true);
                Form.fields('CAD_DP_NOME').readOnly(true);

                Form.fields('CAD_CPF_CNPJ').visible(true);
                Form.fields('CAD_CPF_CNPJ').readOnly(true);

                Form.fields('CAD_DP_TELEFONE').visible(false);
                //Form.fields('CAD_DP_TELEFONE').readOnly(true);

                Form.fields('CAD_DP_EMAIL').visible(false);
                //Form.fields('CAD_DP_EMAIL').readOnly(true);

                Form.fields('CAD_DP_ESCOLARIDADE').visible(false);
                //Form.fields('CAD_DP_ESCOLARIDADE').readOnly(true);

                Form.fields('CAD_DP_ESTADO_CIVIL').visible(false);
                //Form.fields('CAD_DP_ESTADO_CIVIL').readOnly(true);

                Form.fields('CAD_CPF_CONJUGE').visible(false);


                if (estadoCivil == "Casado(a)") {

                    Form.fields('CAD_CPF_CONJUGE').visible(false);
                    //Form.fields('CAD_CPF_CONJUGE').readOnly(true);
                }

                else {

                    Form.fields('CAD_CPF_CONJUGE').visible(false);

                }

            }

            else {

                Form.fields('LBL_DADOS_PESSOAIS').visible(true);
                Form.fields('CAD_DP_NOME').visible(true);
                Form.fields('CAD_CPF_CNPJ').visible(true);
                Form.fields('CAD_DP_TELEFONE').visible(false);
                Form.fields('CAD_DP_EMAIL').visible(false);
                Form.fields('CAD_DP_ESCOLARIDADE').visible(false);
                Form.fields('CAD_DP_ESTADO_CIVIL').visible(false);
                Form.fields('CAD_CPF_CONJUGE').visible(false);

            }

            if (checkRenda == "OK") {

                Form.fields('CHECK_RENDA_PF').visible(true);
                Form.fields('CHECK_RENDA_PF').readOnly(true);

            }

            else {

                Form.fields('CHECK_RENDA_PF').visible(false);

            }

            if (checkAnexos == "OK") {

                Form.fields('CHECK_ANEXOS_PF').visible(true);
                Form.fields('CHECK_ANEXOS_PF').readOnly(true);

            }

            else {

                Form.fields('CHECK_ANEXOS_PF').visible(false);

            }

            if (checkProcurador == "OK") {

                Form.fields('CHECK_PROCURADOR_PF').visible(true);
                Form.fields('CHECK_PROCURADOR_PF').readOnly(true);

            }

            else {

                Form.fields('CHECK_PROCURADOR_PF').visible(false);

            }

        }

        Form.apply();

    }

    if (tipoPessoa == "Pessoa Jurídica") {

        if (tipoAssociacao == "Sim") {

            let rural = Form.fields('CAD_RURAL').value();
            let prospectado = Form.fields('CAD_PROSPECTADOR').value();

            if (rural == "OK") {

                Form.fields('CAD_RURAL').visible(true);
                Form.fields('CAD_RURAL').readOnly(true);
            }

            else {

                Form.fields('CAD_RURAL').visible(false);
            }

            if (prospectado == "Espontâneo") {

                Form.fields('LBL_PROSPECTADO_POR').visible(true);
                Form.fields('CAD_PROSPECTADOR').visible(true);

                Form.fields('CAD_PROSPECTADO_POR').visible(false);
                Form.fields('CAD_DEPTO').visible(false);
            }
            else {

                Form.fields('LBL_PROSPECTADO_POR').visible(true);

                Form.fields('CAD_PROSPECTADOR').visible(true);
                Form.fields('CAD_PROSPECTADOR').readOnly(true);

                Form.fields('CAD_PROSPECTADO_POR').visible(true);
                Form.fields('CAD_PROSPECTADO_POR').readOnly(true);

                Form.fields('CAD_DEPTO').visible(true);
                Form.fields('CAD_DEPTO').readOnly(true);

            }

            //Dados Pessoa Jurídica

            Form.fields('LBL_DADOS_PJ').visible(true);

            Form.fields('CAD_RAZAO_SOCIAL').visible(true);
            Form.fields('CAD_RAZAO_SOCIAL').readOnly(true);

            Form.fields('CAD_NOME_FANTASIA').visible(true);
            Form.fields('CAD_NOME_FANTASIA').readOnly(true);

            Form.fields('CAD_CPF_CNPJ').visible(false);
            Form.fields('CAD_CPF_CNPJ').readOnly(true);
            Form.fields('AUX_CNPJ').visible(true);
            Form.fields('AUX_CNPJ').readOnly(true);

            Form.fields('CAD_EMAIL_PJ').visible(false);
            Form.fields('CAD_TEL_FIXO_PJ').visible(false);
            Form.fields('CAD_CEL_PJ').visible(false);


            //Anexos PJ

            Form.fields('LBL_ANEXOS_PF').visible(false);
            Form.grids('GRID_PJ').visible(false);
            Form.grids('GRID_PJ').fields('CAD_LISTA_PJ').visible(false);
            Form.grids('GRID_PJ').fields('CAD_ANEXO_PJ').visible(false);

            //Possui Faturamento

            Form.fields('LBL_FATURAMENTO_PF').visible(false);
            Form.fields('CAD_POSSUI_FAT_PJ').visible(false);
            Form.grids('GRID_FAT_PJ').visible(false);
            Form.grids('GRID_FAT_PJ').fields('CAD_TIPO_DOC_PJ').visible(false);
            Form.grids('GRID_FAT_PJ').fields('CAD_ANEXO_FAT_PJ').visible(false);

            //Possui Patrimônio

            Form.fields('LBL_POSSUI_PATROMONIO').visible(false);
            Form.fields('CAD_POSSUI_PATRI').visible(false);
            Form.grids('GRID_PAT_PJ').visible(false);
            Form.grids('GRID_PAT_PJ').fields('CAD_ANEXO_PATRI').visible(false);
            Form.grids('GRID_PAT_PJ').fields('CAD_TIPO_DOC_PATRI').visible(false);


            //Possui sócios

            Form.fields('LBL_SOCIOS_PJ').visible(false);
            Form.grids('GRID_SOCIO_PJ').visible(false);
            Form.grids('GRID_SOCIO_PJ').fields('CAD_TIP_SOCIO').visible(false);
            Form.grids('GRID_SOCIO_PJ').fields('CAD_NOME_SOCIO_PJ').visible(false);
            Form.grids('GRID_SOCIO_PJ').fields('CAD_CPF_SOCIO').visible(false);
            Form.grids('GRID_SOCIO_PJ').fields('CAD_CPF_SOCIO').disabled(true);
            Form.grids('GRID_SOCIO_PJ').fields('CAD_CNPJ_SOCIO').visible(false);
            Form.grids('GRID_SOCIO_PJ').fields('CAD_CNPJ_SOCIO').disabled(true);

        }

        Form.apply();

        if (tipoAssociacao == "Não") {

            let rural = Form.fields('CAD_RURAL').value();
            let checkDadosPJ = Form.fields('CHECK_DADOS_P_PJ').value();
            let checkAnexosPJ = Form.fields('CHECK_ANEXOS_PJ').value();
            let checkFaturamentoPJ = Form.fields('CHECK_FATURAMENTO_PJ').value();
            let checkPatrimonioPJ = Form.fields('CHECK_PATRIMONIO_PJ').value();
            let checkSociosPJ = Form.fields('CHECK_SOCIOS_PJ').value();

            if (rural == "OK") {

                Form.fields('CAD_RURAL').visible(true);
                Form.fields('CAD_RURAL').readOnly(true);
            }

            else {

                Form.fields('CAD_RURAL').visible(false);

            }

            if (checkDadosPJ == "OK") {

                Form.fields('LBL_ATUALI_PJ').visible(true);

                Form.fields('CHECK_DADOS_P_PJ').visible(true);
                Form.fields('CHECK_DADOS_P_PJ').readOnly(true);

                Form.fields('CAD_CPF_CNPJ').visible(false);
                Form.fields('CAD_CPF_CNPJ').readOnly(true);
                Form.fields('AUX_CNPJ').visible(true);
                Form.fields('AUX_CNPJ').readOnly(true);

                Form.fields('LBL_DADOS_PJ').visible(true);

                Form.fields('CAD_RAZAO_SOCIAL').visible(true);
                Form.fields('CAD_RAZAO_SOCIAL').readOnly(true);

                Form.fields('CAD_NOME_FANTASIA').visible(true);
                Form.fields('CAD_NOME_FANTASIA').readOnly(true);

            }

            else {

                Form.fields('CHECK_DADOS_P_PJ').visible(false);

            }

            if (checkAnexosPJ == "OK") {

                Form.fields('LBL_ATUALI_PJ').visible(true);

                Form.fields('CHECK_ANEXOS_PJ').visible(true);
                Form.fields('CHECK_ANEXOS_PJ').readOnly(true);

                Form.fields('CAD_CPF_CNPJ').visible(false);
                Form.fields('CAD_CPF_CNPJ').readOnly(true);
                Form.fields('AUX_CNPJ').visible(true);
                Form.fields('AUX_CNPJ').readOnly(true);

                Form.fields('LBL_DADOS_PJ').visible(true);

                Form.fields('CAD_RAZAO_SOCIAL').visible(true);
                Form.fields('CAD_RAZAO_SOCIAL').readOnly(true);

                Form.fields('CAD_NOME_FANTASIA').visible(true);
                Form.fields('CAD_NOME_FANTASIA').readOnly(true);

            }

            else {

                Form.fields('CHECK_ANEXOS_PJ').visible(false);

            }

            if (checkFaturamentoPJ == "OK") {

                Form.fields('LBL_ATUALI_PJ').visible(true);

                Form.fields('CHECK_FATURAMENTO_PJ').visible(true);
                Form.fields('CHECK_FATURAMENTO_PJ').readOnly(true);

                Form.fields('CAD_CPF_CNPJ').visible(false);
                Form.fields('CAD_CPF_CNPJ').readOnly(true);
                Form.fields('AUX_CNPJ').visible(true);
                Form.fields('AUX_CNPJ').readOnly(true);

                Form.fields('LBL_DADOS_PJ').visible(true);

                Form.fields('CAD_RAZAO_SOCIAL').visible(true);
                Form.fields('CAD_RAZAO_SOCIAL').readOnly(true);

                Form.fields('CAD_NOME_FANTASIA').visible(true);
                Form.fields('CAD_NOME_FANTASIA').readOnly(true);


            }

            else {

                Form.fields('CHECK_FATURAMENTO_PJ').visible(false);

            }

            if (checkPatrimonioPJ == "OK") {

                Form.fields('LBL_ATUALI_PJ').visible(true);

                Form.fields('CHECK_PATRIMONIO_PJ').visible(true);
                Form.fields('CHECK_PATRIMONIO_PJ').readOnly(true);

                Form.fields('CAD_CPF_CNPJ').visible(false);
                Form.fields('CAD_CPF_CNPJ').readOnly(true);
                Form.fields('AUX_CNPJ').visible(true);
                Form.fields('AUX_CNPJ').readOnly(true);

                Form.fields('LBL_DADOS_PJ').visible(true);

                Form.fields('CAD_RAZAO_SOCIAL').visible(true);
                Form.fields('CAD_RAZAO_SOCIAL').readOnly(true);

                Form.fields('CAD_NOME_FANTASIA').visible(true);
                Form.fields('CAD_NOME_FANTASIA').readOnly(true);

            }

            else {

                Form.fields('CHECK_PATRIMONIO_PJ').visible(false);

            }

            if (checkSociosPJ == "OK") {

                Form.fields('LBL_ATUALI_PJ').visible(true);

                Form.fields('CHECK_SOCIOS_PJ').visible(true);
                Form.fields('CHECK_SOCIOS_PJ').readOnly(true);

                Form.fields('CAD_CPF_CNPJ').visible(false);
                Form.fields('CAD_CPF_CNPJ').readOnly(true);
                Form.fields('AUX_CNPJ').visible(true);
                Form.fields('AUX_CNPJ').readOnly(true);

                Form.fields('LBL_DADOS_PJ').visible(true);

                Form.fields('CAD_RAZAO_SOCIAL').visible(true);
                Form.fields('CAD_RAZAO_SOCIAL').readOnly(true);

                Form.fields('CAD_NOME_FANTASIA').visible(true);
                Form.fields('CAD_NOME_FANTASIA').readOnly(true);


            }

            else {

                Form.fields('CHECK_SOCIOS_PJ').visible(false);

            }
        }

        Form.apply();

    }
}


//Campos etapa CADASTRAR SISBR

function camposCadastrarSisbr() {
    debugger

    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();

    if (tipoPessoa == "Pessoa Física") {

        if (tipoAssociacao == "Sim") {

            let rural = Form.fields('CAD_RURAL').value();
            let estadoCivil = Form.fields('CAD_DP_ESTADO_CIVIL').value();
            let prospectado = Form.fields('CAD_PROSPECTADOR').value();
            let renda = Form.fields('CAD_DP_POSSUI_RENDA').value();
            let procurador = Form.fields('CAD_DP_POS_PROCURADOR').value();


            //CheckBox Rural
            if (rural == "OK") {

                Form.fields('CAD_RURAL').visible(true);
                Form.fields('CAD_RURAL').readOnly(true);
            }

            else {

                Form.fields('CAD_RURAL').visible(false);

            }

            //Prospectado por

            if (prospectado == "Espontâneo") {

                Form.fields('LBL_PROSPECTADO_POR').visible(true);

                Form.fields('CAD_PROSPECTADOR').visible(true);
                Form.fields('CAD_PROSPECTADOR').readOnly(true);

                Form.fields('CAD_PROSPECTADO_POR').visible(false);

                Form.fields('CAD_DEPTO').visible(false);

                Form.fields('CAD_PA_USUARIO_INICIADO').visible(false);

            }

            else {

                Form.fields('LBL_PROSPECTADO_POR').visible(true);

                Form.fields('CAD_PROSPECTADOR').visible(true);
                Form.fields('CAD_PROSPECTADOR').readOnly(true);

                Form.fields('CAD_PROSPECTADO_POR').visible(true);
                Form.fields('CAD_PROSPECTADO_POR').readOnly(true);

                Form.fields('CAD_DEPTO').visible(true);
                Form.fields('CAD_DEPTO').readOnly(true);

                Form.fields('CAD_PA_USUARIO_INICIADO').visible(false);
                //Form.fields('CAD_PA_USUARIO_INICIADO').readOnly(true);

            }

            //Campos Iniciais Somente Leitura

            Form.fields('LBL_TIPO_CADASTRO').visible(true);

            Form.fields('CAD_CADASTRO_ASSOC').visible(true);
            Form.fields('CAD_CADASTRO_ASSOC').readOnly(true);

            Form.fields('CAD_TIPO_PESSOA').visible(true);
            Form.fields('CAD_TIPO_PESSOA').readOnly(true);

            Form.fields('CAD_L_CADASTRO_ASSOC').visible(true);
            Form.fields('CAD_L_CADASTRO_ASSOC').readOnly(true);

            Form.fields('CAD_PA').visible(true);
            Form.fields('CAD_PA').readOnly(true);


            //Dados Pessoa Física

            Form.fields('LBL_DADOS_PESSOAIS').visible(true);

            Form.fields('CAD_DP_NOME').visible(true);
            Form.fields('CAD_DP_NOME').readOnly(true);

            Form.fields('CAD_CPF_CNPJ').visible(true);
            Form.fields('CAD_CPF_CNPJ').readOnly(true);

            Form.fields('CAD_DP_TELEFONE').visible(true);
            Form.fields('CAD_DP_TELEFONE').readOnly(true);

            Form.fields('CAD_DP_EMAIL').visible(true);
            Form.fields('CAD_DP_EMAIL').readOnly(true);

            Form.fields('CAD_DP_ESCOLARIDADE').visible(true);
            Form.fields('CAD_DP_ESCOLARIDADE').readOnly(true);

            Form.fields('CAD_DP_ESTADO_CIVIL').visible(true);
            Form.fields('CAD_DP_ESTADO_CIVIL').readOnly(true);


            if (estadoCivil == "Casado(a)") {

                Form.fields('CAD_CPF_CONJUGE').visible(true);
                Form.fields('CAD_CPF_CONJUGE').readOnly(true);

            }

            else {

                Form.fields('CAD_CPF_CONJUGE').visible(false);
            }

            //Anexos Pessoa Física
            Form.fields('CAD_DP_ANEXOS').visible(true);

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').visible(true);
            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').readOnly(true);

            Form.grids('ANEXODOCS').fields('CAD_DP_DOC_IDENT').visible(true);
            Form.grids('ANEXODOCS').fields('CAD_DP_DOC_IDENT').readOnly(true);


            //Renda Pessoa Física

            if (renda == "Sim") {

                Form.fields('LBL_POSSUI_RENDA').visible(true);

                Form.fields('CAD_DP_POSSUI_RENDA').visible(true);
                Form.fields('CAD_DP_POSSUI_RENDA').readOnly(true);

                Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').visible(true);
                Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').readOnly(true);

            }

            else {

                Form.fields('LBL_POSSUI_RENDA').visible(true);

                Form.fields('CAD_DP_POSSUI_RENDA').visible(true);
                Form.fields('CAD_DP_POSSUI_RENDA').readOnly(true);

                Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').visible(false);

            }

            //Procurador Pessoa Física

            if (procurador == "Sim") {

                Form.fields('LBL_POSSUI_PROCURADOR').visible(true);

                Form.fields('CAD_DP_POS_PROCURADOR').visible(true);
                Form.fields('CAD_DP_POS_PROCURADOR').readOnly(true);

                Form.fields('CAD_CPF_PROCURADOR').visible(true);
                Form.fields('CAD_CPF_PROCURADOR').readOnly(true);

            }

            else {

                Form.fields('LBL_POSSUI_PROCURADOR').visible(false);
                Form.fields('CAD_DP_POS_PROCURADOR').visible(false);
                Form.fields('CAD_CPF_PROCURADOR').visible(false);

            }

        }

        Form.apply();

        if (tipoAssociacao == "Não") {

            let checkDados = Form.fields('CHECK_DADOS_P_PF').value();
            let checkAnexos = Form.fields('CHECK_ANEXOS_PF').value();
            let checkRenda = Form.fields('CHECK_RENDA_PF').value();
            let checkProcurador = Form.fields('CHECK_PROCURADOR_PF').value();
            let estadoCivil = Form.fields('CAD_DP_ESTADO_CIVIL').value();
            let rural = Form.fields('CAD_RURAL').value();

            //Campos Iniciais Somente Leitura

            Form.fields('LBL_TIPO_CADASTRO').visible(false);
            Form.fields('LBL_CADASTRO_NOVO').visible(true);

            Form.fields('CAD_CADASTRO_ASSOC').visible(true);
            Form.fields('CAD_CADASTRO_ASSOC').readOnly(true);

            Form.fields('CAD_TIPO_PESSOA').visible(true);
            Form.fields('CAD_TIPO_PESSOA').readOnly(true);

            Form.fields('CAD_L_CADASTRO_ASSOC').visible(true);
            Form.fields('CAD_L_CADASTRO_ASSOC').readOnly(true);

            Form.fields('LBL_DADOS_PESSOAIS').visible(true);

            Form.fields('CAD_DP_NOME').visible(true);
            Form.fields('CAD_DP_NOME').readOnly(true);

            Form.fields('CAD_CPF_CNPJ').visible(true);
            Form.fields('CAD_CPF_CNPJ').readOnly(true);

            //Esconder Prospectado

            Form.fields('LBL_PROSPECTADO_POR').visible(false);
            Form.fields('CAD_PROSPECTADOR').visible(false);
            Form.fields('CAD_PROSPECTADO_POR').visible(false);
            Form.fields('CAD_DEPTO').visible(false);
            Form.fields('CAD_PA_USUARIO_INICIADO').visible(false);



            //CheckBox Rural
            if (rural == "OK") {

                Form.fields('CAD_RURAL').visible(true);
                Form.fields('CAD_RURAL').readOnly(true);
            }

            else {

                Form.fields('CAD_RURAL').visible(false);

            }


            if (checkDados == "OK") {

                Form.fields('LBL_DADOS_PESSOAIS').visible(true);

                Form.fields('CHECK_DADOS_P_PF').visible(true);
                Form.fields('CHECK_DADOS_P_PF').readOnly(true);

                Form.fields('CAD_DP_NOME').visible(true);
                Form.fields('CAD_DP_NOME').readOnly(true);

                Form.fields('CAD_CPF_CNPJ').visible(true);
                Form.fields('CAD_CPF_CNPJ').readOnly(true);

                Form.fields('CAD_DP_TELEFONE').visible(true);
                Form.fields('CAD_DP_TELEFONE').readOnly(true);

                Form.fields('CAD_DP_EMAIL').visible(true);
                Form.fields('CAD_DP_EMAIL').readOnly(true);

                Form.fields('CAD_DP_ESCOLARIDADE').visible(true);
                Form.fields('CAD_DP_ESCOLARIDADE').readOnly(true);

                Form.fields('CAD_DP_ESTADO_CIVIL').visible(true);
                Form.fields('CAD_DP_ESTADO_CIVIL').readOnly(true);

                Form.fields('CAD_CPF_CONJUGE').visible(false);


                if (estadoCivil == "Casado(a)") {

                    Form.fields('CAD_DP_ESTADO_CIVIL').visible(true);
                    Form.fields('CAD_DP_ESTADO_CIVIL').readOnly(true);

                    Form.fields('CAD_CPF_CONJUGE').visible(false);
                    //Form.fields('CAD_CPF_CONJUGE').readOnly(true);

                }

                else {

                    Form.fields('CAD_CPF_CONJUGE').visible(false);

                }

            }
            else {

                Form.fields('LBL_DADOS_PESSOAIS').visible(true);
                Form.fields('CHECK_DADOS_P_PF').visible(false);
                Form.fields('CAD_DP_NOME').visible(true);
                Form.fields('CAD_CPF_CNPJ').visible(true);
                Form.fields('CAD_DP_TELEFONE').visible(false);
                Form.fields('CAD_DP_EMAIL').visible(false);
                Form.fields('CAD_DP_ESCOLARIDADE').visible(false);
                Form.fields('CAD_CPF_CONJUGE').visible(false);
            }



            if (checkAnexos == "OK") {

                Form.fields('CAD_DP_ANEXOS').visible(true);

                Form.fields('CHECK_ANEXOS_PF').visible(true);
                Form.fields('CHECK_ANEXOS_PF').readOnly(true);

                Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').visible(true);
                Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').readOnly(true);

                Form.grids('ANEXODOCS').fields('CAD_DP_DOC_IDENT').visible(true);
                Form.grids('ANEXODOCS').fields('CAD_DP_DOC_IDENT').readOnly(true);


            }
            else {

                Form.fields('CAD_DP_ANEXOS').visible(false);
                Form.fields('CHECK_ANEXOS_PF').visible(false);
                Form.grids('ANEXODOCS').visible(false);

            }



            if (checkRenda == "OK") {

                //Renda Pessoa Física

                Form.fields('LBL_POSSUI_RENDA').visible(true);

                Form.fields('CHECK_RENDA_PF').visible(true);
                Form.fields('CHECK_RENDA_PF').readOnly(true);

                Form.fields('CAD_DP_POSSUI_RENDA').visible(true);
                Form.fields('CAD_DP_POSSUI_RENDA').readOnly(true);

                Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').visible(true);
                Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').readOnly(true);

            }

            else {

                Form.fields('LBL_POSSUI_RENDA').visible(false);
                Form.fields('CHECK_RENDA_PF').visible(false);
                Form.fields('CAD_DP_POSSUI_RENDA').visible(false);
                Form.grids('GRIDRENDA').visible(false);

            }

            if (checkProcurador == "OK") {

                //Procurador Pessoa Física   


                Form.fields('LBL_POSSUI_PROCURADOR').visible(true);

                Form.fields('CHECK_PROCURADOR_PF').visible(true);
                Form.fields('CHECK_PROCURADOR_PF').readOnly(true);

                Form.fields('CAD_DP_POS_PROCURADOR').visible(true);
                Form.fields('CAD_DP_POS_PROCURADOR').readOnly(true);

                Form.fields('CAD_CPF_PROCURADOR').visible(true);
                Form.fields('CAD_CPF_PROCURADOR').readOnly(true);

            }

            else {

                Form.fields('LBL_POSSUI_PROCURADOR').visible(false).apply();
                Form.fields('CHECK_PROCURADOR_PF').visible(false).apply();
                Form.fields('CAD_DP_POS_PROCURADOR').visible(false).apply();
                Form.fields('CAD_CPF_PROCURADOR').visible(false).apply();

            }

        }

    }

    Form.apply();

    if (tipoPessoa == "Pessoa Jurídica") {

        if (tipoAssociacao == "Sim") {

            let rural = Form.fields('CAD_RURAL').value();
            let prospectado = Form.fields('CAD_PROSPECTADOR').value();

            //CheckBox Rural
            if (rural == "OK") {

                Form.fields('CAD_RURAL').visible(true);
                Form.fields('CAD_RURAL').readOnly(true);
            }

            else {

                Form.fields('CAD_RURAL').visible(false);

            }

            //Prospectado por

            if (prospectado == "Espontâneo") {

                Form.fields('LBL_PROSPECTADO_POR').visible(true);

                Form.fields('CAD_PROSPECTADOR').visible(true);
                Form.fields('CAD_PROSPECTADOR').readOnly(true);

                Form.fields('CAD_PROSPECTADO_POR').visible(false);

                Form.fields('CAD_DEPTO').visible(false);

                Form.fields('CAD_PA_USUARIO_INICIADO').visible(false);

            }

            else {

                Form.fields('LBL_PROSPECTADO_POR').visible(true);

                Form.fields('CAD_PROSPECTADOR').visible(true);
                Form.fields('CAD_PROSPECTADOR').readOnly(true);

                Form.fields('CAD_PROSPECTADO_POR').visible(true);
                Form.fields('CAD_PROSPECTADO_POR').readOnly(true);

                Form.fields('CAD_DEPTO').visible(true);
                Form.fields('CAD_DEPTO').readOnly(true);

                Form.fields('CAD_PA_USUARIO_INICIADO').visible(false);

            }

            //Campos iniciais Somente Leitura           

            //Dados Pessoa Jurídica

            Form.fields('LBL_DADOS_PJ').visible(true);

            Form.fields('CAD_CPF_CNPJ').visible(false);
            Form.fields('CAD_CPF_CNPJ').readOnly(true);
            Form.fields('AUX_CNPJ').visible(true);
            Form.fields('AUX_CNPJ').readOnly(true);

            Form.fields('CAD_RAZAO_SOCIAL').visible(true);
            Form.fields('CAD_RAZAO_SOCIAL').readOnly(true);

            Form.fields('CAD_NOME_FANTASIA').visible(true);
            Form.fields('CAD_NOME_FANTASIA').readOnly(true);

            Form.fields('CAD_EMAIL_PJ').visible(true);
            Form.fields('CAD_EMAIL_PJ').readOnly(true);

            Form.fields('CAD_TEL_FIXO_PJ').visible(true);
            Form.fields('CAD_TEL_FIXO_PJ').readOnly(true);

            Form.fields('CAD_CEL_PJ').visible(true);
            Form.fields('CAD_CEL_PJ').readOnly(true);


            //Anexos Pessoa Jurídica

            let gridAnexosPJ = Form.grids('GRID_PJ');

            if (gridAnexosPJ.dataRows().length > 0) {

                Form.fields('LBL_ANEXOS_PF').visible(true);

                Form.grids('GRID_PJ').visible(true);
                Form.grids('GRID_PJ').readOnly(true);

                //grid.CAD_LISTA_PJ
                //grid.CAD_ANEXO_PJ

            }

            else {

                Form.fields('LBL_ANEXOS_PF').visible(false);
                Form.grids('GRID_PJ').visible(false);

            }


            //Faturamento Pessoa Jurídica  

            let gridFaturamentoPJ = Form.grids('GRID_FAT_PJ');
            if (gridFaturamentoPJ.dataRows().length > 0) {

                Form.fields('LBL_FATURAMENTO_PF').visible(true);

                Form.fields('CAD_POSSUI_FAT_PJ').visible(true);
                Form.fields('CAD_POSSUI_FAT_PJ').readOnly(true);

                Form.grids('GRID_FAT_PJ').visible(true);
                Form.grids('GRID_FAT_PJ').readOnly(true);

                //grid.CAD_TIPO_DOC_PJ
                //grid.CAD_ANEXO_FAT_PJ

            }

            else {

                Form.fields('LBL_FATURAMENTO_PF').visible(true);
                Form.fields('CAD_POSSUI_FAT_PJ').visible(true);
                Form.fields('CAD_POSSUI_FAT_PJ').readOnly(true);
                Form.grids('GRID_FAT_PJ').visible(false);

            }


            //Patrimônio Pessoa Jurídica

            let gridPatrimonio = Form.grids('GRID_PAT_PJ');
            if (gridPatrimonio.dataRows().length > 0) {

                Form.fields('LBL_POSSUI_PATROMONIO').visible(true);
                Form.fields('CAD_POSSUI_PATRI').visible(true);
                Form.fields('CAD_POSSUI_PATRI').readOnly(true);

                Form.grids('GRID_PAT_PJ').visible(true);
                Form.grids('GRID_PAT_PJ').readOnly(true);
                //grid.CAD_ANEXO_PATRI

            }

            else {

                Form.fields('LBL_POSSUI_PATROMONIO').visible(true);
                Form.fields('CAD_POSSUI_PATRI').visible(true);
                Form.fields('CAD_POSSUI_PATRI').readOnly(true);
                Form.grids('GRID_PAT_PJ').visible(false);

            }


            //Sócios Pessoas Jurídica

            let gridSocios = Form.grids('GRID_SOCIO_PJ');
            if (gridSocios.dataRows().length > 0) {

                Form.fields('LBL_SOCIOS_PJ').visible(true);

                Form.grids('GRID_SOCIO_PJ').visible(true);
                Form.grids('GRID_SOCIO_PJ').readOnly(true);

                //grid.CAD_TIP_SOCIO
                //grid.CAD_NOME_SOCIO_PJ
                //grid.CAD_CPF_SOCIO
                //grid.CAD_CNPJ_SOCIO

            }

            else {

                Form.fields('LBL_SOCIOS_PJ').visible(false);
                Form.grids('GRID_SOCIO_PJ').visible(false);

            }

            //Histórico Geral

            Form.fields('CAD_LBL_HISTORICO').visible(true);

            Form.fields('CAD_HISTORICO_GERAL').visible(true);
            Form.fields('CAD_HISTORICO_GERAL').readOnly(false);
            //Form.fields('CAD_HISTORICO_GERAL').required(true);

        }

        Form.apply();

        if (tipoAssociacao == "Não") {

            let rural = Form.fields('CAD_RURAL').value();
            let checkDadosPJ = Form.fields('CHECK_DADOS_P_PJ').value();
            let checkAnexosPJ = Form.fields('CHECK_ANEXOS_PJ').value();
            let checkFaturamentoPJ = Form.fields('CHECK_FATURAMENTO_PJ').value();
            let checkPatrimonioPJ = Form.fields('CHECK_PATRIMONIO_PJ').value();
            let checkSociosPJ = Form.fields('CHECK_SOCIOS_PJ').value();


            //CheckBox Rural
            if (rural == "OK") {

                Form.fields('CAD_RURAL').visible(true);
                Form.fields('CAD_RURAL').readOnly(true);
            }

            else {

                Form.fields('CAD_RURAL').visible(false);

            }

            //Prospectado por

            Form.fields('LBL_PROSPECTADO_POR').visible(false);

            Form.fields('CAD_PROSPECTADOR').visible(false);
            Form.fields('CAD_PROSPECTADO_POR').visible(false);
            Form.fields('CAD_DEPTO').visible(false);
            Form.fields('CAD_PA_USUARIO_INICIADO').visible(false);


            if (checkDadosPJ == "OK") {

                Form.fields('LBL_ATUALI_PJ').visible(true);

                Form.fields('CHECK_DADOS_P_PJ').visible(true);
                Form.fields('CHECK_DADOS_P_PJ').readOnly(true);

                Form.fields('LBL_DADOS_PJ').visible(true);

                Form.fields('CAD_CPF_CNPJ').visible(false);
                Form.fields('CAD_CPF_CNPJ').readOnly(true);
                Form.fields('AUX_CNPJ').visible(true);
                Form.fields('AUX_CNPJ').readOnly(true);

                Form.fields('CAD_RAZAO_SOCIAL').visible(true);
                Form.fields('CAD_RAZAO_SOCIAL').readOnly(true);

                Form.fields('CAD_NOME_FANTASIA').visible(true);
                Form.fields('CAD_NOME_FANTASIA').readOnly(true);

                Form.fields('CAD_EMAIL_PJ').visible(true);
                Form.fields('CAD_EMAIL_PJ').readOnly(true);

                Form.fields('CAD_TEL_FIXO_PJ').visible(true);
                Form.fields('CAD_TEL_FIXO_PJ').readOnly(true);

                Form.fields('CAD_CEL_PJ').visible(true);
                Form.fields('CAD_CEL_PJ').readOnly(true);

            }

            else {

                Form.fields('LBL_DADOS_PJ').visible(false);

                Form.fields('CHECK_DADOS_P_PJ').visible(false);
                Form.fields('CAD_RAZAO_SOCIAL').visible(false);
                Form.fields('CAD_NOME_FANTASIA').visible(false);
                Form.fields('CAD_CPF_CNPJ').visible(false);
                Form.fields('AUX_CNPJ').visible(false);
                Form.fields('CAD_EMAIL_PJ').visible(false);
                Form.fields('CAD_TEL_FIXO_PJ').visible(false);
                Form.fields('CAD_CEL_PJ').visible(false);

            }


            if (checkAnexosPJ == "OK") {

                //Dados Pessoais

                Form.fields('LBL_ATUALI_PJ').visible(true);

                Form.fields('LBL_DADOS_PJ').visible(true);

                Form.fields('CAD_CPF_CNPJ').visible(false);
                Form.fields('CAD_CPF_CNPJ').readOnly(true);
                Form.fields('AUX_CNPJ').visible(true);
                Form.fields('AUX_CNPJ').readOnly(true);

                Form.fields('CAD_RAZAO_SOCIAL').visible(true);
                Form.fields('CAD_RAZAO_SOCIAL').readOnly(true);

                Form.fields('CAD_NOME_FANTASIA').visible(true);
                Form.fields('CAD_NOME_FANTASIA').readOnly(true);

                //Anexos

                Form.fields('LBL_ATUALI_PJ').visible(true);

                Form.fields('CHECK_ANEXOS_PJ').visible(true);
                Form.fields('CHECK_ANEXOS_PJ').readOnly(true);

                Form.fields('LBL_ANEXOS_PF').visible(true);

                Form.grids('GRID_PJ').visible(true);
                Form.grids('GRID_PJ').readOnly(true);
            }

            else {

                Form.fields('LBL_ANEXOS_PF').visible(false);
                Form.fields('CHECK_ANEXOS_PJ').visible(false);
                Form.grids('GRID_PJ').visible(false);
                //Form.grids('GRID_PJ').fields('CAD_LISTA_PJ').visible(false);
                //Form.grids('GRID_PJ').fields('CAD_ANEXO_PJ').visible(false);

            }

            if (checkFaturamentoPJ == "OK") {

                //Dados Pessoais

                Form.fields('LBL_ATUALI_PJ').visible(true);

                Form.fields('LBL_DADOS_PJ').visible(true);

                Form.fields('CAD_CPF_CNPJ').visible(false);
                Form.fields('CAD_CPF_CNPJ').readOnly(true);
                Form.fields('AUX_CNPJ').visible(true);
                Form.fields('AUX_CNPJ').readOnly(true);

                Form.fields('CAD_RAZAO_SOCIAL').visible(true);
                Form.fields('CAD_RAZAO_SOCIAL').readOnly(true);

                Form.fields('CAD_NOME_FANTASIA').visible(true);
                Form.fields('CAD_NOME_FANTASIA').readOnly(true);

                //Faturamento

                Form.fields('LBL_ATUALI_PJ').visible(true);

                Form.fields('CHECK_FATURAMENTO_PJ').visible(true);
                Form.fields('CHECK_FATURAMENTO_PJ').readOnly(true);

                Form.fields('LBL_FATURAMENTO_PF').visible(true);

                Form.fields('CAD_POSSUI_FAT_PJ').visible(true);
                Form.fields('CAD_POSSUI_FAT_PJ').readOnly(true);

                Form.grids('GRID_FAT_PJ').visible(true);
                Form.grids('GRID_FAT_PJ').readOnly(true);

            }

            else {

                Form.fields('LBL_FATURAMENTO_PF').visible(false);
                Form.fields('CHECK_FATURAMENTO_PJ').visible(false);
                Form.fields('CAD_POSSUI_FAT_PJ').visible(false);
                Form.grids('GRID_FAT_PJ').visible(false);
                //Form.grids('GRID_FAT_PJ').fields('CAD_TIPO_DOC_PJ').visible(false);
                //Form.grids('GRID_FAT_PJ').fields('CAD_ANEXO_FAT_PJ').visible(false);
            }

            if (checkPatrimonioPJ == "OK") {

                //Dados Pessoais

                Form.fields('LBL_ATUALI_PJ').visible(true);

                Form.fields('LBL_DADOS_PJ').visible(true);

                Form.fields('CAD_CPF_CNPJ').visible(false);
                Form.fields('CAD_CPF_CNPJ').readOnly(true);
                Form.fields('AUX_CNPJ').visible(true);
                Form.fields('AUX_CNPJ').readOnly(true);

                Form.fields('CAD_RAZAO_SOCIAL').visible(true);
                Form.fields('CAD_RAZAO_SOCIAL').readOnly(true);

                Form.fields('CAD_NOME_FANTASIA').visible(true);
                Form.fields('CAD_NOME_FANTASIA').readOnly(true);

                //Patrimônio

                Form.fields('LBL_ATUALI_PJ').visible(true);

                Form.fields('CHECK_PATRIMONIO_PJ').visible(true);
                Form.fields('CHECK_PATRIMONIO_PJ').readOnly(true);


                Form.fields('LBL_POSSUI_PATROMONIO').visible(true);

                Form.fields('CAD_POSSUI_PATRI').visible(true);
                Form.fields('CAD_POSSUI_PATRI').readOnly(true);

                Form.grids('GRID_PAT_PJ').visible(true);
                Form.grids('GRID_PAT_PJ').readOnly(true);

            }

            else {

                Form.fields('LBL_POSSUI_PATROMONIO').visible(false);
                Form.fields('CHECK_PATRIMONIO_PJ').visible(false);
                Form.fields('CAD_POSSUI_PATRI').visible(false);
                Form.grids('GRID_PAT_PJ').visible(false);
                //Form.grids('GRID_PAT_PJ').fields('CAD_ANEXO_PATRI').visible(false);

            }

            if (checkSociosPJ == "OK") {

                //Dados Pessoais

                Form.fields('LBL_ATUALI_PJ').visible(true);

                Form.fields('LBL_DADOS_PJ').visible(true);

                Form.fields('CAD_CPF_CNPJ').visible(false);
                Form.fields('CAD_CPF_CNPJ').readOnly(true);
                Form.fields('AUX_CNPJ').visible(true);
                Form.fields('AUX_CNPJ').readOnly(true);

                Form.fields('CAD_RAZAO_SOCIAL').visible(true);
                Form.fields('CAD_RAZAO_SOCIAL').readOnly(true);

                Form.fields('CAD_NOME_FANTASIA').visible(true);
                Form.fields('CAD_NOME_FANTASIA').readOnly(true);

                //Sócios

                Form.fields('LBL_ATUALI_PJ').visible(true);

                Form.fields('CHECK_SOCIOS_PJ').visible(true);
                Form.fields('CHECK_SOCIOS_PJ').readOnly(true);

                Form.fields('LBL_SOCIOS_PJ').visible(true);

                Form.grids('GRID_SOCIO_PJ').visible(true);
                Form.grids('GRID_SOCIO_PJ').readOnly(true);

            }

            else {

                Form.fields('LBL_SOCIOS_PJ').visible(false);
                Form.fields('CHECK_SOCIOS_PJ').visible(false);
                Form.grids('GRID_SOCIO_PJ').visible(false);
                //Form.grids('GRID_SOCIO_PJ').fields('CAD_TIP_SOCIO').visible(false);
                //Form.grids('GRID_SOCIO_PJ').fields('CAD_NOME_SOCIO_PJ').visible(false);
                //Form.grids('GRID_SOCIO_PJ').fields('CAD_CPF_SOCIO').visible(false);
                //Form.grids('GRID_SOCIO_PJ').fields('CAD_CPF_SOCIO').disabled(true);
                //Form.grids('GRID_SOCIO_PJ').fields('CAD_CNPJ_SOCIO').visible(false);
                //Form.grids('GRID_SOCIO_PJ').fields('CAD_CNPJ_SOCIO').disabled(true);

            }


        }

        Form.apply();
    }

    Form.apply();
}


function camposAprovarCadastro() {
    debugger

    camposCadastrarSisbr();

    //Form.fields('CAD_BUTTON_AJUSTE_AT').visible(false);
    Form.fields('CAD_LABEL_A_CADASTRO').visible(true);
    Form.fields('CAD_BUTTON_A_CADASTRO').visible(true);
    Form.fields('CAD_HISTORICO_GERAL').visible(true);
    //Regra Supervisor
    Form.fields('CAD_AUX_ANALISTA').value("Supervisor").apply();

    Form.apply();

}

function manipularBotoesAprovarCadastro() {
    debugger

    let buttonCadastro = Form.fields('CAD_BUTTON_A_CADASTRO').value();

    //Botões
    if (buttonCadastro == undefined) {

        Form.fields('CAD_BUTTON_AJUSTE_AT').visible(false);
        Form.fields('CAD_BUTTON_AJUSTE_AT').required(false);
        Form.actions('aprovar').hidden(true).apply();
        Form.actions('rejeitar').hidden(true).apply();

    }

    else if (buttonCadastro == "Sim") {

        Form.fields('CAD_BUTTON_AJUSTE_AT').visible(false);
        Form.fields('CAD_BUTTON_AJUSTE_AT').required(false);
        Form.actions('aprovar').hidden(false).apply();
        Form.actions('rejeitar').hidden(true).apply();

    }

    else if (buttonCadastro == "Não") {

        Form.fields('CAD_BUTTON_AJUSTE_AT').visible(true);
        Form.fields('CAD_BUTTON_AJUSTE_AT').required(true);
        Form.actions('aprovar').hidden(true).apply();
        Form.actions('rejeitar').hidden(false).apply();
    }

    else {

        Form.fields('CAD_BUTTON_AJUSTE_AT').visible(true);
        Form.fields('CAD_BUTTON_AJUSTE_AT').required(true);
        Form.actions('aprovar').hidden(true).apply();
        Form.actions('rejeitar').hidden(false).apply();

    }

    Form.apply();

}

function statusAprovar() {
    debugger

    //Regra Ajuste PA
    let buttonAjuste = Form.fields('CAD_BUTTON_AJUSTE_AT').value();

    if (buttonAjuste == "Rejeitar") {

        Form.fields('CAD_STATUS').value("Rejeitar");

    }

    else {

        Form.fields('CAD_STATUS').value("Aprovar");

    }


    if (buttonAjuste == "Ajustar PA") {

        Form.fields('CAD_ANALISE_SISBR_PA').value("OK");
    }

    else {

        Form.fields('CAD_ANALISE_SISBR_PA').value("");

    }

    Form.apply();

}

//Campos etapa Ajustar Informações Analista

function camposAjustarInformacoesAnalista() {
    debugger

    Form.groups('GAJUSTEANALISTA').visible(true);
    Form.fields('PROCURAR_CPF_CNPJ').visible(false);
    //Form.groups('GOUTRACOOPATUAL').visible(false);
    //Form.groups('GCENTRALIZADORA').visible(false);
    //Form.groups('GAJUSTARPA').visible(false);
    //Form.groups('GCADASTRARSISBR').visible(false);
    //Form.groups('GNCDAATU').visible(false);
    Form.groups('GR_LAUDO').visible(false);

    camposCadastrarSisbr();
}

function finalizarAprovado() {
    debugger

    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();

    if (tipoPessoa == "Pessoa Física") {

        if (tipoAssociacao == "Sim") {

            let rural = Form.fields('CAD_RURAL').value();
            let estadoCivil = Form.fields('CAD_DP_ESTADO_CIVIL').value();
            let prospectado = Form.fields('CAD_PROSPECTADOR').value();
            let renda = Form.fields('CAD_DP_POSSUI_RENDA').value();
            let procurador = Form.fields('CAD_DP_POS_PROCURADOR').value();


            //CheckBox Rural
            if (rural == "OK") {

                Form.fields('CAD_RURAL').visible(true);
                Form.fields('CAD_RURAL').readOnly(true);
            }

            else {

                Form.fields('CAD_RURAL').visible(false);

            }

            //Prospectado por

            if (prospectado == "Espontâneo") {

                Form.fields('LBL_PROSPECTADO_POR').visible(true);

                Form.fields('CAD_PROSPECTADOR').visible(true);
                Form.fields('CAD_PROSPECTADOR').readOnly(true);

                Form.fields('CAD_PROSPECTADO_POR').visible(false);

                Form.fields('CAD_DEPTO').visible(false);

                Form.fields('CAD_PA_USUARIO_INICIADO').visible(false);

            }

            else {

                Form.fields('LBL_PROSPECTADO_POR').visible(true);

                Form.fields('CAD_PROSPECTADOR').visible(true);
                Form.fields('CAD_PROSPECTADOR').readOnly(true);

                Form.fields('CAD_PROSPECTADO_POR').visible(true);
                Form.fields('CAD_PROSPECTADO_POR').readOnly(true);

                Form.fields('CAD_DEPTO').visible(true);
                Form.fields('CAD_DEPTO').readOnly(true);

                Form.fields('CAD_PA_USUARIO_INICIADO').visible(false);
                //Form.fields('CAD_PA_USUARIO_INICIADO').readOnly(true);

            }

            //Campos Iniciais Somente Leitura

            Form.fields('LBL_TIPO_CADASTRO').visible(true);

            Form.fields('CAD_CADASTRO_ASSOC').visible(true);
            Form.fields('CAD_CADASTRO_ASSOC').readOnly(true);

            Form.fields('CAD_TIPO_PESSOA').visible(true);
            Form.fields('CAD_TIPO_PESSOA').readOnly(true);

            Form.fields('CAD_L_CADASTRO_ASSOC').visible(true);
            Form.fields('CAD_L_CADASTRO_ASSOC').readOnly(true);

            Form.fields('CAD_PA').visible(true);
            Form.fields('CAD_PA').readOnly(true);


            //Dados Pessoa Física

            Form.fields('LBL_DADOS_PESSOAIS').visible(true);

            Form.fields('CAD_DP_NOME').visible(true);
            Form.fields('CAD_DP_NOME').readOnly(true);

            Form.fields('CAD_CPF_CNPJ').visible(true);
            Form.fields('CAD_CPF_CNPJ').readOnly(true);

            Form.fields('CAD_DP_TELEFONE').visible(true);
            Form.fields('CAD_DP_TELEFONE').readOnly(true);

            Form.fields('CAD_DP_EMAIL').visible(true);
            Form.fields('CAD_DP_EMAIL').readOnly(true);

            Form.fields('CAD_DP_ESCOLARIDADE').visible(true);
            Form.fields('CAD_DP_ESCOLARIDADE').readOnly(true);

            Form.fields('CAD_DP_ESTADO_CIVIL').visible(true);
            Form.fields('CAD_DP_ESTADO_CIVIL').readOnly(true);


            if (estadoCivil == "Casado(a)") {

                Form.fields('CAD_CPF_CONJUGE').visible(true);
                Form.fields('CAD_CPF_CONJUGE').readOnly(true);

            }

            else {

                Form.fields('CAD_CPF_CONJUGE').visible(false);
            }

            //Anexos Pessoa Física
            Form.fields('CAD_DP_ANEXOS').visible(true);

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').visible(true);
            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').readOnly(true);

            Form.grids('ANEXODOCS').fields('CAD_DP_DOC_IDENT').visible(true);
            Form.grids('ANEXODOCS').fields('CAD_DP_DOC_IDENT').readOnly(true);


            //Renda Pessoa Física

            if (renda == "Sim") {

                Form.fields('LBL_POSSUI_RENDA').visible(true);

                Form.fields('CAD_DP_POSSUI_RENDA').visible(true);
                Form.fields('CAD_DP_POSSUI_RENDA').readOnly(true);

                Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').visible(true);
                Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').readOnly(true);

            }

            else {

                Form.fields('LBL_POSSUI_RENDA').visible(true);

                Form.fields('CAD_DP_POSSUI_RENDA').visible(true);
                Form.fields('CAD_DP_POSSUI_RENDA').readOnly(true);

                Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').visible(false);

            }

            //Procurador Pessoa Física

            if (procurador == "Sim") {

                Form.fields('LBL_POSSUI_PROCURADOR').visible(true);

                Form.fields('CAD_DP_POS_PROCURADOR').visible(true);
                Form.fields('CAD_DP_POS_PROCURADOR').readOnly(true);

                Form.fields('CAD_CPF_PROCURADOR').visible(true);
                Form.fields('CAD_CPF_PROCURADOR').readOnly(true);

            }

            else {

                Form.fields('LBL_POSSUI_PROCURADOR').visible(false);
                Form.fields('CAD_DP_POS_PROCURADOR').visible(false);
                Form.fields('CAD_CPF_PROCURADOR').visible(false);

            }

        }

        Form.apply();

        if (tipoAssociacao == "Não") {

            let checkDados = Form.fields('CHECK_DADOS_P_PF').value();
            let checkAnexos = Form.fields('CHECK_ANEXOS_PF').value();
            let checkRenda = Form.fields('CHECK_RENDA_PF').value();
            let checkProcurador = Form.fields('CHECK_PROCURADOR_PF').value();
            let estadoCivil = Form.fields('CAD_DP_ESTADO_CIVIL').value();
            let rural = Form.fields('CAD_RURAL').value();

            //Campos Iniciais Somente Leitura

            Form.fields('LBL_TIPO_CADASTRO').visible(false);
            Form.fields('LBL_CADASTRO_NOVO').visible(true);

            Form.fields('CAD_CADASTRO_ASSOC').visible(true);
            Form.fields('CAD_CADASTRO_ASSOC').readOnly(true);

            Form.fields('CAD_TIPO_PESSOA').visible(true);
            Form.fields('CAD_TIPO_PESSOA').readOnly(true);

            Form.fields('CAD_L_CADASTRO_ASSOC').visible(true);
            Form.fields('CAD_L_CADASTRO_ASSOC').readOnly(true);

            Form.fields('CAD_DP_NOME').visible(true);
            Form.fields('CAD_DP_NOME').readOnly(true);

            Form.fields('CAD_CPF_CNPJ').visible(true);
            Form.fields('CAD_CPF_CNPJ').readOnly(true);

            //Esconder Prospectado

            Form.fields('LBL_PROSPECTADO_POR').visible(false);
            Form.fields('CAD_PROSPECTADOR').visible(false);
            Form.fields('CAD_PROSPECTADO_POR').visible(false);
            Form.fields('CAD_DEPTO').visible(false);
            Form.fields('CAD_PA_USUARIO_INICIADO').visible(false);



            //CheckBox Rural
            if (rural == "OK") {

                Form.fields('CAD_RURAL').visible(true);
                Form.fields('CAD_RURAL').readOnly(true);
            }

            else {

                Form.fields('CAD_RURAL').visible(false);

            }



            if (checkDados == "OK") {

                Form.fields('LBL_DADOS_PESSOAIS').visible(true);

                Form.fields('CHECK_DADOS_P_PF').visible(true);
                Form.fields('CHECK_DADOS_P_PF').readOnly(true);

                Form.fields('CAD_DP_NOME').visible(true);
                Form.fields('CAD_DP_NOME').readOnly(true);

                Form.fields('CAD_CPF_CNPJ').visible(true);
                Form.fields('CAD_CPF_CNPJ').readOnly(true);

                Form.fields('CAD_DP_TELEFONE').visible(true);
                Form.fields('CAD_DP_TELEFONE').readOnly(true);

                Form.fields('CAD_DP_EMAIL').visible(true);
                Form.fields('CAD_DP_EMAIL').readOnly(true);

                Form.fields('CAD_DP_ESCOLARIDADE').visible(true);
                Form.fields('CAD_DP_ESCOLARIDADE').readOnly(true);

                Form.fields('CAD_DP_ESTADO_CIVIL').visible(true);
                Form.fields('CAD_DP_ESTADO_CIVIL').readOnly(true);


                if (estadoCivil == "Casado(a)") {

                    Form.fields('CAD_CPF_CONJUGE').visible(false);
                    //Form.fields('CAD_CPF_CONJUGE').readOnly(true);

                }

                else {

                    Form.fields('CAD_CPF_CONJUGE').visible(false);

                }

            }
            else {

                Form.fields('LBL_DADOS_PESSOAIS').visible(true);
                Form.fields('CHECK_DADOS_P_PF').visible(false);
                Form.fields('CAD_DP_NOME').visible(true);
                Form.fields('CAD_CPF_CNPJ').visible(true);
                Form.fields('CAD_DP_TELEFONE').visible(false);
                Form.fields('CAD_DP_EMAIL').visible(false);
                Form.fields('CAD_DP_ESCOLARIDADE').visible(false);
                Form.fields('CAD_CPF_CONJUGE').visible(false);
            }



            if (checkAnexos == "OK") {

                Form.fields('CAD_DP_ANEXOS').visible(true);

                Form.fields('CHECK_ANEXOS_PF').visible(true);
                Form.fields('CHECK_ANEXOS_PF').readOnly(true);

                Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').visible(true);
                Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').readOnly(true);

                Form.grids('ANEXODOCS').fields('CAD_DP_DOC_IDENT').visible(true);
                Form.grids('ANEXODOCS').fields('CAD_DP_DOC_IDENT').readOnly(true);


            }
            else {

                Form.fields('CAD_DP_ANEXOS').visible(false);
                Form.fields('CHECK_ANEXOS_PF').visible(false);
                Form.grids('ANEXODOCS').visible(false);

            }



            if (checkRenda == "OK") {

                //Renda Pessoa Física

                Form.fields('LBL_POSSUI_RENDA').visible(true);

                Form.fields('CHECK_RENDA_PF').visible(true);
                Form.fields('CHECK_RENDA_PF').readOnly(true);

                Form.fields('CAD_DP_POSSUI_RENDA').visible(true);
                Form.fields('CAD_DP_POSSUI_RENDA').readOnly(true);

                Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').visible(true);
                Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').readOnly(true);

            }

            else {

                Form.fields('LBL_POSSUI_RENDA').visible(false);
                Form.fields('CHECK_RENDA_PF').visible(false);
                Form.fields('CAD_DP_POSSUI_RENDA').visible(false);
                Form.grids('GRIDRENDA').visible(false);

            }

            if (checkProcurador == "OK") {

                //Procurador Pessoa Física   


                Form.fields('LBL_POSSUI_PROCURADOR').visible(true);

                Form.fields('CHECK_PROCURADOR_PF').visible(true);
                Form.fields('CHECK_PROCURADOR_PF').readOnly(true);

                Form.fields('CAD_DP_POS_PROCURADOR').visible(true);
                Form.fields('CAD_DP_POS_PROCURADOR').readOnly(true);

                Form.fields('CAD_CPF_PROCURADOR').visible(true);
                Form.fields('CAD_CPF_PROCURADOR').readOnly(true);

            }

            else {

                Form.fields('LBL_POSSUI_PROCURADOR').visible(false).apply();
                Form.fields('CHECK_PROCURADOR_PF').visible(false).apply();
                Form.fields('CAD_DP_POS_PROCURADOR').visible(false).apply();
                Form.fields('CAD_CPF_PROCURADOR').visible(false).apply();

            }

        }

    }

    Form.apply();

    if (tipoPessoa == "Pessoa Jurídica") {

        Form.groups('GDADOSPESSOAIS').visible(false).apply();
        camposCadastrarSisbr();
    }

}

function finalizarReprovado() {

    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();

    if (tipoPessoa == "Pessoa Física") {

        if (tipoAssociacao == "Sim") {

            let rural = Form.fields('CAD_RURAL').value();
            let estadoCivil = Form.fields('CAD_DP_ESTADO_CIVIL').value();
            let prospectado = Form.fields('CAD_PROSPECTADOR').value();
            let renda = Form.fields('CAD_DP_POSSUI_RENDA').value();
            let procurador = Form.fields('CAD_DP_POS_PROCURADOR').value();


            //CheckBox Rural
            if (rural == "OK") {

                Form.fields('CAD_RURAL').visible(true);
                Form.fields('CAD_RURAL').readOnly(true);
            }

            else {

                Form.fields('CAD_RURAL').visible(false);

            }

            //Prospectado por

            if (prospectado == "Espontâneo") {

                Form.fields('LBL_PROSPECTADO_POR').visible(true);

                Form.fields('CAD_PROSPECTADOR').visible(true);
                Form.fields('CAD_PROSPECTADOR').readOnly(true);

                Form.fields('CAD_PROSPECTADO_POR').visible(false);

                Form.fields('CAD_DEPTO').visible(false);

                Form.fields('CAD_PA_USUARIO_INICIADO').visible(false);

            }

            else {

                Form.fields('LBL_PROSPECTADO_POR').visible(true);

                Form.fields('CAD_PROSPECTADOR').visible(true);
                Form.fields('CAD_PROSPECTADOR').readOnly(true);

                Form.fields('CAD_PROSPECTADO_POR').visible(true);
                Form.fields('CAD_PROSPECTADO_POR').readOnly(true);

                Form.fields('CAD_DEPTO').visible(true);
                Form.fields('CAD_DEPTO').readOnly(true);

                Form.fields('CAD_PA_USUARIO_INICIADO').visible(false);
                //Form.fields('CAD_PA_USUARIO_INICIADO').readOnly(true);

            }

            //Campos Iniciais Somente Leitura

            Form.fields('LBL_TIPO_CADASTRO').visible(true);

            Form.fields('CAD_CADASTRO_ASSOC').visible(true);
            Form.fields('CAD_CADASTRO_ASSOC').readOnly(true);

            Form.fields('CAD_TIPO_PESSOA').visible(true);
            Form.fields('CAD_TIPO_PESSOA').readOnly(true);

            Form.fields('CAD_L_CADASTRO_ASSOC').visible(true);
            Form.fields('CAD_L_CADASTRO_ASSOC').readOnly(true);

            Form.fields('CAD_PA').visible(true);
            Form.fields('CAD_PA').readOnly(true);


            //Dados Pessoa Física

            Form.fields('LBL_DADOS_PESSOAIS').visible(true);

            Form.fields('CAD_DP_NOME').visible(true);
            Form.fields('CAD_DP_NOME').readOnly(true);

            Form.fields('CAD_CPF_CNPJ').visible(true);
            Form.fields('CAD_CPF_CNPJ').readOnly(true);

            Form.fields('CAD_DP_TELEFONE').visible(true);
            Form.fields('CAD_DP_TELEFONE').readOnly(true);

            Form.fields('CAD_DP_EMAIL').visible(true);
            Form.fields('CAD_DP_EMAIL').readOnly(true);

            Form.fields('CAD_DP_ESCOLARIDADE').visible(true);
            Form.fields('CAD_DP_ESCOLARIDADE').readOnly(true);

            Form.fields('CAD_DP_ESTADO_CIVIL').visible(true);
            Form.fields('CAD_DP_ESTADO_CIVIL').readOnly(true);


            if (estadoCivil == "Casado(a)") {

                Form.fields('CAD_CPF_CONJUGE').visible(true);
                Form.fields('CAD_CPF_CONJUGE').readOnly(true);

            }

            else {

                Form.fields('CAD_CPF_CONJUGE').visible(false);
            }

            //Anexos Pessoa Física
            Form.fields('CAD_DP_ANEXOS').visible(true);

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').visible(true);
            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').readOnly(true);

            Form.grids('ANEXODOCS').fields('CAD_DP_DOC_IDENT').visible(true);
            Form.grids('ANEXODOCS').fields('CAD_DP_DOC_IDENT').readOnly(true);


            //Renda Pessoa Física

            if (renda == "Sim") {

                Form.fields('LBL_POSSUI_RENDA').visible(true);

                Form.fields('CAD_DP_POSSUI_RENDA').visible(true);
                Form.fields('CAD_DP_POSSUI_RENDA').readOnly(true);

                Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').visible(true);
                Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').readOnly(true);

            }

            else {

                Form.fields('LBL_POSSUI_RENDA').visible(true);

                Form.fields('CAD_DP_POSSUI_RENDA').visible(true);
                Form.fields('CAD_DP_POSSUI_RENDA').readOnly(true);

                Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').visible(false);

            }

            //Procurador Pessoa Física

            if (procurador == "Sim") {

                Form.fields('LBL_POSSUI_PROCURADOR').visible(true);

                Form.fields('CAD_DP_POS_PROCURADOR').visible(true);
                Form.fields('CAD_DP_POS_PROCURADOR').readOnly(true);

                Form.fields('CAD_CPF_PROCURADOR').visible(true);
                Form.fields('CAD_CPF_PROCURADOR').readOnly(true);

            }

            else {

                Form.fields('LBL_POSSUI_PROCURADOR').visible(false);
                Form.fields('CAD_DP_POS_PROCURADOR').visible(false);
                Form.fields('CAD_CPF_PROCURADOR').visible(false);

            }

        }

        Form.apply();

        if (tipoAssociacao == "Não") {

            let checkDados = Form.fields('CHECK_DADOS_P_PF').value();
            let checkAnexos = Form.fields('CHECK_ANEXOS_PF').value();
            let checkRenda = Form.fields('CHECK_RENDA_PF').value();
            let checkProcurador = Form.fields('CHECK_PROCURADOR_PF').value();
            let estadoCivil = Form.fields('CAD_DP_ESTADO_CIVIL').value();
            let rural = Form.fields('CAD_RURAL').value();

            //Campos Iniciais Somente Leitura

            Form.fields('LBL_TIPO_CADASTRO').visible(false);
            Form.fields('LBL_CADASTRO_NOVO').visible(true);

            Form.fields('CAD_CADASTRO_ASSOC').visible(true);
            Form.fields('CAD_CADASTRO_ASSOC').readOnly(true);

            Form.fields('CAD_TIPO_PESSOA').visible(true);
            Form.fields('CAD_TIPO_PESSOA').readOnly(true);

            Form.fields('CAD_L_CADASTRO_ASSOC').visible(true);
            Form.fields('CAD_L_CADASTRO_ASSOC').readOnly(true);

            Form.fields('LBL_DADOS_PESSOAIS').visible(true);

            Form.fields('CAD_DP_NOME').visible(true);
            Form.fields('CAD_DP_NOME').readOnly(true);

            Form.fields('CAD_CPF_CNPJ').visible(true);
            Form.fields('CAD_CPF_CNPJ').readOnly(true);


            //Esconder Prospectado

            Form.fields('LBL_PROSPECTADO_POR').visible(false);
            Form.fields('CAD_PROSPECTADOR').visible(false);
            Form.fields('CAD_PROSPECTADO_POR').visible(false);
            Form.fields('CAD_DEPTO').visible(false);
            Form.fields('CAD_PA_USUARIO_INICIADO').visible(false);



            //CheckBox Rural
            if (rural == "OK") {

                Form.fields('CAD_RURAL').visible(true);
                Form.fields('CAD_RURAL').readOnly(true);
            }

            else {

                Form.fields('CAD_RURAL').visible(false);

            }



            if (checkDados == "OK") {

                Form.fields('LBL_DADOS_PESSOAIS').visible(true);

                Form.fields('CHECK_DADOS_P_PF').visible(true);
                Form.fields('CHECK_DADOS_P_PF').readOnly(true);

                Form.fields('CAD_DP_NOME').visible(true);
                Form.fields('CAD_DP_NOME').readOnly(true);

                Form.fields('CAD_CPF_CNPJ').visible(true);
                Form.fields('CAD_CPF_CNPJ').readOnly(true);

                Form.fields('CAD_DP_TELEFONE').visible(true);
                Form.fields('CAD_DP_TELEFONE').readOnly(true);

                Form.fields('CAD_DP_EMAIL').visible(true);
                Form.fields('CAD_DP_EMAIL').readOnly(true);

                Form.fields('CAD_DP_ESCOLARIDADE').visible(true);
                Form.fields('CAD_DP_ESCOLARIDADE').readOnly(true);

                Form.fields('CAD_DP_ESTADO_CIVIL').visible(true);
                Form.fields('CAD_DP_ESTADO_CIVIL').readOnly(true);


                if (estadoCivil == "Casado(a)") {

                    Form.fields('CAD_CPF_CONJUGE').visible(true);
                    Form.fields('CAD_CPF_CONJUGE').readOnly(true);

                }

                else {

                    Form.fields('CAD_CPF_CONJUGE').visible(false);

                }

            }
            else {

                Form.fields('LBL_DADOS_PESSOAIS').visible(true);
                Form.fields('CHECK_DADOS_P_PF').visible(false);
                Form.fields('CAD_DP_NOME').visible(true);
                Form.fields('CAD_CPF_CNPJ').visible(true);
                Form.fields('CAD_DP_TELEFONE').visible(false);
                Form.fields('CAD_DP_EMAIL').visible(false);
                Form.fields('CAD_DP_ESCOLARIDADE').visible(false);
                Form.fields('CAD_CPF_CONJUGE').visible(false);
            }



            if (checkAnexos == "OK") {

                Form.fields('CAD_DP_ANEXOS').visible(true);

                Form.fields('CHECK_ANEXOS_PF').visible(true);
                Form.fields('CHECK_ANEXOS_PF').readOnly(true);

                Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').visible(true);
                Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').readOnly(true);

                Form.grids('ANEXODOCS').fields('CAD_DP_DOC_IDENT').visible(true);
                Form.grids('ANEXODOCS').fields('CAD_DP_DOC_IDENT').readOnly(true);


            }
            else {

                Form.fields('CAD_DP_ANEXOS').visible(false);
                Form.fields('CHECK_ANEXOS_PF').visible(false);
                Form.grids('ANEXODOCS').visible(false);

            }



            if (checkRenda == "OK") {

                //Renda Pessoa Física

                Form.fields('LBL_POSSUI_RENDA').visible(true);

                Form.fields('CHECK_RENDA_PF').visible(true);
                Form.fields('CHECK_RENDA_PF').readOnly(true);

                Form.fields('CAD_DP_POSSUI_RENDA').visible(true);
                Form.fields('CAD_DP_POSSUI_RENDA').readOnly(true);

                Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').visible(true);
                Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').readOnly(true);

            }

            else {

                Form.fields('LBL_POSSUI_RENDA').visible(false);
                Form.fields('CHECK_RENDA_PF').visible(false);
                Form.fields('CAD_DP_POSSUI_RENDA').visible(false);
                Form.grids('GRIDRENDA').visible(false);

            }

            if (checkProcurador == "OK") {

                //Procurador Pessoa Física   


                Form.fields('LBL_POSSUI_PROCURADOR').visible(true);

                Form.fields('CHECK_PROCURADOR_PF').visible(true);
                Form.fields('CHECK_PROCURADOR_PF').readOnly(true);

                Form.fields('CAD_DP_POS_PROCURADOR').visible(true);
                Form.fields('CAD_DP_POS_PROCURADOR').readOnly(true);

                Form.fields('CAD_CPF_PROCURADOR').visible(true);
                Form.fields('CAD_CPF_PROCURADOR').readOnly(true);

            }

            else {

                Form.fields('LBL_POSSUI_PROCURADOR').visible(false).apply();
                Form.fields('CHECK_PROCURADOR_PF').visible(false).apply();
                Form.fields('CAD_DP_POS_PROCURADOR').visible(false).apply();
                Form.fields('CAD_CPF_PROCURADOR').visible(false).apply();

            }

        }

    }

    Form.apply();

    if (tipoPessoa == "Pessoa Jurídica") {

        Form.groups('GDADOSPESSOAIS').visible(false).apply();
        camposCadastrarSisbr();
    }

}


/*Form.groups('GR_LAUDO').visible(false).apply();

Form.groups('GAJUSTEANALISTA').visible(false).apply();

Form.groups('GAJUSTARPA').visible(false).apply();

Form.fields('CAD_HISTORICO_GERAL').visible(true).apply();
Form.fields('CAD_HISTORICO_GERAL').readOnly(true).apply();*/

/*

select COD_PROCESSO_F, COD_ETAPA_F 
from f_t_cad_pf
where CAD_CPF_CNPJ = '$CAD_CPF_CNPJ' and COD_ETAPA_F  NOT IN (4,7)

*/

function encontrouCpfCnpj() {
    debugger

    let cpfCnpj = Form.fields('CAD_CPF_CNPJ').value();
    let processos = Form.fields('PROCURAR_CPF_CNPJ').value();

    if ((processos == undefined || processos == "" || processos == null) && (cpfCnpj == undefined || cpfCnpj == "" || processos == cpfCnpj)) {

        Form.fields('PROCURAR_CPF_CNPJ').visible(false);
        Form.fields('LBL_CPF_CNPJ').visible(false);

    }

    else {

        Form.fields('PROCURAR_CPF_CNPJ').visible(false);
        Form.fields('LBL_CPF_CNPJ').visible(true);

    }

    Form.apply();

}

function limparCheckCalcular() {

    Form.fields('CRED_CHECK_CALCULAR').value('').apply();

}


function roteamentoCadastrarSisbr() {
    debugger

    let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value() || '';
    let outraCooperativa = Form.fields('CAD_CAD_OUTRA_COOP').value() || '';
    let listaDirecionar = Form.fields('CAD_LISTA_DIRECIONAR').value() || '';
    let auxParalelo = Form.fields('AUX_ROTA_PARALELO').value() || '';

    if (tipoAssociacao == "Sim" && outraCooperativa == "Sim" && listaDirecionar == 'Prosseguir' && (auxParalelo == undefined || auxParalelo == "")) {

        Form.fields('CAD_AUX_ROTEAMENTO').value('Abrir Paralelo');
        Form.actions("aprovar").hidden(false).label('Prosseguir');
        Form.actions("rejeitar").hidden(true);

    }

    else if (tipoAssociacao != '' && outraCooperativa != '' && (listaDirecionar == undefined || listaDirecionar == '')) {

        Form.fields('CAD_AUX_ROTEAMENTO').value('');

    }

    else if (tipoAssociacao != '' && listaDirecionar != '' && (outraCooperativa == undefined || outraCooperativa == '')) {

        Form.fields('CAD_AUX_ROTEAMENTO').value('');

    }

    else if (tipoAssociacao != '' && (outraCooperativa == undefined || outraCooperativa == '') && (listaDirecionar == undefined || listaDirecionar == '')) {

        Form.fields('CAD_AUX_ROTEAMENTO').value('');

    }

    else if (tipoAssociacao == "Não" && outraCooperativa == "Sim" && listaDirecionar == 'Prosseguir') {

        Form.fields('CAD_AUX_ROTEAMENTO').value('Aguardar Aprovação Externa');

    }

    else if (tipoAssociacao == "Não" && outraCooperativa != '' && listaDirecionar == 'Finalizar Rejeitado') {

        Form.fields('CAD_AUX_ROTEAMENTO').value('');

    }

    else if (tipoAssociacao == "Não" && outraCooperativa != '' && listaDirecionar == 'Ajustar Informações PA') {

        Form.fields('CAD_AUX_ROTEAMENTO').value('');

    }

    else if (listaDirecionar == "Ajustar Informações PA" && tipoAssociacao != '' && outraCooperativa != '') {

        Form.fields('CAD_AUX_ROTEAMENTO').value('');

    }

    else if (listaDirecionar == "Finalizar Rejeitado" && tipoAssociacao != '' && outraCooperativa != '') {

        Form.fields('CAD_AUX_ROTEAMENTO').value('');

    }

    else if (auxParalelo == "OK" && listaDirecionar == "Prosseguir") {

        Form.fields('CAD_AUX_ROTEAMENTO').value('Aprovar Cadastro');

    }

    else {

        Form.fields('CAD_AUX_ROTEAMENTO').value('Aprovar Cadastro');

    }

    Form.apply();

}

function botoesCadastrarSisbr() {

    let listaDirecionar = Form.fields('CAD_LISTA_DIRECIONAR').value() || '';

    if (listaDirecionar == undefined || listaDirecionar == "") {

        Form.actions('aprovar').hidden(true);
        Form.actions('rejeitar').hidden(true);
    }

    else if (listaDirecionar == "Prosseguir") {

        Form.actions('aprovar').hidden(false).label('Prosseguir');
        Form.actions('rejeitar').hidden(true);

    }

    else if (listaDirecionar == "Finalizar Rejeitado") {

        Form.actions('aprovar').hidden(true);
        Form.actions('rejeitar').hidden(false).label('Finalizar Rejeitado');

    }

    else if (listaDirecionar == "Ajustar Informações PA") {

        Form.actions('aprovar').hidden(true);
        Form.actions('rejeitar').hidden(false).label('Ajustar Informações PA');

    }

    else {

        Form.actions('aprovar').hidden(true);
        Form.actions('rejeitar').hidden(true);

    }

    Form.apply();

}


function regraSisbr() {

    Form.fields('CAD_AUX_ANALISTA').value('SISBR').apply();

}

function regraAnalista() {

    Form.fields('AUX_ANALISTA').value('Analista').apply();

}

function botoesAjustarInformacoesAnalista() {

    let listaDirecionar = Form.fields('CAD_LISTA_DIRECIONAR').value() || '';

    if (listaDirecionar == undefined || listaDirecionar == "") {

        Form.actions('aprovar').hidden(true);
        Form.actions('rejeitar').hidden(true);
    }

    else if (listaDirecionar == "Prosseguir") {

        Form.actions('aprovar').hidden(false).label('Prosseguir');
        Form.actions('rejeitar').hidden(true);

    }

    else if (listaDirecionar == "Ajustar Informações PA") {

        Form.actions('aprovar').hidden(true);
        Form.actions('rejeitar').hidden(false).label('Ajustar Informações PA');

    }

    else {

        Form.actions('aprovar').hidden(true);
        Form.actions('rejeitar').hidden(true);

    }

    Form.apply();

}

//REGRAS DE TELA AGUARDAR APROVAÇÃO EXTERNA

function regraAjustePaAprovacaoExterna() {

    let buttonAjuste = Form.fields('CAD_BUTTON_AJUSTE_AT').value();

    if (buttonAjuste == "Ajustar PA") {

        Form.fields('CAD_ANALISE_SISBR_PA').value('OK');
    }

    else if (buttonAjuste == "Rejeitar") {

        Form.fields('CAD_STATUS').value('Rejeitar');
    }

    else if (buttonAjuste == "Aprovar") {

        Form.fields('CAD_STATUS').value('Aprovar');

    }

    else {

        Form.fields('CAD_ANALISE_SISBR_PA').value('');

    }

    Form.apply();

}

function casadoAguardarAprovacaoExterna() {

    let estadoCivil = Form.fields('CAD_DP_ESTADO_CIVIL').value();

    if (estadoCivil == "Casado(a)") {

        Form.fields('CAD_CPF_CONJUGE').visible(true);
        Form.fields('CAD_CPF_CONJUGE').readOnly(true);
    }

    else {

        Form.fields('CAD_CPF_CONJUGE').visible(false);

    }

    Form.apply();
}

function possuiRendaAguardarAprovacaoExterna() {
    debugger

    let renda = Form.fields('CAD_DP_POSSUI_RENDA').value();

    if (renda == "Sim") {

        Form.fields('LBL_POSSUI_RENDA').visible(true);

        Form.fields('CAD_DP_POSSUI_RENDA').visible(true);
        Form.fields('CAD_DP_POSSUI_RENDA').readOnly(true);

        Form.grids('GRIDRENDA').visible(true);
        Form.grids('GRIDRENDA').readOnly(true);
    }

    else {

        Form.fields('LBL_POSSUI_RENDA').visible(false);
        Form.fields('CAD_DP_POSSUI_RENDA').visible(false);
        Form.grids('GRIDRENDA').visible(false);

    }

    Form.apply();
}

function possuiProcuradorAguardarAprovacaoExterna() {

    let procurador = Form.fields('CAD_DP_POS_PROCURADOR').value()

    if (procurador == "Sim") {

        Form.fields('LBL_POSSUI_PROCURADOR').visible(true);

        Form.fields('CAD_DP_POS_PROCURADOR').visible(true);
        Form.fields('CAD_DP_POS_PROCURADOR').readOnly(true);

        Form.fields('CAD_CPF_PROCURADOR').visible(true);
        Form.fields('CAD_CPF_PROCURADOR').readOnly(true);

    }

    else {

        Form.fields('LBL_POSSUI_PROCURADOR').visible(false);
        Form.fields('CAD_DP_POS_PROCURADOR').visible(false);
        Form.fields('CAD_CPF_PROCURADOR').visible(false);

    }

    Form.apply();

}

function botoesAguardarAprovacaoExterna() {

    let checkCooperativa = Form.fields('CAD_CHECK_OUT_COOP_DIR').value();

    if (checkCooperativa == "OK") {

        Form.actions("aprovar").hidden(false).label('Prosseguir');
        Form.actions("rejeitar").hidden(true);

    }

    else {

        Form.actions("aprovar").hidden(true);
        Form.actions("rejeitar").hidden(false).label('Ajustar');
    }

    Form.apply();

}


function camposAguardarAprovacaoExterna() {
    debugger

    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();

    if (tipoPessoa == "Pessoa Física") {

        if (tipoAssociacao == "Sim") {

            let rural = Form.fields('CAD_RURAL').value();
            let estadoCivil = Form.fields('CAD_DP_ESTADO_CIVIL').value();
            let prospectado = Form.fields('CAD_PROSPECTADOR').value();
            let renda = Form.fields('CAD_DP_POSSUI_RENDA').value();
            let procurador = Form.fields('CAD_DP_POS_PROCURADOR').value();


            //CheckBox Rural
            if (rural == "OK") {

                Form.fields('CAD_RURAL').visible(true);
                Form.fields('CAD_RURAL').readOnly(true);
            }

            else {

                Form.fields('CAD_RURAL').visible(false);

            }

            //Prospectado por

            if (prospectado == "Espontâneo") {

                Form.fields('LBL_PROSPECTADO_POR').visible(true);

                Form.fields('CAD_PROSPECTADOR').visible(true);
                Form.fields('CAD_PROSPECTADOR').readOnly(true);

                Form.fields('CAD_PROSPECTADO_POR').visible(false);

                Form.fields('CAD_DEPTO').visible(false);

                Form.fields('CAD_PA_USUARIO_INICIADO').visible(false);

            }

            else {

                Form.fields('LBL_PROSPECTADO_POR').visible(true);

                Form.fields('CAD_PROSPECTADOR').visible(true);
                Form.fields('CAD_PROSPECTADOR').readOnly(true);

                Form.fields('CAD_PROSPECTADO_POR').visible(true);
                Form.fields('CAD_PROSPECTADO_POR').readOnly(true);

                Form.fields('CAD_DEPTO').visible(true);
                Form.fields('CAD_DEPTO').readOnly(true);

                Form.fields('CAD_PA_USUARIO_INICIADO').visible(false);
                //Form.fields('CAD_PA_USUARIO_INICIADO').readOnly(true);

            }

            //Campos Iniciais Somente Leitura

            Form.fields('LBL_TIPO_CADASTRO').visible(true);

            Form.fields('CAD_CADASTRO_ASSOC').visible(true);
            Form.fields('CAD_CADASTRO_ASSOC').readOnly(true);

            Form.fields('CAD_TIPO_PESSOA').visible(true);
            Form.fields('CAD_TIPO_PESSOA').readOnly(true);

            Form.fields('CAD_L_CADASTRO_ASSOC').visible(true);
            Form.fields('CAD_L_CADASTRO_ASSOC').readOnly(true);

            Form.fields('CAD_PA').visible(true);
            Form.fields('CAD_PA').readOnly(true);


            //Dados Pessoa Física

            Form.fields('LBL_DADOS_PESSOAIS').visible(true);

            Form.fields('CAD_DP_NOME').visible(true);
            Form.fields('CAD_DP_NOME').readOnly(true);

            Form.fields('CAD_CPF_CNPJ').visible(true);
            Form.fields('CAD_CPF_CNPJ').readOnly(true);

            Form.fields('CAD_DP_TELEFONE').visible(true);
            Form.fields('CAD_DP_TELEFONE').readOnly(true);

            Form.fields('CAD_DP_EMAIL').visible(true);
            Form.fields('CAD_DP_EMAIL').readOnly(true);

            Form.fields('CAD_DP_ESCOLARIDADE').visible(true);
            Form.fields('CAD_DP_ESCOLARIDADE').readOnly(true);

            Form.fields('CAD_DP_ESTADO_CIVIL').visible(true);
            Form.fields('CAD_DP_ESTADO_CIVIL').readOnly(true);


            if (estadoCivil == "Casado(a)") {

                Form.fields('CAD_CPF_CONJUGE').visible(true);
                Form.fields('CAD_CPF_CONJUGE').readOnly(true);

            }

            else {

                Form.fields('CAD_CPF_CONJUGE').visible(false);
            }

            //Anexos Pessoa Física
            Form.fields('CAD_DP_ANEXOS').visible(true);

            Form.grids('ANEXODOCS').visible(true);

            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').visible(true);
            Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').readOnly(true);

            Form.grids('ANEXODOCS').fields('CAD_DP_DOC_IDENT').visible(true);
            Form.grids('ANEXODOCS').fields('CAD_DP_DOC_IDENT').readOnly(true);


            //Renda Pessoa Física

            if (renda == "Sim") {

                Form.fields('LBL_POSSUI_RENDA').visible(true);

                Form.fields('CAD_DP_POSSUI_RENDA').visible(true);
                Form.fields('CAD_DP_POSSUI_RENDA').readOnly(true);

                Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').visible(true);
                Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').readOnly(true);

            }

            else {

                Form.fields('LBL_POSSUI_RENDA').visible(true);

                Form.fields('CAD_DP_POSSUI_RENDA').visible(true);
                Form.fields('CAD_DP_POSSUI_RENDA').readOnly(true);

                Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').visible(false);

            }

            //Procurador Pessoa Física

            if (procurador == "Sim") {

                Form.fields('LBL_POSSUI_PROCURADOR').visible(true);

                Form.fields('CAD_DP_POS_PROCURADOR').visible(true);
                Form.fields('CAD_DP_POS_PROCURADOR').readOnly(true);

                Form.fields('CAD_CPF_PROCURADOR').visible(true);
                Form.fields('CAD_CPF_PROCURADOR').readOnly(true);

            }

            else {

                Form.fields('LBL_POSSUI_PROCURADOR').visible(false);
                Form.fields('CAD_DP_POS_PROCURADOR').visible(false);
                Form.fields('CAD_CPF_PROCURADOR').visible(false);

            }

        }

        Form.apply();

        if (tipoAssociacao == "Não") {

            let checkDados = Form.fields('CHECK_DADOS_P_PF').value();
            let checkAnexos = Form.fields('CHECK_ANEXOS_PF').value();
            let checkRenda = Form.fields('CHECK_RENDA_PF').value();
            let checkProcurador = Form.fields('CHECK_PROCURADOR_PF').value();
            let estadoCivil = Form.fields('CAD_DP_ESTADO_CIVIL').value();
            let rural = Form.fields('CAD_RURAL').value();

            //Campos Iniciais Somente Leitura

            Form.fields('LBL_TIPO_CADASTRO').visible(false);
            Form.fields('LBL_CADASTRO_NOVO').visible(true);

            Form.fields('CAD_CADASTRO_ASSOC').visible(true);
            Form.fields('CAD_CADASTRO_ASSOC').readOnly(true);

            Form.fields('CAD_TIPO_PESSOA').visible(true);
            Form.fields('CAD_TIPO_PESSOA').readOnly(true);

            Form.fields('CAD_L_CADASTRO_ASSOC').visible(true);
            Form.fields('CAD_L_CADASTRO_ASSOC').readOnly(true);

            Form.fields('CAD_DP_NOME').visible(true);
            Form.fields('CAD_DP_NOME').readOnly(true);

            Form.fields('CAD_CPF_CNPJ').visible(true);
            Form.fields('CAD_CPF_CNPJ').readOnly(true);


            //Esconder Prospectado

            Form.fields('LBL_PROSPECTADO_POR').visible(false);
            Form.fields('CAD_PROSPECTADOR').visible(false);
            Form.fields('CAD_PROSPECTADO_POR').visible(false);
            Form.fields('CAD_DEPTO').visible(false);
            Form.fields('CAD_PA_USUARIO_INICIADO').visible(false);



            //CheckBox Rural
            if (rural == "OK") {

                Form.fields('CAD_RURAL').visible(true);
                Form.fields('CAD_RURAL').readOnly(true);
            }

            else {

                Form.fields('CAD_RURAL').visible(false);

            }



            if (checkDados == "OK") {

                Form.fields('LBL_DADOS_PESSOAIS').visible(true);

                Form.fields('CHECK_DADOS_P_PF').visible(true);
                Form.fields('CHECK_DADOS_P_PF').readOnly(true);

                Form.fields('CAD_DP_NOME').visible(true);
                Form.fields('CAD_DP_NOME').readOnly(true);

                Form.fields('LBL_DADOS_PESSOAIS').visible(true);

                Form.fields('CAD_CPF_CNPJ').visible(true);
                Form.fields('CAD_CPF_CNPJ').readOnly(true);

                Form.fields('CAD_DP_TELEFONE').visible(true);
                Form.fields('CAD_DP_TELEFONE').readOnly(true);

                Form.fields('CAD_DP_EMAIL').visible(true);
                Form.fields('CAD_DP_EMAIL').readOnly(true);

                Form.fields('CAD_DP_ESCOLARIDADE').visible(true);
                Form.fields('CAD_DP_ESCOLARIDADE').readOnly(true);

                Form.fields('CAD_DP_ESTADO_CIVIL').visible(true);


                if (estadoCivil == "Casado(a)") {

                    Form.fields('CAD_CPF_CONJUGE').visible(false);
                    //Form.fields('CAD_CPF_CONJUGE').readOnly(true);

                }

                else {

                    Form.fields('CAD_CPF_CONJUGE').visible(false);

                }

            }
            else {

                Form.fields('LBL_DADOS_PESSOAIS').visible(true);
                Form.fields('CHECK_DADOS_P_PF').visible(false);
                Form.fields('CAD_DP_NOME').visible(true);
                Form.fields('CAD_CPF_CNPJ').visible(true);
                Form.fields('CAD_DP_TELEFONE').visible(false);
                Form.fields('CAD_DP_EMAIL').visible(false);
                Form.fields('CAD_DP_ESCOLARIDADE').visible(false);
                Form.fields('CAD_CPF_CONJUGE').visible(false);
            }



            if (checkAnexos == "OK") {

                Form.fields('CAD_DP_ANEXOS').visible(true);

                Form.fields('CHECK_ANEXOS_PF').visible(true);
                Form.fields('CHECK_ANEXOS_PF').readOnly(true);

                Form.grids('ANEXODOCS').visible(true);

                Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').visible(true);
                Form.grids('ANEXODOCS').fields('CAD_LISTA_TIPO_DOC').readOnly(true);

                Form.grids('ANEXODOCS').fields('CAD_DP_DOC_IDENT').visible(true);
                Form.grids('ANEXODOCS').fields('CAD_DP_DOC_IDENT').readOnly(true);


            }
            else {

                Form.fields('CAD_DP_ANEXOS').visible(false);
                Form.fields('CHECK_ANEXOS_PF').visible(false);
                Form.grids('ANEXODOCS').visible(false);

            }



            if (checkRenda == "OK") {

                //Renda Pessoa Física

                Form.fields('LBL_POSSUI_RENDA').visible(true);

                Form.fields('CHECK_RENDA_PF').visible(true);
                Form.fields('CHECK_RENDA_PF').readOnly(true);

                Form.fields('CAD_DP_POSSUI_RENDA').visible(true);
                Form.fields('CAD_DP_POSSUI_RENDA').readOnly(true);

                Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').visible(true);
                Form.grids('GRIDRENDA').fields('CAD_ANEXO_RENDA').readOnly(true);

            }

            else {

                Form.fields('LBL_POSSUI_RENDA').visible(false);
                Form.fields('CHECK_RENDA_PF').visible(false);
                Form.fields('CAD_DP_POSSUI_RENDA').visible(false);
                Form.grids('GRIDRENDA').visible(false);

            }

            if (checkProcurador == "OK") {

                //Procurador Pessoa Física   


                Form.fields('LBL_POSSUI_PROCURADOR').visible(true);

                Form.fields('CHECK_PROCURADOR_PF').visible(true);
                Form.fields('CHECK_PROCURADOR_PF').readOnly(true);

                Form.fields('CAD_DP_POS_PROCURADOR').visible(true);
                Form.fields('CAD_DP_POS_PROCURADOR').readOnly(true);

                Form.fields('CAD_CPF_PROCURADOR').visible(true);
                Form.fields('CAD_CPF_PROCURADOR').readOnly(true);

            }

            else {

                Form.fields('LBL_POSSUI_PROCURADOR').visible(false).apply();
                Form.fields('CHECK_PROCURADOR_PF').visible(false).apply();
                Form.fields('CAD_DP_POS_PROCURADOR').visible(false).apply();
                Form.fields('CAD_CPF_PROCURADOR').visible(false).apply();

            }

        }

    }

    Form.apply();


}

//REGRAS DE TELA CENTRALIZADORA CADASTRO

function camposCentralizadora() {

    Form.groups('GR_LAUDO').visible(false);
    Form.groups('GAJUSTEANALISTA').visible(false);
    Form.fields('PROCURAR_CPF_CNPJ').visible(false);

    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();

    if (tipoPessoa == "Pessoa Física") {

        if (tipoAssociacao == "Sim") {

            let estadoCivil = Form.fields('CAD_DP_ESTADO_CIVIL').value();
            let prospectado = Form.fields('CAD_PROSPECTADOR').value();
            let rural = Form.fields('CAD_RURAL').value();

            //Dados Pessoais
            Form.fields('LBL_TIPO_CADASTRO').visible(true);

            Form.fields('LBL_DADOS_PESSOAIS').visible(true);
            Form.fields('LBL_DADOS_PESSOAIS').readOnly(true);

            Form.fields('CAD_DP_NOME').visible(true);
            Form.fields('CAD_DP_NOME').readOnly(true);

            Form.fields('CAD_CPF_CNPJ').visible(true);
            Form.fields('CAD_CPF_CNPJ').readOnly(true);

            Form.fields('CAD_DP_TELEFONE').visible(true);
            Form.fields('CAD_DP_TELEFONE').readOnly(true);

            Form.fields('CAD_DP_EMAIL').visible(true);
            Form.fields('CAD_DP_EMAIL').readOnly(true);

            Form.fields('CAD_DP_ESCOLARIDADE').visible(true);
            Form.fields('CAD_DP_ESCOLARIDADE').readOnly(true);

            Form.fields('CAD_DP_ESTADO_CIVIL').visible(true);
            Form.fields('CAD_DP_ESTADO_CIVIL').readOnly(true);

            if (prospectado == "Espontâneo") {

                Form.fields('LBL_PROSPECTADO_POR').visible(true);
                Form.fields('CAD_PROSPECTADOR').visible(true);
                Form.fields('CAD_PROSPECTADOR').readOnly(true);

                Form.fields('CAD_PROSPECTADO_POR').visible(false);
                Form.fields('CAD_DEPTO').visible(false);
            }
            else {

                Form.fields('LBL_PROSPECTADO_POR').visible(true);

                Form.fields('CAD_PROSPECTADOR').visible(true);
                Form.fields('CAD_PROSPECTADOR').readOnly(true);

                Form.fields('CAD_PROSPECTADO_POR').visible(true);
                Form.fields('CAD_PROSPECTADO_POR').readOnly(true);

                Form.fields('CAD_DEPTO').visible(true);
                Form.fields('CAD_DEPTO').readOnly(true);

            }


            if (estadoCivil == "Casado(a)") {

                Form.fields('CAD_CPF_CONJUGE').visible(true);
                Form.fields('CAD_CPF_CONJUGE').readOnly(true);
            }

            else {

                Form.fields('CAD_CPF_CONJUGE').visible(false);

            }

            if (rural == "OK") {

                Form.fields('CAD_RURAL').visible(true);
            }

            else {

                Form.fields('CAD_RURAL').visible(false);

            }

            //Anexos PF

            Form.fields('CAD_DP_ANEXOS').visible(false);
            Form.grids('ANEXODOCS').visible(false);

            Form.fields('LBL_POSSUI_RENDA').visible(false);
            Form.fields('CAD_DP_POSSUI_RENDA').visible(false);
            Form.grids('GRIDRENDA').visible(false);

            Form.fields('LBL_POSSUI_PROCURADOR').visible(false);
            Form.fields('CAD_DP_POS_PROCURADOR').visible(false);
            Form.fields('CAD_CPF_PROCURADOR').visible(false);

        }

        Form.apply();

        if (tipoAssociacao == "Não") {

            let checkDados = Form.fields('CHECK_DADOS_P_PF').value();
            let checkRenda = Form.fields('CHECK_RENDA_PF').value();
            let checkProcurador = Form.fields('CHECK_PROCURADOR_PF').value();
            let checkAnexos = Form.fields('CHECK_ANEXOS_PF').value();
            let estadoCivil = Form.fields('CAD_DP_ESTADO_CIVIL').value();
            let rural = Form.fields('CAD_RURAL').value();

            Form.fields('LBL_CADASTRO_NOVO').visible(true);

            Form.fields('CAD_CADASTRO_ASSOC').visible(true);
            Form.fields('CAD_CADASTRO_ASSOC').readOnly(true);

            Form.fields('CAD_TIPO_PESSOA').visible(true);
            Form.fields('CAD_TIPO_PESSOA').readOnly(true);

            Form.fields('CAD_RURAL').visible(true);
            Form.fields('CAD_RURAL').readOnly(true);

            Form.fields('CAD_L_CADASTRO_ASSOC').visible(true);
            Form.fields('CAD_L_CADASTRO_ASSOC').readOnly(true);

            Form.fields('LBL_DADOS_PESSOAIS').visible(true);

            Form.fields('CAD_DP_NOME').visible(true);
            Form.fields('CAD_DP_NOME').readOnly(true);

            Form.fields('CAD_CPF_CNPJ').visible(true);
            Form.fields('CAD_CPF_CNPJ').readOnly(true);

            Form.fields('LBL_PROSPECTADO_POR').visible(false);
            Form.fields('CAD_PROSPECTADOR').visible(false);
            Form.fields('CAD_PROSPECTADO_POR').visible(false);
            Form.fields('CAD_DEPTO').visible(false);

            Form.fields('CAD_DP_ANEXOS').visible(false);
            Form.grids('ANEXODOCS').visible(false);

            Form.fields('LBL_POSSUI_RENDA').visible(false);
            Form.fields('CAD_DP_POSSUI_RENDA').visible(false);
            Form.grids('GRIDRENDA').visible(false);

            Form.fields('LBL_POSSUI_PROCURADOR').visible(false);
            Form.fields('CAD_DP_POS_PROCURADOR').visible(false);
            Form.fields('CAD_CPF_PROCURADOR').visible(false);

            if (rural == "OK") {

                Form.fields('CAD_RURAL').visible(true);
            }

            else {

                Form.fields('CAD_RURAL').visible(false);

            }


            if (checkDados == "OK") {

                Form.fields('CHECK_DADOS_P_PF').visible(true);
                Form.fields('CHECK_DADOS_P_PF').readOnly(true);

                Form.fields('LBL_DADOS_PESSOAIS').visible(true);
                Form.fields('LBL_DADOS_PESSOAIS').readOnly(true);

                Form.fields('CAD_DP_NOME').visible(true);
                Form.fields('CAD_DP_NOME').readOnly(true);

                Form.fields('CAD_CPF_CNPJ').visible(true);
                Form.fields('CAD_CPF_CNPJ').readOnly(true);

                Form.fields('CAD_DP_TELEFONE').visible(true);
                Form.fields('CAD_DP_TELEFONE').readOnly(true);

                Form.fields('CAD_DP_EMAIL').visible(true);
                Form.fields('CAD_DP_EMAIL').readOnly(true);

                Form.fields('CAD_DP_ESCOLARIDADE').visible(true);
                Form.fields('CAD_DP_ESCOLARIDADE').readOnly(true);

                Form.fields('CAD_DP_ESTADO_CIVIL').visible(true);
                Form.fields('CAD_DP_ESTADO_CIVIL').readOnly(true);


                if (estadoCivil == "Casado(a)") {

                    Form.fields('CAD_CPF_CONJUGE').visible(true);
                    Form.fields('CAD_CPF_CONJUGE').readOnly(true);
                }

                else {

                    Form.fields('CAD_CPF_CONJUGE').visible(false);

                }

            }

            else {

                Form.fields('LBL_DADOS_PESSOAIS').visible(true);
                Form.fields('CAD_DP_NOME').visible(true);
                Form.fields('CAD_CPF_CNPJ').visible(true);
                Form.fields('CAD_DP_TELEFONE').visible(false);
                Form.fields('CAD_DP_EMAIL').visible(false);
                Form.fields('CAD_DP_ESCOLARIDADE').visible(false);
                Form.fields('CAD_DP_ESTADO_CIVIL').visible(false);
                Form.fields('CAD_CPF_CONJUGE').visible(false);

            }

            if (checkRenda == "OK") {

                Form.fields('CHECK_RENDA_PF').visible(true);
                Form.fields('CHECK_RENDA_PF').readOnly(true);

            }

            else {

                Form.fields('CHECK_RENDA_PF').visible(false);

            }

            if (checkAnexos == "OK") {

                Form.fields('CHECK_ANEXOS_PF').visible(true);
                Form.fields('CHECK_ANEXOS_PF').readOnly(true);

            }

            else {

                Form.fields('CHECK_ANEXOS_PF').visible(false);

            }

            if (checkProcurador == "OK") {

                Form.fields('CHECK_PROCURADOR_PF').visible(true);
                Form.fields('CHECK_PROCURADOR_PF').readOnly(true);

            }

            else {

                Form.fields('CHECK_PROCURADOR_PF').visible(false);

            }

        }

        Form.apply();
    }

    if (tipoPessoa == "Pessoa Jurídica") {

        Form.groups('GDADOSPESSOAIS').visible(false).apply();
        camposCadastrarSisbr();
    }
    Form.apply();
}

//Pessoa Jurídica - Cadastro associação Não

function atualizacaoPJ() {
    debugger

    let dadosPJ = Form.fields('CHECK_DADOS_P_PJ').value();
    let anexosPJ = Form.fields('CHECK_ANEXOS_PJ').value();
    let faturamentoPJ = Form.fields('CHECK_FATURAMENTO_PJ').value();
    let patrimonioPJ = Form.fields('CHECK_PATRIMONIO_PJ').value();
    let sociosPJ = Form.fields('CHECK_SOCIOS_PJ').value();
    let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();

    if (tipoPessoa == "Pessoa Jurídica" && tipoAssociacao == "Não") {

        if (dadosPJ == undefined && anexosPJ == undefined && faturamentoPJ == undefined && patrimonioPJ == undefined && sociosPJ == undefined) {

            //Dados Pessoa Jurídica

            Form.fields('LBL_DADOS_PJ').visible(false);
            Form.fields('CAD_RAZAO_SOCIAL').visible(false);
            Form.fields('CAD_NOME_FANTASIA').visible(false);
            Form.fields('CAD_CPF_CNPJ').visible(false);
            Form.fields('AUX_CNPJ').visible(false)
            Form.fields('CAD_EMAIL_PJ').visible(false);
            Form.fields('CAD_TEL_FIXO_PJ').visible(false);
            Form.fields('CAD_CEL_PJ').visible(false);


            //Anexos PJ

            Form.fields('LBL_ANEXOS_PF').visible(false);
            Form.grids('GRID_PJ').visible(false);
            Form.grids('GRID_PJ').fields('CAD_LISTA_PJ').visible(false);
            Form.grids('GRID_PJ').fields('CAD_ANEXO_PJ').visible(false);

            //Possui Faturamento

            Form.fields('LBL_FATURAMENTO_PF').visible(false);
            Form.fields('CAD_POSSUI_FAT_PJ').visible(false);
            Form.grids('GRID_FAT_PJ').visible(false);
            Form.grids('GRID_FAT_PJ').fields('CAD_TIPO_DOC_PJ').visible(false);
            Form.grids('GRID_FAT_PJ').fields('CAD_ANEXO_FAT_PJ').visible(false);

            //Possui Patrimônio

            Form.fields('LBL_POSSUI_PATROMONIO').visible(false);
            Form.fields('CAD_POSSUI_PATRI').visible(false);
            Form.grids('GRID_PAT_PJ').visible(false);
            Form.grids('GRID_PAT_PJ').fields('CAD_ANEXO_PATRI').visible(false);
            Form.grids('GRID_PAT_PJ').fields('CAD_TIPO_DOC_PATRI').visible(false);


            //Possui sócios

            Form.fields('LBL_SOCIOS_PJ').visible(false);
            Form.grids('GRID_SOCIO_PJ').visible(false);
            Form.grids('GRID_SOCIO_PJ').fields('CAD_TIP_SOCIO').visible(false);
            Form.grids('GRID_SOCIO_PJ').fields('CAD_NOME_SOCIO_PJ').visible(false);
            Form.grids('GRID_SOCIO_PJ').fields('CAD_CPF_SOCIO').visible(false);
            Form.grids('GRID_SOCIO_PJ').fields('CAD_CPF_SOCIO').disabled(true);
            Form.grids('GRID_SOCIO_PJ').fields('CAD_CNPJ_SOCIO').visible(false);
            Form.grids('GRID_SOCIO_PJ').fields('CAD_CNPJ_SOCIO').disabled(true);

        }

        if (dadosPJ == "OK") {

            //Dados Pessoa Jurídica

            Form.fields('LBL_DADOS_PJ').visible(true);

            Form.fields('CAD_RAZAO_SOCIAL').visible(true);
            Form.fields('CAD_RAZAO_SOCIAL').required(true);

            Form.fields('CAD_NOME_FANTASIA').visible(true);
            Form.fields('CAD_NOME_FANTASIA').required(true);

            Form.fields('CAD_CPF_CNPJ').visible(false);
            Form.fields('CAD_CPF_CNPJ').required(true);
            Form.fields('AUX_CNPJ').visible(true);
            Form.fields('AUX_CNPJ').required(true);

            Form.fields('CAD_EMAIL_PJ').visible(true);
            Form.fields('CAD_EMAIL_PJ').required(true);

            Form.fields('CAD_TEL_FIXO_PJ').visible(true);
            Form.fields('CAD_TEL_FIXO_PJ').required(true);

            Form.fields('CAD_CEL_PJ').visible(true);
            Form.fields('CAD_CEL_PJ').required(true);

        }

        if (dadosPJ == undefined || dadosPJ == "" || dadosPJ == " ") {

            //Dados Pessoa Jurídica

            Form.fields('LBL_DADOS_PJ').visible(false);

            Form.fields('CAD_RAZAO_SOCIAL').visible(false);
            Form.fields('CAD_RAZAO_SOCIAL').required(false);

            Form.fields('CAD_NOME_FANTASIA').visible(false);
            Form.fields('CAD_NOME_FANTASIA').required(false);

            Form.fields('CAD_CPF_CNPJ').visible(false);
            Form.fields('CAD_CPF_CNPJ').required(false);
            Form.fields('AUX_CNPJ').visible(false);
            Form.fields('AUX_CNPJ').required(false);

            Form.fields('CAD_EMAIL_PJ').visible(false);
            Form.fields('CAD_EMAIL_PJ').required(false);
            Form.fields('CAD_EMAIL_PJ').value('');

            Form.fields('CAD_TEL_FIXO_PJ').visible(false);
            Form.fields('CAD_TEL_FIXO_PJ').required(false);
            Form.fields('CAD_TEL_FIXO_PJ').value('');

            Form.fields('CAD_CEL_PJ').visible(false);
            Form.fields('CAD_CEL_PJ').required(false);
            Form.fields('CAD_CEL_PJ').value('');

        }

        if (anexosPJ == "OK") {

            Form.fields('LBL_DADOS_PJ').visible(true);

            Form.fields('CAD_RAZAO_SOCIAL').visible(true);
            Form.fields('CAD_RAZAO_SOCIAL').required(true);

            Form.fields('CAD_NOME_FANTASIA').visible(true);
            Form.fields('CAD_NOME_FANTASIA').required(true);

            Form.fields('CAD_CPF_CNPJ').visible(false);
            Form.fields('CAD_CPF_CNPJ').required(true);
            Form.fields('AUX_CNPJ').visible(true);
            Form.fields('AUX_CNPJ').required(true);

            //Anexos PJ

            Form.fields('LBL_ANEXOS_PF').visible(true);

            Form.grids('GRID_PJ').visible(true);

            Form.grids('GRID_PJ').fields('CAD_LISTA_PJ').visible(true);
            Form.grids('GRID_PJ').fields('CAD_LISTA_PJ').required(true);

            Form.grids('GRID_PJ').fields('CAD_ANEXO_PJ').visible(true);
            Form.grids('GRID_PJ').fields('CAD_ANEXO_PJ').required(true);

        }

        if (anexosPJ == undefined || anexosPJ == "" || anexosPJ == " ") {

            //Anexos PJ

            Form.fields('LBL_ANEXOS_PF').visible(false);
            Form.grids('GRID_PJ').visible(false);
            Form.grids('GRID_PJ').fields('CAD_LISTA_PJ').visible(false);
            Form.grids('GRID_PJ').fields('CAD_ANEXO_PJ').visible(false);
            zerarValoresGridPorId('GRID_PJ');

        }

        if (faturamentoPJ == "OK") {

            Form.fields('LBL_DADOS_PJ').visible(true);

            Form.fields('CAD_RAZAO_SOCIAL').visible(true);
            Form.fields('CAD_RAZAO_SOCIAL').required(true);

            Form.fields('CAD_NOME_FANTASIA').visible(true);
            Form.fields('CAD_NOME_FANTASIA').required(true);

            Form.fields('CAD_CPF_CNPJ').visible(false);
            Form.fields('CAD_CPF_CNPJ').required(true);
            Form.fields('AUX_CNPJ').visible(true);
            Form.fields('AUX_CNPJ').required(true);

            //Possui Faturamento

            Form.fields('LBL_FATURAMENTO_PF').visible(true);

            Form.fields('CAD_POSSUI_FAT_PJ').visible(true);
            Form.fields('CAD_POSSUI_FAT_PJ').value('Sim');
            Form.fields('CAD_POSSUI_FAT_PJ').disabled(true);

            Form.grids('GRID_FAT_PJ').visible(true);

            Form.grids('GRID_FAT_PJ').fields('CAD_TIPO_DOC_PJ').visible(true);
            Form.grids('GRID_FAT_PJ').fields('CAD_TIPO_DOC_PJ').required(true);

            Form.grids('GRID_FAT_PJ').fields('CAD_ANEXO_FAT_PJ').visible(true);
            Form.grids('GRID_FAT_PJ').fields('CAD_ANEXO_FAT_PJ').required(true);

        }

        if (faturamentoPJ == undefined || faturamentoPJ == "" || faturamentoPJ == " ") {

            //Possui Faturamento

            Form.fields('LBL_FATURAMENTO_PF').visible(false);

            Form.fields('CAD_POSSUI_FAT_PJ').visible(false);
            Form.fields('CAD_POSSUI_FAT_PJ').required(false);

            Form.grids('GRID_FAT_PJ').visible(false);

            Form.grids('GRID_FAT_PJ').fields('CAD_TIPO_DOC_PJ').visible(false);
            Form.grids('GRID_FAT_PJ').fields('CAD_ANEXO_FAT_PJ').visible(false);
            zerarValoresGridPorId('GRID_FAT_PJ');

        }

        if (patrimonioPJ == "OK") {

            Form.fields('LBL_DADOS_PJ').visible(true);

            Form.fields('CAD_RAZAO_SOCIAL').visible(true);
            Form.fields('CAD_RAZAO_SOCIAL').required(true);

            Form.fields('CAD_NOME_FANTASIA').visible(true);
            Form.fields('CAD_NOME_FANTASIA').required(true);

            Form.fields('CAD_CPF_CNPJ').visible(false);
            Form.fields('CAD_CPF_CNPJ').required(true);
            Form.fields('AUX_CNPJ').visible(true);
            Form.fields('AUX_CNPJ').required(true);

            //Possui Patrimônio

            Form.fields('LBL_POSSUI_PATROMONIO').visible(true);

            Form.fields('CAD_POSSUI_PATRI').visible(true);
            Form.fields('CAD_POSSUI_PATRI').value('Sim');
            Form.fields('CAD_POSSUI_PATRI').disabled(true);

            Form.grids('GRID_PAT_PJ').visible(true);

            Form.grids('GRID_PAT_PJ').fields('CAD_ANEXO_PATRI').visible(true);
            Form.grids('GRID_PAT_PJ').fields('CAD_ANEXO_PATRI').required(true);

            Form.grids('GRID_PAT_PJ').fields('CAD_TIPO_DOC_PATRI').visible(true);
            Form.grids('GRID_PAT_PJ').fields('CAD_TIPO_DOC_PATRI').required(true);

        }

        if (patrimonioPJ == undefined || patrimonioPJ == "" || patrimonioPJ == " ") {

            Form.fields('LBL_DADOS_PJ').visible(true);

            Form.fields('CAD_RAZAO_SOCIAL').visible(true);
            Form.fields('CAD_RAZAO_SOCIAL').required(true);

            Form.fields('CAD_NOME_FANTASIA').visible(true);
            Form.fields('CAD_NOME_FANTASIA').required(true);

            Form.fields('CAD_CPF_CNPJ').visible(false);
            Form.fields('CAD_CPF_CNPJ').required(true);
            Form.fields('AUX_CNPJ').visible(true);
            Form.fields('AUX_CNPJ').required(true);

            //Possui Patrimônio

            Form.fields('LBL_POSSUI_PATROMONIO').visible(false);

            Form.fields('CAD_POSSUI_PATRI').visible(false);
            Form.fields('CAD_POSSUI_PATRI').required(false);

            Form.grids('GRID_PAT_PJ').visible(false);
            Form.grids('GRID_PAT_PJ').fields('CAD_ANEXO_PATRI').visible(false);
            Form.grids('GRID_PAT_PJ').fields('CAD_TIPO_DOC_PATRI').visible(false);
            zerarValoresGridPorId('GRID_PAT_PJ');

        }

        if (sociosPJ == "OK") {

            Form.fields('LBL_DADOS_PJ').visible(true);

            Form.fields('CAD_RAZAO_SOCIAL').visible(true);
            Form.fields('CAD_RAZAO_SOCIAL').required(true);

            Form.fields('CAD_NOME_FANTASIA').visible(true);
            Form.fields('CAD_NOME_FANTASIA').required(true);

            Form.fields('CAD_CPF_CNPJ').visible(false);
            Form.fields('CAD_CPF_CNPJ').required(true);
            Form.fields('AUX_CNPJ').visible(true);
            Form.fields('AUX_CNPJ').required(true);

            //Possui sócios

            Form.fields('LBL_SOCIOS_PJ').visible(true);

            Form.grids('GRID_SOCIO_PJ').visible(true);

            Form.grids('GRID_SOCIO_PJ').fields('CAD_TIP_SOCIO').visible(true);
            Form.grids('GRID_SOCIO_PJ').fields('CAD_TIP_SOCIO').required(true);

            Form.grids('GRID_SOCIO_PJ').fields('CAD_NOME_SOCIO_PJ').visible(true);
            Form.grids('GRID_SOCIO_PJ').fields('CAD_NOME_SOCIO_PJ').required(true);

            Form.grids('GRID_SOCIO_PJ').fields('CAD_CPF_SOCIO').visible(true);
            Form.grids('GRID_SOCIO_PJ').fields('CAD_CPF_SOCIO').disabled(true);

            Form.grids('GRID_SOCIO_PJ').fields('CAD_CNPJ_SOCIO').visible(true);
            Form.grids('GRID_SOCIO_PJ').fields('CAD_CNPJ_SOCIO').disabled(true);

        }

        if (sociosPJ == undefined || sociosPJ == "" || sociosPJ == " ") {
            //Possui sócios

            Form.fields('LBL_SOCIOS_PJ').visible(false);
            Form.grids('GRID_SOCIO_PJ').visible(false);
            Form.grids('GRID_SOCIO_PJ').fields('CAD_TIP_SOCIO').visible(false);
            Form.grids('GRID_SOCIO_PJ').fields('CAD_NOME_SOCIO_PJ').visible(false);
            Form.grids('GRID_SOCIO_PJ').fields('CAD_CPF_SOCIO').visible(false);
            Form.grids('GRID_SOCIO_PJ').fields('CAD_CNPJ_SOCIO').visible(false);
            zerarValoresGridPorId('GRID_SOCIO_PJ');

        }

    }

    Form.apply();

}

function zerarValoresGridPorId(gridId) {
    const gridValue = Form.grids(gridId);

    if (!gridValue || gridValue.dataRows().length === 0) return;

    gridValue.dataRows().forEach((data) => gridValue.removeDataRow(data.id));

    Form.apply();
}


function roteamentoAjustarAnalista() {
    debugger

    var rotaInicial = Form.fields("CAD_AUX_ROTEAMENTO").value();
    var cadOutraCoop = Form.fields('CAD_CAD_OUTRA_COOP').value();
    var associacao = Form.fields('CAD_CADASTRO_ASSOC').value();
    var rotaNova = Form.fields('AUX_ROTA_PARALELO').value();

    if ((rotaInicial == "Aguardar Aprovação Externa" &&
        associacao == "Sim" &&
        cadOutraCoop == "Sim"
        && rotaNova != "A" && rotaNova != "R" && rotaNova != "P") ||
        (rotaInicial == "Aprovar Cadastro" && associacao == "Sim" && cadOutraCoop == "Sim" && rotaNova != "A" && rotaNova != "R" && rotaNova != "P")) {

        Form.fields('AUX_ROTEAMENTO_AJUSTAR').value('Abrir Paralelo no Ajustar');

    } else if ((rotaInicial == "Aguardar Aprovação Externa"
        && associacao == "Não"
        && cadOutraCoop == "Sim"
        && rotaNova != "A" && rotaNova != "R" && rotaNova != "P")
        || (rotaInicial == "Aprovar Cadastro" && associacao == "Não" && cadOutraCoop == "Sim" && rotaNova != "A" && rotaNova != "R" && rotaNova != "P")) {

        Form.fields('AUX_ROTEAMENTO_AJUSTAR').value("Aguardar Aprovação Externa no Ajustar");

    } else {

        Form.fields('AUX_ROTEAMENTO_AJUSTAR').value("Aprovar Cadastro no Ajustar");

    }

    Form.apply();
}

function roteamentoRetornoAjustePA() {
    debugger

    var rotaInicial = Form.fields("CAD_AUX_ROTEAMENTO").value();
    var cadOutraCoop = Form.fields('CAD_CAD_OUTRA_COOP').value();
    var associacao = Form.fields('CAD_CADASTRO_ASSOC').value();
    var rotaNova = Form.fields('AUX_ROTA_PARALELO').value();

    if (rotaNova == "R") {

        Form.fields('AUX_ROTEAMENTO_AJUSTAR').value("Aguardar Aprovação Externa no Ajustar");

    }

    else if ((rotaInicial == "Aguardar Aprovação Externa" &&
        associacao == "Sim" &&
        cadOutraCoop == "Sim"
        && rotaNova != "A" && rotaNova != "R" && rotaNova != "P") ||
        (rotaInicial == "Aprovar Cadastro" && associacao == "Sim" && cadOutraCoop == "Sim" && rotaNova != "A" && rotaNova != "R" && rotaNova != "P")) {

        Form.fields('AUX_ROTEAMENTO_AJUSTAR').value('Abrir Paralelo no Ajustar');

    } else if ((rotaInicial == "Aguardar Aprovação Externa"
        && associacao == "Não"
        && cadOutraCoop == "Sim"
        && rotaNova != "A" && rotaNova != "R" && rotaNova != "P")
        || (rotaInicial == "Aprovar Cadastro" && associacao == "Não" && cadOutraCoop == "Sim" && rotaNova != "A" && rotaNova != "R" && rotaNova != "P")) {

        Form.fields('AUX_ROTEAMENTO_AJUSTAR').value("Aguardar Aprovação Externa no Ajustar");

    } else {

        Form.fields('AUX_ROTEAMENTO_AJUSTAR').value("Aprovar Cadastro no Ajustar");

    }

    Form.apply();
}


function somenteLeituraProcurador() {
    debugger

    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    let cadastroAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
    let possuiProcurador = Form.fields('CAD_DP_POS_PROCURADOR').value();
    let cpfProcurador = Form.fields('CAD_CPF_PROCURADOR').value();

    if (tipoPessoa == "Pessoa Física" && cadastroAssociacao == "Sim") {

        if (possuiProcurador == undefined || possuiProcurador == "") {

            Form.fields('LBL_POSSUI_PROCURADOR').visible(false);
            Form.fields('CAD_DP_POS_PROCURADOR').visible(false);
            Form.fields('CAD_CPF_PROCURADOR').visible(false);
        }

        else if (possuiProcurador == "Sim") {

            Form.fields('LBL_POSSUI_PROCURADOR').visible(true);

            Form.fields('CAD_DP_POS_PROCURADOR').visible(true);
            Form.fields('CAD_DP_POS_PROCURADOR').readOnly(true);

            Form.fields('CAD_CPF_PROCURADOR').visible(true);
            Form.fields('CAD_CPF_PROCURADOR').readOnly(true);

        }

        else if (possuiProcurador == "Não") {

            Form.fields('LBL_POSSUI_PROCURADOR').visible(true);

            Form.fields('CAD_DP_POS_PROCURADOR').visible(true);
            Form.fields('CAD_DP_POS_PROCURADOR').readOnly(true);

            Form.fields('CAD_CPF_PROCURADOR').visible(false);

        }

        Form.apply();

    }

    if (tipoPessoa == "Pessoa Física" && cadastroAssociacao == "Não") {

        if (cpfProcurador != undefined && cpfProcurador != "") {

            Form.fields('LBL_POSSUI_PROCURADOR').visible(true);

            Form.fields('CAD_DP_POS_PROCURADOR').visible(true);
            Form.fields('CAD_DP_POS_PROCURADOR').readOnly(true);

            Form.fields('CAD_CPF_PROCURADOR').visible(true);
            Form.fields('CAD_CPF_PROCURADOR').readOnly(true);

        }

        else {

            Form.fields('LBL_POSSUI_PROCURADOR').visible(false);
            Form.fields('CAD_DP_POS_PROCURADOR').visible(false);
            Form.fields('CAD_CPF_PROCURADOR').visible(false);

        }

        Form.apply();

    }



    Form.apply();

}

function limparCheckDados() {
    debugger

    let checkBoxDados = Form.fields('CHECK_DADOS_P_PF').value();

    if (checkBoxDados == "") {

        Form.fields('CAD_DP_TELEFONE').value('');
        Form.fields('CAD_DP_EMAIL').value('');
        Form.fields('CAD_DP_ESCOLARIDADE').value('');
        Form.fields('CAD_DP_ESTADO_CIVIL').value('');
        Form.fields('CAD_CPF_CONJUGE').value('');

    }

    Form.apply();
}

function limparCheckProcurador() {

    let checkProcuradoPF = Form.fields('CHECK_PROCURADOR_PF').value();
    let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();

    if (checkProcuradoPF != "OK" && tipoAssociacao == "Não") {

        Form.fields('CAD_CPF_PROCURADOR').value('');

    }

    Form.apply();

}

function limparCpfProcurador() {
    debugger

    let possuiProcurador = Form.fields('CAD_DP_POS_PROCURADOR').value();

    if (possuiProcurador == "Não") {

        Form.fields('CAD_CPF_PROCURADOR').value('');

    }
    else {
        Form.fields('CAD_CPF_PROCURADOR').value();

    }

    Form.apply();

}

function validaBotaoSemCheck() {
    debugger

    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();

    let checkDadosPF = Form.fields('CHECK_DADOS_P_PF').value();
    let checkAnexosPF = Form.fields('CHECK_ANEXOS_PF').value();
    let checkRendaPF = Form.fields('CHECK_RENDA_PF').value();
    let checkProcuradoPF = Form.fields('CHECK_PROCURADOR_PF').value();

    //Pessoa Jurídica

    let checkDadosPJ = Form.fields('CHECK_DADOS_P_PJ').value();
    let checkAnexosPJ = Form.fields('CHECK_ANEXOS_PJ').value();
    let checkFaturamento = Form.fields('CHECK_FATURAMENTO_PJ').value();
    let checkPatrimonioPJ = Form.fields('CHECK_PATRIMONIO_PJ').value();
    let checkSociosPJ = Form.fields('CHECK_SOCIOS_PJ').value();


    if (tipoPessoa == "Pessoa Física" && tipoAssociacao == "Não" &&
        (checkDadosPF == undefined || checkDadosPF == "") &&
        (checkAnexosPF == undefined || checkAnexosPF == "") &&
        (checkRendaPF == undefined || checkAnexosPF == "") &&
        (checkProcuradoPF == undefined || checkProcuradoPF == "")) {

        minimoCheck();

    }

    else if (tipoPessoa == "Pessoa Jurídica" && tipoAssociacao == "Não" &&
        (checkDadosPJ == undefined || checkDadosPJ == "") &&
        (checkAnexosPJ == undefined || checkAnexosPJ == "") &&
        (checkFaturamento == undefined || checkFaturamento == "") &&
        (checkPatrimonioPJ == undefined || checkPatrimonioPJ == "") &&
        (checkSociosPJ == undefined || checkSociosPJ == "")) {

        minimoCheckPJ();

    }

    else {

        Form.actions('aprovar').hidden(false).label('Aprovar');
        Form.actions('rejeitar').hidden(false).label('Cancelar');

    }

    Form.apply();

}


/*
Select do CPF
SELECT
    C.COD_PROCESSO_F,
    P.COD_ETAPA,
    P.IDE_STATUS,
    P.COD_PROCESSO,
    E.TITULO_ETAPA
FROM
processo_etapa P, f_t_cad_pf C, etapa E
WHERE P.IDE_STATUS = 'A' AND CAD_CPF_CNPJ = '412.460.978-77' AND C.COD_PROCESSO_F = P.COD_PROCESSO AND P.COD_ETAPA = E.COD_ETAPA AND E.COD_FORM = '78'
GROUP BY COD_PROCESSO_F

Select usado atualmente no processo

SELECT
    C.COD_PROCESSO_F,    
    E.TITULO_ETAPA
FROM
processo_etapa P, f_t_cad_pf C, etapa E
WHERE P.IDE_STATUS = 'A' AND CAD_CPF_CNPJ = '$CAD_CPF_CNPJ' AND C.COD_PROCESSO_F = P.COD_PROCESSO AND P.COD_ETAPA = E.COD_ETAPA AND E.COD_FORM = '78'
GROUP BY COD_PROCESSO_F

*/

function preencherLabelCpfCnpj() {
    debugger

    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    let caixaCpf = Form.fields('PROCURAR_CPF_CNPJ').value();
    let caixaCnpj = Form.fields('CAD_ENCONTROU_CNPJ').value();

    if (tipoPessoa == "Pessoa Física" && (caixaCpf != undefined && caixaCpf != "" && caixaCpf != " ")) {

        Form.fields('LBL_CPF_CNPJ').visible(true);

        Form.fields('PROCURAR_CPF_CNPJ').visible(true);
        Form.fields('PROCURAR_CPF_CNPJ').disabled(true);

        Form.fields('CAD_ENCONTROU_CNPJ').visible(false);

    }

    else if (tipoPessoa == "Pessoa Jurídica" && (caixaCnpj != undefined && caixaCnpj != "" && caixaCnpj != " ")) {

        Form.fields('LBL_CPF_CNPJ').visible(true);
        Form.fields('PROCURAR_CPF_CNPJ').visible(false);

        Form.fields('CAD_ENCONTROU_CNPJ').visible(true);
        Form.fields('CAD_ENCONTROU_CNPJ').disabled(true);

    }

    else {

        Form.fields('LBL_CPF_CNPJ').visible(false);
        Form.fields('PROCURAR_CPF_CNPJ').visible(false);
        Form.fields('CAD_ENCONTROU_CNPJ').visible(false);

    }

    Form.apply();

}

function modalAlertaCPF() {

    let caixaCpfCnpj = Form.fields('PROCURAR_CPF_CNPJ').value();
    let cpfCnpj = Form.fields('CAD_CPF_CNPJ').value();

    if ((cpfCnpj != undefined || cpfCnpj != "") && (caixaCpfCnpj != undefined || caixaCpfCnpj != "")) {

        Form.addCustomModal({
            title: "ATENÇÃO",
            description:
                "Clique no ícone ao lado do CPF/CNPJ. Se houver processos para o documento informado, será aberta uma caixa de texto abaixo com as etapas e códigos. Verificar a possibilidade de prosseguir nos processos que estão em andamento. ",
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

    }

    Form.apply();

}

//Limpar tela cinza do Modal
function limparLeanOverlay() {
    const leanOverlay = document.querySelectorAll(".lean-overlay");

    leanOverlay.forEach((item) => (item.style.display = "none"));
}

/**
 * @select no banco para verificar se um CPF ou CNPJ já teve pedido de associação "Sim" negado.
 * SELECT
    C.COD_PROCESSO_F   
   
FROM
processo_etapa P, f_t_cad_pf C, etapa E
WHERE P.IDE_STATUS = 'R' AND CAD_CPF_CNPJ = $CAD_CPF_CNPJ AND CAD_CADASTRO_ASSOC = 'Sim' AND C.COD_PROCESSO_F = P.COD_PROCESSO AND P.COD_ETAPA = E.COD_ETAPA AND E.COD_ETAPA = '4' AND E.COD_FORM = '78'
GROUP BY COD_PROCESSO_F
 */

function mensagemAssociacaoAnterior() {
    debugger

    let associacao = Form.fields('CAD_CADASTRO_ASSOC').value();
    let caixaProcessos = Form.fields('ASSOCIACAO_ANTERIOR').value();

    if (associacao == "Sim" && (caixaProcessos != undefined && caixaProcessos != "" && caixaProcessos != " ")) {

        Form.fields('LBL_ASSOC_ANTERIOR').visible(true);
        Form.fields('ASSOCIACAO_ANTERIOR').visible(false);

    }

    else {

        Form.fields('LBL_ASSOC_ANTERIOR').visible(false);
        Form.fields('ASSOCIACAO_ANTERIOR').visible(false);

    }

    Form.apply();

}

function limparGridFaturamento() {

    let possuiFaturamento = Form.fields('CAD_POSSUI_FAT_PJ').value();

    if (possuiFaturamento != "Sim") {
        zerarValoresGridPorId('GRID_FAT_PJ');
    }
}


function limparGridPatrimonio() {

    let possuiPatrimonio = Form.fields('CAD_POSSUI_PATRI').value();

    if (possuiPatrimonio != "Sim") {
        zerarValoresGridPorId('GRID_PAT_PJ');
    }
}

function limparDocumentosPJ() {

    let tipoAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();
    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();

    if (tipoAssociacao == "Não" && tipoPessoa == "Pessoa Jurídica") {
        zerarValoresGridPorId('GRID_PJ');

    }
}

function preencherNomeRazaoSocial() {

    let nome = Form.fields('CAD_DP_NOME').value();
    let razaoSocial = Form.fields('CAD_RAZAO_SOCIAL').value();
    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();

    if (tipoPessoa == "Pessoa Física") {

        Form.fields('CAD_AUX_NOME_RAZAO').value(nome);
    }

    else {

        Form.fields('CAD_AUX_NOME_RAZAO').value(razaoSocial);

    }

    Form.apply();

}

function preencherCNPJ() {
    debugger

    let cnpjAux = Form.fields('AUX_CNPJ').value();
    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();

    if (tipoPessoa == "Pessoa Jurídica") {

        Form.fields('CAD_CPF_CNPJ').value(cnpjAux);
    }
    Form.apply();
}


function mostrarFaturamentoPJ() {

    let possuiFaturamentoPJ = Form.fields('CAD_POSSUI_FAT_PJ').value();
    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    let cadastroAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();

    if ((tipoPessoa == "Pessoa Jurídica" && cadastroAssociacao == "Sim")
        && (possuiFaturamentoPJ == undefined || possuiFaturamentoPJ == "" || possuiFaturamentoPJ == " ")) {

        Form.grids('GRID_FAT_PJ').visible(false);
        Form.grids('GRID_FAT_PJ').visible(false);

        Form.grids('GRID_FAT_PJ').fields('CAD_TIPO_DOC_PJ').visible(false);
        Form.grids('GRID_FAT_PJ').fields('CAD_ANEXO_FAT_PJ').visible(false);
    }

    else if (tipoPessoa == "Pessoa Jurídica" && cadastroAssociacao == "Sim" && possuiFaturamentoPJ == "Sim") {

        Form.grids('GRID_FAT_PJ').visible(true);

        Form.grids('GRID_FAT_PJ').fields('CAD_TIPO_DOC_PJ').visible(true);
        Form.grids('GRID_FAT_PJ').fields('CAD_TIPO_DOC_PJ').required(true);

        Form.grids('GRID_FAT_PJ').fields('CAD_ANEXO_FAT_PJ').visible(true);
        Form.grids('GRID_FAT_PJ').fields('CAD_ANEXO_FAT_PJ').required(true);

    }

    else if (tipoPessoa == "Pessoa Jurídica" && cadastroAssociacao == "Não" && possuiFaturamentoPJ == "Sim") {

        Form.grids('GRID_FAT_PJ').visible(true);

        Form.grids('GRID_FAT_PJ').fields('CAD_TIPO_DOC_PJ').visible(true);
        Form.grids('GRID_FAT_PJ').fields('CAD_TIPO_DOC_PJ').required(true);

        Form.grids('GRID_FAT_PJ').fields('CAD_ANEXO_FAT_PJ').visible(true);
        Form.grids('GRID_FAT_PJ').fields('CAD_ANEXO_FAT_PJ').required(true);

    }

    else {

        Form.grids('GRID_FAT_PJ').visible(false);

        Form.grids('GRID_FAT_PJ').fields('CAD_TIPO_DOC_PJ').visible(false);
        Form.grids('GRID_FAT_PJ').fields('CAD_ANEXO_FAT_PJ').visible(false);

    }

    Form.apply();

}

function mostrarPatrimonioPJ() {

    let possuiPatrimonioPJ = Form.fields('CAD_POSSUI_PATRI').value();
    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();
    let cadastroAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();

    if ((tipoPessoa == "Pessoa Jurídica" && cadastroAssociacao == "Sim")
        && (possuiPatrimonioPJ == undefined || possuiPatrimonioPJ == "" || possuiPatrimonioPJ == " ")) {

        Form.grids('GRID_PAT_PJ').visible(false);
        Form.grids('GRID_PAT_PJ').fields('CAD_ANEXO_PATRI').visible(false);
        Form.grids('GRID_PAT_PJ').fields('CAD_TIPO_DOC_PATRI').visible(false);

    }

    else if (tipoPessoa == "Pessoa Jurídica" && cadastroAssociacao == "Sim" && possuiPatrimonioPJ == "Sim") {

        Form.grids('GRID_PAT_PJ').visible(true);

        Form.grids('GRID_PAT_PJ').fields('CAD_ANEXO_PATRI').visible(true);
        Form.grids('GRID_PAT_PJ').fields('CAD_ANEXO_PATRI').required(true);

        Form.grids('GRID_PAT_PJ').fields('CAD_TIPO_DOC_PATRI').visible(true);
        Form.grids('GRID_PAT_PJ').fields('CAD_TIPO_DOC_PATRI').required(true);


    }

    else if (tipoPessoa == "Pessoa Jurídica" && cadastroAssociacao == "Não" && possuiPatrimonioPJ == "Sim") {

        Form.grids('GRID_PAT_PJ').visible(true);

        Form.grids('GRID_PAT_PJ').fields('CAD_ANEXO_PATRI').visible(true);
        Form.grids('GRID_PAT_PJ').fields('CAD_ANEXO_PATRI').required(true);

        Form.grids('GRID_PAT_PJ').fields('CAD_TIPO_DOC_PATRI').visible(true);
        Form.grids('GRID_PAT_PJ').fields('CAD_TIPO_DOC_PATRI').required(true);

    }

    else {

        Form.grids('GRID_PAT_PJ').visible(false);
        Form.grids('GRID_PAT_PJ').fields('CAD_ANEXO_PATRI').visible(false);
        Form.grids('GRID_PAT_PJ').fields('CAD_TIPO_DOC_PATRI').visible(false);

    }

    Form.apply();

}

function somenteLeituraFaturamento() {

    let possuiFaturamento = Form.fields('CAD_POSSUI_FAT_PJ').value();

    if (possuiFaturamento == "Não") {

        Form.fields('LBL_FATURAMENTO_PF').visible(true);

        Form.fields('CAD_POSSUI_FAT_PJ').visible(true);
        Form.fields('CAD_POSSUI_FAT_PJ').readOnly(true);

        Form.grids('GRID_FAT_PJ').visible(false);
        Form.grids('GRID_FAT_PJ').fields('CAD_TIPO_DOC_PJ').visible(false);
        Form.grids('GRID_FAT_PJ').fields('CAD_ANEXO_PJ').visible(false);

    }

    else if (possuiFaturamento == "Sim") {

        Form.fields('LBL_FATURAMENTO_PF').visible(true);

        Form.fields('CAD_POSSUI_FAT_PJ').visible(true);
        Form.fields('CAD_POSSUI_FAT_PJ').readOnly(true);

        Form.grids('GRID_FAT_PJ').visible(true);
        Form.grids('GRID_FAT_PJ').readOnly(true);

        Form.grids('GRID_FAT_PJ').fields('CAD_TIPO_DOC_PJ').visible(true);
        Form.grids('GRID_FAT_PJ').fields('CAD_TIPO_DOC_PJ').readOnly(true);

        Form.grids('GRID_FAT_PJ').fields('CAD_ANEXO_PJ').visible(true);
        Form.grids('GRID_FAT_PJ').fields('CAD_ANEXO_PJ').readOnly(true);

    }

    else {

        Form.fields('LBL_FATURAMENTO_PF').visible(false);
        Form.grids('GRID_FAT_PJ').visible(false);
        Form.grids('GRID_FAT_PJ').fields('CAD_TIPO_DOC_PJ').visible(false);
        Form.grids('GRID_FAT_PJ').fields('CAD_ANEXO_PJ').visible(false);

    }

    Form.apply();

}

function somenteLeituraPatrimonio() {

    let possuiPatrimonio = Form.fields('CAD_POSSUI_PATRI').value();

    if (possuiPatrimonio == "Não") {

        Form.fields('LBL_POSSUI_PATROMONIO').visible(true);
        Form.fields('CAD_POSSUI_PATRI').visible(true);
        Form.fields('CAD_POSSUI_PATRI').readOnly(true);

        Form.grids('GRID_PAT_PJ').visible(false);
        Form.grids('GRID_PAT_PJ').fields('CAD_TIPO_DOC_PATRI').visible(false);
        Form.grids('GRID_PAT_PJ').fields('CAD_ANEXO_FAT_PJ').visible(false);

    }

    else if (possuiPatrimonio == "Sim") {

        Form.fields('LBL_POSSUI_PATROMONIO').visible(true);
        Form.fields('CAD_POSSUI_PATRI').visible(true);
        Form.fields('CAD_POSSUI_PATRI').readOnly(true);

        Form.grids('GRID_PAT_PJ').visible(true);
        Form.grids('GRID_PAT_PJ').fields('CAD_TIPO_DOC_PATRI').visible(true);
        Form.grids('GRID_PAT_PJ').fields('CAD_TIPO_DOC_PATRI').readOnly(true);
        Form.grids('GRID_PAT_PJ').fields('CAD_ANEXO_FAT_PJ').visible(true);
        Form.grids('GRID_PAT_PJ').fields('CAD_ANEXO_FAT_PJ').readOnly(true);

    }

    else {

        Form.fields('LBL_POSSUI_PATROMONIO').visible(false);
        Form.fields('CAD_POSSUI_PATRI').visible(false);
        Form.grids('GRID_PAT_PJ').visible(false);
        Form.grids('GRID_PAT_PJ').fields('CAD_TIPO_DOC_PATRI').visible(false);
        Form.grids('GRID_PAT_PJ').fields('CAD_ANEXO_FAT_PJ').visible(false);

    }

    Form.apply();


}

//CAD_POSSUI_SOCIO
//GRID_SOCIO_PJ

//LBL_REF_PJ

//CAD_PJ_REF1
//CAD_TEL_REF1

//CAD_PJ_REF2
//CAD_TEL_REF2

//checkReferenciasPJ

//CHECK_REFERENCIAS_PJ


/***
 * 
 * @rota Aguardar Aprovação Externa
 * 
 * Cadastro Associação Sim (Vai para Centralizadora)=> $CAD_CADASTRO_ASSOC == "Sim" && $CAD_STATUS != "Finalizar Aprovado"
 * 
 * Cadastro Associação Não (Vai para Finalizar Aprovado) => $CAD_STATUS == "Finalizar Aprovado" || $CAD_CADASTRO_ASSOC == "Não"
 * 
 * CRL (Abre CRL) => $CAD_L_CADASTRO_ASSOC == "Sim" && $CAD_CADASTRO_ASSOC == "Não"* 
 * 
 */

function alterarMascaraGrd(grid, cpf_cnpj) {

    var campo = Form.grids(grid).fields(cpf_cnpj);
    var edit = campo.value().replace(/\D/g, "");

    if (campo.value().length > 14) {
        edit = edit.replace(/^(\d{2})(\d)/, "$1.$2");
        edit = edit.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        edit = edit.replace(/\.(\d{3})(\d)/, ".$1/$2");
        edit = edit.replace(/(\d{4})(\d)/, "$1-$2");

    } else {
        edit = edit.replace(/(\d{3})(\d)/, "$1.$2");
        edit = edit.replace(/(\d{3})(\d)/, "$1.$2");
        edit = edit.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    campo.value(edit).apply();
}

function prospectadoEtapaCorrigirCadastroOutraCooperativa() {
    debugger

    let radioProspectado = Form.fields('CAD_PROSPECTADOR').value();
    let cadastroAssociacao = Form.fields('CAD_CADASTRO_ASSOC').value();

    if ((codigoEtapa === CORRIGIR_CADASTRO_OUTRA_COOPERATIVA) && radioProspectado == "Espontâneo" && cadastroAssociacao == "Não") {

        Form.fields('CAD_PROSPECTADOR').visible(false);
        Form.fields('CAD_PROSPECTADO_POR').visible(false);
        Form.fields('CAD_DEPTO').visible(false);

    }

    else if ((codigoEtapa === CORRIGIR_CADASTRO_OUTRA_COOPERATIVA) && radioProspectado == "Prospectado" && cadastroAssociacao == "Sim") {

        Form.fields('CAD_PROSPECTADOR').visible(true);
        Form.fields('CAD_PROSPECTADOR').readOnly(true);

        Form.fields('CAD_PROSPECTADO_POR').visible(true);
        Form.fields('CAD_PROSPECTADO_POR').readOnly(true);

        Form.fields('CAD_DEPTO').visible(true);
        Form.fields('CAD_DEPTO').readOnly(true);

    }

    Form.apply();
}

function etapaSolicitarVeioPLD() {
    debugger

    let processoAberto = Form.fields('AUX_PLD_CONTROLE').value();

    if (processoAberto == "PLD - TESTE DE CADASTRO" && codigoEtapa === SOLICITAR_CADASTRO && codigoCiclo > 1) {

        Form.fields('CAD_L_CADASTRO_ASSOC').required(true);
        Form.fields('CAD_L_CADASTRO_ASSOC').value('');

    }

    /*Form.fields('CAD_L_CADASTRO_ASSOC').required(false);
    Form.fields('CAD_L_CADASTRO_ASSOC').value(' ');
    Form.fields('CAD_NOME_FANTASIA').required(false);

    Form.fields('CAD_DP_NOME').required(false);
    Form.fields('CAD_CPF_CNPJ').required(false); */

    Form.apply();

}


function laudoAvaliacaoImoveis() {

    let auxiliarLaudo = Form.fields('AUX_PLD_CONTROLE').value();

    if (auxiliarLaudo == "Laudo de Avaliação de Imóveis") {

        Form.fields('LBL_LAUDO').visible(true);

        Form.grids('GLAUDO').visible(true);
        Form.grids('GLAUDO').fields('CAD_LAUDO_AVAL').visible(true);
        Form.grids('GLAUDO').fields('CAD_LAUDO_AVAL').readOnly(true);

        Form.grids('GMATRICULA').visible(true);
        Form.grids('GMATRICULA').fields('CAD_IMOVEL_MATRIC').visible(true);
        Form.grids('GMATRICULA').fields('CAD_IMOVEL_MATRIC').readOnly(true);
        Form.groups('GR_ATUALIZACAO').visible(false);

        Form.grids('ANEXODOCS').visible(false);
        Form.fields('CAD_DP_ANEXOS').visible(false);
        Form.fields('LBL_CADASTRO_NOVO').visible(false);
        Form.fields('CAD_ENCONTROU_CNPJ').visible(false);
        Form.fields('CAD_NOME_FANTASIA').required(false);


    }

    else {

        Form.fields('LBL_LAUDO').visible(false);

        Form.grids('GLAUDO').visible(false);
        Form.grids('GLAUDO').fields('CAD_LAUDO_AVAL').visible(false);

        Form.grids('GMATRICULA').visible(false);
        Form.grids('GMATRICULA').fields('CAD_IMOVEL_MATRIC').visible(false);

    }

    Form.apply();
}

function laudoAvaliacaoEtapaAjustar() {

    let auxiliarLaudo = Form.fields('AUX_PLD_CONTROLE').value();

    if (auxiliarLaudo == "Laudo de Avaliação de Imóveis") {

        Form.fields('LBL_LAUDO').visible(true);

        Form.grids('GLAUDO').visible(true);
        Form.grids('GLAUDO').fields('CAD_LAUDO_AVAL').visible(true);
        Form.grids('GLAUDO').fields('CAD_LAUDO_AVAL').readOnly(false);

        Form.grids('GMATRICULA').visible(true);
        Form.grids('GMATRICULA').fields('CAD_IMOVEL_MATRIC').visible(true);
        Form.grids('GMATRICULA').fields('CAD_IMOVEL_MATRIC').readOnly(false);

        Form.grids('ANEXODOCS').visible(false);
        Form.fields('CAD_DP_ANEXOS').visible(false);

        Form.fields('CAD_CADASTRO_ASSOC').readOnly(true);
        Form.fields('CAD_TIPO_PESSOA').readOnly(true);
        Form.fields('CAD_RURAL').readOnly(true);
        Form.fields('CAD_DP_NOME').readOnly(true);
        Form.fields('CAD_CPF_CNPJ').readOnly(true);
        Form.fields('CAD_NOME_FANTASIA').readOnly(true);
        Form.fields('CAD_NOME_FANTASIA').required(false);

        Form.groups('GR_ATUALIZACAO').visible(false);

        Form.fields('LBL_LAUDO').visible(true);

        Form.grids('GLAUDO').visible(true);
        Form.grids('GLAUDO').readOnly(false);
        Form.grids('GLAUDO').fields('CAD_LAUDO_AVAL').visible(true);
        Form.grids('GLAUDO').fields('CAD_LAUDO_AVAL').required(true);

        Form.grids('GMATRICULA').visible(true);
        Form.grids('GMATRICULA').readOnly(false);
        Form.grids('GMATRICULA').fields('CAD_IMOVEL_MATRIC').visible(true);
        Form.grids('GMATRICULA').fields('CAD_IMOVEL_MATRIC').required(true);

    }

    Form.apply();

}

function pldControleEspecial() {

    let processoAberto = Form.fields('AUX_PLD_CONTROLE').value();
    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();

    if (processoAberto == "PLD - Controle Especial" && tipoPessoa == "Pessoa Jurídica") {

        Form.fields('CAD_NOME_FANTASIA').required(false);
    }

    Form.apply();

}

//CheckBox somente leitura nas etapas caso tenha vindo do PLD / Laudo

function somenteLeituraPldLaudo() {
    debugger

    let pldControleEspecial = Form.fields('AUX_PLD_CONTROLE').value();
    let tipoPessoa = Form.fields('CAD_TIPO_PESSOA').value();

    if (tipoPessoa == "Pessoa Física") {

        if (pldControleEspecial == "PLD - Controle Especial" || pldControleEspecial == "Laudo de Avaliação de Imóveis" || pldControleEspecial == "PLD - TESTE DE CADASTRO") {

            //Pessoa Física
            Form.fields('CHECK_DADOS_P_PF').visible(true);
            Form.fields('CHECK_DADOS_P_PF').readOnly(true);
            Form.fields('CHECK_ANEXOS_PF').visible(true);
            Form.fields('CHECK_ANEXOS_PF').readOnly(true);
            Form.fields('CHECK_RENDA_PF').visible(true);
            Form.fields('CHECK_RENDA_PF').readOnly(true);
            Form.fields('CHECK_PROCURADOR_PF').visible(true);
            Form.fields('CHECK_PROCURADOR_PF').readOnly(true);

            Form.fields('LBL_DADOS_PESSOAIS').visible(true);
            Form.fields('CAD_DP_NOME').visible(true);
            Form.fields('CAD_DP_NOME').readOnly(true);
            Form.fields('CAD_CPF_CNPJ').visible(true);
            Form.fields('CAD_CPF_CNPJ').readOnly(true);


            //Pessoa Jurídica
            Form.fields('CHECK_DADOS_P_PJ').visible(false);
            Form.fields('CHECK_ANEXOS_PJ').visible(false);
            Form.fields('CHECK_FATURAMENTO_PJ').visible(false);
            Form.fields('CHECK_PATRIMONIO_PJ').visible(false);
            Form.fields('CHECK_SOCIOS_PJ').visible(false);

            Form.fields('LBL_DADOS_PJ').visible(false);
            Form.fields('CAD_RAZAO_SOCIAL').visible(false);
            Form.fields('CAD_NOME_FANTASIA').visible(false);
            Form.fields('AUX_CNPJ').visible(false);

        }
    }

    else {

        if (tipoPessoa == "Pessoa Jurídica" && (pldControleEspecial == "PLD - Controle Especial" || pldControleEspecial == "Laudo de Avaliação de Imóveis" || pldControleEspecial == "PLD - TESTE DE CADASTRO")) {

            //Pessoa Física
            Form.fields('CHECK_DADOS_P_PF').visible(false);
            Form.fields('CHECK_ANEXOS_PF').visible(false);
            Form.fields('CHECK_RENDA_PF').visible(false);
            Form.fields('CHECK_PROCURADOR_PF').visible(false);

            Form.fields('LBL_DADOS_PESSOAIS').visible(false);
            Form.fields('CAD_DP_NOME').visible(false);
            Form.fields('CAD_CPF_CNPJ').visible(false);

            //Pessoa Jurídica

            Form.fields('LBL_DADOS_PJ').visible(true);
            Form.fields('LBL_DADOS_PJ').readOnly(true);
            Form.fields('CAD_RAZAO_SOCIAL').visible(true);
            Form.fields('CAD_RAZAO_SOCIAL').readOnly(true);
            Form.fields('CAD_NOME_FANTASIA').visible(true);
            Form.fields('CAD_NOME_FANTASIA').readOnly(true);
            Form.fields('AUX_CNPJ').visible(true);
            Form.fields('AUX_CNPJ').readOnly(true);


            Form.fields('CHECK_DADOS_P_PJ').visible(true);
            Form.fields('CHECK_DADOS_P_PJ').readOnly(true);
            Form.fields('CHECK_ANEXOS_PJ').visible(true);
            Form.fields('CHECK_ANEXOS_PJ').readOnly(true);
            Form.fields('CHECK_FATURAMENTO_PJ').visible(true);
            Form.fields('CHECK_FATURAMENTO_PJ').readOnly(true);
            Form.fields('CHECK_PATRIMONIO_PJ').visible(true);
            Form.fields('CHECK_PATRIMONIO_PJ').readOnly(true);
            Form.fields('CHECK_SOCIOS_PJ').visible(true);
            Form.fields('CHECK_SOCIOS_PJ').readOnly(true);
        }

    }

    Form.apply();

}
