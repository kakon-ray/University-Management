import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/modules/students/student.route'
import { UserRoutes } from './app/modules/users/user.route'

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

export default app
