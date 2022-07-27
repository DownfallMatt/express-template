import express from 'express'
import Config from './utilities/Config'
import Routes from './v1/router'

const app = express()

app.use('/v1', Routes)

app.listen(Config.Server.PORT, () => {
    console.log(`API RUNNING ON PORT: ${Config.Server.PORT}`)
})