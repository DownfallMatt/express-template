import mysql from 'mysql2'
import Config from 'utilities/Config'

const pool = mysql.createPool({
    host: Config.Database.HOSTNAME
})