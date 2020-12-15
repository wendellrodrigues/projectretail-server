const express         = require ('express');
const fs              = require ('fs')
const https           = require('https')
const http            = require('http')
const path            = require('path')
const bodyParser      = require('body-parser');
const users           = require('./users/users')
const routes          = require('./routes/routes')

//Initialize app
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes PATH
app.use('/routes', routes);

//Specify port used
const port = 3000

//Begin app
app.listen(port)

