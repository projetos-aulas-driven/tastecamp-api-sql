import { db } from "../database/db.connection.js"

export async function getReceitasService() {
    const resultado = await db.query(`
        SELECT receitas.*, categorias.nome AS categoria FROM receitas
            JOIN receitas_categorias ON receitas_categorias.id_receita = receitas.id
            JOIN categorias ON receitas_categorias.id_categoria = categorias.id
            ORDER BY receitas.id;
    `)

    return resultado
}

export async function getReceitaByIdService(id) {
    const resultado = await db.query(`
        SELECT receitas.*, categorias.nome AS categoria FROM receitas
            JOIN receitas_categorias ON receitas_categorias.id_receita = receitas.id
            JOIN categorias ON receitas_categorias.id_categoria = categorias.id
            WHERE receitas.id=$1;
    `, [id])
    return resultado;
}

export async function createReceitaService({ titulo, ingredientes, preparo, categorias }) {
    if (categorias.length > 3) return null

    if (categorias.length < 1) return null

    const conflito = await db.query(`SELECT * FROM receitas WHERE titulo=$1;`, [titulo])
    if (conflito.rowCount !== 0) return null

    const resultado = await db.query(`
            INSERT INTO receitas (titulo, ingredientes, preparo) 
                VALUES ($1, $2, $3) RETURNING id;
        `, [titulo, ingredientes, preparo])

    const idReceita = resultado.rows[0].id

    categorias.forEach(async (idCategoria) => {
        await db.query(`
            INSERT INTO receitas_categorias (id_receita, id_categoria) VALUES ($1, $2);
        `, [idReceita, idCategoria])
    });

    return {
        id: idReceita,
        titulo,
        ingredientes,
        preparo,
        categorias
    }
}

export async function deleteReceitaService(id) {
    await db.query(`DELETE FROM receitas WHERE id=$1;`, [id])
}

export async function editReceitaByIdService(id, { titulo, ingredientes, preparo }) {
    await db.query(`
        UPDATE receitas SET titulo=$1, ingredientes=$2, preparo=$3
            WHERE id=$4;
    `, [titulo, ingredientes, preparo, id])
}