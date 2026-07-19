export async function buscarVagas() {
    const resposta = await fetch("./assets/dados/vagas.json")
    
    if(!resposta.ok) {
        throw new Error("Não foi possível carregar as vagas");
    }    

    return await resposta.json();
}