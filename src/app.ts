import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/modules/students/student.route'
import { UserRoutes } from './app/modules/users/user.route'
import globalErrorHandler from './app/middlware/globalErrorHandler'
import notFound from './app/middlware/notFound'

const app: Application = express()

// parsers

app.use(express.json())
app.use(cors())

app.use('/api/v1/students', StudentRoutes)
app.use('/api/v1/users', UserRoutes)

app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Done',
  })
})

// 404 Route handler for unmatched or not found routes
app.use(notFound)

// Global error handler
app.use(globalErrorHandler)

export default app
