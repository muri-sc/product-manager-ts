import { Router } from "express"
import { testConection } from "./controllers/productController"

const router = Router()

router.get("/testConection", testConection)

export default router