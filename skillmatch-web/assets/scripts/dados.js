export async function buscarVagas() {
    const resposta = await fetch("./assets/dados/vagas.json")
    
    if(!resposta.ok) {
        throw new Error("Não foi possível carregar as vagas");
    }    

    return await resposta.json();
}

const CHAVE_PERFIL = "skillmatch:perfil";

export function salvarPerfil(perfil) {
    localStorage.setItem(CHAVE_PERFIL, JSON.stringify(perfil));
}

export function carregarPerfil() {
    const dados = localStorage.getItem(CHAVE_PERFIL);

    if (!dados) {
        return null;
    }

    return JSON.parse(dados);
}