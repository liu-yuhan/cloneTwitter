const express = require('express');
const app = express();
const Routes = express.Router();
const firstLevelRoute = require('./routes/firstLevel');
const myspaceRoute = require('./routes/myspace')
const bodyparser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const PORT = 4000;


app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());
app.use('/', firstLevelRoute);
app.use('/myspace', myspaceRoute);

app.listen(PORT,function() {
    console.log("server is running on port: " +PORT);   
})



module.exports = app;


