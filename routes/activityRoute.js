let express = require('express')
let router = express.Router()
let dbHelper = require('../database/dbHelper')
let cons = require('./../constants')
let config = require('./../config')

router.get('/addactivity', (req, res) => {
    if (req.session.user) {
        res.render('addactivity', { 
            user: req.session.user,
            baseURL: config.web.baseURL,
            currentCase: req.session.currentCase
        })
    }
    else {
        res.redirect('?session=expired')
    }    
})

router.post('/addactivity', async (req, res) => {
    if (req.session.user) {

        if(req.session.currentCase) {
            let activity = {
                title: req.body.title,
                desc: req.body.desc,
                startDateTime: req.body.startDateTime,
                endDateTime: req.body.endDateTime,
                caseID: req.session.currentCase.id,
                createdBy: req.session.user.id
            }
    
            let result = await dbHelper.addActivity(activity)

            res.send({
                id: result.insertId
            })
        }
        else {
            console.log('select a case first')
            res.send({
                id: null
            })           
        }        
    }
    else {
        res.redirect('?session=expired')
    }  
})

router.get('/activities', async (req, res) => {
    if (req.session.user) {
        let user = req.session.user
        let activities

        if (user.role === 'it_admin' || user.role === 'managing_attorney') {
            activities = await dbHelper.getActivitiesAll()
        }
        else {
            activities = await dbHelper.getActivities(user.id)
        }

        res.send(activities)
    }
    else {
        res.redirect('?session=expired')
    }
})

router.get('/updateactivity/:activityId', async (req, res) => {
    if (req.session.user) {
        let activityId = req.params.activityId

        res.render('updateActivity', {
            user: req.session.user,
            baseURL: config.web.baseURL,
            currentCase: req.session.currentCase,
            activityId: activityId
        })
    }
    else {
        res.redirect('?session=expired')
    }
})

router.get('/:activityId', async (req, res) => {
    if (req.session.user) {
        let activityId = req.params.activityId
        let activity = await dbHelper.getActivity(activityId)
        res.send(activity)
    }
    else {
        res.redirect('?session=expired')
    }
})

router.get('/', async (req, res) => {
    if (req.session.user) {

        res.render('activities', {
            user: req.session.user,
            baseURL: config.web.baseURL,
            currentCase: req.session.currentCase
        })
    }
    else {
        res.redirect('?session=expired')
    }
})

router.put('/updatestatus', async (req, res) => {
    if (req.session.user) {
        
        let result = await dbHelper.updateActivityStatus(req.body.id, req.body.status)
        
        if (result.affectedRows == 1) {
            res.send('done')
        }
        else {
            res.send('failed')
        }
    }
    else {
        res.redirect('?session=expired')
    }
})

router.put('/', async (req, res) => {
    if (req.session.user) {
        let result = await dbHelper.updateActivity(req.body)

        if (result.affectedRows == 1) {
            res.send('done')
        }
        else {
            res.send('failed')
        }
    }
    else {
        res.redirect('?session=expired')
    }
})

module.exports = router