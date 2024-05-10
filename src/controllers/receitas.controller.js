import { createReceitaService, deleteReceitaService, editReceitaByIdService, getReceitaByIdService, getReceitasService } from "../services/receitas.services.js"

export async function getReceitas(req, res) {
    const resultado = await getReceitasService();

    const formatadas = []
    let receitaFormatada

    for (let i = 0; i < resultado.rows.length; i++) {
        const receita = resultado.rows[i]
        const proximaReceita = resultado.rows[i + 1]

        if (receitaFormatada && receitaFormatada.id === receita.id) {
            receitaFormatada.categorias.push(receita.categoria)
        } else {
            receitaFormatada = { ...receita, categorias: [receita.categoria] }
            delete receitaFormatada.categoria
        }

        if (!proximaReceita || proximaReceita.id !== receita.id) {
            formatadas.push(receitaFormatada)
        }
    }

    res.send(formatadas)
}

export async function getReceitaById(req, res) {
    const { id } = req.params
    const resultado = await getReceitaByIdService(id)
    const receitaFormatada = {
        ...resultado.rows[0],
        categorias: resultado.rows.map(receita => receita.categoria)
    }

    delete receitaFormatada.categoria
    res.send(receitaFormatada)
}

export async function createReceita(req, res) {
    const resultado = await createReceitaService(req.body)
    res.status(201).send(resultado)
}

export async function deleteReceita(req, res) {
    const { id } = req.params
    await deleteReceitaService(id)
    res.sendStatus(204)
}

export async function editReceitaById(req, res) {
    const { id } = req.params
    await editReceitaByIdService(id, req.body)
    res.sendStatus(200)
}