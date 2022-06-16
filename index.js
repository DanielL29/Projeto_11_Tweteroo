import express from 'express'
import cors from 'cors'
import { users, tweets } from './db.js'
import { isEmpty, validateObj, verifyURL } from './validations.js'

const app = express()
const PORT = 5000
app.use(cors())
app.use(express.json())
let userId = 1
let tweetId = 1

app.post('/sign-up', (req, res) => {
    if(isEmpty({...req.body}) || !validateObj({...req.body}, 'user')) {
        res.status(400).send('Todos os campos são obrigatórios!')
    } else {
        if(!verifyURL(req.body.avatar)) {
            res.status(422).send('Coloque uma URL de imagem válida!')
        }

        users.push({ userId, ...req.body })
        userId++
    }

    res.status(201).send('OK')
})

app.post('/tweets', (req, res) => {
    if(isEmpty({...req.body}) || !validateObj({...req.body}, 'tweet')) {

        res.status(400).send('Todos os campos são obrigatórios!')
    } 

    const userAvatar = users.find(user => user.username === req.body.username)
    tweets.push({ tweetId, ...req.body, avatar: userAvatar.avatar })
    tweetId++
    
    res.status(201).send('OK')
})

app.get('/tweets', (req, res) => {
    if(isEmpty({...req.body})) res.sendStatus(400)

    const tenTweets = tweets.sort((a, b) => b.tweetId - a.tweetId).filter((_, i) => i < 10)

    res.send(tenTweets)
})

app.listen(PORT, () => console.log(`Servidor executando na porta ${PORT}`))