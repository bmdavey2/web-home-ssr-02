import express from 'express'
const app = express()
const obj = { applinks: { apps: [], details: [{ appID: ' NG2773SR5B.com.activeplace.ActivePlace', paths: ['*'] }] } }
app.get('/', (_, res) => {
  res.json(obj)
})
export default app
