import { db } from "../database/db.connection.js"

async function getCategorias() {
    const categorias = await db.query(`SELECT * FROM categorias;`)
    return categorias.rows
}

async function createCategoria(nome) {
    const categoria = await db.query(`
        INSERT INTO categorias (nome) VALUES ($1) RETURNING id;
    `, [nome])

    return {
        id: categoria.rows[0].id,
        nome
    }
}

const categoriasRepository = {
    getCategorias,
    createCategoria
}

export default categoriasRepository