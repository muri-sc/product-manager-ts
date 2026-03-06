import { Request, Response } from "express"
import pool from "../database/database"
import test from "node:test"

export const testConection = async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `
                SELECT * FROM products
            `
        )
        res.status(200).json({
            message: "database conection working",
            result: result.rows[0]
        })

    } catch (err: any) {
        res.status(400).json({
            message: "error conecting to database",
            error: err.message
        })
    }
}