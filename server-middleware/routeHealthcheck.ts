import express from 'express'
const app = express()
app.get('/', (_, res) => {
  res.sendStatus(200)
})
export default app
