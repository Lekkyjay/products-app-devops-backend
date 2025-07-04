import express from 'express'
import cors from 'cors'
import os from 'os'
import productRoutes from './routes/products'
import categoryRoutes from './routes/categories'
import { healthCheck } from './controllers/health-check'
import { logger } from './middlewares/logger'

const app = express()

app.use(logger)
app.use(express.json())
app.use(cors())

app.get('/api/hello', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/hostname', (req, res) => {
  const msg = `${os.hostname()}`      //linux-pc on desktop ===> podname in k8s
  res.json(msg)
})

app.get('/api/healthcheck', healthCheck)
app.use('/api', productRoutes)
app.use('/api', categoryRoutes)

export default app