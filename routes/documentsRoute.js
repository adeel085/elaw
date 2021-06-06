let express = require('express')
let router = express.Router()
let dbHelper = require('../database/dbHelper')
let cons = require('./../constants')
let config = require('./../config')
let fsHelper = require('../helpers/fsHelper')
let fs = require('fs')
const { dir } = require('console')

router.get('/', async (req, res) => {
    if (req.session.user) {
        res.render('documents', {
            user: req.session.user,
            baseURL: config.web.baseURL,
            currentCase: req.session.currentCase
        })   
    }
    else {
        res.redirect('?session=expired')
    }
})

router.get('/:id', async (req, res) => {
    if (req.session.user) {
        let caseId = req.params.id
        let rootDir = `./public/uploads/cases-documents/case-${caseId}`
        let dirTree = fsHelper.getDirTree(rootDir)
        res.send(dirTree)
    }
    else {
        res.redirect('?session=expired')
    }
})

router.post('/createfolder', async (req, res) => {
    if (req.session.user) {
        let path = req.body.path
        let folderName = req.body.folderName

        fs.mkdir("./public/uploads/cases-documents/" + path + "/" + folderName, function(err) {
            if (err) {
                console.log(err)
            } 
            else {
                console.log("New directory successfully created.")
                res.send({
                    "status": 'ok'
                })
            }
        })
    }
    else {
        res.redirect('?session=expired')
    }
})

module.exports = router