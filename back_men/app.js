const express = require('express');
const app = express();
const Routes = express.Router();
const firstLevelRoute = require('./routes/firstLevel');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = 4000;


app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
  
app.use('/', firstLevelRoute);


app.listen(PORT,function() {
    console.log("server is running on port: " +PORT);   
})



module.exports = app;


