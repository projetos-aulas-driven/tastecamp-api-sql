import { Router } from "express"
import { createCategoria, getCategorias } from "../controllers/categorias.controller.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { categoriaSchema } from "../schemas/categorias.schema.js"

const categoriasRouter = Router()

categoriasRouter.get("/categorias", getCategorias)
categoriasRouter.post("/categorias", validateSchema(categoriaSchema), createCategoria)

export default categoriasRouter