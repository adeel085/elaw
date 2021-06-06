let express = require('express')
let router = express.Router()
let dbHelper = require('../database/dbHelper')
let config = require('./../config')
let path = require('path')
let utils = require('./../helpers/utils')
let fs = require('fs')


router.get('/', async (req, res) => {
    if(req.session.user) {
        let allNotes
        if(req.session.currentCase) {
            if(req.session.user.role === 'it_admin' || req.session.user.role === 'managing_attorney') {
                allNotes = await dbHelper.getAllNotes(req.session.currentCase.id)
                console.log(allNotes)
            }
            else {
                allNotes = await dbHelper.getCurrentUserNotes(req.session.currentCase.id, req.session.user.id)
            }
        }
        res.render('notes', {
            user: req.session.user,
            baseURL: config.web.baseURL,
            currentCase: req.session.currentCase,
            notes: allNotes
        })
    }
    else {
        res.redirect(config.web.baseURL + '?session=expired')
    }
})

router.get('/updatenote/:noteId', async (req, res) => {
    if(req.session.user) {
        let noteId = req.params.noteId
        let note = await dbHelper.getNote(noteId)
        let worker = await dbHelper.getWorkerFromNoteId(noteId)
        let attachedFiles
        if(note.activity_id !== undefined) {
            // activity note
            attachedFiles = await dbHelper.getActivityAttachedFilesFromNoteId(noteId)
        }
        else if(note.charge_id !== undefined) {
            attachedFiles = await dbHelper.getChargeAttachedFilesFromNoteId(noteId)
        }
        else {
            attachedFiles = await dbHelper.getNoteAttachedFilesFromNoteId(noteId)
        }
        console.log(attachedFiles)
        res.render('updateNote', {
            user: req.session.user,
            baseURL: config.web.baseURL,
            currentCase: req.session.currentCase,
            note: note,
            worker: worker[0],
            files: attachedFiles
        })
    }
    else {
        res.redirect(config.web.baseURL + '?session=expired')
    }
})

router.get('/addnote', (req, res) => {
    if(req.session.user) {
        res.render('addNote', {
            user: req.session.user,
            baseURL: config.web.baseURL,
            currentCase: req.session.currentCase
        })
    }
    else {
        res.redirect(config.web.baseURL + '?session=expired')
    }
})

router.post('/addnote', async (req, res) => {
    if(req.session.user) {
        let noteTitle = req.body.noteTitle
        let noteDetail = req.body.noteDetail

        let filePaths = []

        if(req.files)
            filePaths = await utils.uploadFiles(req)

        let time = utils.getCurrentDate()

        // Insert in Database
        let insertedRow = await dbHelper.insertIntoNotes(noteTitle, noteDetail, time, null, null, req.session.currentCase.id, req.session.user.id)
        for(let i = 0; i < filePaths.length; i++) {
            await dbHelper.insertIntoDocuments(null, insertedRow.insertId, filePaths[i], 'note', null)
        }

        // redirect
        res.redirect(config.web.baseURL + 'notes/addnote')

    }
    else {
        res.redirect(config.web.baseURL + '?session=expired')
    }

})

module.exports = router