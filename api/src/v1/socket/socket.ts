import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
    return console.log('hi')
})

export default router