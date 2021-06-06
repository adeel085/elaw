// Modules required for index.js
let express = require('express')
let expressSession = require('express-session')
let bodyParser = require('body-parser');
let fileUpload = require('express-fileupload');
let hbs = require('hbs')
let cors = require('cors')
let config = require('./config')

// Require all routes
let loginRoute = require('./routes/loginRoute')
let workerRoute = require('./routes/workerRoute')
let plaintiffRoute = require('./routes/plaintiffRoute')
let defendantRoute = require('./routes/defendantRoute')
let caseRoute = require('./routes/caseRoute')
let dashboardRoute = require('./routes/dashboardRoute')
let activityRoute = require('./routes/activityRoute')
let searchRoute = require('./routes/searchRoute')
let legalDetailsRoute = require('./routes/legalDetailsRoute')
let utilsRoute = require('./routes/utilsRoute')
let documentsRoute = require('./routes/documentsRoute')
let chargesRoute = require('./routes/chargesRoute')
let notesRoute = require('./routes/notesRoute')

// Launch express app
let app = express()
// Set HBS as templating engine
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this)
})
hbs.registerHelper('ifEqualsToAny', function(arg1, arg2, arg3, options) {
    return (arg1 == arg2 || arg1 == arg3) ? options.fn(this) : options.inverse(this)
})

// Middlewares
app.use(cors())
app.use(fileUpload());
app.use(express.json())
app.use(expressSession({ secret: 'max', saveUninitialized: false, resave: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))

// Use routes on
app.use('/', loginRoute)
app.use('/worker', workerRoute)
app.use('/plaintiff', plaintiffRoute)
app.use('/defendant', defendantRoute)
app.use('/case', caseRoute)
app.use('/dashboard', dashboardRoute)
app.use('/activity', activityRoute)
app.use('/search', searchRoute)
app.use('/legalDetails', legalDetailsRoute)
app.use('/utils', utilsRoute)
app.use('/documents', documentsRoute)
app.use('/charges', chargesRoute)
app.use('/notes', notesRoute)

// Start listening on port
app.listen(config.web.port, () => {
    console.log('App listening on port ' + config.web.port + '!')
})