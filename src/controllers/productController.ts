import { Request, Response } from "express"
import pool from "../database/database"
import Product from "../types"
import { error } from "node:console"

const getProducts = async (req: Request, res: Response) => {

    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const offset = (page - 1) * limit

        const result = await pool.query(
            `
            SELECT * FROM products LIMIT ($1) OFFSET ($2)
            `,
            [limit, offset]
        )
        res.status(200).json({
            sucess: true,
            result: result.rows
        })

    } catch (err: any) {

        res.status(500).json({
            sucess: false,
            error: err.message
        })
    }
}

const createProduct = async (req: Request, res: Response) => {

    try {
        const product: Product = req.body
    
        const result = await pool.query(
            `
            INSERT INTO products (name, description, price, stock)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `,
            [product.name, product.description, product.price, product.stock]
        )
        res.status(200).json({
            sucess: true,
            result: result.rows[0]
        })

    } catch (err: any) {

        res.status(500).json({
            sucess: false,
            error: err.message
        })
    }
}

export { getProducts, createProduct }