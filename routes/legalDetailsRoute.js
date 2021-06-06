let express = require('express')
let router = express.Router()
let dbHelper = require('../database/dbHelper')
let cons = require('./../constants')
let config = require('./../config')

router.get('/', async (req, res) => {
    if (req.session.user) {
        try {
            let workers = await dbHelper.getWorkers()
            let plaintiffs = await dbHelper.getPlaintiffs()
            let defendants = await dbHelper.getDefendants()
            let casePlaintiffs = []
            let caseDefendants = []

            if (req.session.currentCase) {
                casePlaintiffs = await dbHelper.getCasePlaintiffs(req.session.currentCase.id)
                caseDefendants = await dbHelper.getCaseDefendants(req.session.currentCase.id)
            }

            res.render('legalDetails', { 
                caseTypes: cons.caseTypes,
                caseSubTypes: cons.caseSubTypes,
                workers: workers,
                plaintiffs: plaintiffs,
                defendants: defendants,
                casePlaintiffs: casePlaintiffs,
                caseDefendants: caseDefendants,
                user: req.session.user,
                baseURL: config.web.baseURL,
                currentCase: req.session.currentCase
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    else {
        res.redirect('?session=expired')
    } 
})

router.put('/', async (req, res) => {
    if (req.session.user) {
        let result = await dbHelper.updateLegalDetails(req.body)
        res.send(result)
    }
    else {
        res.redirect('?session=expired')
    }
})

router.get('/bycaseid', async (req, res) => {
    if (req.session.user) {
        let id = req.query.id
        let result = await dbHelper.getLegalDetailsByCaseId(id)
        res.send(result)
    }
    else {
        res.redirect('?session=expired')
    }
})

module.exports = router