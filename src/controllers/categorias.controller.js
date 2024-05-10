import { createCategoriaService, getCategoriasService } from "../services/categorias.services.js"

export async function getCategorias(req, res) {
    const resultado = await getCategoriasService()
    res.send(resultado)
}

export async function createCategoria(req, res) {
    const resultado = await createCategoriaService(req.body)
    res.status(201).send(resultado)
}