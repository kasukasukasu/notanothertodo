var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var morgan = require('morgan');

var app = express();
var mongoose = require('mongoose')

// otetaan condiguration faili käyttöön
var config = require('./app/config')

mongoose.connect(config.DB)

app.use(express.static(path.join(__dirname, '/public')))

// Use morgan to log request in dev mode
app.use(morgan('dev'))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

var port = config.APP_PORT || 3000

app.listen(port) // Listen on port defined in config file

console.log('App listening on port ' + port)

var todoRoutes = require('./app/Routes')

//  Use routes defined in Route.js and prefix it with api
app.use('/api', todoRoutes)

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + port)

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // Pass to next layer of middleware
    next()
})
// Server index.html page when request to the root is made
app.get('/', function (req, res, next) {
    res.sendfile('./public/index.html')
})


module.exports = app;
