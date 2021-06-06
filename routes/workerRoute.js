let express = require('express')
let router = express.Router()
let dbHelper = require('../database/dbHelper')
let cons = require('./../constants')
let config = require('./../config')

router.get('/', async (req, res) => {
    if (req.session.user) {
        if (req.session.user.role == 'it_admin' || req.session.user.role == 'managing_attorney') {
            res.render('workers', {
                user: req.session.user,
                baseURL: config.web.baseURL,
                currentCase: req.session.currentCase
            })
        }
        else {
            res.render('noPermissons')
        }
    }
    else {
        res.redirect('?session=expired')
    }
})

router.get('/allworkers', async (req, res) => {
    if (req.session.user) {
        if (req.session.user.role == 'it_admin' || req.session.user.role == 'managing_attorney') {
            let workers = await dbHelper.getWorkers()
            res.send(workers)
        }
        else {
            res.render('noPermissons')
        }
    }
    else {
        res.redirect('?session=expired')
    }
})

router.get('/create', (req, res) => {
    if (req.session.user) {
        if (req.session.user.role == 'it_admin' || req.session.user.role == 'managing_attorney') {
            res.render('addWorker', {
                user: req.session.user,
                baseURL: config.web.baseURL,
                currentCase: req.session.currentCase,
                roles: cons.workerRoles
            })
        }
        else {
            res.render('noPermissons')
        }
    }
    else {
        res.redirect('?session=expired')
    }
})

router.post('/create', async (req, res) => {

    if (req.session.user) {
        if (req.session.user.role == 'it_admin' || req.session.user.role == 'managing_attorney') {
            let worker = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                cellPhone: req.body.cellPhone,
                email: req.body.email,
                taxBarNum: req.body.taxBarNum,
                workerRole: req.body.role,
                username: req.body.username,
                password: 'test123'
            }
            
            let result = await dbHelper.insertWorker(worker)
            
            if (result.affectedRows == 1) {
                res.send({
                    id: result.insertId
                })
            }
        }
        else {
            res.render('noPermissons')
        }
    }
    else {
        res.redirect('?session=expired')
    }
})

module.exports = router
