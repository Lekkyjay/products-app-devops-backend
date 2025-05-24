import { Response, Request, NextFunction } from 'express'
import pool from '../config/dbConn'

export const healthCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Use the connection pool to acquire a connection
    const client = await pool.connect();
    // Release the connection back to the pool
    client.release();
    // Send a 200 OK status response
    res.status(200).send('Everything is alright. Lets go!')
  } 
  catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}
