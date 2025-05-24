import { Response, Request, NextFunction } from 'express'
import pool from '../config/dbConn'

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await pool.query('SELECT * FROM categories')
    res.json(result.rows)
  } 
  catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}