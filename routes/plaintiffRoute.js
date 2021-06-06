let express = require('express')
let router = express.Router()
let dbHelper = require('../database/dbHelper')

// router.get('/addplaintiff', (req, res) => {
//     res.render('addplaintiff', { plaintiffTypes: cons.plaintiffsTypes })
// })

router.post('/addplaintiff', async (req, res) => {

    if(req.session.user) {
        let plaintiff = {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            type: req.body.type,
            dateAdded: req.body.date
        }        
        try {
            let result = await dbHelper.addPlaintiff(plaintiff)
            console.log('Plaintiff Added')
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
        let result = await dbHelper.getPlaintiff(id)
        res.send(result)
    }
    else {
        res.redirect('?session=expired')
    }
})

router.put('/', async (req, res) => {
    if(req.session.user) {
        let result = await dbHelper.updatePlaintiff(req.body)
        res.send(result)
    }
    else {
        res.redirect('?session=expired')
    }
})

module.exports = router