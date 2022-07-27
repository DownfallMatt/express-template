import express from 'express'
const router = express.Router()

import socket from './socket/socket'

router.get('/socket', socket)

export default router