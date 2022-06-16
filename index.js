import express from 'express'
import cors from 'cors'
import { users, tweets } from './db.js'

const app = express()
const PORT = 5000
app.use(cors())
app.use(express.json())
let userId = 1
let tweetId = 1

app.post('/sign-up', (req, res) => {
    users.push({ userId, ...req.body })
    userId++

    res.send('OK')
})

app.post('/tweets', (req, res) => {
    const userAvatar = users.find(user => user.username === req.body.username)
    tweets.push({ tweetId, ...req.body, avatar: userAvatar.avatar })
    tweetId++
    
    res.send('OK')
})

app.get('/tweets', (req, res) => {
    const tenTweets = tweets.sort((a, b) => b.tweetId - a.tweetId).filter((tweet, i) => i < 10)

    res.send(tenTweets)
})

app.listen(PORT, () => console.log(`Servidor executando na porta ${PORT}`))