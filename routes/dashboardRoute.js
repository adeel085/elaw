let express = require('express')
let router = express.Router()
let dbHelper = require('../database/dbHelper')
let cons = require('./../constants')
let config = require('./../config')

router.get('/', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { 
            user: req.session.user,
            baseURL: config.web.baseURL,
            currentCase: req.session.currentCase
        })
    }
    else {
        res.redirect(config.web.baseURL + '?session=expired')
    }    
})

module.exports = router