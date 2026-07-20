export function exibirResultados(resultados) {
    const areaResultados =
        document.querySelector("#area-resultados");

    if (!areaResultados) {
        throw new Error(
            "Elemento #area-resultados não foi encontrado."
        );
    }

    areaResultados.innerHTML = "";

    resultados.forEach(resultado => {
        const card = document.createElement("article");

        card.classList.add("card-vaga");

        const classeCompatibilidade =
            obterClasseCompatibilidade(resultado.percentual);

        card.innerHTML = `
            <h3>${resultado.cargo}</h3>

            <p>
                <strong>Empresa:</strong>
                ${resultado.empresa}
            </p>

            <div class="compatibilidade">
                <div class="compatibilidade-cabecalho">
                    <strong>Compatibilidade</strong>
                    <span>${resultado.percentual}%</span>
                </div>

                <div
                    class="barra-compatibilidade"
                    role="progressbar"
                    aria-label="Percentual de compatibilidade"
                    aria-valuenow="${resultado.percentual}"
                    aria-valuemin="0"
                    aria-valuemax="100">

                    <div
                        class="progresso ${classeCompatibilidade}"
                        style="width: ${resultado.percentual}%">
                    </div>
                </div>
            </div>

            <p class="${classeCompatibilidade}">
                <strong>
                    ${resultado.classificacao}
                </strong>
            </p>

            <div class="habilidades">
                <strong>Habilidades encontradas:</strong>

                <div class="lista-habilidades">
                    ${
                        criarTags(
                            resultado.habilidadesEncontradas,
                            "habilidade-encontrada"
                        )
                    }
                </div>
            </div>

            <div class="habilidades">
                <strong>Habilidades faltantes:</strong>

                <div class="lista-habilidades">
                    ${
                        criarTags(
                            resultado.habilidadesFaltantes,
                            "habilidade-faltante"
                        )
                    }
                </div>
            </div>
        `;

        areaResultados.appendChild(card);
    });
}

function criarTags (habilidades, classe) {
    if(habilidades.length === 0) {
        return `<span>Nenhuma</span>`
    }

    return habilidades 
        .map(habilidade => `
            <span class="tag ${classe}">
                ${habilidade}
            </span>
        `)
        .join("");
}

function obterClasseCompatibilidade(percentual) {
    if(percentual >= 80) {
        return "compatibilidade-alta"
    }

    if (percentual >= 50) {
        return "compatibilidade-media";
    }

    return "compatibilidade-baixa";
}

export function exibirMensagemErro(mensagem) {

    const areaMensagem =
        document.querySelector(
            "#mensagem-erro"
        );


    if (!areaMensagem) {
        throw new Error(
            "Elemento #mensagem-erro não foi encontrado."
        );
    }


    areaMensagem.textContent =
        mensagem;


    areaMensagem.classList.add(
        "mensagem-erro"
    );
}

export function limparMensagemErro() {
    const areaMensagem = document.querySelector(
        "#mensagem-erro"
    );

    if (!areaMensagem) {
        return;
    }

    areaMensagem.textContent = "";

    areaMensagem.classList.remove(
        "mensagem-erro"
    );
}

export function exibirCarregamento() {
    const areaResultados = 
        document.querySelector("#area-resultados");

        if (!areaResultados) {
            return;
        }

    areaResultados.innerHTML = `
        <div class= "carregando" role="status" 
            aria-live="polite">
            
            <p>
                Analisando seu perfil...
            </p>

            <p> 
                Buscando vagas compatíveis.
            </p>

            </div>
        `;
}

export function limparResultado() {
    const areaResultados = 
        document.querySelector("#area-resultados");

    if (!areaResultados) {
        return;
    }

    areaResultados.innerHTML = "";
}

export function exibirMensagemVazia() {
    const areaResultados = document.querySelector("#area-resultados");

    if(!areaResultados) {
        return;
    }


    areaResultados.innerHTML = `
        <div class="vazio" role="status" aria-live="polite">
        <p>Nenhuma vaga encontrada no momento</p>
        <p>Tente novamente mais tarde.</p>
        </div>
    `;
}

export function exibirDestaque(melhorVaga, habilidadesParaEstudar) {
    const areaResultados = document.querySelector("#area-resultados");

    const destaque = document.createElement("div");
    destaque.classList.add("destaque-melhor-vaga");

    destaque.innerHTML = `
        <h2> Vaga mais compatível</h2>
        <p><strong>${melhorVaga.cargo}</strong> - ${melhorVaga.empresa}</p>
        <p>${melhorVaga.percentual}% de coompatibilidade (${melhorVaga.classificacao})</p>;


        <h3> Recomendação de estudo</h3>
        <p> 
            ${
                habilidadesParaEstudar.length > 0
                        ? `Priorize estudar: ${habilidadesParaEstudar.join(", ")}`
                        : "Parabéns! Suas habilidades cobrem todos os requisitos encontrados."
            }
        </p>
    `;

    areaResultados.appendChild(destaque);
}