import { db } from "../database/db.connection.js"

export async function getReceitas(req, res) {
    try {
        const receitas = await db.query(`SELECT * FROM receitas;`)
        res.send(receitas.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getReceitaById(req, res) {
    const { id } = req.params
    try {
        const receita = await db.query(`SELECT * FROM receitas WHERE id=$1;`, [id])
        res.send(receita.rows[0])
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createReceita(req, res) {
    const { titulo, ingredientes, preparo } = req.body
    try {
        await db.query(`
            INSERT INTO receitas (titulo, ingredientes, preparo) 
                VALUES ($1, $2, $3);
        `, [titulo, ingredientes, preparo])
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteReceita(req, res) {
    const { id } = req.params
    try {
        await db.query(`DELETE FROM receitas WHERE id=$1;`, [id])
        res.sendStatus(204)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function editReceitaById(req, res) {
    const { id } = req.params
    const { titulo, ingredientes, preparo } = req.body
    try {
        await db.query(`
            UPDATE receitas SET titulo=$1, ingredientes=$2, preparo=$3
                WHERE id=$4;
        `, [titulo, ingredientes, preparo, id])
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}