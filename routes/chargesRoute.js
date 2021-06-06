let express = require('express')
let router = express.Router()
let dbHelper = require('../database/dbHelper')
let utils = require('./../helpers/utils')
let config = require('./../config')
let path = require('path')
let fsHelper = require('./../helpers/fsHelper')

router.get('/', async (req, res) => {
    if(req.session.user) {
        let allCharges
        if(req.session.currentCase) {
            if(req.session.user.role === 'it_admin' || req.session.user.role === 'managing_attorney') {
                allCharges = await dbHelper.getChargesByCaseId(req.session.currentCase.id)
            }
            else {
                allCharges = await dbHelper.getCurrentUserCharges(req.session.currentCase.id, req.session.user.id)
            }
        }
        res.render('charges', {
            user: req.session.user,
            baseURL: config.web.baseURL,
            currentCase: req.session.currentCase,
            charges: allCharges
        })
    }
    else {
        res.redirect(config.web.baseURL + '?session=expired')
    }
})

router.get('/addcharges', (req, res) => {
    if(req.session.user) {
        res.render('addCharges', {
            user: req.session.user,
            baseURL: config.web.baseURL,
            currentCase: req.session.currentCase
        })
    }
    else {
        res.redirect(config.web.baseURL + '?session=expired')
    }
})

router.post('/addcharges', async (req, res) => {
    if(req.session.user) {
        let chargeUnit = req.body.chargeUnit
        let unitCost = Number(req.body.unitCost)
        let timePeriod = Number(req.body.timePeriod)
        let noteTitle = req.body.noteTitle
        let noteDescription = req.body.noteDescription

        let filePaths = []

        if(req.files)
            filePaths = await utils.uploadFiles(req)

        let time = fsHelper.getCurrentDate()

        // Insert in Database
        let insertedRow = await dbHelper.insertIntoCharges(req.session.currentCase.id, chargeUnit, unitCost, timePeriod, time, req.session.user.id)
        await dbHelper.updateCurrentMoney(unitCost * timePeriod, req.session.currentCase.id)
        for(let i = 0; i < filePaths.length; i++) {
            await dbHelper.insertIntoDocuments(insertedRow.insertId, null, filePaths[i], 'charges', null)
        }
        // add into notes
        await dbHelper.insertChargeNote(noteTitle, noteDescription, time, insertedRow.insertId,  null, req.session.currentCase.id, req.session.user.id)

        // also update session
        req.session.currentCase = await dbHelper.getCaseById(req.session.currentCase.id)

        // Redirect
        res.redirect(config.web.baseURL + 'charges/addcharges')
    }
    else {
        res.redirect(config.web.baseURL + '?session=expired')
    }

})

router.get('/updatecharge/:chargeId', async (req, res) => {
    if(req.session.user) {
        let chargeID = req.params.chargeId
        let charge = await dbHelper.getCharge(chargeID)
        let attachedFiles = await dbHelper.getChargeAttachedFilesFromChargeID(chargeID)

        res.render('updatecharge', {
            user: req.session.user,
            baseURL: config.web.baseURL,
            currentCase: req.session.currentCase,
            charge: charge,
            files: attachedFiles
        })
    }
    else {
        res.redirect(config.web.baseURL + '?session=expired')
    }
})

router.get('/addtrust', (req, res) => {
    if(req.session.user) {
        res.render('addTrust', {
            user: req.session.user,
            baseURL: config.web.baseURL,
            currentCase: req.session.currentCase
        })
    }
    else {
        res.redirect(config.web.baseURL + '?session=expired')
    }
})

router.post('/addtrust', async (req, res) => {
    if(req.session.user) {
        let trustAmount = Number(req.body.trustAmount)
        let time = fsHelper.getCurrentDate()
        await dbHelper.insertIntoDeposits(req.session.currentCase.id ,trustAmount, time, req.session.user.id)
        await dbHelper.updateCurrentMoneyAfterDeposit(trustAmount, req.session.currentCase.id)
        // also update session
        req.session.currentCase = await dbHelper.getCaseById(req.session.currentCase.id)
        res.redirect(config.web.baseURL + 'charges/addtrust')
    }
    else {
        res.redirect(config.web.baseURL + '?session=expired')
    }
})

router.get('/trust', async (req, res) => {
    if(req.session.user) {
        let deposits
        if(req.session.currentCase) {
            deposits = await dbHelper.getAllDepositsFromCaseId(req.session.currentCase.id)
        }
        res.render('trust.hbs', {
            user: req.session.user,
            baseURL: config.web.baseURL,
            currentCase: req.session.currentCase,
            deposits: deposits
        })
    }
    else {
        res.redirect(config.web.baseURL + '?session=expired')
    }
})

router.get('/trust/updatetrust/:depositId', async (req, res) => {
    if(req.session.user) {
        let depositID = req.params.depositId
        let deposit = await dbHelper.getDepositByDepositId(depositID)

        res.render('updateTrust', {
            user: req.session.user,
            baseURL: config.web.baseURL,
            currentCase: req.session.currentCase,
            deposit: deposit
        })

    }
    else {
        res.redirect(config.web.baseURL + '?session=expired')
    }
})

module.exports = router