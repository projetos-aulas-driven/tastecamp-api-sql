import { createReceitaService, deleteReceitaService, editReceitaByIdService, getReceitaByIdService, getReceitasService } from "../services/receitas.services.js"

export async function getReceitas(req, res) {
    try {
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
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getReceitaById(req, res) {
    const { id } = req.params
    try {

        const resultado = await getReceitaByIdService(id)
        const receitaFormatada = {
            ...resultado.rows[0],
            categorias: resultado.rows.map(receita => receita.categoria)
        }

        delete receitaFormatada.categoria

        res.send(receitaFormatada)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createReceita(req, res) {
    try {
        const resultado = await createReceitaService(req.body)
        res.status(201).send(resultado)
    } catch (err) {
        if (err.type === "invalidCategory") {
            return res.status(422).send(err.message)
        }

        if (err.type === "conflict") {
            return res.status(409).send(err.message)
        }
        
        res.status(500).send(err.message)
    }
}

export async function deleteReceita(req, res) {
    const { id } = req.params
    try {
        await deleteReceitaService(id)
        res.sendStatus(204)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function editReceitaById(req, res) {
    const { id } = req.params
    try {
        await editReceitaByIdService(id, req.body)
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}