
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path')


const app = express();
app.use(cors())


// for parsing json input 
app.use(bodyParser.json());
//for parsing 
app.use(bodyParser.urlencoded({ extended: true }))

//connecting static-files
app.use(express.static(path.join(__dirname, "build")));

//database
const database = require('./config/dbConnect')
database();
//User Schema
const User = require('./models/User');

//auth API
const authAPI = require('./APIs/authAPI')
const emailAPI = require('./APIs/emailAPI')

app.get('/', (req, res) => {
    res.send(path.join(__dirname,"build/index.html"))
})

app.use('/api/auth', authAPI)
app.use('/api/email', emailAPI)

//Setting up backend port
const port = process.env.PORT || 5000;
app.listen(port)

