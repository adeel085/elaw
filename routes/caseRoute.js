let express = require('express')
let router = express.Router()
let dbHelper = require('../database/dbHelper')
let cons = require('./../constants')
let config = require('./../config')
let fs = require('fs')

router.get('/addcase', async (req, res) => {
    if(req.session.user) {
        try {
            let workers = await dbHelper.getWorkers()
            let plaintiffs = await dbHelper.getPlaintiffs()
            let defendants = await dbHelper.getDefendants()
    
            res.render('addcase', {
                caseTypes: cons.caseTypes,
                caseSubTypes: cons.caseSubTypes,
                workers: workers,
                plaintiffs: plaintiffs,
                defendants: defendants,
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

router.post('/addcase', async (req, res) => {   
    if(req.session.user) {

        try {
            let result = await dbHelper.addCase(req.body)
            await dbHelper.addLegalDetails({
                caseId: result.insertId,
                trialDate: '',
                clientMatterNumber: '',
                address: '',
                phone: '',
                altPhone: '',
                city: '',
                state: '',
                zip: ''
            })

            for(let i = 0; i < req.body.plaintiffs.length; i++)
                await dbHelper.addCasePlaintiffs(result.insertId, req.body.plaintiffs[i].id)

            for(let i = 0; i < req.body.defendants.length; i++)
                await dbHelper.addCaseDefendants(result.insertId, req.body.defendants[i].id)
            
            // Create the directory for case documents
            createCaseDirectory(result.insertId)
            
            req.session.currentCase = {
                id: result.insertId
            }
            
            res.send({
                id: result.insertId
            })
        }
        catch (err) {
            console.log(err)
            res.send({
                id: null
            })
        }
    } 
    else {
        res.redirect('?session=expired')
    }    
})

router.put('/', async (req, res) => {
    if(req.session.user) {
        let result = await dbHelper.updateCase(req.body)
        res.send(result)
    }
    else {
        res.redirect('?session=expired')
    }
})

router.post('/schedulecase', () => {
    
})

router.get('/casebyid', async (req, res) => {
    if (req.session.user) {
        let id = req.query.id
        let result = await dbHelper.getCaseById(id)
        
        if (result == undefined) {
            res.send({})
        }
        else {
            res.send(result)
        }
    }
    else {
        res.redirect('?session=expired')
    }
})

router.post('/currentcase', async (req, res) => {
    if (req.session.user) {
        req.session.currentCase = req.body
        res.send('done')
    }
    else {
        res.redirect('?session=expired')
    }
})

function createCaseDirectory(caseId) {
    fs.mkdir(`./public/uploads/cases-documents/case-${caseId}`, function(err) {
        if (err) {
            console.log(err)
        } 
        else {
            console.log("New directory successfully created.")
        }
    })
}

module.exports = router