import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/modules/students/student.route'
import { UserRoutes } from './app/modules/users/user.route'
import globalErrorHandler from './app/middlware/globalErrorHandler'
import notFound from './app/middlware/notFound'
import router from './app/routes'

const app: Application = express()

// parsers

app.use(express.json())
app.use(cors())

// test route
const testRoute = (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Done',
  })
}
app.get('/', testRoute)

// main route
app.use('/api/v1', router)

// 404 Route handler for unmatched or not found routes
app.use(notFound)

// Global error handler
app.use(globalErrorHandler)

export default app
