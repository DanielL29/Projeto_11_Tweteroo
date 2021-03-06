import express from 'express'
import cors from 'cors'
import { users, tweets } from './db.js'
import { isEmpty, validateObj, verifyURL, validatePage } from './validations.js'

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

let userId, tweetId = 1
let limit = 10

app.post('/sign-up', (req, res) => {
    if(isEmpty({...req.body}) || !validateObj({...req.body}, 'user')) {
        res.status(400).send('Todos os campos são obrigatórios!')
    } else {
        if(!verifyURL(req.body.avatar)) {
            res.status(422).send('Coloque uma URL de imagem válida!')
        }

        users.push({ id: userId, ...req.body })
        userId++
    }

    res.status(201).send('OK')
})

app.post('/tweets', (req, res) => {
    const userAvatar = users.find(user => user.username === req.headers.user)

    if(isEmpty({...req.body}) || !validateObj({...req.body}, 'tweet')) {
        res.status(400).send('Todos os campos são obrigatórios!') 
    } else {
        if(userAvatar === undefined) {
            res.status(401).send('Faltando o headers do nome do usuário!')
        }
    
        tweets.unshift({
            id: tweetId, 
            username: req.headers.user, 
            ...req.body, 
            avatar: userAvatar.avatar 
        })
        tweetId++
        
        res.status(201).send('OK')
    }
})

app.get('/tweets', (req, res) => {
    const page = req.query.page

    if(isEmpty({...req.body})) res.sendStatus(400)
    else {     
        if(validatePage(page, limit, tweets.length)) {
            res.status(400).send('Informe uma página válida!')
        }
        const tenTweets = tweets.filter((_, i) => i >= (page * limit - 10) && i < limit * page)

        res.send(tenTweets)
    }
})

app.get('/tweets/:username', (req, res) => {
    const username = req.params.username
    const userPosts = tweets.filter(tweet => tweet.username === username)

    res.send(userPosts)
})

app.listen(PORT, () => console.log(`Servidor executando na porta ${PORT}`))