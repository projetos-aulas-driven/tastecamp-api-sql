import { createCategoriaService, getCategoriasService } from "../services/categorias.services.js"

export async function getCategorias(req, res) {
    try {
        const resultado = await getCategoriasService()
        res.send(resultado)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createCategoria(req, res) {
    try {
        const resultado = await createCategoriaService(req.body)
        res.status(201).send(resultado)
    } catch (err) {
        res.status(500).send(err.message)
    }
}