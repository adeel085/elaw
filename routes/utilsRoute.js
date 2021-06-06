let express = require('express')
let router = express.Router()
let dbHelper = require('../database/dbHelper')
let cons = require('./../constants')
let config = require('./../config')

router.get('/roles', async (req, res) => {
    res.send(cons.workerRoles)
})

module.exports = router