import { NextFunction, Request, Response } from 'express'

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${res.statusCode} ${req.originalUrl} Origin: ${req.get('origin')}`)
  next()
}
