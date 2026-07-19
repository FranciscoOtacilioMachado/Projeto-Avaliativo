// Criação da classe vaga
export class Vaga {
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
        this.salario = salario;
        this.modalidade = modalidade;
    }

    exibirResumo() {
        return `${this.cargo} na empresa ${this.empresa} (${this.modalidade}) – R$ ${this.salario}/mês`;
    }

    //Analisa vagas

    calcularCompatibilidade(candidato) {
        const habilidadesEncontradas = 
            this.requisitos.filter(requisito =>
                candidato.habilidades.some(habilidade =>
                    habilidade.toLowerCase() === requisito.toLowerCase()
                )
            );

        const habilidadesFaltantes = 
            this.requisitos.filter(requisito =>
                !candidato.habilidades.some(habilidade => 
                    habilidade.toLowerCase() === requisito.toLowerCase()
                )
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

export class VagasFrontEnd  extends Vaga { 
    constructor (id, empresa, cargo, requisitos, salario, modalidade, nivel) {
        super(id, empresa, cargo, requisitos, salario, modalidade)
        this.nivel = nivel;
    }

    exibirNivel() {
        return `Nível de vaga ${this.nivel}`;
    }
}

// Classificação de compatibilidade
export function classificarCompatibilidade(percentual) {
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

export function criarContadorDeAnalise() {
    let total = 0;

    return function() {
        total++;

        return total;
    };
}