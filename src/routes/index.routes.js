import { Router } from "express"
import receitasRouter from "./receitas.routes.js"
import categoriasRouter from "./categorias.routes.js"

const router = Router()
router.use(receitasRouter)
router.use(categoriasRouter)

export default router