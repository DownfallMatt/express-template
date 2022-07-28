import express from 'express'
const router = express.Router()

import socket from './socket/socket'

router.use('/socket', socket)

export = router