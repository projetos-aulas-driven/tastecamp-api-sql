import { db } from "../database/db.connection.js"

export async function getCategoriasService() {
    const categorias = await db.query(`SELECT * FROM categorias;`)
    return categorias.rows
}

export async function createCategoriaService({ nome }) {
    const categoria = await db.query(`
        INSERT INTO categorias (nome) VALUES ($1) RETURNING id;
    `, [nome])
    return {
        id: categoria.rows[0].id,
        nome
    }
}