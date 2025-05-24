import { Response, Request, NextFunction } from 'express'
import pool from '../config/dbConn'

//standardized response. put it in:  lib/utils.ts
const customResponse = (res: Response, status: number, message: string, data = null) => {
  res.status(status).json({ message, data })
}


export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await pool.query(`
      SELECT p.id, p.name, p.price, c.name AS category FROM products p
      JOIN categories c ON p.categoryId = c.id
    `)
    res.json(result.rows)
  } 
  catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  if (!id) {
    res.sendStatus(400)
    return
  }

  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id])
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Product not found' })
      return
    }
    res.json(result.rows[0])
  } 
  catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { name, price, categoryId } = req.body
  if (!name || !price || !categoryId) {
    res.sendStatus(400)
    return
  }

  try {    
    const result = await pool.query(
      'INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3) RETURNING *', [name, price, categoryId]
    )

    res.status(201).json(result.rows[0])
  } 
  catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { name, price, categoryId } = req.body

  if (!id || !name || !price || !categoryId) {
    res.sendStatus(400)
    return
  }
  try {
    
    const result = await pool.query(
      'UPDATE products SET name = $1, price = $2, category_id = $3 WHERE id = $4 RETURNING *',
      [name, price, categoryId, id]
    )
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Product not found' })
      return
    }
    res.json(result.rows[0])
  } 
  catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  if (!id) {
    res.sendStatus(400)
    return
  }

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id])
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Product not found' })
      return
    }
    res.json({ message: 'Product deleted' })
  } 
  catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}