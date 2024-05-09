import receitasRepository from "../repositories/receitas.repository.js";

export async function getReceitasService() {
    const resultado = await receitasRepository.getReceitas()
    return resultado
}

export async function getReceitaByIdService(id) {
    const resultado = await receitasRepository.getReceitaById(id)
    return resultado;
}

export async function createReceitaService({ titulo, ingredientes, preparo, categorias }) {
    if (categorias.length > 3) return null

    if (categorias.length < 1) return null

    const conflito = await receitasRepository.getReceitaByTitulo()
    if (conflito.rowCount !== 0) return null

    await receitasRepository.createReceita(titulo, ingredientes, preparo, categorias)
}

export async function deleteReceitaService(id) {
    await receitasRepository.deleteReceita(id)
}

export async function editReceitaByIdService(id, { titulo, ingredientes, preparo }) {
    await receitasRepository.editReceitaById(id, titulo, ingredientes, preparo)
}