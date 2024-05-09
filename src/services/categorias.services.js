import categoriasRepository from "../repositories/categorias.repository.js"

export async function getCategoriasService() {
    const resultado = await categoriasRepository.getCategorias()
    return resultado
}

export async function createCategoriaService({ nome }) {
    const resultado = await categoriasRepository.createCategoria(nome)
    return resultado
}