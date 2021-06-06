let express = require('express')
let router = express.Router()
let dbHelper = require('../database/dbHelper')

// router.get('/adddefendant', (req, res) => {
//     res.render('adddefendant', { defendantTypes: cons.defendantTypes })
// })

router.post('/adddefendant', async (req, res) => {
    if(req.session.user) {
        let defendant = {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            type: req.body.type,
            dateAdded: req.body.date
        }
        try {
            let result = await dbHelper.addDefendant(defendant)
            console.log('Defendant Added')
            res.send({
                id: result.insertId,
            })
        }
        catch(err) {
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

router.get('/:id', async (req, res)=> {
    
    if(req.session.user) {
        let id = req.params.id
        let result = await dbHelper.getDefendant(id)
        res.send(result)
    }
    else {
        res.redirect('?session=expired')
    }
})

router.put('/', async (req, res) => {
    if(req.session.user) {
        let result = await dbHelper.updateDefendant(req.body)
        res.send(result)
    }
    else {
        res.redirect('?session=expired')
    }
})

module.exports = router