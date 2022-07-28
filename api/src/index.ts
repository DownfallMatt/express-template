import express from 'express'
import Config from './utilities/Config'
import Logger from './utilities/logger'

const app = express()

app.get('/test', (req, res) => {
    return res.send({msg: "Hello"})
})

app.use('/v1', require('./v1/router'))

// Capture 404 Errors
app.use(async (req, res, next) => {
    res.status(404).send({ error: { code: 404 } , message: 'PAGE NOT FOUND', })
    Logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})

app.listen(Config.Server.PORT, () => {
    console.log(`API RUNNING ON PORT: ${Config.Server.PORT}`)
})