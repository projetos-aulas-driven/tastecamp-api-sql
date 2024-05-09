import { db } from "../database/db.connection.js"

export async function getCategorias(req, res) {
    try {
        const categorias = await db.query(`SELECT * FROM categorias;`)
        res.send(categorias.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createCategoria(req, res) {
    const { nome } = req.body
    try {
        await db.query(`INSERT INTO categorias (nome) VALUES ($1);`, [nome])
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}