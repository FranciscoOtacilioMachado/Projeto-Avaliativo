import {
    VagasFrontEnd,
    criarContadorDeAnalise
} from "./motor.js";

import {
    buscarVagas,
    salvarPerfil,
    carregarPerfil
} from "./dados.js";

import {
    exibirResultados,
    exibirMensagemErro,
    limparMensagemErro,
    exibirCarregamento,
    limparResultado,
    exibirMensagemVazia,
    exibirDestaque
} from "./ui.js";


const contadorAnalises =
    criarContadorDeAnalise();


// ==========================================
// FUNÇÃO PARA FINALIZAR ANÁLISE (callback)
// ==========================================

function finalizarAnalise(nomeCandidato, callback) {
    console.log("\nAnálise finalizada");
    callback(nomeCandidato);
}


function exibirMensagemFinal(nome) {
    console.log(
        `${nome}, revise suas habilidades faltantes e atualize seu plano de estudo.`
    );
}


// ==========================================
// VALIDAÇÃO DO FORMULÁRIO
// ==========================================

function validarCandidato(candidato) {
    const erros = [];

    if (!candidato.nome) {
        erros.push("Informe seu nome.");
    }

    if (!candidato.area) {
        erros.push("Informe sua área de interesse.");
    }

    if (
        candidato.habilidades.length === 0 ||
        candidato.habilidades[0] === ""
    ) {
        erros.push("Informe pelo menos uma habilidade.");
    }

    return erros;
}


// ==========================================
// LER / PREENCHER FORMULÁRIO
// ==========================================

function obterDadosDoFormulario() {
    const nome = document.querySelector("#nome").value;
    const area = document.querySelector("#area").value;
    const habilidades = document.querySelector("#habilidades").value;
    const experiencia = document.querySelector("#experiencia").value;

    return {
        nome,
        area,
        habilidades: habilidades
            .split(",")
            .map(habilidade => habilidade.trim()),
        experiencia: Number(experiencia)
    };
}

function preencherFormulario(perfil) {
    document.querySelector("#nome").value = perfil.nome;
    document.querySelector("#area").value = perfil.area;
    document.querySelector("#habilidades").value = perfil.habilidades.join(", ");
    document.querySelector("#experiencia").value = perfil.experiencia;
}

// RF14 — se já existe perfil salvo (localStorage), preenche o formulário
// assim que a página carrega (fora de qualquer função, roda uma vez só)
const perfilSalvo = carregarPerfil();

if (perfilSalvo) {
    preencherFormulario(perfilSalvo);
}


// ==========================================
// SISTEMA PRINCIPAL
// ⚠️ Tudo que usa "resultados", "vagas" ou "candidato" precisa
//    estar DENTRO desta função — são parâmetros/variáveis locais
//    dela, não existem fora.
// ==========================================

async function iniciarSistema(candidato) {

    try {

        exibirCarregamento();

        console.log("SKILLMATCH JS");
        console.log(`Candidato: ${candidato.nome}`);
        console.log(`Área: ${candidato.area}`);
        console.log(`Habilidades: ${candidato.habilidades.join(", ")}`);
        console.log("\nAnalisando vagas...\n");

        const vagasCarregadas = await buscarVagas();

        // RF13 — estado "vazio"
        if (vagasCarregadas.length === 0) {
            exibirMensagemVazia();
            return;
        }

        // RF08 — callback: transforma cada objeto do JSON numa instância de Vaga
        const vagas = vagasCarregadas.map(dado =>
            new VagasFrontEnd(
                dado.id,
                dado.empresa,
                dado.cargo,
                dado.requisitos,
                dado.salario,
                dado.modalidade,
                dado.nivel
            )
        );

        // RF08 — closure: contadorAnalises() lembra quantas vagas já
        // foram analisadas nesta sessão, mesmo sendo chamada várias vezes
        const resultados = vagas.map(vaga => {
            const resultado = vaga.calcularCompatibilidade(candidato);
            console.log(`Análises realizadas nesta sessão: ${contadorAnalises()}`);
            return resultado;
        });


        // ==================================
        // REDUCE — melhor vaga
        // ==================================

        const melhorVaga = resultados.reduce((melhor, atual) => {
            if (atual.percentual > melhor.percentual) {
                return atual;
            }
            return melhor;
        });

        console.log("\nVAGA MAIS COMPATÍVEL");
        console.log(`${melhorVaga.cargo} - ${melhorVaga.percentual}%`);


        // ==================================
        // FIND — primeira vaga de alta compatibilidade
        // ==================================

        const vagaAltaCompatibilidade = resultados.find(
            resultado => resultado.percentual >= 80
        );

        if (vagaAltaCompatibilidade) {
            console.log("\nPrimeira vaga com alta compatibilidade:");
            console.log(vagaAltaCompatibilidade.cargo);
        }


        // ==================================
        // EVERY
        // ==================================

        const todasExigemJavaScript = vagas.every(vaga =>
            vaga.requisitos.includes("JavaScript")
        );

        console.log("\nTodas as vagas exigem JavaScript?");
        console.log(todasExigemJavaScript ? "Sim" : "Não");


        // ==================================
        // RECOMENDAÇÃO DE ESTUDOS
        // ==================================

        const habilidadesParaEstudar = resultados.reduce((lista, resultado) => {
            resultado.habilidadesFaltantes.forEach(habilidade => {
                if (!lista.includes(habilidade)) {
                    lista.push(habilidade);
                }
            });
            return lista;
        }, []);

        console.log(`Priorize estudar: ${habilidadesParaEstudar.join(", ")}`);


        // ==================================
        // EXIBIÇÃO NA TELA
        // ⚠️ só chama depois que TUDO acima já foi calculado
        // ==================================

        exibirDestaque(melhorVaga, habilidadesParaEstudar);
        exibirResultados(resultados);


        // ==================================
        // CALLBACK
        // ==================================

        finalizarAnalise(candidato.nome, exibirMensagemFinal);


    } catch (erro) {

        console.error("Erro ao executar análise:", erro);
        limparResultado();
        exibirMensagemErro("Não foi possível realizar a análise. Tente novamente.");
    }
}


// ==========================================
// FORMULÁRIO — captura do evento de envio
// ==========================================

const formulario = document.querySelector("#form-perfil");

formulario.addEventListener("submit", async function (evento) {

    evento.preventDefault();
    limparMensagemErro();
    limparResultado();

    const candidato = obterDadosDoFormulario();
    const erros = validarCandidato(candidato);

    if (erros.length > 0) {
        exibirMensagemErro(erros.join(" "));
        return;
    }

    salvarPerfil(candidato);
    await iniciarSistema(candidato);
});