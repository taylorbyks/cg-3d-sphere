import express from 'express'
import path from 'path'

const port: number = 3000
const app: express.Application = express()

app.use(express.static(path.join(__dirname, '../client')))
app.listen(port, () => {
  console.log('Server listening on port', port)
})
