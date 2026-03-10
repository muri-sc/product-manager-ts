import { Router } from "express"
import * as productController from "./controllers/productController"

const router = Router()

router.get("/products", productController.getProducts)
router.post("/products", productController.createProduct)

export default router