import express from 'express'
import cors from 'cors'
import { users } from './db.js'

const app = express()
const PORT = 5000
app.use(cors())
app.use(express.json())

app.post('/sign-up', async (req, res) => {
    const user = {...req.body}

    users.push(user)
    res.send('OK')
})

app.listen(PORT, () => console.log(`Servidor executando na porta ${PORT}`))