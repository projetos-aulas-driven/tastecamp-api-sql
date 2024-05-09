import { db } from "../database/db.connection.js"

export async function getReceitas(req, res) {
    try {
        const resultado = await db.query(`
            SELECT receitas.*, categorias.nome AS categoria FROM receitas
                JOIN receitas_categorias ON receitas_categorias.id_receita = receitas.id
                JOIN categorias ON receitas_categorias.id_categoria = categorias.id
                ORDER BY receitas.id;
        `)

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
        const resultado = await db.query(`
            SELECT receitas.*, categorias.nome AS categoria FROM receitas
                JOIN receitas_categorias ON receitas_categorias.id_receita = receitas.id
                JOIN categorias ON receitas_categorias.id_categoria = categorias.id
                WHERE receitas.id=$1;
        `, [id])

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
    const { titulo, ingredientes, preparo, categorias } = req.body
    try {
        const resultado = await db.query(`
            INSERT INTO receitas (titulo, ingredientes, preparo) 
                VALUES ($1, $2, $3) RETURNING id;
        `, [titulo, ingredientes, preparo])

        const idReceita = resultado.rows[0].id

        categorias.forEach(async (idCategoria) => {
            await db.query(`
                INSERT INTO receitas_categorias (id_receita, id_categoria)
                    VALUES ($1, $2);
            `, [idReceita, idCategoria])
        });

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