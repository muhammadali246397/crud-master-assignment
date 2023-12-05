import express, { Application, Request, Response } from 'express'
import cors from 'cors'
// import ruter from './user/user.route'
const app: Application = express()

app.use(express.json())
app.use(cors())
//user routers
// app.use('/api/users', ruter)

app.get('/', (req:Request, res:Response) => {
  res.send('this application is runnig fine')
})

export default app