let express = require('express')
let router = express.Router()
let dbHelper = require('../database/dbHelper')
let cons = require('./../constants')

router.get('/', (req, res) => {
    if(req.session.user) {
        res.redirect('dashboard')
        return
    }
    
    data = {}
    
    if (req.query.status != undefined) {
        if (req.query.status == "invalid_login") {
            data["invalidLogin"] = true
        }
    }

    res.render('login', data)
})

router.post('/', async (req, res) => {
    let username = req.body.username
    let password = req.body.password

    let loginResult = await dbHelper.checkLoginDetails(username, password)

    if(loginResult.length === 0) {
        res.redirect('?status=invalid_login')
    }
    else {
        req.session.user = loginResult[0]   
        res.redirect('dashboard')
    }
})

router.get('/endsession', (req, res) => {
    req.session.destroy()
    // req.session.user = undefined
    res.redirect('/')
})

module.exports = router