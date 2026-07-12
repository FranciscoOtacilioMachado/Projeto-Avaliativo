//Candidato
const candidato = {
    nome: "Francisco", 
    area: "Front-End",
    habilidades: [
        "HTML",
        "CSS",
        "JavaScript",
        "Lógica de Programação",
        "Kanban"
    ],
    experiencia: 3,
};

// Criação da classe vaga
class Vaga {
    id = 0;
    empresa = "";
    cargo = "";
    requisitos = "";
    salario = 0;
    modalidade = "";
    constructor(id, empresa, cargo, requisitos, salario, modalidade) {
        this.id = id;
        this.empresa = empresa;
        this.cargo = cargo;
        this.requisitos = requisitos;
        this. salario = salario;
        this.modalidade = modalidade;
    }

    exibirResumo() {
        return `${this.cargo} na empresa ${this.empresa} (${this.modalidade}) – R$ ${this.salario}/mês`;
    }

    //Analisa vagas

    calcularCompatibilidade(candidato) {
        const habilidadesEncontradas = 
            this.requisitos.filter(requisito =>
                candidato.habilidades.includes(requisito)
            );

        const habilidadesFaltantes = 
            this.requisitos.filter(requisito =>
                !candidato.habilidades.includes(requisito)
            );
        const percentual = 
            Math.round( 
                (habilidadesEncontradas.length/
                    this.requisitos.length
                ) * 100
        );
        //Classificação

        const classificacao = classificarCompatibilidade(percentual);

        return {
            empresa: this.empresa,
            cargo: this.cargo,
            percentual,
            classificacao,
            habilidadesEncontradas,
            habilidadesFaltantes
            };

    }
    
}

class VagasFrontEnd  extends Vaga { 
    constructor (id, empresa, cargo, requisitos, salario, modalidade, nivel) {
        super(id, empresa, cargo, requisitos, salario, modalidade)
        this.nivel = nivel;
    }

    exibirNivel() {
        return `Nível de vaga ${this.nivel}`;
    }
}

// cadastro de arrays de vagas
const dadosVagas = [
  {
    id: 1,
    empresa: "TechStart",
    cargo: "Desenvolvedor Front-End Júnior",
    requisitos: ["JavaScript", "CSS", "GitHub", "Lógica de Programação", "Kanban"],
    salario: 2800,
    modalidade: "Remoto",
    nivel: "Junior",
  },
  {
    id: 2,
    empresa: "CodeLab",
    cargo: "Estágio Front-End",
    requisitos: ["JavaScript", "Kanban", "GitHub"],
    salario: 1800,
    modalidade: "Híbrido",
    nivel: "Estagiário",
  },
  {
    id: 3,
    empresa: "WebSolutions",
    cargo: "Programador JavaScript Júnior",
    requisitos: ["JavaScript", "Arrays", "Objetos", "Funções"],
    salario: 3000,
    modalidade: "Presencial",
    nivel: "Júnior",
  },
  {
    id: 4,
    empresa: "SolutionsMund",
    cargo: "Desenvolvedor Front-End",
    requisitos: ["JavaScript", "React", "GitHub"],
    salario: 2800,
    modalidade: "Hibrido",
    nivel: "Senior",
  },
]

const vagas = dadosVagas.map(dado =>
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

function criarContadorDeAnalise() {
    let total = 0;

    return function() {
        total++;

        return total;
    };
}

const contadorAnalises = criarContadorDeAnalise();


// Classificação de compatibilidade
function classificarCompatibilidade(percentual) {
    if(percentual >=80) {
        return "Alta compatibilidade";
    }

    else if(percentual >=50) {
        return "Média compatibilidade";
    }

    else {
        return "Baixa Compatibilidade";
    }
}

//

function finalizarAnalise(nomeCandidato, callback) {
    console.log("\nAnalise finalizada")

    callback(nomeCandidato);
}

function exibirMensagemFinal(nome) {
    console.log(
        `${nome}, revise suas habilidades faltantes e atualize seu plano de estudo.`
    );
}


function buscarVagas() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(vagas);
        }, 2000);
    });
}

//função que aprensanta as informações na tela
async function iniciarSistema() {
    console.log("SKILLMATCH JS")

    console.log(`Candidato: ${candidato.nome}`);
    console.log(`Área: ${candidato.area}`);
    console.log(
        `Habilidades: ${candidato.habilidades.join(", ")}`
        );

    console.log("\nAnalisando vagas...\n");

    const vagasCarregadas =
    await buscarVagas();

    const resultados =
    vagasCarregadas.map(vaga =>
        vaga.calcularCompatibilidade(candidato)
    );

      resultados.forEach(resultado => {

        console.log("==================================");

        console.log(`Empresa: ${resultado.empresa}`);

        console.log(`Cargo: ${resultado.cargo}`);

        console.log(
            `Compatibilidade: ${resultado.percentual}%`
        );

        console.log(
            `Classificação: ${resultado.classificacao}`
        );

        console.log(
            `Habilidades encontradas: ${resultado.habilidadesEncontradas.join(", ")}`
        );

        console.log(
            `Habilidades faltantes: ${resultado.habilidadesFaltantes.join(", ")}`
        );

        console.log("==================================");

        // closure
            console.log(
            `Análises realizadas: ${contadorAnalises()}`
        );
    });

    // REDUCE
    const melhorVaga =
        resultados.reduce((melhor, atual) => {

            if (atual.percentual > melhor.percentual) {
                return atual;
            }

            return melhor;
        });

    console.log("\n");
    console.log("VAGA MAIS COMPATÍVEL");

    console.log(
        `${melhorVaga.cargo} - ${melhorVaga.percentual}%`
    );

    // FIND
    const vagaAltaCompatibilidade =
        resultados.find(resultado =>
            resultado.percentual >= 80
        );

    if (vagaAltaCompatibilidade) {

        console.log("\nPrimeira vaga com alta compatibilidade:");

        console.log(vagaAltaCompatibilidade.cargo);
    }

    // EVERY
    const todasExigemJavaScript =
        vagas.every(vaga =>
            vaga.requisitos.includes("JavaScript")
        );

    console.log("\nTodas as vagas exigem JavaScript?");
    console.log(
        todasExigemJavaScript ? "Sim" : "Não"
    );

    // RECOMENDAÇÃO DE ESTUDOS
    console.log("RECOMENDAÇÃO DE ESTUDOS");

    // REDUCE
    const habilidadesParaEstudar =
        resultados.reduce((lista, resultado) => {

            resultado.habilidadesFaltantes.forEach(habilidade => {

                if (!lista.includes(habilidade)) {
                    lista.push(habilidade);
                }
            });

            return lista;

        }, []);

    console.log(
        `Priorize estudar: ${habilidadesParaEstudar.join(", ")}`
    );

    // CALLBACK
    finalizarAnalise(
        candidato.nome,
        exibirMensagemFinal
    );
}

// ==========================================
// EXECUTAR SISTEMA
// ==========================================
iniciarSistema();
